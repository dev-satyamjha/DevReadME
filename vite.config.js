import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  dotMatrix,
  buildSlideCSS,
  buildRain,
  buildFullMatrix,
  BW,
  BH,
  PW,
  PH,
  PX,
  PY,
  CW,
  GAP,
  ON,
} from "./src/utils/matrixUtils.js";

const apiMock = () => ({
  name: "api-mock",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (
        req.url.startsWith("/.netlify/functions/displayboard") ||
        req.url.startsWith("/api/displayboard")
      ) {
        try {
          const url = new URL(
            req.url,
            `http://${req.headers.host || "localhost"}`,
          );
          const user = url.searchParams.get("user");
          const reposParam = url.searchParams.get("repos");

          if (!user || !reposParam) {
            res.writeHead(400);
            return res.end("Missing parameters");
          }

          const repoList = reposParam
            .split(",")
            .map((r) => r.trim())
            .filter(Boolean)
            .slice(0, 10);

          const results = await Promise.all(
            repoList.map((repo) =>
              fetch(
                `https://api.github.com/repos/${encodeURIComponent(user)}/${encodeURIComponent(repo)}`,
              )
                .then((r) => (r.ok ? r.json() : null))
                .catch(() => null),
            ),
          );

          const validRepos = results.filter(Boolean);
          if (!validRepos.length) {
            res.writeHead(404);
            return res.end(
              `<svg width="${BW}" height="${BH}" xmlns="http://www.w3.org/2000/svg"><rect width="${BW}" height="${BH}" fill="#060000" rx="16"/></svg>`,
            );
          }

          const n = validRepos.length;
          const totalDur = n * 10;
          const innerPerimeter = (PW + PH) * 2;
          const allCss =
            buildSlideCSS(n, totalDur) +
            `@keyframes chase { 100% { stroke-dashoffset: -${innerPerimeter}; } }` +
            `@keyframes dotFade { 0%, 100% { opacity: 0.03; } 50% { opacity: 0.22; } }`;

          const TEXT_Y = PY + PH / 2 - 45;
          const STARS_Y = TEXT_Y + 75;

          const slides = validRepos
            .map((repo, i) => {
              const name = repo.name;
              const strW = name.length * (CW + GAP * 3);
              const needsScroll = strW > PW - 32;
              const stars = `★ ${repo.stargazers_count || 0}`;
              const anim =
                n > 1
                  ? `style="animation:s${i} ${totalDur}s infinite linear"`
                  : "";

              let nameSvg;
              if (needsScroll) {
                const scrollDur = Math.max(3, strW / 40).toFixed(1);
                nameSvg = `<g><animateTransform attributeName="transform" type="translate" from="${PX + 16 + strW},0" to="${PX - strW - 20},0" dur="${scrollDur}s" repeatCount="indefinite"/>${dotMatrix(name, TEXT_Y, PW, PX, 0)}</g>`;
              } else {
                nameSvg = dotMatrix(name, TEXT_Y, PW, PX);
              }
              return `<g clip-path="url(#innerclip)" ${anim}>${nameSvg}${dotMatrix(stars, STARS_Y, PW, PX)}</g>`;
            })
            .join("");

          const corners = [
            [PX + 3, PY + 3],
            [PX + PW - 3, PY + 3],
            [PX + 3, PY + PH - 3],
            [PX + PW - 3, PY + PH - 3],
          ]
            .map(
              ([cx, cy]) =>
                `<circle cx="${cx}" cy="${cy}" r="6" fill="${ON}" filter="url(#redglow)" opacity="0.95"/>`,
            )
            .join("");

          const finalSvg = `<svg width="${BW}" height="${BH}" viewBox="0 0 ${BW} ${BH}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="bgd" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#040000"/><circle cx="4" cy="4" r="1.2" fill="#0b0000"/></pattern>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="redglow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <clipPath id="innerclip"><rect x="${PX}" y="${PY}" width="${PW}" height="${PH}"/></clipPath>
            </defs>
            <style>${allCss}</style>
            <rect width="${BW}" height="${BH}" fill="#060000" rx="12"/>
            <rect width="${BW}" height="${BH}" fill="url(#bgd)" rx="12"/>
            ${buildFullMatrix()}
            <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" fill="#0a0000" stroke="#330000" stroke-width="2"/>
            <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" fill="none" stroke="${ON}" stroke-width="4" stroke-dasharray="250 ${innerPerimeter - 250}" filter="url(#redglow)" style="animation: chase 3s linear infinite;"/>
            <g clip-path="url(#innerclip)">
            ${buildRain()}
            ${slides}
            </g>
            ${corners}
          </svg>`;

          res.setHeader("Content-Type", "image/svg+xml");
          res.setHeader("Cache-Control", "public, max-age=14400");
          res.writeHead(200);
          return res.end(finalSvg);
        } catch {
          res.writeHead(500);
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
