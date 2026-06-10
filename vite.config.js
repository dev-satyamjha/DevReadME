import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const MATRIX_FONT = {
  A: [0x70, 0x88, 0x88, 0xf8, 0x88, 0x88, 0x88],
  B: [0xf0, 0x48, 0x48, 0x70, 0x48, 0x48, 0xf0],
  C: [0x70, 0x88, 0x80, 0x80, 0x80, 0x88, 0x70],
  D: [0xe0, 0x50, 0x48, 0x48, 0x48, 0x50, 0xe0],
  E: [0xf8, 0x80, 0x80, 0xf0, 0x80, 0x80, 0xf8],
  F: [0xf8, 0x80, 0x80, 0xf0, 0x80, 0x80, 0x80],
  G: [0x70, 0x88, 0x80, 0xb8, 0x88, 0x88, 0x70],
  H: [0x88, 0x88, 0x88, 0xf8, 0x88, 0x88, 0x88],
  I: [0x70, 0x20, 0x20, 0x20, 0x20, 0x20, 0x70],
  J: [0x38, 0x10, 0x10, 0x10, 0x10, 0x90, 0x60],
  K: [0x88, 0x90, 0xa0, 0xc0, 0xa0, 0x90, 0x88],
  L: [0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0xf8],
  M: [0x88, 0xd8, 0xa8, 0x88, 0x88, 0x88, 0x88],
  N: [0x88, 0x88, 0xc8, 0xa8, 0x98, 0x88, 0x88],
  O: [0x70, 0x88, 0x88, 0x88, 0x88, 0x88, 0x70],
  P: [0xf0, 0x88, 0x88, 0xf0, 0x80, 0x80, 0x80],
  Q: [0x70, 0x88, 0x88, 0x88, 0xa8, 0x90, 0x68],
  R: [0xf0, 0x88, 0x88, 0xf0, 0xa0, 0x90, 0x88],
  S: [0x70, 0x88, 0x80, 0x70, 0x08, 0x88, 0x70],
  T: [0xf8, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20],
  U: [0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x70],
  V: [0x88, 0x88, 0x88, 0x88, 0x88, 0x50, 0x20],
  W: [0x88, 0x88, 0x88, 0x88, 0xa8, 0xd8, 0x88],
  X: [0x88, 0x88, 0x50, 0x20, 0x50, 0x88, 0x88],
  Y: [0x88, 0x88, 0x50, 0x20, 0x20, 0x20, 0x20],
  Z: [0xf8, 0x08, 0x10, 0x20, 0x40, 0x80, 0xf8],
  a: [0x00, 0x00, 0x70, 0x88, 0xf8, 0x88, 0x88],
  b: [0x80, 0x80, 0xf0, 0x88, 0x88, 0x88, 0xf0],
  c: [0x00, 0x00, 0x70, 0x80, 0x80, 0x80, 0x70],
  d: [0x08, 0x08, 0x78, 0x88, 0x88, 0x88, 0x78],
  e: [0x00, 0x00, 0x70, 0x88, 0xf8, 0x80, 0x70],
  f: [0x30, 0x40, 0xe0, 0x40, 0x40, 0x40, 0x40],
  g: [0x00, 0x78, 0x88, 0x88, 0x78, 0x08, 0x70],
  h: [0x80, 0x80, 0xf0, 0x88, 0x88, 0x88, 0x88],
  i: [0x20, 0x00, 0x60, 0x20, 0x20, 0x20, 0x70],
  j: [0x10, 0x00, 0x10, 0x10, 0x10, 0x90, 0x60],
  k: [0x80, 0x80, 0x90, 0xa0, 0xc0, 0xa0, 0x90],
  l: [0x60, 0x20, 0x20, 0x20, 0x20, 0x20, 0x70],
  m: [0x00, 0x00, 0xd0, 0xa8, 0xa8, 0x88, 0x88],
  n: [0x00, 0x00, 0xb0, 0xc8, 0x88, 0x88, 0x88],
  o: [0x00, 0x00, 0x70, 0x88, 0x88, 0x88, 0x70],
  p: [0x00, 0x00, 0xf0, 0x88, 0xf0, 0x80, 0x80],
  q: [0x00, 0x00, 0x78, 0x88, 0x78, 0x08, 0x08],
  r: [0x00, 0x00, 0xb0, 0xc8, 0x80, 0x80, 0x80],
  s: [0x00, 0x00, 0x70, 0x80, 0x70, 0x08, 0x70],
  t: [0x40, 0x40, 0xe0, 0x40, 0x40, 0x40, 0x30],
  u: [0x00, 0x00, 0x88, 0x88, 0x88, 0x98, 0x68],
  v: [0x00, 0x00, 0x88, 0x88, 0x88, 0x50, 0x20],
  w: [0x00, 0x00, 0x88, 0x88, 0xa8, 0xa8, 0x50],
  x: [0x00, 0x00, 0x88, 0x50, 0x20, 0x50, 0x88],
  y: [0x00, 0x00, 0x88, 0x88, 0x78, 0x08, 0x70],
  z: [0x00, 0x00, 0xf8, 0x10, 0x20, 0x40, 0xf8],
  0: [0x70, 0x88, 0x98, 0xa8, 0xc8, 0x88, 0x70],
  1: [0x20, 0x60, 0x20, 0x20, 0x20, 0x20, 0x70],
  2: [0x70, 0x88, 0x08, 0x30, 0x40, 0x80, 0xf8],
  3: [0x70, 0x88, 0x08, 0x30, 0x08, 0x88, 0x70],
  4: [0x10, 0x30, 0x50, 0x90, 0xf8, 0x10, 0x10],
  5: [0xf8, 0x80, 0xf0, 0x08, 0x08, 0x88, 0x70],
  6: [0x70, 0x80, 0xf0, 0x88, 0x88, 0x88, 0x70],
  7: [0xf8, 0x08, 0x10, 0x20, 0x40, 0x40, 0x40],
  8: [0x70, 0x88, 0x88, 0x70, 0x88, 0x88, 0x70],
  9: [0x70, 0x88, 0x88, 0x88, 0x78, 0x08, 0x70],
  "-": [0x00, 0x00, 0x00, 0xf8, 0x00, 0x00, 0x00],
  " ": [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
  "★": [0x20, 0x70, 0xf8, 0x70, 0xa8, 0x00, 0x00],
};

const DOT_SIZE = 6;
const DOT_GAP = 2;
const CHAR_WIDTH = 5 * (DOT_SIZE + DOT_GAP);

function renderMatrixString(str, y, totalW, onColor) {
  const strW = str.length * (CHAR_WIDTH + DOT_GAP * 3);
  const startX = Math.max(0, (totalW - strW) / 2);
  let svg = "";

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const matrix = MATRIX_FONT[ch] || MATRIX_FONT[" "];
    const charX = startX + i * (CHAR_WIDTH + DOT_GAP * 3);

    matrix.forEach((row, rowIdx) => {
      for (let colIdx = 0; colIdx < 5; colIdx++) {
        if ((row & (0x80 >> colIdx)) !== 0) {
          const cx = charX + colIdx * (DOT_SIZE + DOT_GAP) + DOT_SIZE / 2;
          const cy = y + rowIdx * (DOT_SIZE + DOT_GAP) + DOT_SIZE / 2;
          svg += `<circle cx="${cx}" cy="${cy}" r="${DOT_SIZE / 2}" fill="${onColor}" filter="url(#glow)" />`;
        }
      }
    });
  }
  return svg;
}

const apiMock = () => ({
  name: "api-mock",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (
        req.url.startsWith("/.netlify/functions/seven-segment") ||
        req.url.startsWith("/api/seven-segment")
      ) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const user = url.searchParams.get("user");
        const reposParam = url.searchParams.get("repos");

        if (!user || !reposParam) {
          res.statusCode = 400;
          return res.end("Missing parameters");
        }

        const repoList = reposParam
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean);

        try {
          const fetchPromises = repoList.map((repo) =>
            fetch(
              `https://api.github.com/repos/${encodeURIComponent(user)}/${encodeURIComponent(repo)}`,
            )
              .then((response) => (response.ok ? response.json() : null))
              .catch(() => null),
          );

          const results = await Promise.all(fetchPromises);
          const validRepos = results.filter((data) => data !== null);

          if (validRepos.length === 0) {
            res.setHeader("Content-Type", "image/svg+xml");
            res.statusCode = 404;
            return res.end(
              `<svg width="650" height="440" xmlns="http://www.w3.org/2000/svg"><rect width="650" height="440" fill="#050100" rx="16"/></svg>`,
            );
          }

          const repoCount = validRepos.length;
          const cycleDuration = repoCount * 5;
          let cssAnimations = "";
          let framesSvg = "";

          if (repoCount > 1) {
            validRepos.forEach((repo, i) => {
              const startPct = (i / repoCount) * 100;
              const fadeDur = (1.5 / cycleDuration) * 100;
              const endPct = ((i + 1) / repoCount) * 100;

              cssAnimations += `
                @keyframes blurFade${i} {
                  0%, ${Math.max(0, startPct - 0.01)}% { opacity: 0; filter: blur(10px); }
                  ${startPct + fadeDur}%, ${endPct - fadeDur}% { opacity: 1; filter: blur(0px); }
                  ${endPct}%, 100% { opacity: 0; filter: blur(10px); }
                }
                .repo-frame-${i} {
                  animation: blurFade${i} ${cycleDuration}s infinite linear;
                  opacity: 0;
                }
              `;
            });
          }

          let rainAnimations = `
            @keyframes drop {
              0% { transform: translateY(-20px); opacity: 0; }
              10% { opacity: 1; }
              80% { opacity: 0.8; }
              100% { transform: translateY(440px); opacity: 0; }
            }
          `;
          let rainElements = '<g class="rain-container">';

          for (let i = 0; i < 40; i++) {
            const x = Math.floor(Math.random() * 650);
            const dur = 1 + Math.random() * 2;
            const delay = Math.random() * 3;

            rainAnimations += `
              .drop-${i} {
                animation: drop ${dur}s ${delay}s infinite linear;
              }
            `;
            rainElements += `<circle cx="${x}" cy="0" r="2" fill="#ff0000" class="drop-${i}" filter="url(#glow)" />`;
          }
          rainElements += "</g>";
          cssAnimations += rainAnimations;

          validRepos.forEach((repo, i) => {
            const stars = repo.stargazers_count || 0;
            const formattedStars = `★ ${stars}`;
            const name = repo.name.substring(0, 12);
            const frameClass = repoCount > 1 ? `repo-frame-${i}` : "";

            framesSvg += `
              <g class="${frameClass}" filter="url(#glow)">
                ${renderMatrixString(name, 140, 650, "#ff0000")}
                ${renderMatrixString(formattedStars, 260, 650, "#ff0000")}
              </g>
            `;
          });

          const finalSvg = `
            <svg width="650" height="440" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 440">
              <defs>
                <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#050100"/>
                  <circle cx="4" cy="4" r="2" fill="#110000"/>
                </pattern>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <style>${cssAnimations}</style>
              <rect width="650" height="440" fill="url(#dots)" rx="16"/>
              <rect width="650" height="440" fill="none" rx="16" stroke="#110000" stroke-width="12"/>
              ${rainElements}
              ${framesSvg}
            </svg>
          `;

          res.setHeader("Content-Type", "image/svg+xml");
          res.setHeader("Cache-Control", "public, max-age=14400");
          res.statusCode = 200;
          return res.end(finalSvg);
        } catch {
          res.statusCode = 500;
          return res.end("Server Error");
        }
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), apiMock()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
