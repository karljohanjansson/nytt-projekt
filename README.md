# BSA Safety AB

Ny webbplats för **BSA Safety AB**, ett certifierat brandskyddsföretag med bas i Göteborg som hjälper företag och fastigheter i hela Sverige med brandlarm, kökssläcksystem,
rökluckor, brandtätning, brandposter, brandsläckare, utrymning, SBA och utbildning.

Sidan är byggd med Vite, vanilla JavaScript och handskriven CSS. Den består av flera sidor
med ett gemensamt header- och footer-partial som injectas av ett litet Vite-plugin.

## Sidor

- `index.html` – start
- `tjanster.html` – brandlarm, kökssläcksystem, brandsläckare, utrymning, brandtätning och SBA
- `sa-funkar-det.html` – processen i fyra steg
- `utbildning.html` – kurser och utbildningsupplägg
- `om-bsa.html` – företaget, värderingar, certifieringar och bildgalleri
- `kontakt.html` – kontaktformulär, kontaktuppgifter och nyckelpersoner

## Funktioner

- Gemensam header och footer via `src/partials/` och `vite.config.js`
- Telefonnummer högst upp på alla sidor
- Rundad menyknapp längst till höger som öppnar en meny från höger på mobil och surfplatta
- Tjänster-dropdown med Brandlarm, Kökssläcksystem, Rökluckor, Brandtätning, Brandpost, Brandsläckare, Utrymning och SBA & Service
- Menyordning: Tjänster, Utbildning, Så funkar det, Om BSA, Kontakt
- Aktiv markering av aktuell sida i menyn
- Kontaktformulär med klientsidevalidering och bekräftelseläge
- Responsivt från 320 px, tangentbordsstöd och reducerad rörelse
- SEO: unika titlar och metabeskrivningar, Open Graph, sitemap, robots.txt samt
  LocalBusiness- och FAQ-schema

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
[bsaab.se](https://bsaab.se/) och anpassade för den nya sidan. Instagram kräver inloggning och
blockerade automatisk hämtning, så BSA Safetys eget bildmaterial från webbplatsen används i
stället – samma typ av bilder som företaget publicerar på Instagram. Några tjänstebilder
(brandlarmscentral, restaurangkök, brandpostskåp, röklucka, brandtätning, utrymningsarmatur och
brandsläckare) är produktbilder från öppna källor och produktleverantörer. Bilderna är beskurna och komprimerade
till WebP/PNG i `assets/images/`.

Kontaktformuläret skickar inte något till en server; det visar bara ett bekräftelseläge.
Koppla det till ett formulär-API eller en e-posttjänst innan publicering.

## Permanent förhandsvisning

Förhandsvisningen körs som en systemd-användartjänst på port 5174 och startar om automatiskt
om Vite skulle stanna. Linger är aktiverat, så tjänsten startar även vid omstart utan inloggning.

```bash
systemctl --user status bsa-safety-preview.service
systemctl --user restart bsa-safety-preview.service
journalctl --user -u bsa-safety-preview.service -f
```

Förhandsvisning: https://mighty-fox.taildb4ed8.ts.net:8443/
