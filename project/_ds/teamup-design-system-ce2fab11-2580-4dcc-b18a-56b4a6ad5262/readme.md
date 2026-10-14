# TeamUp Design System

**TeamUp** (legal entity *Rhematch SAPI*, Monterrey, MX) is an **AI‑native agency for skill‑based recruitment** serving Mexico, LATAM and the US. It is two things at once, and the design system has to serve both:

1. **A recruitment agency** — operational, IT, specialised and executive hiring for high‑attrition industries (manufacturing, logistics, retail, healthcare, security, transport, energy, hospitality).
2. **A SaaS ATS platform** (`app.teamup.mx`) — AI screening, skill identification, Kanban pipeline, scorecards, digital offer letters, talent bank, plus paid "Boost" social‑media job advertising.

Positioning line used across all material: **"Empowering the Workforce of Tomorrow."** Spanish‑market tagline: *"Tu agencia de reclutamiento y headhunting en México."*

The consulting arm ships under a second, closely‑related brand, **Rhematch** (org design, change management, culture, comp & benefits, DEI). Rhematch shares TeamUp's type and colour language; it is not a separate visual identity.

---

## Sources this system was built from

| Source | What was taken from it |
| --- | --- |
| `https://www.teamup.mx/` (live marketing site, es‑MX with EN toggle) | Full IA, navigation, section copy, product naming, pricing, tone of voice. **Only the rendered copy was machine‑readable — the site's compiled CSS could not be fetched**, so numeric values below come from the deck/app sources rather than the site stylesheet. |
| `uploads/TeamUp Pitch Deck 2026 — Hub de Innovación y Emprendimiento.pdf` (11 slides) | Exact brand hexes (pixel‑sampled), slide layout system, highlighter‑pen motif, photography treatment, stat typography, team/logo‑wall layouts. |
| `uploads/One Pager TeamUp 2026.pdf` | Outlined‑pill callouts, service‑block cards, product taxonomy (Recruiting / Reskilling / HR as a Service). |
| `uploads/Rhematch Service Catalog 2026.pdf` (16 pages) | Consulting service lines, pricing structure, Spanish copy conventions, `▸` bullet convention. |
| `uploads/TeamUp — Propuesta Diseño Organizacional para CCE v3.pdf` | Proposal document conventions. |
| `uploads/TeamUp 2026 Dark/White/Isotipo.png` | Master logo files → `assets/logo/`. |
| `uploads/Outfit-*.ttf` (9 weights) | The complete typeface → `assets/fonts/`. |
| Pitch deck embedded raster assets | Mascot sheet → `assets/mascot/`, product screenshot → `assets/imagery/app-candidatos.png`, B&W photography → `assets/imagery/`. |

Not provided, and therefore **not** reconstructed: the marketing site's source repository, a Figma library, the app's component code, the icon set's source files. See *Caveats* at the bottom.

---

## Products & surfaces

| Surface | URL | Notes |
| --- | --- | --- |
| Marketing site | `teamup.mx` | Spanish‑first, EN toggle. Service pages, sector pages, city pages, platform pages, pricing, Boost, job board, contact. Recreated in `ui_kits/website/`. |
| ATS web app | `app.teamup.mx` | Vacancy list, candidate list + detail with AI Score, Deep Insights, Kanban pipeline. Recreated in `ui_kits/app/`. |
| Pitch / sales decks | — | 16:9, white ground. Recreated in `slides/`. |
| Consulting collateral (Rhematch) | — | Same type + colour, denser, Spanish, price‑range driven. |

---

## CONTENT FUNDAMENTALS

### Language
**Spanish (Mexico) is the primary language**; English is the investor/US‑market language. Never mix the two inside a sentence — except for the small set of terms the brand deliberately keeps in English: *AI Score, Deep Insights, Boost, Scorecards, Pipeline Kanban, screening, sourcing, nearshoring, shortlist, headhunting, SaaS, upskilling, reskilling*. In English material the same concepts stay English; Spanish product names (*Carta Oferta Digital*, *Banco de Talento*) stay Spanish.

### Person & stance
- **"Nosotros" for TeamUp, "tú" for the client.** Informal *tú*, never *usted*. — *"Cuéntanos qué posiciones necesitas cubrir."*
- Headlines are addressed to the client's operation, not to TeamUp's cleverness: *"Una agencia de reclutamiento hecha para operaciones reales."*
- The brand consistently positions AI as an amplifier of people, never a replacement — this is a stated value, and copy must not violate it: *"No sustituimos reclutadores con IA: los potenciamos."*

### Sentence shape
Short declaratives, often **fragments used as a rhythm device** — three beats, then a payoff:
> *"Menos ruido. Más control. Mejores decisiones."*
> *"Sin contrato, sin sorpresas."*
> *"Sin sesgo, sin tiempo perdido."*

Concrete over abstract. Where a generic SaaS would say "streamline your hiring", TeamUp says *"Del piso de planta a la dirección general"* — naming the actual shop floor.

### Numbers are the argument
Every section earns its place with a measurable claim, always specific and always paired with a one‑line unit label underneath: **80%** *menos tiempo de revisión de CVs*; **5 días** *Velocidad de cobertura*; **4 min** *Candidate analysis*; **3.2x** *Better Attraction*; **68%** *90 Days Retention Rate*. Never round a real figure to a marketing figure, and never show a number without its label.

### Casing
- **Sentence case for everything** — headlines, buttons, card titles, nav. *"Agenda una llamada"*, not *"Agenda Una Llamada"*.
- ALL CAPS only for micro‑labels inside the product (table column heads: `CANDIDATO`, `ESTADO`, `SCORE`) and deck section labels (`PATRONES DETECTADOS`), always at 11–12px with `--ls-caps` tracking.
- Product feature names keep their own capitalisation: *Deep Insights*, *AI Score*, *Boost Pro*.

### Calls to action
Verb‑first, low‑pressure, and specific about what happens next: *"Agenda una llamada"*, *"Conocer el servicio →"*, *"Ver cómo funciona →"*, *"Inicia gratis 14 días"*, *"Contáctanos"*. A trailing `→` marks a *navigational* link; a plain label marks a *committing* action. Reassurance text always sits directly under a CTA cluster, separated by `·`: *"Consulta inicial gratuita · Garantía de reemplazo · Cobertura en todo México"*.

### Emoji
**Never.** Not in the site, not in the deck, not in the app. Warmth comes from the mascot and the colour, not from emoji.

### Bullets
- Site & app: plain `•`‑less lists with an icon or a check.
- Deck: filled round bullet `●`.
- Rhematch consulting documents: the triangular `▸` marker, at one indent level only.

### Vibe, in one line
**Confident operator, not hype merchant.** It sounds like a competent ops person who has done this 500 times, has the numbers, and does not need to shout — with one streak of playfulness (the highlighter pen, the dog) that keeps it from reading as enterprise‑grey.

---

## VISUAL FOUNDATIONS

### Colour
Three brand hues, pixel‑sampled from the master files, carry the whole system:

| Role | Hex | Where it appears |
| --- | --- | --- |
| **Cyan** | `#00ADD9` | Headline accent, data bars, AI score ring, links, "tech" half of any two‑colour phrase |
| **Violet** | `#8400FF` | Everything AI‑branded — *Evaluar con IA*, *Deep Insights*, sparkle affordances |
| **Navy** | `#00008B` | Headings, body emphasis, primary buttons, the "trust" ground |
| Pure blue | `#0000FF` | Reserved for big statistic figures in decks |
| Ink | `#050505` | The wordmark; deck body text on white |

The **logo gradient** — `#25D2D1 → #6B48FF → #3D2CFD` at 135° — is the only gradient in the system. It appears in the isotipo, in team‑portrait diamond frames, and (sparingly) as a gradient text fill on a short display phrase. **Do not invent new gradients**, and never use a gradient as a page background.

Neutrals are cool and slightly blue‑shifted (`--tu-grey-*`). Backgrounds are **white by default**; `--tu-grey-50` is the only alternate section ground. Maximum two background colours per deck or page.

### The highlighter‑pen motif
The single most recognisable TeamUp device: a key phrase set on a **pure, saturated, unmodified** colour block — `#00FFFF`, `#FF00FF`, `#EEFF41`, `#0000FF`, `#8400FF` — with no radius, no padding beyond ~0.18em, text in near‑black or white. Used on deck slides to mark the service vocabulary (*Social Media Recruitment · Multiposting Ads · Upskilling & Reskilling · Succession plan · Career path · Organizational Design*) and to spotlight one phrase inside a sentence. Utility class `.tu-marker` (+ `--magenta/--lime/--blue/--violet`). Use **at most one per headline**; a whole row of them is a deliberate "menu of services" layout, not emphasis.

### Typography
**Outfit, and only Outfit**, in all nine weights. It is a geometric sans with a circular `o` and a single‑storey `a` — the shape rhymes with the diamond isotipo.

- Display / slide titles: 700–800, `-0.03em` tracking, line‑height 1.05–1.18.
- Headings: 700, `-0.018em`.
- Body: 400, line‑height 1.65, `#343C48` on white.
- Stat figures: 700–800, 76–96px, tight; always a 14–18px regular‑weight label directly beneath.
- Micro‑labels: 11–12px, 600, `+0.08em`, uppercase.
- **Bold‑inside‑a‑sentence is a core device**: half a headline in regular, half in bold, often with the bold half in a second colour — *"**Skill Based Recruitment** for the **US & LATAM Workforce of Tomorrow**"*.

### Spacing & layout
4px grid. Marketing sections breathe at 96–112px vertical; cards pad at 24–32px; the content container caps at 1200px with 24px gutters. The product app is tighter: 16–20px card padding, 12px list‑row gaps.

Layouts are **left‑aligned and asymmetric** on marketing and deck pages (headline left, artwork right), centred only for hero and closing/CTA moments. The deck uses a recurring **split slide**: full‑bleed B&W photo on the left third, white content field on the right.

### Backgrounds & imagery
- **Photography is desaturated to black‑and‑white**, always real working environments (plant floors, warehouses, offices) with real people — never stock "business handshake" imagery, never illustration‑style people.
- Full‑bleed photo slides carry a dark overlay (`--overlay-photo`) and reversed white text; text never sits on unprotected photo.
- No repeating patterns, no textures, no grain, no noise overlays.
- Large flat vector shapes appear only as data graphics (the nested TAM/SAM/SOM circles, the funding bar) and as the flat blue LATAM map on the one‑pager.
- **Product screenshots are a first‑class image type** — shown inside a macOS‑style browser chrome with traffic lights and a URL pill, at a slight drop shadow, never tilted or 3D‑perspectived.

### Cards
White fill, `1px` `--tu-grey-200` hairline border, `12–16px` radius, `--shadow-sm`. Featured/selected cards swap the hairline for a `2px` brand border (deck pricing table uses a green `2px`; product uses navy or cyan) and add a small pill label above the title. A second card style, taken from the one‑pager, is **borderless‑fill‑free**: a `2px` navy or violet outline at `16–20px` radius with no shadow at all — used for callouts and stat pills. Never a coloured left‑border‑only card.

### Buttons & controls
- **Primary**: navy `#00008B` fill, white text, `8px` radius, 40–48px tall, 600 weight.
- **Secondary**: white fill, `1px` `--tu-grey-300` border, navy text.
- **AI action**: violet `#8400FF` text on `--tu-violet-50` fill with a `1px` violet‑200 border and a sparkle icon (as in *Evaluar con IA*).
- **Ghost / nav**: text only, grey‑600 → navy on hover.
- **Hover**: solid buttons darken one ramp step (navy‑600 → navy‑700); tinted buttons deepen their tint; links move cyan‑600 → navy‑600; **no opacity fades on interactive elements**.
- **Press**: `scale(.985)` plus one more ramp step down. No shadow change.
- **Focus**: `2px` cyan `#00ADD9` outline at `2px` offset — never removed.
- **Disabled**: grey‑100 fill, grey‑400 text, no border change, `cursor:not-allowed`. Never below 44px tall on mobile.

### Chips & status
Fully rounded pills, 11–13px, 500–600 weight, tinted background + matching darker text: `Nuevo` cyan, `En proceso` amber, `Contratado` green, `BETA` violet. Borders on chips are optional and hairline‑only.

### Animation
Understated. `140ms` for control states, `220ms` for cards and reveals, `cubic-bezier(.4,0,.2,1)` as the default and `cubic-bezier(.16,1,.3,1)` for entrances. Cards lift `-3px` on hover with a shadow step. Scroll reveals are a 12px rise + fade, once. Progress/score bars animate their width in on first view and numbers count up from 0 (the site does this on the results section — `0días`, `0x`, `0%` are the pre‑animation states). **No bounce, no spring, no parallax, no looping background motion.**

### Transparency & blur
Used in exactly two places: the sticky site header (`--glass-bg` + `12px` backdrop blur once scrolled) and the photo protection gradients. Never on cards, never on buttons.

### Borders & dividers
`1px` `--tu-grey-200` is the workhorse. `1.5px` for inputs at rest in the app. `2px` for the outlined callout cards and selected states. Dividers inside cards are `1px` grey‑100 and run full‑bleed to the card edge.

### Shadows
Four steps only (`xs → xl`), all neutral‑black and low‑alpha — never coloured, with two exceptions: `--shadow-ai` (violet) under an AI affordance and `--shadow-cyan` under the score ring. No inner shadows anywhere.

### Radii at a glance
Inputs & buttons `8px` · cards `12px` · large cards & media `16px` · callout outlines `20px` · chips, avatars and pills fully round · nothing is ever a perfect square except the diamond isotipo, which is a **square rotated 45°** and must never be re‑cut as a rhombus or given a radius.

---

## ICONOGRAPHY

**No icon source files were supplied.** The live site and app are a React/Vite build whose icons are inlined into the bundle, which was not fetchable. What can be observed from the product screenshot (`assets/imagery/app-candidatos.png`) and the site markup:

- The set is a **thin, rounded, 2px‑stroke outline family on a 24px grid** — magnifier, chevrons, check‑in‑circle, sparkle/AI glyph, brain, arrow‑right, kanban columns. That description matches **Lucide** exactly, which is also the default icon set of the stack the site is built on.
- **Substitution flagged:** this system links **Lucide** from CDN (`https://unpkg.com/lucide@0.469.0/dist/umd/lucide.js`) as the stand‑in set. It is a very close match, but it is a substitution — please confirm or send the real icon source.
- **Stroke width `2`, `round` caps and joins, `currentColor`, 16/20/24px sizes.** Icons inherit text colour; the only coloured icons are the violet AI sparkle and cyan status glyphs.
- **Arrows in copy are typographic, not icons**: the `→` in *"Conocer el servicio →"* is the literal character, set in Outfit. Keep it that way.
- **Bullets `●` (deck) and `▸` (Rhematch documents) are typographic too.**
- **Emoji are never used as icons.** No emoji anywhere in the brand.
- **The mascot is not an icon.** *Rhema*, the navy‑and‑white border collie in a cyan bandana, is a spot illustration used at ~120–220px in decks and one‑pagers, bottom‑right of a layout, overlapping its container edge. Four supplied poses live in `assets/mascot/`. Never shrink it to icon size and never use it inside the product UI.

---

## Intentional additions

The sources define no formal component library, so the primitive set here is authored from what the site and app actually render. Two additions are genuinely new and flagged as such:

- **`Icon`** — a thin wrapper over Lucide so consumers get consistent sizing/stroke without touching the CDN API.
- **`MarkerText`** — codifies the highlighter‑pen motif that appears throughout the deck but has no named counterpart in any source.

---

## Index

**Foundations**
- `styles.css` — the single entry point consumers link. Imports only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `base.css`
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)

**Assets**
- `assets/logo/` — `teamup-logo-dark.png` (wordmark on light), `teamup-logo-white.png` (on dark), `teamup-isotipo.png` (gradient diamond)
- `assets/fonts/` — Outfit, 9 weights
- `assets/mascot/` — `mascot-sit`, `mascot-wave`, `mascot-check`, `mascot-run` (transparent PNG)
- `assets/imagery/` — `app-candidatos.png` (product screenshot), `photo-manufactura-bw.png`, `photo-oficina-bw.png`

**Components** (`components/`)
- `core/` — `Button`, `Icon`, `Logo`, `MarkerText`
- `data/` — `Badge`, `StatBlock`, `ScoreRing`, `MeterBar`
- `surfaces/` — `Card`, `CalloutCard`, `PricingCard`, `SectionHeading`
- `forms/` — `Input`, `Textarea`, `Select`, `Checkbox`
- `navigation/` — `NavBar`, `Footer`, `Tabs`

**UI kits** (`ui_kits/`)
- `website/` — teamup.mx marketing recreation: `index.html`, `SiteChrome.jsx`, `HomeScreen.jsx`, `PricingScreen.jsx`, `ServiceScreen.jsx`
- `app/` — app.teamup.mx ATS recreation: `index.html`, `AppShell.jsx`, `CandidatesScreen.jsx`, `PipelineScreen.jsx`, `data.js`

**Slides** (`slides/`) — `title`, `stat-photo`, `service-menu`, `comparison`, `pricing-table`, `team`, `closing` (+ `slide.css`)

**Templates** (`templates/`) — `pitch-deck/PitchDeck.dc.html`, a five-slide 1280×720 deck consuming projects can start from

**Other**
- `SKILL.md` — Agent Skills wrapper so this folder works inside Claude Code
- `thumbnail.html` — homepage tile

---

## Caveats

1. **The marketing site's compiled CSS was not machine‑readable.** All numeric values (radii, shadows, exact greys) are inferred from the deck, one‑pager and the high‑resolution product screenshot, plus the site's rendered copy structure. If you can share the site repo or a Figma file, these should be replaced with real values.
2. **Icons are a flagged substitution** (Lucide) — see ICONOGRAPHY.
3. **No English copy deck was supplied for the site**, so the website UI kit is in Spanish, matching the live default.
