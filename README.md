# learn

[![video](assets/thumbnail.png)](https://www.youtube.com/watch?v=kzcI5F4tGiU)

This repo is a **fork** of [amosblomqvist/learn](https://github.com/amosblomqvist/learn): the learning system **Amos Blomqvist** presents in his video [How I Use AI to Learn Things](https://www.youtube.com/watch?v=kzcI5F4tGiU). The original project and the video are his — what follows is my fork of it, adapted to my own way of learning and language.

The original is a [pi](https://github.com/earendil-works/pi) configuration — a teaching philosophy encoded in a skill, a few small extensions, and agent definitions. This tree is the **OpenCode port**: the same methodology, re-expressed with OpenCode's agents/skills/commands/plugins and models. The original pi configuration is preserved on the [`original-project` branch](https://github.com/BrunoB705/learn/tree/original-project) and in the [upstream repo](https://github.com/amosblomqvist/learn).

The teaching philosophy lives in a skill, with small subagents for research and for drawing verified diagrams, and an Obsidian vault as the memory.

## What's in it

```text
learn/
├── opencode.json                 # project config: Obsidian MCP server
├── AGENTS.md                     # global rules: language (Spanish), sources per topic
├── .opencode/
│   ├── commands/teach.md         # /teach <topic>
│   ├── skills/
│   │   ├── teach/SKILL.md        # the philosophy and the process
│   │   └── visualize/SKILL.md    # adds a correct, minimal diagram when a picture earns its place
│   ├── agents/
│   │   ├── researcher.md         # verifies facts, maps a topic
│   │   ├── svg-maker.md          # geometric/spatial diagrams
│   │   └── mermaid-maker.md      # dependency graphs, flows, sequences, states
│   ├── plugins/learn.ts          # write/edit/render_svg + write/edit/render_mermaid
│   ├── plugins/image-test.ts     # smoke test: does the model really see the PNG?
│   ├── package.json              # @opencode/plugin + @resvg/resvg-js + @mermaid-js/mermaid-cli
│   └── package-lock.json
├── sources/                      # local only — nothing here is committed
│   └── index.example.md          # template; copy it to index.md and fill it in
└── assets/                       # README thumbnail
```

- `AGENTS.md` — the rules that apply to every session: reply in Spanish, teach only from the topic's own folder in `sources/`
- `skills/teach/` — the philosophy and the process (probe → plan → teach → quiz, every session)
- `skills/visualize/` — when a diagram helps, and how to get one that's actually correct
- `sources/` — **his own study material, per topic** (`sources/index.md` maps topic → folder; it is local, created by copying `sources/index.example.md`). Each session teaches *only* from the folder matching its topic; if nothing covers it, the tutor asks before touching the web. Nothing under `sources/` is in git — no material of any type, no index either.
- `plugins/learn.ts` — the six visualization tools: the maker authors a source, renders it to a PNG, **looks at the PNG and iterates until it's right**, then publishes it into `<vault>/viz/`
- `plugins/image-test.ts` — render an SVG with a random token and hand it to the model, to prove the vision pipeline works before blaming a diagram
- `agents/researcher` — fires before you teach from memory, to confirm facts and scope a topic

Sessions, notes, quizzes results and diagrams live in your **Obsidian vault**, not in this repo.

## Install

```bash
git clone https://github.com/BrunoB705/learn
cd learn
```

Then open OpenCode in that directory (`opencode`), or copy `opencode.json` + `.opencode/` into an existing project.

Install the visualization dependencies once:

```bash
cd .opencode && npm install
```

> `npm install` ran with `PUPPETEER_SKIP_DOWNLOAD=1` (no bundled Chromium) — rendering uses your installed Chrome or Edge instead. If you install normally, puppeteer downloads its own Chromium and everything still works.

## Requirements

- [OpenCode](https://opencode.ai/v2/docs/) 2.0.x
- **Node.js** — renders Mermaid via the bundled `@mermaid-js/mermaid-cli`
- **Chrome or Edge** — used by puppeteer to render diagrams (overridable with `OPENCODE_CHROME`)
- **Obsidian** with a vault — this is where the system remembers anything
- The env var **`OBSIDIAN_VAULT`** pointing at that vault, using **forward slashes**:

  ```bash
  # Windows (PowerShell) — forward slashes, or {env:...} breaks while parsing opencode.json
  setx OBSIDIAN_VAULT "C:/Users/you/Documents/Vault"
  ```

  The vault must contain an `.obsidian/` folder (open it in Obsidian once), otherwise the MCP server refuses to start.

## Usage

```
/teach TCP/IP
/teach árboles binarios
/teach memoria virtual
/teach Java Generics
```

The tutor then: searches the vault for what you already studied → probes your level with graded quizzes → scoping with `researcher` → presents an approach plus a dependency map → waits for your go-ahead → teaches one node at a time, checking each landed → visualizes when a picture genuinely helps → keeps a session note in the vault.

It also teaches on plain prompts (the skill is auto-discovered), but `/teach <topic>` is the intended entry point.

## Models

| Role | Model | Why |
|---|---|---|
| Makers (`svg-maker`, `mermaid-maker`) | `opencode/mimo-v2.6-flash-free` | free **and** has vision — they must look at the PNG they rendered |
| `researcher` | `opencode/deepseek-v4.1-flash-free` | best of the free models on a head-to-head brief: most findings, 0 tool errors, and it checked the IANA registry and the RFC errata instead of trusting the citation |
| Tutor | whatever your session uses | — |

Fallbacks with vision (edit the `model:` line in the agent file): `deepseek-v4.1-flash-free` (verified by reading a rendered token), `space-bunny-free`, `longcat-2.5-preview-free`.

Free models rotate; if one disappears, change the `model:` line.

## Notes

- You can run the system without subagents. The main session does the teaching; you just lose the researcher (truth verification) and the generated visuals.
- Quizzes are graded by the tutor (prompt-level, no plugin): the correct answer is written down first, you answer through OpenCode's `question` picker, and it grades with ✓/✗ + correct answer + explanation afterwards.
- A `permission:` block in an agent's frontmatter used to break every call from that subagent on the free tier. Re-tested on V2 (2.0.32) with and without the block: identical behaviour, so it no longer reproduces. V2's native shape is a `permissions:` array; these agents assert nothing and rely on their prompt.
- The teaching skill is written for one learner (me). Edit the skill to fit how you learn best.
