import { Plugin } from "@opencode/plugin"
import { Resvg } from "@resvg/resvg-js"
import { mkdirSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

/**
 * image_test — smoke test for image output. Renders a PNG carrying a random
 * token and returns it as file content, so a model has to actually SEE the
 * image to answer. Used to tell apart models that really have vision from
 * models that claim to read a picture they never received.
 *
 * OpenCode V2: registered as its own plugin (V1's `.opencode/tools/*.ts` and the
 * `tool()` helper are gone; tools are registered through `ctx.tool.transform`).
 */

const TOKEN_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

function randomToken(length: number): string {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  let out = ""
  for (const b of bytes) out += TOKEN_ALPHABET[b % TOKEN_ALPHABET.length]
  return out
}

export default Plugin.define({
  id: "image-test",
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      editor.add({
        name: "image_test",
        description:
          "Smoke test for image output: renders a PNG with a secret text token and returns it as file " +
          "content. Call it whenever asked to inspect a test image.",
        input: { type: "object", properties: {}, required: [], additionalProperties: false },
        options: { codemode: false },
        async execute() {
          const token = randomToken(6)
          const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">
  <rect width="640" height="360" fill="#ffffff"/>
  <rect x="40" y="40" width="150" height="150" fill="#d946ef"/>
  <circle cx="440" cy="115" r="75" fill="#22c55e"/>
  <polygon points="320,300 380,200 260,200" fill="#f59e0b"/>
  <text x="40" y="330" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#1e3a8a">${token}</text>
</svg>`

          const png = new Resvg(svg, { background: "#ffffff" }).render().asPng()

          const stage = join(tmpdir(), "opencode-learn", "image_test")
          mkdirSync(stage, { recursive: true })
          writeFileSync(join(stage, "image_test.png"), png)

          return {
            content: [
              {
                type: "text",
                text: "Attached is a rendered PNG. Read the alphanumeric token printed inside the image and answer with exactly that token, nothing else.",
              },
              {
                type: "file",
                uri: `data:image/png;base64,${png.toString("base64")}`,
                mime: "image/png",
                name: "image_test.png",
              },
            ],
          }
        },
      })
    })
  },
})
