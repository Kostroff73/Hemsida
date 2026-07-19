# DESIGN.md – Designsystem för wikhamn.se

Läs denna fil innan visuellt arbete (HTML/CSS). Allt definieras i `style.css`. Använd alltid CSS-variablerna nedan – hårdkoda aldrig färgvärden.

## Färger (`:root` i style.css)

| Variabel | Värde | Användning |
|---|---|---|
| `--bg` | `#0D1726` | Sidbakgrund (mörk marinblå) |
| `--bg-2` | `#13233B` | Paneler, kort |
| `--bg-3` | `#1D3454` | Ljusare paneler, hover |
| `--cream` | `#E9EFF6` | Brödtext, rubriker |
| `--cream-2` | `#F1ECDE` | Ljus sektion (Om Björn) |
| `--muted` | `#B8C7D9` | Sekundär text, meny |
| `--gold` | `#F2A11C` | Accent, CTA, markeringar |
| `--amber` | `#E78A2A` | Sekundär accent |
| `--yellow` | `#FFC83D` | Gradienter, shimmer |
| `--line` | `rgba(233,239,246,.13)` | Kantlinjer, avdelare |

## Typografi

- `--serif` Cormorant Garamond → alla `h1–h3`, `.brand`. Kursiv guld-variant: `<span class="it">`.
- `--sans` Inter → brödtext (18px, line-height 1.62), knappar, meny.
- `--display` Playfair Display → sparsamt, dekorativt.
- Typsnitten laddas från Google Fonts i `<head>` – samma `<link>`-rad på varje sida.

## Sidanatomi

Varje sektion följer detta mönster (kopiera från befintlig sektion i `index.html`):

```html
<section id="namn" class="namn">
  <div class="mouse-glow"></div>
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="sec-title-area">
        <div class="sec-tag">✦ Etikett</div>
        <h2>Rubrik <span class="it paradox-effect">betonat ord</span></h2>
      </div>
      <div class="copy copy-reveal"><p>Ingress…</p></div>
    </div>
    <!-- innehåll -->
  </div>
</section>
```

## Återanvändbara klasser

- `.wrap` – max-bredd 1240px, padding 0 40px. All layout ligger i en wrap.
- `.btn btn-gold` (primär CTA, guldgradient) / `.btn btn-ghost` (sekundär, kantlinje). Pil: `<span class="ar">↗</span>`.
- `.sec-tag` – sektionsetikett `✦ Ord` i guld versaler.
- `.reveal` – scroll-in-animation; stagga med inline `style="transition-delay: 0.1s"` (steg om 0.05s).
- `.paradox-effect` / `.it` – guldskimrande textbetoning i rubriker; `.action-emphasis` i brödtext.
- Kortmönster: `.aud-card` (numrerade kort), `.lcard` (temakort), `.scard` (länkkort), `.store-col`/`.store-links` (köplänkar per utgåva).

## Effekter (script.js – fungerar automatiskt)

- Scroll-reveal: IntersectionObserver på alla `.reveal`.
- Tilt/glow: registreras i `effectConfigs`-listan; kräver `<div class="mouse-glow">` först i sektionen. Körs bara på enheter med mus.
- Partiklar: guldpartiklar i `.hero` och `.marq`.
- Global grain-overlay via `body::after`.

Alla funktioner null-checkar sina element – script.js kan delas av flera sidor utan ändring. Ny sektion med tilt: lägg till en rad i `effectConfigs`.

## CSS-konventioner

- Nya regler läggs i `style.css` under ett kommenterat block per sektion, t.ex. `/* STORE SECTION */`. Ny sida/sektion = nytt block i samma stil.
- Inga preprocessorer, ramverk eller extra CSS-filer.
- Responsivitet: befintliga breakpoints i slutet av style.css; mobilmeny via `.nav-burger` + `body.nav-open`.

## Gör / gör inte

- ✅ Återanvänd befintliga klasser före nya. Kopiera en liknande sektion och anpassa.
- ✅ Mörk botten, guld som accent, generös luft, serif-rubriker med ett kursivt guldord.
- ❌ Inga nya färger, typsnitt, ikonbibliotek eller ramverk.
- ❌ Ingen text i versaler utom `.sec-tag`/`.eyebrow`-mönstret.
- ❌ Bädda inte in Publits iframe-widget – dess interna färger går inte att styra och den bryter designen. Köp sker via direktlänk till Publits kassa (`checkout?isbn=<ISBN>&amount=<N>`), med egen antal-väljare i sajtens stil (se `.publit-card` på bestall-sidan).
- ⚠️ Bokpriserna på bestall-sidan (`.publit-price`) är manuellt ifyllda (går inte att hämta live från Publit). Ändras priset hos Publit måste det uppdateras här också – inga priser någon annanstans i sidtext/rubriker.
