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
  S: [0x70, 0x88, 0x88, 0x70, 0x08, 0x88, 0x70],
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

const DOT = 6;
const GAP = 2;
const CW = 5 * (DOT + GAP);
const ON = "#ff2200";
const BW = 950;
const BH = 520;
const PW = 700;
const PH = 380;
const PX = (BW - PW) / 2;
const PY = (BH - PH) / 2;
const FADE_SEC = 1.5;

function dotMatrix(str, y, pw, px, offsetX = null) {
  const strW = str.length * (CW + GAP * 3);
  const startX = offsetX !== null ? offsetX : px + (pw - strW) / 2;
  const dots = [];
  for (let i = 0; i < str.length; i++) {
    const matrix = MATRIX_FONT[str[i]] || MATRIX_FONT[" "];
    const charX = startX + i * (CW + GAP * 3);
    matrix.forEach((row, ri) => {
      for (let ci = 0; ci < 5; ci++) {
        if ((row & (0x80 >> ci)) !== 0) {
          dots.push(
            `<circle cx="${charX + ci * (DOT + GAP) + DOT / 2}" cy="${y + ri * (DOT + GAP) + DOT / 2}" r="${DOT / 2}" fill="${ON}" filter="url(#glow)"/>`,
          );
        }
      }
    });
  }
  return dots.join("");
}

function buildSlideCSS(n, totalDur) {
  let css = `@keyframes drop{0%{transform:translateY(-20px);opacity:0}10%{opacity:1}80%{opacity:.6}100%{transform:translateY(${PH}px);opacity:0}}`;
  if (n <= 1) return css;
  for (let i = 0; i < n; i++) {
    const p0 = ((i / n) * 100).toFixed(2);
    const p1 = (((i + 1) / n) * 100).toFixed(2);
    const pFI = ((i / n) * 100 + (FADE_SEC / totalDur) * 100).toFixed(2);
    const pFO = (((i + 1) / n) * 100 - (FADE_SEC / totalDur) * 100).toFixed(2);
    if (i === 0)
      css += `@keyframes s0{0%{opacity:1;filter:blur(0)}${pFO}%{opacity:1;filter:blur(0)}${p1}%,100%{opacity:0;filter:blur(8px)}}`;
    else
      css += `@keyframes s${i}{0%,${p0}%{opacity:0;filter:blur(8px)}${pFI}%{opacity:1;filter:blur(0)}${pFO}%{opacity:1;filter:blur(0)}${p1}%,100%{opacity:0;filter:blur(8px)}}`;
  }
  return css;
}

function buildRain() {
  const drops = [];
  for (let i = 0; i < 55; i++) {
    const cx = PX + Math.floor(Math.random() * PW);
    const dur = (1 + Math.random() * 2).toFixed(2);
    const delay = (Math.random() * 3).toFixed(2);
    drops.push(
      `<circle cx="${cx}" cy="${PY}" r="1.5" fill="#00ff00" filter="url(#glow)" opacity="0.6" style="animation:drop ${dur}s ${delay}s infinite linear"/>`,
    );
  }
  return drops.join("");
}

exports.handler = async (event) => {
  const user = event.queryStringParameters?.user;
  const reposParam = event.queryStringParameters?.repos;

  if (!user || !reposParam) return { statusCode: 400, body: "Missing params" };

  const repoNames = reposParam
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);
  if (!repoNames.length) return { statusCode: 400, body: "No valid repos" };

  try {
    const results = await Promise.all(
      repoNames.map((repo) =>
        fetch(`https://api.github.com/repos/${user}/${repo}`, {
          headers: process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {},
        })
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
    const slideCss = buildSlideCSS(n, totalDur);
    const boxCss = `@keyframes chase { 100% { stroke-dashoffset: -${innerPerimeter}; } }`;
    const allCss = slideCss + boxCss;

    const TEXT_Y = PY + PH / 2 - 45;
    const STARS_Y = TEXT_Y + 75;

    const slides = repos
      .map((repo, i) => {
        const name = repo.name;
        const strW = name.length * (CW + GAP * 3);
        const needsScroll = strW > PW - 32;
        const stars = `★ ${repo.stargazers_count || 0}`;
        const anim =
          n > 1 ? `style="animation:s${i} ${totalDur}s infinite linear"` : "";

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

    const svg = `<svg width="${BW}" height="${BH}" viewBox="0 0 ${BW} ${BH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="bgd" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#040000"/><circle cx="4" cy="4" r="1.2" fill="#0b0000"/></pattern>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="redglow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="infglow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <clipPath id="innerclip"><rect x="${PX}" y="${PY}" width="${PW}" height="${PH}"/></clipPath>
      </defs>
      <style>${allCss}</style>
      <rect width="${BW}" height="${BH}" fill="#060000" rx="12"/>
      <rect width="${BW}" height="${BH}" fill="url(#bgd)" rx="12"/>
      ${buildRain()}
      <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" fill="#0a0000" stroke="#330000" stroke-width="2"/>
      <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" fill="none" stroke="${ON}" stroke-width="4" stroke-dasharray="250 ${innerPerimeter - 250}" filter="url(#redglow)" style="animation: chase 3s linear infinite;"/>
      <g clip-path="url(#innerclip)">
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
