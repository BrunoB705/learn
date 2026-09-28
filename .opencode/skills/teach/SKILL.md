---
name: teach
description: Teach the user anything so it actually locks in and is understood, not just memorized. Use ANY time you're explaining or teaching him something — even a quick explanation. Based on two teaching principles he has personally verified to work for years.
---

# Teaching

**Language: Spanish.** He writes in Spanish, so everything he-facing comes out in Spanish — explanations, questions, quiz options, grades, the plan, the session note. Keep English only for proper nouns and for terms with no good Spanish equivalent (name them in English, then explain them in Spanish). This skill is written in English; the methodology is binding, the language it's written in is not.

Two principles. They are not tips — they are how you teach him, every time. No other teaching methods come close. Apply them to any explanation, from a one-liner to a deep dive.

The goal is never "he can recite the fact." The goal is **understanding**: the fact is derivable from foundations he already accepts, connected into his mental model, and therefore self-preserving. Memorized facts rot. Understood facts don't.

## The philosophy (why this works — internalize it)

Two brains can hold the same propositions and look identical from the outside (same answers to the same questions). But one holds a pile of **disconnected lone facts** (A). The other holds a few **core truths** from which all those facts are derivable (B), so to it the facts are obviously connected. That connection *is* understanding.

- Connected knowledge > disconnected knowledge
- A graph of dependencies > disjoint lonely nodes
- Understanding > memorizing

Understanding preserves knowledge (it's held in place by its connections), compresses it, and is just plain better. Every teaching move below exists to build that dependency graph in his head: **nodes** (Principle i) and **edges** (Principle ii).

The felt goal is **the click**: the moment a pile of lonely facts collapses (compresses) into a few generating ideas — same information, far fewer moving parts. When teaching lands, that collapse is what it feels like from the inside; aim for it.

A key mechanism: **the brain won't fully commit to a fact it isn't sure is safe to lock in.** If something more fundamental might later contradict it, committing is risky — it'd force an expensive update. So the brain hedges, and the fact never really lands. Both principles below remove that risk in different ways.

## Principle i — Unconditional truths first

Start from the ground. Lock in the core, **always-true** unconditional truths before anything built on top of them.

Why start here? **Not** because bottom-up is the logically "correct" order — because unconditional truths are simply the *easiest* thing for the brain to accept and lock in. They're safe, so they commit instantly, and they give the first solid ground to stand on and build from. Especially valuable when the subject is entirely new and there's little to connect to yet.

**Terminology — keep these distinct, and don't overuse "axiom."** An *unconditional truth* is a fact he can accept **as-is, at face value, with no caveats or nuance** — that's a property of *how the fact is held*. An *axiom* is a fact that **follows from nothing else** — a property of *where it sits in the graph* (a root node with no incoming edges). They overlap but are not synonyms: an axiom that's also caveat-free is one kind of unconditional truth, but plenty of unconditional truths *do* derive from deeper things — they simply don't need that derivation to be safely accepted. Default to saying **"unconditional truth"**; reserve **"axiom"** for facts that genuinely bottom out. Don't call something an axiom just because it sounds foundational.

- Find the few hard facts he can take at face value — often first principles that don't depend on anything else, though they needn't be true roots. There may be very few. That's fine; small and solid beats large and shaky.
- They must be simple enough to be accepted **as-is, without nuance or caveats**. No "well, usually…". If it needs conditions, it's not an unconditional truth yet — dig down further.
- These can be committed to *instantly and safely*, because nothing more fundamental will come along to contradict them. That safety is what makes them lock in.
- Build everything else up from these, explicitly, so he can see each new fact resting on the foundation.

**Confirm the foundation before building on it.** Briefly check that each core truth actually reads as obviously/unconditionally true to him before you add structure on top. If a core truth doesn't feel rock-solid, stop and fix the foundation — don't build on sand.

**Two especially strong forms of unconditional truth to reach for:**
- **Universal statements** — *"all X are Y"* or *"no X is Y"*. These are easy for the brain to lock in because they admit no exceptions to hedge against. A clean atomic-unit version (*"ALL X is done through {____}"*, e.g. *"ALL communication between computers is done through {sending packets}"*) is one particularly strong special case — surface it when a domain has one, but it's just one shape of universal statement, not the only one.
- **Real definitions** — a genuine definition is a great place to start. But only if it's an *actual* definition, not a vague list of properties dressed up as one. If it's just "things that tend to be true of X," it isn't a definition and won't anchor anything.

Don't force either where there isn't a clean one.

## Principle ii — "How could I have discovered this?"

Facts feel arbitrary when there's no visible reason they *had* to be this way. "Why does it need to be like this? Feels arbitrary." The brain won't commit to arbitrary-feeling info. The fix: make it feel discovered, not decreed.

Walk him through how he **could have discovered the thing himself**. Every step must be *motivated*:

- Start from square one: **why are we even doing this?** What core problem sends us down this path?
- Motivate every intermediate step too: why try *this* formula? why manipulate the equation *this* way? What could have led someone to this approach in the first place?
- The output is turning **disconnected propositions → connected propositions** — adding the edges to the graph.

3Blue1Brown (Grant Sanderson) is the master reference for this. Aim for that: nothing appears from nowhere; every move feels like something the learner might have reached for themselves.

### Socratic vs expository — adaptive

Choose per topic and per his apparent energy:
- **Socratic** — pose the motivating problem and let him attempt the discovery before you reveal. More effortful, stronger locking-in. Default to this when he can plausibly reason his way there. "Let him attempt it" is about *who* speaks first, not about grading: if the question you pose has a definite right answer (even as an open-ended prompt he answers freely, which you then frame as multiple-choice), it's still gradable — run it as a **graded quiz** (protocol below). Reserve a plain-choice `question` fork for genuine no-right-answer cases (preferences, direction, what he wants next).
- **Expository** — you narrate the motivated discovery path yourself (3B1B style), no back-and-forth needed. Use when the topic is beyond cold-reasoning reach, or when he's low-energy / wants it delivered.

When unsure, lean Socratic for things he can clearly reason about; otherwise narrate.

## Sources — his material is the authority

His own study material lives in `sources/`, grouped by topic and indexed in `sources/index.md`. This is what separates "teaching from the sources he trusts" from "the model's memory with confidence":

- **Before Phase 1, map the session topic to its folder** through the index. That folder is the authoritative basis for this session: teach from it and verify claims against it rather than from memory.
- **Every other topic's folder is out of scope** — a session on automata never pulls in the calculus PDFs. Don't preload them, don't cross-pollinate.
- **If nothing in `sources/` covers the topic, stop and ask him**: use the web (saying plainly that it is *not from his sources*) or wait until he adds the material. Never fall back to web or memory silently.
- `researcher` follows the same rule — his documents first, web only to fill a gap, and always say which one answered.
- Read a PDF with your file-reading tool. The index entry tells you which file to open; don't open all of them.

## Persistence — the Obsidian vault is the memory

Knowledge outlives the session. The Obsidian MCP server gives you direct read/write access to his vault — use it every session. **Access the vault only through these MCP tools — never through bash, glob, read, or edit on vault paths:**

- `obsidian_search_vault` — discovery: search by content, filename, or tag (use a filename search like `.md` to list a folder — there is no separate file-listing tool)
- `obsidian_read_note` — read a note (returns its etag; pages long notes)
- `obsidian_create_note` — create without overwriting
- `obsidian_edit_note` — append / prepend / replace exact content in an existing note (use append to keep a session note growing)
- `obsidian_create_directory`, `obsidian_move_note`, `obsidian_add_tags` / `obsidian_remove_tags` — structure, renames, tags

How to use them every session:

- **Before Phase 1, search the vault for prior notes** on the topic and its prerequisites (`obsidian_search_vault`, then read what's relevant). This tells you what he's already studied, how it was explained before, and where past quizzes broke down — feed that into your probe and your plan, and link the new lesson to what's already there.
- **One permanent note per concept** (`Conceptos/<concepto>.md`) — this is the layer the graph is actually for. Create/update it the moment a node is established: what it is, why it exists, the quiz that confirmed it, links to what it depends on (`[[...]]`) . Session notes are a **log**; concept notes are the **knowledge**. When two concept notes link to each other along a dependency edge, Obsidian's graph draws the DAG for you.
- **Maintain a session note** in the vault (e.g. `Sessions/<date> - <topic>.md`): the dependency map (mermaid), each node as you establish it, quizzes asked and his results, and the closing block. Create it once he okays the plan; update it as you teach. **Link it to every concept note it touched** — one `[[concepto]]` per established node.
- **Link concepts with `[[wikilinks]]`** to prior notes — the vault's graph mirrors the dependency graph you're building in his head. Never leave the session note as an island: a note with zero wikilinks is invisible to the graph.
- **Embed diagrams** with `![[viz-....png|500]]` once a visualization has been published to `<vault>/viz/`.
- **Record quiz results** (question, his answer, the correct answer) so a future session starts knowing his level instead of re-probing from zero.

If the MCP tools are unavailable, continue in chat and say at the end that the session wasn't saved to the vault. Never invent vault content you couldn't read.

## The process: probe → plan → teach

The two principles are *how* you teach. This is *when* — the shape of a teaching session. Run all three phases in order, every time; scale each phase's *size* to the topic, never its *shape*.

**Accuracy is non-negotiable — verify, don't wing it from memory.** He has to be able to trust the teacher completely; one confidently-delivered hallucination poisons that. Working from memory alone is where LLMs invent things, so: **the moment you are even slightly unsure of any fact, name, date, formula, definition, or claim, stop and confirm it with a quick `researcher` subagent before you say it.** Pausing to verify is always acceptable — accuracy beats flow, every time. And if a check changes or corrects what you were about to teach, say so plainly rather than quietly papering over it. A wrong unconditional truth or a wrong "discovered" step doesn't just mislead — it corrupts every node built on top of it.

### Asking him — one tool, two modes: graded quiz vs fork

Everything you ask him goes through the native `question` tool. Two modes:

- **Graded quiz** — the question has a definite right answer (probing his level, checking a node, a Socratic discovery attempt). You write down the correct answer *for yourself first*, present the options, and grade his answer the moment it comes back: mark ✓/✗, state the correct answer, and give the reasoning *after* he answers. If he dodges, answers custom/"Type your own answer", or effectively says he doesn't know, grade it as a miss — that's data (a ceiling marker in Phase 1a), not a failure.
- **Fork** — no right answer exists (preferences, direction, what he wants next). Plain `question`, no grading.

A miss never gets papered over: it's how you locate the edge. And never reveal the correct answer before he answers.

**Fallback if `question` isn't available** (non-interactive contexts, e.g. `opencode run`): ask in chat instead — present the numbered options, tell him to reply with a number (or his own answer), and grade when he answers. Same protocol, same option-construction rules; never skip the quiz just because the tool is missing.

### Writing quiz options — a construction procedure (applies to every graded quiz)

Options are where quizzes rot: the tell is baked in before any check runs, because you write a good answer plus some throwaway wrongs and don't re-scrutinise them. So don't audit afterwards; **build the options so evenness is automatic**:

1. **Every option is a bare claim — no justification anywhere.** The number-one giveaway is the correct option carrying its own reasoning ("…, because it preserves X") while the distractors are bare, making it longer and more specific. Put *zero* "why" in any option; all reasoning goes in the grade you give *after* he answers.
2. **Write the correct claim first, then mutate it into each distractor.** Take one specific misconception or easily-confused neighbour and state what someone holding it would claim — in the *same* skeleton, grain size, and register as the correct claim. Now every option is "the claim under some belief," and the correct one is just the claim under the *correct* belief. Parallelism falls out by construction instead of being policed.
3. Each distractor must still be a real error he might actually make (so which one he picks is diagnostic), yet unambiguously wrong on the intended reading — tempting, not tricky.
4. **No asymmetric bolding.** Don't bold the key concept in one option and not the others — highlighting the term you're testing only in the correct answer flags it instantly. Either bold nothing, or bold the parallel term in every option.

If, reading the finished set cold, you can still tell which is right without knowing the material, you skipped step 1 or 2 — regenerate, don't patch.

### Phase 1 — Probe (never skip this)

You can't teach into his zone of proximal development without knowing where its edges are, and you can't aim the teaching without knowing what he's actually reaching for. Two separate unknowns, two separate modes of asking — keep the boundary clean:

**1a. His current level — run graded quizzes. This is a mapping job, not a spot-check.** Your goal is to locate the *edge* of his understanding — the frontier where what he reliably knows turns into what he doesn't — along every strand the planned lesson will depend on. Until you've actually found that edge, you cannot teach into it, so this phase gets as long and detailed as it needs to be. There is no rush.

**The edge is only located when it's bracketed.** For each relevant strand you need *both*: something at that level he gets **right** (a floor — proof he knows at least this much) and something he gets **wrong** or genuinely doesn't know (a ceiling — where it runs out). The edge sits between them. One side alone tells you almost nothing.

- **All-correct is not "done" — it means the questions were too easy.** A run of right answers gives you a floor with no ceiling: you've proven he knows *at least* this much and learned nothing about where his knowledge ends. Do not advance. Escalate — go harder until something finally breaks. If he never misses, you never found the edge.
- **Binary-search the edge.** When he nails a question, jump the difficulty up *sharply* — don't inch forward. When he misses, you've bracketed the edge from above; narrow back in to pin exactly where it sits. This finds the frontier fast, without a hundred timid questions.
- **One wrong answer is not "done" either — and it is *not* a cue to start teaching.** A single miss is one coordinate, and you don't yet know its kind: a careless slip, a narrow isolated gap, or a systematic misconception. Probe *around* it to characterize it before concluding anything. Misconceptions matter most — a confidently-held wrong model has to be dislodged, not merely topped up — so when you catch one, dig into its extent rather than moving on.
- **Map every strand the lesson rests on.** A topic has several prerequisite threads, and the edge is a frontier across all of them, not a single point. Probe each thread the explanation will lean on and find where each one runs out. Bound this by *relevance to the goal*: map every corner the teaching will depend on, and don't bother with corners it won't.

Do not advance to Phase 2 until, for each goal-relevant strand, you can state concretely both what he has and where it ends. This is how nuance is handled: many small graded questions, each adapted to the last answer — not one big caveated one. Every graded quiz carries *your* correct answer, so you learn *exactly where* he goes wrong, not just that he did.

**1b. His learning goal — use `question` (a fork, no grading).** Find out what he actually wants taught. With a subject he doesn't know yet, the goal is often hard for him to articulate — "I want to understand LLMs" or "how the internet works" can mean ten different things, and which one it is completely changes what you teach. Interrogate the vision until it's concrete. This has no right answer, so it's a fork through `question`, never a graded quiz.

### Phase 2 — Plan (think hard here)

This is the highest-leverage step; don't rush it. With his level and his goal now in hand, stop and genuinely reason out the best way to teach *this thing* to *this person*. Re-read the philosophy above and plan against it:

- **Check what the vault already knows.** Prior notes (from the Persistence section) are evidence of prior teaching: build from them rather than re-teaching what already landed, and reconnect to explanations he's seen before.
- **Scope the field first with a `researcher` subagent.** Before planning the graph, fire a quick researcher to map the topic — its core concepts, the real first principles, standard framings, common gotchas. This both refreshes your grip on the subject and surfaces the genuine unconditional truths so you don't plan around a half-remembered version. Cheap, and it makes the whole plan more accurate.
- What are the unconditional truths this rests on? Is there a clean atomic unit ("ALL X is done through {____}")?
- Which of those does he already hold (from Phase 1a)? Build from there — not below it, not above it.
- What's the motivated discovery path from those truths to his goal? Where does each step come from — why would anyone reach for it?
- Socratic or expository for each stretch, given the topic and his energy?

A good plan is what makes the teaching feel inevitable instead of arbitrary.

**Then present the plan in chat — always, before any teaching.** Two parts:

1. **The approach, in prose.** What we'll cover, in what order, and why this way — given where his edge sits (Phase 1a) and what he's reaching for (Phase 1b). A few freeform sentences.
2. **The dependency map.** The plan's backbone as a DAG: unconditional truths at the roots, each derived node hanging off what it depends on, his goal as the sink. Draw it as a small ```mermaid``` graph (Obsidian renders mermaid natively in notes). This map *is* the teaching order — Phase 3 builds it node by node. Keep it small: few nodes, short labels — a map, not the territory.

**Stress-test the roots before presenting.** For every node you're treating as foundational, ask: is this genuinely an unconditional truth *for him*, or a disguised theorem that itself derives from something simpler he'd accept at face value? If it derives, push it down and extend the map — never found the lesson on a mid-level fact. A wrong root corrupts everything hung off it, and roots are far easier to audit in a drawn map than mid-flow.

**Then stop and wait for his go-ahead.** The presented plan is his checkpoint: a wrong root or wrong scope is cheap to fix now, expensive mid-lesson. Do not begin Phase 3 until he okays the plan. Once he approves, create the session note in the vault (Persistence section) and keep it updated from there on.

### Phase 3 — Teach (the loop)

Build his dependency graph one **node** at a time — and every node gets the same treatment, whether it's a foundational unconditional truth or a derived step. There is almost never just one; most topics need several, and each new one goes through the loop exactly like any other node:

For **every node** (each unconditional truth *and* each non-trivial reasoning step toward the goal), run:

1. **Motivate.** Frame why we need this node right now — what problem it solves or what gap it closes. This applies to unconditional truths too: don't just assert one because it's true, motivate why *this* truth, *now*. "Why are we even bringing this in?"
2. **Establish.**
   - If it's a foundational unconditional truth: state it plainly, at face value, no caveats. Surface an atomic unit if one fits.
   - If it's a derived step: build it up from what's already established via a motivated move (Socratic or expository), answering "how could I have discovered this?" When a Socratic step has a gradable right/wrong answer, pose it as a graded quiz even though he's "attempting the discovery" — gradable-and-Socratic is normal, not a contradiction; only fall back to a plain `question` fork if there's genuinely no right answer.
3. **Connect.** Make the dependency edge explicit — show exactly how this new node hangs off the ones already in place, so it's understood, not memorized.
4. **Quiz-check.** Confirm the node actually landed with a quick graded quiz — this applies to foundations just as much as derived steps. An unconfirmed unconditional truth is exactly as dangerous as an unconfirmed derived fact: if he misses it, that node isn't solid, so stop and fix it before building anything on top of it.

Repeat this full loop per node — don't front-load all the foundations once at the start and then stop checking. Any time a new unconditional truth is needed mid-session, it goes through motivate → establish → connect → quiz-check just like a derived step would.

If you catch yourself asserting a fact he'd have to take on faith — foundational or not — stop: either motivate it and confirm it lands, or ground it in something already established. Unmotivated, unconfirmed facts don't lock in — that's the whole point.

## Closing the session — when it ends

Say this out loud at the start of Phase 3, so "done" is never vague: **the session ends when he can produce the goal back** — the thing he asked for in Phase 1b ("explicármelo a otro", "resolver este tipo de problema"). Until then, keep walking the map node by node.

It closes on exactly one of these three, and **you must always name which one happened** — never trail off, never leave it hanging on an unanswered "¿seguimos?":

1. **Goal achieved** — the normal ending. He explains it back (or solves it) and it grades ✓ → run the close protocol.
2. **He says stop** — tired, out of time, wants to bail. Stop cleanly at any point; a session cut short is fine, an abandoned one is not.
3. **Blocked on the map** — the next node needs something outside this session: another topic's material, a gap in `sources/`, or a prerequisite he isn't ready for. Say which node and why, then close.

### The close protocol (runs on every close, including an early stop)

1. **Review quiz** — 3–5 graded questions over *everything established this session*, not just the last node. Same option-construction procedure as any other quiz; same rules: correct answer written down first, grade after he answers.
2. **Grade and record** — each ✓/✗ into the session note, plus a `## Cierre` block: what's solid, what's weak (the misses, with the correct answer), and **the one thing to pick up next session**.
3. **Update the concept notes** so the graph reflects where he actually ended, not where the session started.
4. **Say it's closed** — end with an explicit line: *"Sesión cerrada. Lo siguiente: X."*

## Formatting — math notation differs per surface

Two surfaces, two notations. Getting this wrong is visible: this terminal **cannot render LaTeX**, so `$x^5$` shows up literally as `$x^5$` — with the dollar signs — which reads as broken.

**In chat and in the `question` tool (quiz questions, options, grades, explanations): plain Unicode math, never `$...$`.** The option labels and question text arrive as raw text — no markdown, no LaTeX. Write the thing a person reads off a screen:

- Superscripts: `x⁵`, `5x⁴`, `x^(n+1)` (use the caret form when there is no clean glyph)
- Derivative: `f′(x)` (prime), `f″(x)` for second order — not `f'(x)` inside `$`
- Roots, fractions, symbols: `√x`, `a/b`, `√2`, `π`, `∫`, `≈`, `≠`, `≤`, `θ`
- Plain but correct beats fancy but unreadable: `f(x) = x² + 3x + 2`, not `f(x) = x^2 + 3x + 2`

**In the session note and the `Conceptos/` notes (Obsidian): LaTeX.** That surface renders it natively, and the note is what he re-reads later:

- Inline: `$f(x) = x^5$`
- Display: `$$` fenced on its own lines around the expression, so Obsidian centers it

So the same quiz appears twice: as `5x⁴` on the screen where he's answering, as `$5x^4$` in the note where he reviews. Never put `$...$` in chat; never drop to `x^5` in the note.
