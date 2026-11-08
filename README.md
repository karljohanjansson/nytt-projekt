# Fyr Brandskydd

Webbplats för ett fiktivt svenskt brandskyddsföretag som projekterar, installerar och
servar brandlarm, köksbrandsläckning, brandsläckare och utrymningssystem.

Sidan är byggd som en statisk one-pager med Vite, vanilla JavaScript och handskriven CSS.
Inga ramverk eller externa bilder används. Typsnitt hämtas från Google Fonts.

## Innehåll

- Interaktiv sektionsritning där man väljer brandskyddszon (Z01–Z05)
- Systemöversikt med expanderbara rader
- Arbetssätt i fem steg
- Jämförelse av tre serviceavtal
- Certifieringar, kundcitat och vanliga frågor
- Kontaktformulär med klientsidevalidering och bekräftelseläge

## Kom igång

```bash
npm install
npm run dev
```

Öppna sedan adressen som Vite skriver ut. För den delade förhandsvisningen används port
5174:

```bash
__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS=mighty-fox.taildb4ed8.ts.net npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Bygg för produktion med `npm run build`. Resultatet hamnar i `dist/`.

## Innehåll som är platshållare

Företagsnamn, adress, telefonnummer, org.nr, priser, kundcitat och certifieringar är
påhittade och ska bytas mot verkliga uppgifter innan publicering. Kontaktformuläret skickar
inte något till en server; det visar bara ett bekräftelseläge.
