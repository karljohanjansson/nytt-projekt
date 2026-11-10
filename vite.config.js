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
  plugins: [htmlPartials()],
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        tjanster: resolve("tjanster.html"),
        process: resolve("sa-funkar-det.html"),
        utbildning: resolve("utbildning.html"),
        om: resolve("om-bsa.html"),
        kontakt: resolve("kontakt.html"),
      },
    },
  },
});
