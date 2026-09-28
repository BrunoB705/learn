import type { Plugin } from "@opencode-ai/plugin"
import { tool } from "@opencode-ai/plugin"
import { Resvg } from "@resvg/resvg-js"
import { spawn } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

/**
 * learn — the 6 visualization tools used by the svg-maker / mermaid-maker
 * subagents (port of Pi's `extensions/visual-tools`).
 *
 *   write_mermaid / edit_mermaid / render_mermaid
 *   write_svg     / edit_svg     / render_svg
 *
 * Each maker owns one managed source file under %TEMP%/opencode-learn/<group>-<sessionID>/,
 * keyed by sessionID so parallel makers never collide. Previews return the PNG as
 * an attachment (the maker LOOKS at it); with `save_as` the PNG is published into
 * <vault>/viz/ with a unique filename.
 *
 * Rendering: SVG via @resvg/resvg-js (native, no system binaries), Mermaid via
 * @mermaid-js/mermaid-cli + puppeteer pointed at an installed Chrome/Edge.
 */

const STAGING_ROOT = join(tmpdir(), "opencode-learn")
const RENDER_TIMEOUT_MS = 120_000

const NODE_CANDIDATES = [
  join(process.env.ProgramFiles ?? "C:/Program Files", "nodejs", "node.exe"),
  join(process.env["ProgramFiles(x86)"] ?? "C:/Program Files (x86)", "nodejs", "node.exe"),
  "node",
]

const BROWSER_CANDIDATES = [
  process.env.OPENCODE_CHROME,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  join(process.env.ProgramFiles ?? "C:/Program Files", "Google", "Chrome", "Application", "chrome.exe"),
  join(process.env["ProgramFiles(x86)"] ?? "C:/Program Files (x86)", "Google", "Chrome", "Application", "chrome.exe"),
  join(process.env["ProgramFiles(x86)"] ?? "C:/Program Files (x86)", "Microsoft", "Edge", "Application", "msedge.exe"),
  join(process.env.ProgramFiles ?? "C:/Program Files", "Microsoft", "Edge", "Application", "msedge.exe"),
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
].filter((p): p is string => Boolean(p))

function findFirst(paths: string[]): string | undefined {
  for (const p of paths) {
    if (p === "node") return p
    if (existsSync(p)) return p
  }
  return undefined
}

function stagingDir(group: string, sessionID: string): string {
  return join(STAGING_ROOT, `${group}-${sessionID}`)
}

function bodyPathOf(group: string, sessionID: string, bodyFile: string): string {
  return join(stagingDir(group, sessionID), bodyFile)
}

/** Exact-match single replacement (must occur exactly once). */
function applyEdit(current: string, oldText: string, newText: string): { updated: string; index: number } {
  if (oldText === "") throw new Error("`old_text` must be non-empty.")
  if (oldText === newText) throw new Error("`old_text` and `new_text` are identical.")
  const first = current.indexOf(oldText)
  if (first === -1) throw new Error("`old_text` not found in the current source — match it exactly.")
  const second = current.indexOf(oldText, first + oldText.length)
  if (second !== -1) {
    let count = 0
    let i = first
    while (i !== -1) {
      count++
      i = current.indexOf(oldText, i + oldText.length)
    }
    throw new Error(`\`old_text\` appears ${count} times — add surrounding context to make it unique.`)
  }
  return { updated: current.slice(0, first) + newText + current.slice(first + oldText.length), index: first }
}

function snippetAround(content: string, index: number, contextLines = 3): string {
  const before = content.slice(0, index)
  const hitLine = before.split("\n").length - 1
  const lines = content.split("\n")
  const start = Math.max(0, hitLine - contextLines)
  const end = Math.min(lines.length - 1, hitLine + contextLines)
  const width = String(end + 1).length
  const out: string[] = []
  for (let i = start; i <= end; i++) out.push(`${String(i + 1).padStart(width)}  ${lines[i]}`)
  return out.join("\n")
}

function slugify(slug: string): string {
  return slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "viz"
}

/** Copy a rendered PNG into <vault>/viz with a unique, slugified name. */
function publish(png: Buffer, slug: string): { filename: string; path: string } {
  const vault = (process.env.OBSIDIAN_VAULT ?? "").trim()
  if (!vault) {
    throw new Error(
      "OBSIDIAN_VAULT is not set — cannot publish. Set it to the absolute vault path (forward slashes on Windows).",
    )
  }
  const dir = join(vault, "viz")
  mkdirSync(dir, { recursive: true })
  const filename = `viz-${slugify(slug)}-${Date.now()}.png`
  const path = join(dir, filename)
  writeFileSync(path, png)
  return { filename, path }
}

function renderSvg(source: string): Buffer {
  const svg = source.trim()
  if (!svg.includes("<svg")) throw new Error("Source is not a complete <svg>…</svg> document.")
  return new Resvg(svg, { background: "#ffffff", fitTo: { mode: "zoom", value: 2 } }).render().asPng()
}

function run(cmd: string, args: string[], opts: { cwd: string; timeoutMs: number }): Promise<{
  code: number | null
  stdout: string
  stderr: string
  timedOut: boolean
}> {
  return new Promise((resolve) => {
    let stdout = ""
    let stderr = ""
    let timedOut = false
    const child = spawn(cmd, args, { cwd: opts.cwd, env: { ...process.env, PUPPETEER_SKIP_DOWNLOAD: "1" } })
    const timer = setTimeout(() => {
      timedOut = true
      child.kill("SIGKILL")
    }, opts.timeoutMs)
    child.stdout.on("data", (d) => (stdout += d.toString()))
    child.stderr.on("data", (d) => (stderr += d.toString()))
    child.on("error", (err) => {
      clearTimeout(timer)
      resolve({ code: null, stdout, stderr: `${stderr}${String(err)}`, timedOut })
    })
    child.on("close", (code) => {
      clearTimeout(timer)
      resolve({ code, stdout, stderr, timedOut })
    })
  })
}

/** Render the managed .mmd to PNG with mermaid-cli + an installed Chrome/Edge. */
async function renderMermaid(bodyPath: string, workDir: string, outPath: string, projectDir: string) {
  const parts = ["node_modules", "@mermaid-js", "mermaid-cli", "src", "cli.js"]
  const candidates = [join(projectDir, ".opencode", ...parts), join(projectDir, ...parts)]
  const mmdc = candidates.find((p) => existsSync(p))
  if (!mmdc) {
    return { ok: false as const, detail: `@mermaid-js/mermaid-cli not found (looked in ${candidates.join(", ")}).` }
  }

  const browser = findFirst(BROWSER_CANDIDATES)
  const cfgPath = join(workDir, "puppeteer.json")
  writeFileSync(
    cfgPath,
    JSON.stringify(browser ? { executablePath: browser, args: ["--no-sandbox"] } : { args: ["--no-sandbox"] }),
    "utf8",
  )

  const node = findFirst(NODE_CANDIDATES) ?? "node"
  const res = await run(node, [mmdc, "-i", bodyPath, "-o", outPath, "-p", cfgPath, "-s", "2", "-b", "white"], {
    cwd: workDir,
    timeoutMs: RENDER_TIMEOUT_MS,
  })
  if (res.code !== 0 || !existsSync(outPath)) {
    const detail = (res.stderr || res.stdout || "unknown error").split("\n").slice(-30).join("\n")
    return { ok: false as const, detail: `${res.timedOut ? "mmdc timed out.\n\n" : ""}${detail}` }
  }
  return { ok: true as const, detail: "" }
}

function renderResult(opts: {
  ok: boolean
  kind: "SVG" | "Mermaid"
  png?: Buffer
  detail?: string
  saveAs?: string
  editTool: string
  publishHint: string
  previewHint: string
}): string | { title: string; output: string; attachments: Array<{ type: "file"; mime: string; url: string; filename?: string }> } {
  if (!opts.ok) {
    return `${opts.kind} render FAILED — no image produced. Fix the source with ${opts.editTool} and render again.\n\nError:\n${opts.detail}`
  }
  const png = opts.png!
  if (opts.saveAs) {
    let published: { filename: string; path: string }
    try {
      published = publish(png, opts.saveAs)
    } catch (err) {
      return `${opts.kind} rendered, but publishing FAILED: ${err instanceof Error ? err.message : String(err)}`
    }
    return {
      title: `Published ${published.filename}`,
      output: `Published to <vault>/viz/.\nfilename: ${published.filename}\npublish_path: ${published.path}\n\n${opts.publishHint}`,
      attachments: [{ type: "file", mime: "image/png", url: `data:image/png;base64,${png.toString("base64")}` }],
    }
  }
  return {
    title: `${opts.kind} preview`,
    output: opts.previewHint,
    attachments: [{ type: "file", mime: "image/png", url: `data:image/png;base64,${png.toString("base64")}` }],
  }
}

type SourceArgs = { source: string }
type EditArgs = { old_text: string; new_text: string }
type RenderArgs = { save_as?: string }

function writeTool(group: string, bodyFile: string, kind: "SVG" | "Mermaid", editTool: string, renderTool: string) {
  return tool({
    description:
      `Write the FULL ${kind} source to this session's managed file (your first draft or a complete ` +
      `rewrite). You do NOT name the file — ${editTool} and ${renderTool} act on the same one. ` +
      `Writing does NOT render — call ${renderTool} when ready. For a small fix, prefer ${editTool}.`,
    args: {
      source: tool.schema
        .string()
        .describe(
          kind === "SVG"
            ? "The complete <svg>…</svg> document, with explicit width/height (or viewBox) and readable font sizes."
            : "The complete Mermaid diagram source, starting with the diagram type (e.g. `graph TD`).",
        ),
    },
    async execute(args: SourceArgs, context) {
      const source = args.source.trim()
      if (!source) throw new Error(`\`${group === "svg" ? "write_svg" : "write_mermaid"}\` requires a non-empty \`source\`.`)
      if (kind === "SVG" && !source.includes("<svg")) {
        return "Source must be a complete <svg>…</svg> document."
      }
      const dir = stagingDir(group, context.sessionID)
      mkdirSync(dir, { recursive: true })
      const bodyPath = join(dir, bodyFile)
      writeFileSync(bodyPath, source, "utf8")
      const lines = source.split("\n").length
      return `Wrote ${lines}-line ${kind} source.\nCall ${renderTool} to render it, or ${editTool} to tweak it.`
    },
  })
}

function editTool(group: string, bodyFile: string, kind: "SVG" | "Mermaid", writeToolName: string, renderTool: string) {
  return tool({
    description:
      `Make a single exact-match replacement in this session's ${kind} source — same contract as the ` +
      `\`edit\` tool, locked to the one managed file. \`old_text\` must appear EXACTLY ONCE (include ` +
      `surrounding context for uniqueness); on 0 or >1 matches the call fails and nothing changes. ` +
      `Call ${writeToolName} first. Editing does NOT render.`,
    args: {
      old_text: tool.schema.string().describe("Exact substring of the current source to replace (must match once)."),
      new_text: tool.schema.string().describe("Replacement text for `old_text`."),
    },
    async execute(args: EditArgs, context) {
      const bodyPath = bodyPathOf(group, context.sessionID, bodyFile)
      if (!existsSync(bodyPath)) return `No source yet — call ${writeToolName} first.`
      const current = readFileSync(bodyPath, "utf8")
      let updated: string
      let index: number
      try {
        ;({ updated, index } = applyEdit(current, args.old_text, args.new_text))
      } catch (err) {
        return err instanceof Error ? err.message : String(err)
      }
      writeFileSync(bodyPath, updated, "utf8")
      return `Applied edit. Updated region:\n\`\`\`\n${snippetAround(updated, index)}\n\`\`\`\nCall ${renderTool} to see it.`
    },
  })
}

function svgRenderTool() {
  return tool({
    description:
      "Render the CURRENT session SVG source to a PNG and return it inline so you can SEE the picture " +
      "and iterate. You do NOT pass the source here — it comes from the managed file; call write_svg " +
      "first. Iterate freely with no `save_as` (preview only). When the picture is correct and clean, " +
      "call once more with `save_as` set to a short kebab-case topic slug: that publishes the PNG into " +
      "<vault>/viz as viz-<slug>-<timestamp>.png and returns the filename to embed.",
    args: {
      save_as: tool.schema
        .string()
        .optional()
        .describe(
          "Short kebab-case topic slug (e.g. 'number-line'). When set, the PNG is published to " +
            "<vault>/viz as viz-<slug>-<timestamp>.png. Omit for a preview-only render.",
        ),
    },
    async execute(args: RenderArgs, context) {
      const bodyPath = bodyPathOf("svg", context.sessionID, "diagram.svg")
      if (!existsSync(bodyPath)) return "No source yet — call write_svg first."
      let png: Buffer
      try {
        png = renderSvg(readFileSync(bodyPath, "utf8"))
      } catch (err) {
        return renderResult({
          ok: false,
          kind: "SVG",
          detail: err instanceof Error ? err.message : String(err),
          editTool: "edit_svg",
          publishHint: "",
          previewHint: "",
        }) as string
      }
      return renderResult({
        ok: true,
        kind: "SVG",
        png,
        saveAs: args.save_as,
        editTool: "edit_svg",
        publishHint: "LOOK at the picture below to confirm the geometry is correct before returning it.",
        previewHint:
          "Preview render (not yet saved). LOOK: are coordinates, angles, directions, and proportions correct? Labels clear and unclipped? Fix with edit_svg, or re-render with `save_as` to publish.",
      })
    },
  })
}

function mermaidRenderTool() {
  return tool({
    description:
      "Render the CURRENT session Mermaid source to a PNG and return it inline so you can SEE the " +
      "diagram and iterate. You do NOT pass the source here — it comes from the managed file; call " +
      "write_mermaid first. Iterate freely with no `save_as` (preview only). When the diagram is " +
      "correct and clean, call once more with `save_as` set to a short kebab-case topic slug: that " +
      "publishes the PNG into <vault>/viz as viz-<slug>-<timestamp>.png and returns the filename to embed.",
    args: {
      save_as: tool.schema
        .string()
        .optional()
        .describe(
          "Short kebab-case topic slug (e.g. 'internet-packets'). When set, the PNG is published to " +
            "<vault>/viz as viz-<slug>-<timestamp>.png. Omit for a preview-only render.",
        ),
    },
    async execute(args: RenderArgs, context) {
      const dir = stagingDir("mermaid", context.sessionID)
      const bodyPath = bodyPathOf("mermaid", context.sessionID, "diagram.mmd")
      if (!existsSync(bodyPath)) return "No source yet — call write_mermaid first."
      mkdirSync(dir, { recursive: true })
      const outPath = join(dir, `render-${Date.now()}.png`)

      const result = await renderMermaid(bodyPath, dir, outPath, context.directory)
      if (!result.ok) {
        return renderResult({
          ok: false,
          kind: "Mermaid",
          detail: result.detail,
          editTool: "edit_mermaid",
          publishHint: "",
          previewHint: "",
        }) as string
      }
      return renderResult({
        ok: true,
        kind: "Mermaid",
        png: readFileSync(outPath),
        saveAs: args.save_as,
        editTool: "edit_mermaid",
        publishHint: "LOOK at the diagram below to confirm it is correct before returning it.",
        previewHint:
          "Preview render (not yet saved). LOOK: are arrows/relationships correct, labels right, nothing cramped? Fix with edit_mermaid, or re-render with `save_as` to publish.",
      })
    },
  })
}

export const LearnPlugin: Plugin = async () => {
  return {
    tool: {
      write_svg: writeTool("svg", "diagram.svg", "SVG", "edit_svg", "render_svg"),
      edit_svg: editTool("svg", "diagram.svg", "SVG", "write_svg", "render_svg"),
      render_svg: svgRenderTool(),
      write_mermaid: writeTool("mermaid", "diagram.mmd", "Mermaid", "edit_mermaid", "render_mermaid"),
      edit_mermaid: editTool("mermaid", "diagram.mmd", "Mermaid", "write_mermaid", "render_mermaid"),
      render_mermaid: mermaidRenderTool(),
    },
  }
}
