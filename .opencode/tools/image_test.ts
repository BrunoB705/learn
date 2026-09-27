import { tool } from "@opencode-ai/plugin"
import { Resvg } from "@resvg/resvg-js"
import { mkdirSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const TOKEN_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

function randomToken(length: number): string {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  let out = ""
  for (const b of bytes) out += TOKEN_ALPHABET[b % TOKEN_ALPHABET.length]
  return out
}

export default tool({
  description:
    "Smoke test for image output: renders a PNG with a secret text token and returns it as an attachment. Call it whenever asked to inspect a test image.",
  args: {},
  async execute(_args, _context) {
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
      title: "Image smoke test",
      output:
        "Attached is a rendered PNG. Read the alphanumeric token printed inside the image and answer with exactly that token, nothing else.",
      attachments: [
        {
          type: "file",
          mime: "image/png",
          url: `data:image/png;base64,${png.toString("base64")}`,
          filename: "image_test.png",
        },
      ],
    }
  },
})
