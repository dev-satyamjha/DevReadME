<p align="center">
  <img src="public/logo.png" alt="DevReadME logo" width="72">
</p>

<h1 align="center"> DevReadME </h1>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-React-149ECA?style=flat-square&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Powered%20by-Vite-B73BFE?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white" alt="Netlify">
  <img src="https://img.shields.io/badge/No%20Account-Needed-ff69b4?style=flat-square" alt="No Account Needed">
</p>

**Your GitHub profile deserves better than a form and some badges. 🎨**

DevReadME is a live, visual README builder 🖥️. Type, watch it render, copy, done ✅. Animated display boards 🪧, customizable contribution snakes 🐍, 3D graphs 🧊, and nine full themes 🎭, all with zero account required 🔓.

<p align="center">
  <a href="https://dev-readme.netlify.app"><strong>🚀 Try it live →</strong></a>
</p>

***

## ✨ Why it's different

Most generators feel like paperwork. This one feels like a design tool.

- Real-time preview, no refresh, no guessing
- Real GitHub-compatible markdown and widgets under the hood
- Snake animation with per-commit-level color control
- Sessions autosave locally, export and restore anywhere
- Nine themes that reskin the whole editor, not just the output
- Every section title is yours to rename

***

## 🚀 Features

**👁️ Live Preview**: see your README render as you type.

**🌐 Social Links**: GitHub, Twitter/X, LinkedIn, LeetCode, Codeforces, CodeStats, Instagram, YouTube, all next to your header.

**🌟 Fun Fact**: one line to make your profile feel human.

**🪧 Display Board**: a retro LED marquee that cycles your pinned projects with rain effects, glowing borders, and scrolling text. Rendered live as SVG from a Netlify function.

**🐍 Contribution Snake**: full color control over the snake, background, and all five commit density levels in light and dark mode. Presets like Gold Rush, Cyber Pink, and Ocean Blue, or build your own. The Snake YML tab writes the GitHub Actions workflow for you.

**🧊 3D Contribution Graph**: an isometric view of your contributions via [yoshi389111/github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib), with the matching workflow generated automatically.

**📊 Lecoq Metrics**: a clean stats card powered by [metrics.lecoq.io](https://metrics.lecoq.io).

**📈 Stats & Widgets**: GitHub stats, streak stats, activity graph, top languages, LeetCode heatmap and contest stats, Codeforces stats. Each one independently sized and positioned.

**✏️ Editable Titles**: rename any section heading to match your voice.

**👥 Visitor Counter**: a live badge via [counterapi.dev](https://counterapi.dev), safe from double counting in dev mode.

**💻 Skills Database**: 200+ skills across languages, frameworks, tools, and more, plus custom categories for anything missing.

**↕️ Section Ordering**: arrange your README exactly how you want it read.

![Vercel API](https://img.shields.io/badge/API-Self_Hosted_Vercel-000000?style=flat-square&logo=vercel) 
>⚡ **Note:** The dynamic metrics on this profile (GitHub Stats, Streak Card, Top Languages, and Top Languages by Repo) are served via a private, self-hosted Vercel deployment to bypass public API rate limits.

***

## Nine themes

| Theme | Feel |
|---|---|
| Elegant Black | Red accent on pure black |
| Glassmorphic | Sky blue on dark slate |
| Colorful | Radical pink and purple |
| Vibe Coded | Synthwave purple |
| Game Orange | Gruvbox warm orange |
| Green + White | Green on deep green |
| Black + White | Pure monochrome |
| Slate Minimal | Muted and clean slate |
| Neon Red | Neon red on near-black |

***

## Save and restore

Your progress autosaves in the browser. To move machines, copy the session blob from Save Session and paste it into Restore anywhere. No login, no cloud.

***

## Screenshots

| Editor (Elegant Black) | Snake YML | Display Board |
|---|---|---|
| ![Editor](public/Editor.png) | ![Snake](public/Snake.jpg) | ![Board](public/DisplayBoard.jpg) |

Live: [dev-readme.netlify.app](https://dev-readme.netlify.app)

***

## How to use

1. Open [dev-readme.netlify.app](https://dev-readme.netlify.app)
2. Fill in your name, subtitle, about, and GitHub username
3. Pick your skills or add custom categories
4. Toggle the widgets you want
5. Add repo names for the Display Board
6. Choose a theme
7. Copy MD from the Markdown tab
8. Paste it into `github.com/your-username/your-username` → `README.md`

### Setting up the Contribution Snake

1. Open the Snake YML tab and pick or customize a palette
2. Copy YML
3. Create `.github/workflows/snake.yml` in your profile repo and paste it
4. In Settings → Actions → General, enable Read and write permissions
5. Run the Generate Snake workflow from the Actions tab
6. It builds an `output` branch and refreshes daily

### Setting up the 3D Contribution Graph

1. Open the 3D Graph YML tab and preview a theme
2. Copy YML
3. Create `.github/workflows/profile-3d.yml` in your profile repo and paste it
4. Run the GitHub-Profile-3D-Contrib workflow
5. All theme SVGs are generated and committed. Your README updates automatically

***

## 📁 Project structure

<details>
<summary><strong>Click to expand the file tree</strong> 🌳</summary>

```
DevReadME/
├── 🌐 index.html
├── ⚡ vite.config.js
├── 📦 package.json
├── 🔒 bun.lock
├── 🧹 eslint.config.js
├── 🗂️ public/
│   ├── 🖼️ favicon.png
│   └── 🖼️ logo.png
├── ☁️ netlify/
│   └── functions/
│       └── 🪧 displayboard.js
└── ⚛️ src/
    ├── 🚪 main.jsx
    ├── 🧩 App.jsx
    ├── 🎨 App.css
    ├── 🎨 index.css
    ├── 💬 CursorBubbles.jsx
    ├── 🖼️ assets/
    ├── 🧱 components/
    └── 🛠️ utils/
        └── 🧮 matrixUtils.js
```

</details>

| Path | What lives there |
|---|---|
| ⚛️ `src/App.jsx` | Main app logic and layout |
| 🧱 `src/components/` | UI building blocks |
| 🛠️ `src/utils/matrixUtils.js` | Matrix rain effect helpers |
| 💬 `src/CursorBubbles.jsx` | Cursor bubble effect |
| ☁️ `netlify/functions/displayboard.js` | Serverless display board renderer |
| 🗂️ `public/` | Static assets, favicon, and logo |

***

## Running locally

Requires [Bun](https://bun.sh) and [Node.js](https://nodejs.org).

```bash
git clone https://github.com/dev-satyamjha/DevReadME.git
cd DevReadME
bun install
bun run dev
```

The display board API mock runs automatically through the Vite plugin, so the preview works locally without Netlify.

To test the real serverless function:

```bash
bun add -g netlify-cli
bunx netlify dev
```

***

## Contributing

New skills, bug fixes, theme ideas, mobile improvements, and new widget integrations are all welcome. Open a PR.

***

## 🏗️ Tech stack

<p align="center">
  <img src="https://img.shields.io/badge/React-149ECA?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify">
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions">
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun">
</p>

| Layer | Tech |
|---|---|
| ⚛️ Frontend | React + Vite |
| 🎨 Styling | Custom CSS with theme variables |
| 🌀 Animations | Hand-built SVG |
| ☁️ Serverless | Netlify Functions |
| ⚙️ Workflows | GitHub Actions |
| 📦 Package manager | Bun |
| 🚀 Deployment | Netlify |

***

If DevReadME saved you time, a star on the repo goes a long way.

<p align="center">Made with ❤️ by <a href="https://github.com/dev-satyamjha">Satyam Jha</a></p>