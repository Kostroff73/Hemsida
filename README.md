# Hemsida

Statisk webbplats för Björn Wikhamn – professor i management och organisation vid Handelshögskolan, Göteborgs universitet – och hans bok **Paradoxsamhället**. Sajten presenterar boken, författaren, föreläsningar, omdömen och kontaktvägar, samt länkar vidare till återförsäljare (Adlibris, Bokus, Amazon.se).

Live: https://www.wikhamn.se/

## Syfte

- Marknadsföra boken *Paradoxsamhället* (och den engelska utgåvan *Paradox Society*) och driva trafik till återförsäljare.
- Presentera Björn Wikhamn som föreläsare/expert och underlätta bokning av föreläsningar.
- Fungera som en SEO- och AI-sökbar kunskapskälla om begreppet "paradoxsamhället" (strukturerad data, FAQ, BLUF-format).

## Struktur

```
index.html      Huvudsidan (single page), alla sektioner via ankarlänkar
bestall/        Beställningssida med Publit-widget (direktköp) och återförsäljarlänkar
style.css       All styling, organiserad i namngivna kommentarsblock per sektion
script.js       Interaktivitet: mobilmeny, scroll-reveal, tilt/glow-effekter, partiklar
assets/         Bilder (porträtt, bokomslag m.m.)
sitemap.xml     Sitemap för sökmotorer
robots.txt      Robot-/crawler-regler (inkl. GPTBot, ClaudeBot m.fl.)
CNAME           Anpassad domän för GitHub Pages (www.wikhamn.se)
.claude/        Konfiguration för lokal förhandsgranskning (launch.json)
AGENTS.md       Kanoniska instruktioner för kodagenter (Claude Code, Codex m.fl.)
CLAUDE.md       Claude Code-specifika tillägg (pekar på AGENTS.md)
DESIGN.md       Designsystem: färger, typografi, klasser, sidanatomi
PLAN.md         Körbar plan för beställningssidan /bestall/ (order.wikhamn.se)
```

Sidan är en enda `index.html` med sektioner (`#boken`, `#audience`, `#store`, `#bjorn`, `#forelasningar`, `#sagt`, `#faq`, `#kontakt`) som navigeras via ankarlänkar i `.nav`.

## Utveckling lokalt

Inga byggverktyg eller beroenden krävs – ren HTML/CSS/JS. Servera mappen lokalt för att undvika CORS-/path-problem, t.ex.:

```
npx serve -l 3456 .
```

(Detta är fördefinierat i `.claude/launch.json` under namnet `wikhamn-hemsida`.) Öppna sedan `http://localhost:3456`.

## Driftsättning

Sajten driftsätts via **GitHub Pages** med anpassad domän, styrt av filen `CNAME` (`www.wikhamn.se`). Att pusha till `main` på GitHub-repot räcker för att publicera – ingen separat build- eller deploy-process finns.

Repo: https://github.com/Kostroff73/Hemsida

## SEO

- `sitemap.xml` och `robots.txt` i projektroten, refererade till varandra.
- Strukturerad data (JSON-LD för `Person`, `Book`, `FAQPage`) i `<head>` på `index.html`.
- Open Graph- och Twitter-metataggar för länkdelning.
- Umami används för enkel besöksstatistik (skript i `<head>`).

## Kända brister

- `index.html` refererar till `assets/favicon.png` som inte finns i `assets/`-mappen – bör läggas till eller referensen tas bort.
