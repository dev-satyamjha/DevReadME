export const handler = async (event) => {
  const user = event.queryStringParameters.user;
  const repo = event.queryStringParameters.repo;

  if (!user || !repo) {
    return { statusCode: 400, body: "Missing user or repo parameter" };
  }

  try {
    const githubResponse = await fetch(
      `https://api.github.com/repos/${user}/${repo}`,
    );
    const data = await githubResponse.json();

    if (data.message === "Not Found") {
      return { statusCode: 404, body: "Repository not found" };
    }

    const stars = data.stargazers_count || 0;
    const forks = data.forks_count || 0;

    // The 7-segment digital SVG design
    const svg = `
      <svg width="320" height="120" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120">
        <style>
          .bg { fill: #0d1117; stroke: #30363d; stroke-width: 2; rx: 8; }
          .digital-text { font-family: 'Courier New', Courier, monospace; font-size: 22px; fill: #58a6ff; font-weight: bold; }
          .stats { font-family: 'Courier New', Courier, monospace; font-size: 14px; fill: #8b949e; }
          .glow { fill: #ff8c00; }
        </style>

        <rect class="bg" width="316" height="116" x="2" y="2" />

        <circle cx="20" cy="25" r="5" class="glow">
          <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
        </circle>

        <text x="40" y="30" class="digital-text">${repo.toUpperCase()}</text>

        <text x="40" y="70" class="stats">STARS: ${stars.toString().padStart(4, "0")}</text>
        <text x="40" y="95" class="stats">FORKS: ${forks.toString().padStart(4, "0")}</text>

        <line x1="0" y1="10" x2="320" y2="10" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="0" y1="30" x2="320" y2="30" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="0" y1="50" x2="320" y2="50" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="0" y1="70" x2="320" y2="70" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="0" y1="90" x2="320" y2="90" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="0" y1="110" x2="320" y2="110" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
      </svg>
    `;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=14400",
      },
      body: svg,
    };
  } catch (error) {
    return { statusCode: 500, body: "Server Error" };
  }
};
