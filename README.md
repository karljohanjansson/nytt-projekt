# BSA Safety AB

Ny webbplats för **BSA Safety AB**, ett certifierat brandskyddsföretag i Västra Frölunda som
hjälper företag och fastigheter i Göteborg och Stockholm med brandlarm, kökssläcksystem,
brandsläckare, utrymning, brandtätning, SBA och utbildning.

Sidan är en statisk one-pager byggd med Vite, vanilla JavaScript och handskriven CSS. Den är
inspirerad av bilddrivna, varma företagssidor med tydliga tjänstekort och en enkel
fyrastegsprocess.

## Innehåll

- Stor bilddriven hero med BSA Safetys egen teknikerbild
- Certifieringar: SBSC brandlarm, SBSC kökssläcksystem och Creditsafe
- Tjänstekort för brandlarm, kökssläcksystem, brandsläckare, utrymning, brandtätning och SBA
- Process i fyra steg
- Om BSA, utbildningar och vanliga frågor
- Kontaktformulär med klientsidevalidering och bekräftelseläge
- SEO: titel, metabeskrivning, Open Graph, LocalBusiness- och FAQ-schema

## Kom igång

```bash
npm install
npm run dev
```

För den delade förhandsvisningen används port 5174:

```bash
__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS=mighty-fox.taildb4ed8.ts.net npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Bygg för produktion med `npm run build`. Resultatet hamnar i `dist/`.

## Bilder och innehåll

Bilder, logotyp, certifieringar, kontaktuppgifter och tjänstebeskrivningar är hämtade från
[bsaab.se](https://bsaab.se/) och anpassade för den nya sidan. Bilderna är beskurna och
komprimerade till WebP/PNG i `assets/images/`.

Kontaktformuläret skickar inte något till en server; det visar bara ett bekräftelseläge.
Koppla det till ett formulär-API eller en e-posttjänst innan publicering.
