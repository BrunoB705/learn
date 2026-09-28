---
description: Start a teach session on a topic (probe → plan → teach → quiz), persisted to the Obsidian vault
---

Start a learning session on this topic:

**$ARGUMENTS**

**Language: Spanish** — he writes in Spanish, so teach, ask, quiz, grade and write the session note in Spanish (`AGENTS.md` + the teach skill say the same thing).

If `$ARGUMENTS` is empty, first ask what he wants to learn today, then continue.

Load the `teach` skill with the `skill` tool (name `teach`) and follow it exactly. Everything in it is binding for this session, in particular:

1. **Persistence first** — the Obsidian MCP tools (`obsidian_*`) are the memory. Before Phase 1, search the vault for prior notes on the topic and its prerequisites, and read what's relevant. Keep a session note (`Sessions/<date> - <topic>.md`), link with `[[wikilinks]]`, embed diagrams with `![[viz-...png|500]]`. Never touch the vault through bash/read/write/glob.
2. **Probe → plan → teach, in that order.** Phase 1a runs graded quizzes to bracket his edge (floor *and* ceiling — all-correct means "too easy", keep escalating). Phase 1b is a fork about his goal. Phase 2: scope with a `researcher` subagent, build the DAG, present approach + ```mermaid``` dependency map, then **stop and wait for his go-ahead**. Phase 3: one node at a time — motivate → establish → connect → quiz-check.
3. **Ask through `question`** — graded quiz (correct answer written down first, graded with ✓/✗ + correct answer + reasoning *after* he answers) or fork (no right answer). If `question` isn't available (non-interactive), ask numbered options in chat and grade on reply — same protocol.
4. **Accuracy** — the moment you're unsure of a fact, name, date, formula or claim, confirm it with a `researcher` subagent before saying it.
5. **Visualize** only when a picture earns its place: load the `visualize` skill, brief a maker (`mermaid-maker` / `svg-maker`) with one minimal idea, embed the filename it returns.

He answers in chat; run the whole session until he's done.
