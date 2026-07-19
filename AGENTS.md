# AGENTS.md – Hemsida

Kanoniska instruktioner för alla kodagenter (Claude Code, Codex m.fl.) i detta repo. Kompletterar ev. gemensamma regler i [../AGENTS.md](../AGENTS.md).

**Läs vid behov (spara tokens – läs bara det som är relevant för uppgiften):**

- `DESIGN.md` – designsystem (färger, typografi, klasser, sidanatomi). Obligatorisk före visuellt arbete.
- `PLAN.md` – pågående arbete: beställningssidan `/bestall/`. Följ och bocka av stegen där.
- `README.md` – struktur, driftsättning, SEO-översikt.

## Projektmål

Hålla wikhamn.se korrekt, snabb och SEO-optimerad som marknadsföringssida för boken *Paradoxsamhället* och Björn Wikhamns föreläsningsverksamhet. Systersajter: `store.wikhamn.se` (merch, separat plattform – ändras inte härifrån), `order.wikhamn.se` (redirect till `/bestall/`).

## Teknikstack

Ren HTML/CSS/JS. Inga ramverk, byggsteg, paket eller CDN-beroenden utan uttrycklig efterfrågan. (Undantag: Google Fonts, Umami-statistik och Publit-widgeten är godkända.)

## Konventioner

- **Sidor**: `index.html` i roten är huvudsidan (sektioner via ankarlänkar). Nya sidor läggs som mapp med egen `index.html` (t.ex. `bestall/`) och delar `style.css`, `script.js` och `assets/` via relativa sökvägar. Varje sida har samma `.nav` med länkar mellan flikarna Hem / Beställ / Store.
- **CSS**: allt i `style.css`, ett kommenterat block per sektion/sida (t.ex. `/* STORE SECTION */`). Inga fler CSS-filer.
- **JS**: allt i `script.js`, händelsestyrt via `DOMContentLoaded`, små fokuserade block med null-checks (delas av alla sidor).
- **Bilder**: läggs i `assets/`, optimera filstorlek före commit.
- **SEO – håll i synk med synligt innehåll**:
  - Bokinfo (titel, ISBN, återförsäljare) ändras → uppdatera även JSON-LD `Book` i `index.html`.
  - FAQ-innehåll ändras → uppdatera JSON-LD `FAQPage`.
  - Ny sida med egen URL → uppdatera `sitemap.xml`.
  - Varje sida har egen `<title>`, meta description, `canonical` och `og:*`/`twitter:*`.

## Rör inte utan avsikt

- `CNAME` styr GitHub Pages-domänen (`www.wikhamn.se`).
- JSON-LD-blocken i `index.html` används för SEO/AI-sökbarhet.
- `sitemap.xml`/`robots.txt` ska spegla faktiskt innehåll.

## Test och driftsättning

Lokal server: `npx serve -l 3456 .` → `http://localhost:3456`. Push till `main` publicerar direkt via GitHub Pages – ingen staging, ingen CI. Testa alltid lokalt först (desktop + mobilbredd, inga konsolfel).

## Dokumentation

Uppdatera `README.md` vid struktur-/driftändringar och denna fil vid konventionsändringar. Känd brist: `index.html` refererar `assets/favicon.png` som saknas.
