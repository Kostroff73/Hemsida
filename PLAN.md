# PLAN.md – Beställningssida (order.wikhamn.se)

Körbar plan för Claude Code eller Codex. Bocka av steg (`[x]`) allteftersom. Läs `AGENTS.md` och `DESIGN.md` först. Fråga inte om sådant som redan är beslutat här.

## Mål

En beställningssida på `www.wikhamn.se/bestall/` i exakt samma design som huvudsidan, med:

1. Direktköp från tryckeriet (Publit, print on demand) som primär köpväg.
2. Återförsäljarlänkar (Bokus, Adlibris, Amazon.se, Amazon.com, Bokon) som sekundär köpväg.
3. Gemensam meny som växlar mellan flikarna: Hem (`/`), Beställ (`/bestall/`), Store (`https://store.wikhamn.se`).
4. `order.wikhamn.se` pekar dit via redirect.

Beslutat: undersida i detta repo (inte separat subdomän-repo) – GitHub Pages tillåter en custom domain per repo, och undersidan delar `style.css`/`script.js`/`assets/` direkt.

## Blockerande input (krävs från Björn innan steg 3)

- [x] Publit-integration (webshop-id 5640). Slutlig lösning: **ingen inbäddad widget alls** – Publits iframe-widgets interna textfärger (pris, antal, +/-) går inte att styra (temat stöder bara bakgrund + köpknapp, och CSS-filter på iframen visade sig opålitligt). I stället har korten (`.publit-card`) helt egen markup i sajtens design: omslag (`assets/paradox-cover-sm.jpg`, `assets/paradox-society-cover.jpg`, hämtade från Publits butik), boktitel, språk/format, antal-väljare (`.qty-btn`/`.qty-num`, logik i `script.js`) och guldknapp som länkar direkt till Publits kassa: `https://webshop.publit.com/webshop/5640/checkout?isbn=<ISBN>&amount=<N>` (sv 9789153147947, en 9789199057118; e-bok 9789199057101 säljs ej här – hänvisas till Adlibris/Bokon). Priset visas i `.publit-price` på korten – **manuellt ifyllt** (175 kr, beslut av Björn 2026-07-19 eftersom live-hämtning inte är möjlig; uppdateras för hand om priset ändras hos Publit). Köpflödet verifierat: länken lägger rätt bok/antal i kundvagnen.
- [x] DNS hanteras av Cloudflare → redirect via Redirect Rule (se steg 8).

## Steg

- [x] **1. Skapa `bestall/index.html`.** Kopiera `<head>`-mönstret från `index.html` (charset, viewport, fonts-länkar, Umami-script). Sökvägar med `../` (`../style.css`, `../script.js`, `../assets/…`). Egen `<title>` ("Beställ Paradoxsamhället | Björn Wikhamn"), meta description, `canonical` = `https://www.wikhamn.se/bestall/`, egna `og:*`/`twitter:*` med `og:url` till nya sidan.

- [x] **2. Nav på nya sidan.** Samma `.nav`-markup som huvudsidan men: `Hem` → `/`, `Beställ` → `/bestall/` (markerad aktiv – klass `.active` med guldunderstrykning), `Store` → `https://store.wikhamn.se`, övriga länkar → `/#boken`, `/#forelasningar`, `/#kontakt`.

- [x] **3. Sidinnehåll** (uppifrån och ned, enligt sidanatomin i DESIGN.md):
  - Kompakt hero med brödsmula (Hem › Beställ).
  - "Köp direkt"-sektion: två `.publit-card` (Svenska/English) med omslag, titel, språk/format, antal-väljare och Köp-knapp → Publits kassa (se Publit-integration ovan). E-boksnot + länk till produktsidorna hos Publit under korten.
  - Återförsäljargrid: "✦ Återförsäljare" – `.store-col`-mönstret med Bokus/Adlibris/Amazon/Bokon per utgåva.
  - Mini-FAQ (utgåvor, print on demand, Wikhamn Store).
  - Samma footer som huvudsidan.

- [x] **4. CSS.** Blocket `/* BESTALL PAGE */` sist i `style.css`. Återanvänder befintliga klasser; sidspecifikt: `.publit-grid`, `.publit-card`, `.publit-cover`, `.publit-buy`, `.qty-*`, `.publit-fallback`.

- [x] **5. Uppdatera `index.html`:** meny (`Beställ` → `/bestall/`, ny `Store`-länk), `#store`-sektionen bantad till teaser med CTA-knappar, FAQ-svar + JSON-LD (`FAQPage`, `Book.offers` inkl. Publit) synkade.

- [x] **6. SEO-filer.** `https://www.wikhamn.se/bestall/` tillagd i `sitemap.xml`.

- [x] **7. Verifiera lokalt.** Verifierat 2026-07-19: båda sidorna renderar, navigering fungerar (desktop + mobilmeny), antal-väljaren uppdaterar checkout-länken, kassan hos Publit får rätt bok/antal, inga konsolfel, ingen horisontell overflow på mobil.

- [ ] **8. Redirect `order.wikhamn.se` (görs av Björn i Cloudflare-dashboarden):**
  1. Välj zonen `wikhamn.se` → **DNS** → *Add record*: Typ `AAAA`, Namn `order`, IPv6-adress `100::`, Proxy **på** (orange moln). (Placeholder-adress – Cloudflare-proxyn svarar, trafiken når aldrig adressen.)
  2. **Rules → Redirect Rules** → *Create rule*: namn t.ex. "order → bestall". When: *Hostname equals* `order.wikhamn.se`. Then: *Static redirect* till `https://www.wikhamn.se/bestall/`, statuskod **301**, *Preserve query string* av.
  3. Testa `https://order.wikhamn.se` i webbläsaren → ska landa på beställningssidan.

- [x] **9. Dokumentation.** `README.md` uppdaterad med `bestall/` i strukturen. Designprinciper för Publit-köp dokumenterade i `DESIGN.md`. När steg 8 är klart och sidan är pushad/verifierad i produktion kan PLAN.md tas bort.

## Avgränsningar

- Ingen egen kassa/betalning byggs – köp sker hos Publit respektive återförsäljarna.
- store.wikhamn.se ändras inte härifrån (separat plattform); vi länkar bara dit.
- Inga nya beroenden – Publit-integrationen är rena länkar, ingen extern JS.
