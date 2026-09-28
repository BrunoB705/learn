# Original pi configuration

The files this repo was originally built from, kept for reference — **not used by OpenCode**.

They target [pi](https://github.com/earendil-works/pi) and its extension API (`pi.registerTool`, typebox schemas, `interactive-subagents`), which OpenCode does not load.

| Folder | Pi piece | OpenCode equivalent |
|---|---|---|
| `skills/teach/` | teaching philosophy + process | `.opencode/skills/teach/SKILL.md` |
| `skills/visualize/` | when/how to add a diagram | `.opencode/skills/visualize/SKILL.md` |
| `agents/` | `researcher`, `svg-maker`, `mermaid-maker` | `.opencode/agents/*.md` |
| `extensions/ask-user-question.ts` | question popup | native `question` tool |
| `extensions/quiz.ts` | graded questions | prompt-level protocol in the teach skill (V1) |
| `extensions/md-log.ts` | session ↔ markdown file | the Obsidian MCP server |
| `extensions/visual-tools/` | 6 render tools | `.opencode/plugins/learn.ts` |

The original upstream project: https://github.com/amosblomqvist/learn
