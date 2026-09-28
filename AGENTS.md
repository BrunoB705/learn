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

