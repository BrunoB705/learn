# learn — project rules

## Language

He writes in Spanish, so **Spanish is the default language of this project**: teach, ask, grade, explain, and write session notes, quiz questions, quiz options and diagram labels in Spanish.

Keep English only for things that are English by nature: code, file paths, tool names, and the terminology that is standard in the field when there is no good Spanish equivalent (name it in English, then explain it in Spanish).

This overrides the English voice of the skills in `.opencode/skills/` — the methodology there is binding, the language it's written in is not.

## Sources — his material only

`sources/` holds his own study material, grouped by topic, indexed in `sources/index.md`.

1. **Before teaching anything**, map the session topic to its folder using that index. That folder is the authoritative basis for this session: teach from it and verify claims against it instead of memory.
2. **Every other topic's folder is out of scope for this session** — a regex session never pulls in the calculus PDFs, and vice versa.
3. **If nothing in `sources/` covers the topic, stop and ask**: use the web (clearly marked as *not from your sources*) or wait until he adds the material. Never fall back to web or memory silently.
4. `researcher` obeys the same rule: his documents first, web only to fill a gap, and say which one answered.
5. Read a PDF with your file-reading tool — the index tells you which file to open, so don't open all of them.

## Vault — MCP only

The Obsidian vault is touched **only** through the `obsidian_*` MCP tools — never with `bash`, `glob`, `read`, `write`, or `edit` on vault paths, in any session, with or without `/teach`. If the MCP server is unavailable, continue in chat and say at the end that nothing was saved; never invent vault content you couldn't read.

## Notation — one rule per surface

The terminal **cannot render LaTeX** — `$x^5$` shows literally, dollar signs included, which reads as broken.

- **Chat and everything he reads off the screen** (quiz questions, `question` options, grades, explanations): plain Unicode math — `5x⁴`, `f′(x)`, `√x`. Never `$...$`; `question` options are raw text, so no markdown either.
- **Obsidian notes** (`Sessions/`, `Conceptos/`): LaTeX — `$...$`, `$$...$$`. That surface renders it, and the note is what he re-reads later.

## Closing a session

A session ends on exactly one of three — **goal achieved / he says stop / blocked on the map** — and you must always name which; never trail off. On every close (including an early stop): review quiz of 3–5 questions over everything established → grade it → write the `## Cierre` block in the session note (what's solid, what's weak with the correct answers, the one thing to pick up next) → update the `Conceptos/` notes → end with *"Sesión cerrada. Lo siguiente: X."*

## Concept notes

One permanent note per concept at `Conceptos/<nodo>.md`, created or updated the moment a node is established, linked to what it depends on with `[[wikilinks]]` — that's what makes Obsidian's graph draw the DAG. Session notes are the log; concept notes are the knowledge. A note without wikilinks is invisible in the graph.

