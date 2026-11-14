import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function htmlPartials() {
  return {
    name: "html-partials",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const header = readFileSync(resolve("src/partials/header.html"), "utf8");
        const footer = readFileSync(resolve("src/partials/footer.html"), "utf8");
        return html.replace("<!-- HEADER -->", header).replace("<!-- FOOTER -->", footer);
      },
    },
  };
}

export default defineConfig({
  appType: "mpa",
  plugins: [htmlPartials()],
  server: {
    host: "127.0.0.1",
    port: 5174,
    strictPort: true,
    allowedHosts: ["mighty-fox.taildb4ed8.ts.net"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        tjanster: resolve("tjanster.html"),
        utbildning: resolve("utbildning.html"),
        lar: resolve("lar-dig-om-brandskydd.html"),
        om: resolve("om-bsa.html"),
        kontakt: resolve("kontakt.html"),
        kvalitet: resolve("kvalitetspolicy.html"),
        miljo: resolve("miljopolicy.html"),
        arbetsmiljo: resolve("arbetsmiljopolicy.html"),
        integritet: resolve("integritetspolicy.html"),
      },
    },
  },
});
