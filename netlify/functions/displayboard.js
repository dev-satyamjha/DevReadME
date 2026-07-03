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
} from "../../src/utils/matrixUtils.js";

const MAX_REPOS = 10;

export const handler = async (event) => {
  const user = event.queryStringParameters?.user;
  const reposParam = event.queryStringParameters?.repos;

  if (!user || !reposParam) return { statusCode: 400, body: "Missing params" };

  const repoNames = reposParam
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean)
    .slice(0, MAX_REPOS);

  if (!repoNames.length) return { statusCode: 400, body: "No valid repos" };

  const safeUser = encodeURIComponent(String(user).trim());

  try {
    const results = await Promise.all(
      repoNames.map((repo) =>
        fetch(
          `https://api.github.com/repos/${safeUser}/${encodeURIComponent(String(repo).trim())}`,
          {
            headers: process.env.GITHUB_TOKEN
              ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
              : {},
          },
        )
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ),
    );

    const repos = results.filter(Boolean);
    if (!repos.length)
      return { statusCode: 404, body: "No repositories found" };

    const n = repos.length;
    const totalDur = n * 10;
    const innerPerimeter = (PW + PH) * 2;
    const allCss =
      buildSlideCSS(n, totalDur) +
      `@keyframes chase{100%{stroke-dashoffset:-${innerPerimeter};}}@keyframes dotFade{0%,100%{opacity:0.03}50%{opacity:0.22}}`;
    const TEXT_Y = PY + PH / 2 - 45;
    const STARS_Y = TEXT_Y + 75;

    const slides = repos
      .map((repo, i) => {
        const strW = repo.name.length * (CW + GAP * 3);
        const needsScroll = strW > PW - 32;
        const stars = `★ ${repo.stargazers_count || 0}`;
        const anim =
          n > 1 ? `style="animation:s${i} ${totalDur}s infinite linear"` : "";

        const nameSvg = needsScroll
          ? `<g><animateTransform attributeName="transform" type="translate" from="${PX + 16 + strW},0" to="${PX - strW - 20},0" dur="${Math.max(3, strW / 40).toFixed(1)}s" repeatCount="indefinite"/>${dotMatrix(repo.name, TEXT_Y, PW, PX, 0)}</g>`
          : dotMatrix(repo.name, TEXT_Y, PW, PX);

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

    const svg = `<svg width="${BW}" height="${BH}" viewBox="0 0 ${BW} ${BH}" xmlns="http://www.w3.org/2000/svg">
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

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=300",
      },
      body: svg,
    };
  } catch {
    return { statusCode: 500, body: "Server Error" };
  }
};
