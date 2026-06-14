import { useState, useEffect, useRef, useMemo } from "react";
import {
  Globe,
  Link as LinkIcon,
  Copy,
  Check,
  Sparkles,
  Code2,
  Eye,
  Plus,
  Trash2,
  Gamepad2,
  Settings,
  ImageIcon,
  Save,
  RefreshCw,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CursorBubbles from "./CursorBubbles";

const STATE_PREFIX = "<!--DEVREADME-STATE:";
const STATE_SUFFIX = "-->";

const THEMES = [
  { id: "elegant-black", name: "Elegant Black", color: "#000000" },
  { id: "glassmorphic", name: "Glassmorphic", color: "#0f172a" },
  { id: "colorful", name: "Colorful", color: "#ec4899" },
  { id: "vibe-coded", name: "Vibe Coded", color: "#a91079" },
  { id: "game-orange", name: "Game Orange", color: "#ff8c00" },
];

const SNAKE_COLOR_SCHEMES = [
  {
    label: "Red Classic",
    snake: "ff0000",
    bg: "000000",
    light: "#ebedf0,#9be9a8,#40c463,#30a14e,#216e39",
    dark: "#161b22,#0e4429,#006d32,#26a641,#39d353",
  },
  {
    label: "White Ghost",
    snake: "ffffff",
    bg: "0d1117",
    light: "#ebedf0,#9be9a8,#40c463,#30a14e,#216e39",
    dark: "#161b22,#0e4429,#006d32,#26a641,#39d353",
  },
  {
    label: "Gold Rush",
    snake: "d4a017",
    bg: "0a0700",
    light: "#ebedf0,#fff3b0,#ffe066,#ffc200,#d4a017",
    dark: "#161b22,#3d2e00,#7a5c00,#b38600,#d4a017",
  },
  {
    label: "Purple Haze",
    snake: "6e40c9",
    bg: "0d0a1a",
    light: "#ebedf0,#d8b4fe,#a855f7,#7c3aed,#6e40c9",
    dark: "#161b22,#2e1065,#4c1d95,#5b21b6,#6e40c9",
  },
  {
    label: "Ocean Blue",
    snake: "1f6feb",
    bg: "0a0f1a",
    light: "#ebedf0,#bfdbfe,#60a5fa,#3b82f6,#1f6feb",
    dark: "#161b22,#0c1a2e,#0d2d5e,#1a4a8a,#1f6feb",
  },
  {
    label: "Neon Green",
    snake: "39d353",
    bg: "0a1a0d",
    light: "#ebedf0,#9be9a8,#40c463,#30a14e,#216e39",
    dark: "#161b22,#0e4429,#006d32,#26a641,#39d353",
  },
];

const SKILLS_CATEGORIES = {
  Languages: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "C",
    "Go",
    "Rust",
    "Ruby",
    "PHP",
    "Swift",
    "Kotlin",
    "Dart",
    "R",
    "Scala",
    "Elixir",
    "Haskell",
    "Clojure",
    "Julia",
    "Assembly",
    "SQL",
    "HTML5",
    "CSS3",
    "Bash",
    "PowerShell",
    "Perl",
    "Lua",
    "Zig",
    "Nim",
    "Ren'Py",
  ],
  Frontend: [
    "React",
    "Next.js",
    "Vue.js",
    "Nuxt.js",
    "Angular",
    "Svelte",
    "Solid",
    "Ember",
    "TailwindCSS",
    "Bootstrap",
    "Material UI",
    "Chakra UI",
    "Redux",
    "Zustand",
    "Framer Motion",
    "Three.js",
    "WebGL",
    "Babel",
    "Webpack",
    "Vite",
    "Astro",
    "Gatsby",
  ],
  Backend: [
    "Node.js",
    "Express",
    "NestJS",
    "Django",
    "Flask",
    "FastAPI",
    "Spring Boot",
    "Laravel",
    "ASP.NET",
    "Ruby on Rails",
    "Koa",
    "Hapi",
    "Meteor",
    "GraphQL",
    "Apollo",
    "gRPC",
    "Socket.io",
    "Gin",
    "Fiber",
    "Actix",
  ],
  Database: [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "SQLite",
    "Oracle",
    "Cassandra",
    "Neo4j",
    "DynamoDB",
    "Firebase",
    "Supabase",
    "Prisma",
    "Mongoose",
    "MariaDB",
    "CouchDB",
  ],
  DevOps_Cloud: [
    "AWS",
    "Google Cloud",
    "Azure",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Jenkins",
    "GitHub Actions",
    "GitLab CI",
    "CircleCI",
    "TravisCI",
    "Ansible",
    "Linux",
    "Nginx",
    "Apache",
    "Vercel",
    "Netlify",
    "Heroku",
    "Cloudflare",
    "DigitalOcean",
    "InfinityFree",
  ],
  Mobile_Desktop: [
    "React Native",
    "Flutter",
    "Electron",
    "Tauri",
    "Unity",
    "Unreal Engine",
    "Godot",
    "Xamarin",
    "Ionic",
    ".NET MAUI",
  ],
  AI_Data: [
    "TensorFlow",
    "PyTorch",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "OpenCV",
    "Jupyter",
    "Keras",
    "Hugging Face",
    "Matplotlib",
    "LangChain",
    "OpenAI",
  ],
  Design_Tools: [
    "Figma",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe XD",
    "Krita",
    "GIMP",
    "Inkscape",
    "Blender",
    "Canva",
    "Sketch",
    "After Effects",
    "Premiere Pro",
  ],
  Games_Platforms: [
    "Steam",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "Nintendo 3DS",
    "Oculus",
    "VR",
    "Discord",
    "Twitch",
    "Epic Games",
    "GOG",
    "Itch.io",
  ],
  Extra: [
    "Athletics",
    "Boxing",
    "Chess",
    "Gaming",
    "Photography",
    "Writing",
    "Music",
    "Guitar",
    "Piano",
    "Video Editing",
    "3D Modeling",
    "Cycling",
    "Swimming",
    "Running",
    "Yoga",
  ],
};

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

function DotMatrixString({ str, y, totalW, onColor }) {
  const strW = str.length * (CHAR_WIDTH + DOT_GAP * 3);
  const startX = Math.max(0, (totalW - strW) / 2);
  const dots = [];
  for (let i = 0; i < str.length; i++) {
    const matrix = MATRIX_FONT[str[i]] || MATRIX_FONT[" "];
    const charX = startX + i * (CHAR_WIDTH + DOT_GAP * 3);
    matrix.forEach((row, ri) => {
      for (let ci = 0; ci < 5; ci++) {
        if ((row & (0x80 >> ci)) !== 0) {
          const cx = charX + ci * (DOT_SIZE + DOT_GAP) + DOT_SIZE / 2;
          const cy = y + ri * (DOT_SIZE + DOT_GAP) + DOT_SIZE / 2;
          dots.push(
            <circle
              key={`${i}-${ri}-${ci}`}
              cx={cx}
              cy={cy}
              r={DOT_SIZE / 2}
              fill={onColor}
              filter="url(#glow)"
            />,
          );
        }
      }
    });
  }
  return <>{dots}</>;
}

function DisplayBoard({ projects, username }) {
  const validProjects = projects.filter((p) => p.trim() !== "");
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef(null);
  const SVG_W = 900;
  const SVG_H = 300;
  const ON = "#ff0000";

  const rainDrops = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        cx: Math.floor(Math.random() * SVG_W),
        dur: 1 + Math.random() * 2,
        delay: Math.random() * 3,
      })),
    [],
  );

  useEffect(() => {
    if (validProjects.length <= 1) {
      setCurrentIdx(0);
      return;
    }
    timerRef.current = setInterval(
      () => setCurrentIdx((p) => (p + 1) % validProjects.length),
      5000,
    );
    return () => clearInterval(timerRef.current);
  }, [validProjects.length]);

  if (!validProjects.length) return null;

  return (
    <div
      style={{
        width: "100%",
        background: "#050505",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 0 40px #ff000022, inset 0 0 60px #0a0000",
        border: "2px solid #1a0000",
      }}
    >
      <div
        style={{
          background: "linear-gradient(90deg,#1a0000,#0d0000,#1a0000)",
          borderBottom: "1px solid #2a0000",
          padding: "6px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: c,
            }}
          />
        ))}
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#440000",
            marginLeft: 8,
          }}
        >
          DISPLAY BOARD — PROMINENT WORKS
        </span>
        {validProjects.length > 1 && (
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "#330000",
              marginLeft: "auto",
            }}
          >
            {currentIdx + 1}/{validProjects.length}
          </span>
        )}
      </div>
      <div style={{ padding: "4px 0" }}>
        <style>{`
          @keyframes blurTransition{0%{filter:blur(8px);opacity:0}15%{filter:blur(0);opacity:1}85%{filter:blur(0);opacity:1}100%{filter:blur(8px);opacity:0}}
          @keyframes drop{0%{transform:translateY(-20px);opacity:0}10%{opacity:1}80%{opacity:.8}100%{transform:translateY(${SVG_H}px);opacity:0}}
          .blur-animate{animation:blurTransition 5s infinite}
        `}</style>
        <svg
          width="100%"
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <rect width="8" height="8" fill="#030000" />
              <circle cx="4" cy="4" r="1.5" fill="#0d0000" />
            </pattern>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="board-clip">
              <rect width={SVG_W} height={SVG_H} />
            </clipPath>
          </defs>
          <rect width={SVG_W} height={SVG_H} fill="url(#dots)" />
          <g clipPath="url(#board-clip)">
            {rainDrops.map((d) => (
              <circle
                key={d.id}
                cx={d.cx}
                cy="0"
                r="1.5"
                fill={ON}
                filter="url(#glow)"
                style={{
                  animation: `drop ${d.dur}s ${d.delay}s infinite linear`,
                }}
              />
            ))}
          </g>
          <g
            clipPath="url(#board-clip)"
            key={currentIdx}
            className={validProjects.length > 1 ? "blur-animate" : ""}
            filter="url(#glow)"
          >
            <DotMatrixString
              str={validProjects[currentIdx].slice(0, 16)}
              y={60}
              totalW={SVG_W}
              onColor={ON}
            />
            <DotMatrixString str="★ 2" y={180} totalW={SVG_W} onColor={ON} />
          </g>
        </svg>
      </div>
    </div>
  );
}

const DEFAULT_STATE = {
  name: "John Doe",
  subtitle: "Full Stack Developer | Open Source Enthusiast",
  about:
    "I am a passionate software engineer building scalable web applications.",
  github: "dev-satyamjha",
  joinedDate: "Sept 2021",
  email: "",
  twitter: "",
  linkedin: "",
  leetcode: "",
  codeforces: "",
  codestats: "",
  instagram: "",
  facebook: "",
  snapchat: "",
  portfolio: "",
  customLinks: [],
  skills: ["JavaScript", "React", "Node.js", "Python"],
  customCategories: [],
  projects: ["", "", "", "", ""],
  displayBoard: true,
  statsDropdown: false,
  animations: {
    visitors: true,
    stats: true,
    streak: true,
    githubProfileSummary: true,
    topLangsCommit: true,
    topLangsRepo: true,
    pinball: false,
    snake: true,
    showLeetcodeHeatmap: true,
    showLeetcodeContest: true,
    codeforces: true,
  },
  dimensions: {
    displayBoard: { w: "", h: "", scale: "100%", x: 0, y: 0 },
    stats: { w: "", h: "", scale: "46%", x: 0, y: 0 },
    streak: { w: "", h: "", scale: "49%", x: 0, y: 0 },
    githubProfileSummary: { w: "", h: "", scale: "100%", x: 0, y: 0 },
    topLangsCommit: { w: "", h: "", scale: "49%", x: 0, y: 0 },
    topLangsRepo: { w: "", h: "", scale: "25%", x: 58, y: 0 },
    pinball: { w: "", h: "", scale: "100%", x: 0, y: 0 },
    visitors: { w: "", h: "", scale: "8%", x: 0, y: 0 },
    snake: { w: "", h: "", scale: "100%", x: 0, y: 0 },
    showLeetcodeHeatmap: { w: "", h: "", scale: "49%", x: 0, y: 0 },
    showLeetcodeContest: { w: "", h: "", scale: "39%", x: 20, y: 0 },
    codeforces: { w: "", h: "", scale: "100%", x: 0, y: 0 },
  },
  sectionOrder: [
    "board",
    "about",
    "skills",
    "customSkills",
    "funFact",
    "socials",
    "stats",
    "summary",
    "topLangs",
    "pinball",
    "visitors",
    "snake",
    "leetcode",
  ],
  snakeTitle: "Dev Snake",
  funFact: "I can solve a Rubik's cube in under a minute!",
};

function loadInitialState() {
  try {
    const saved = localStorage.getItem("devreadme-state");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.dimensions?.showLeetcodeContest) {
        localStorage.removeItem("devreadme-state");
        return DEFAULT_STATE;
      }
      return parsed;
    }
  } catch {}
  return DEFAULT_STATE;
}

const S = {
  label: {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: "4px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "0.85rem",
    boxSizing: "border-box",
    outline: "none",
  },
  sectionHead: {
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "var(--accent-color)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: "1px solid var(--border-color)",
  },
  card: {
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-color)",
    borderRadius: 8,
    padding: "14px",
    marginBottom: 10,
  },
  stepRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 10,
  },
  stepNum: {
    minWidth: 20,
    height: 20,
    borderRadius: "50%",
    background: "var(--accent-color)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.68rem",
    fontWeight: 700,
    flexShrink: 0,
    marginTop: 1,
  },
  stepText: {
    fontSize: "0.82rem",
    color: "var(--text-secondary)",
    lineHeight: 1.55,
  },
  chip: {
    display: "inline-block",
    background: "rgba(0,0,0,0.35)",
    border: "1px solid var(--border-color)",
    borderRadius: 4,
    padding: "1px 6px",
    fontFamily: "monospace",
    fontSize: "0.78rem",
    color: "var(--accent-color)",
  },
  btn: {
    padding: "8px 16px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.82rem",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "3px 8px",
    borderRadius: 4,
    fontSize: "0.75rem",
    cursor: "pointer",
    border: "1px solid var(--border-color)",
    background: "transparent",
    color: "var(--text-secondary)",
    transition: "all 0.12s",
  },
  tagSel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "3px 8px",
    borderRadius: 4,
    fontSize: "0.75rem",
    cursor: "pointer",
    border: "1px solid var(--accent-color)",
    background: "var(--accent-color)22",
    color: "var(--accent-color)",
    transition: "all 0.12s",
  },
  dimInput: {
    padding: "5px 7px",
    borderRadius: 4,
    border: "1px solid var(--border-color)",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    fontSize: "0.72rem",
    width: "100%",
    boxSizing: "border-box",
  },
  dimLabel: {
    fontSize: "0.62rem",
    color: "var(--text-secondary)",
    display: "block",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
};

export default function App() {
  const [theme, setTheme] = useState("elegant-black");
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);
  const [copiedSession, setCopiedSession] = useState(false);
  const [copiedYml, setCopiedYml] = useState(false);
  const [importText, setImportText] = useState("");
  const [selectedSnakeScheme, setSelectedSnakeScheme] = useState(0);
  const [formData, setFormData] = useState(loadInitialState);
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkIcon, setNewLinkIcon] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [newCustomSkill, setNewCustomSkill] = useState("");
  const [newCustomSkillIcon, setNewCustomSkillIcon] = useState("");

  useEffect(() => {
    localStorage.setItem("devreadme-state", JSON.stringify(formData));
  }, [formData]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const set = (name, value) => setFormData((p) => ({ ...p, [name]: value }));
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    set(name, type === "checkbox" ? checked : value);
  };
  const handleProjectChange = (index, value) => {
    const updated = [...formData.projects];
    updated[index] = value;
    set("projects", updated);
  };
  const toggleSkill = (skill) =>
    set(
      "skills",
      formData.skills.includes(skill)
        ? formData.skills.filter((s) => s !== skill)
        : [...formData.skills, skill],
    );
  const addCustomLink = () => {
    if (newLinkLabel.trim() && newLinkUrl.trim()) {
      set("customLinks", [
        ...formData.customLinks,
        {
          label: newLinkLabel.trim(),
          url: newLinkUrl.trim(),
          icon: newLinkIcon.trim() || newLinkLabel.trim(),
        },
      ]);
      setNewLinkLabel("");
      setNewLinkUrl("");
      setNewLinkIcon("");
    }
  };
  const removeCustomLink = (i) =>
    set(
      "customLinks",
      formData.customLinks.filter((_, idx) => idx !== i),
    );
  const addCustomCategory = () => {
    if (newCategoryName.trim()) {
      const id = Date.now();
      set("customCategories", [
        ...formData.customCategories,
        { id, title: newCategoryName.trim(), skills: [] },
      ]);
      setSelectedCatId(id);
      setNewCategoryName("");
    }
  };
  const addSkillToCustomCategory = () => {
    if (newCustomSkill.trim() && selectedCatId) {
      set(
        "customCategories",
        formData.customCategories.map((cat) => {
          if (
            cat.id !== selectedCatId ||
            cat.skills.some((s) => s.name === newCustomSkill.trim())
          )
            return cat;
          return {
            ...cat,
            skills: [
              ...cat.skills,
              {
                name: newCustomSkill.trim(),
                icon: newCustomSkillIcon.trim() || newCustomSkill.trim(),
              },
            ],
          };
        }),
      );
      setNewCustomSkill("");
      setNewCustomSkillIcon("");
    }
  };
  const removeCustomCategory = (id) =>
    set(
      "customCategories",
      formData.customCategories.filter((c) => c.id !== id),
    );
  const removeSkillFromCustomCategory = (catId, skillName) =>
    set(
      "customCategories",
      formData.customCategories.map((cat) =>
        cat.id === catId
          ? { ...cat, skills: cat.skills.filter((s) => s.name !== skillName) }
          : cat,
      ),
    );
  const updateCustomCategoryTitle = (catId, title) =>
    set(
      "customCategories",
      formData.customCategories.map((cat) =>
        cat.id === catId ? { ...cat, title } : cat,
      ),
    );
  const toggleAnimation = (anim) =>
    setFormData((p) => ({
      ...p,
      animations: { ...p.animations, [anim]: !p.animations[anim] },
    }));
  const handleDimensionChange = (key, prop, value) =>
    setFormData((p) => ({
      ...p,
      dimensions: {
        ...p.dimensions,
        [key]: { ...p.dimensions[key], [prop]: value },
      },
    }));
  const moveSection = (index, direction) => {
    setFormData((p) => {
      const order = [...p.sectionOrder];
      if (direction === -1 && index > 0)
        [order[index - 1], order[index]] = [order[index], order[index - 1]];
      else if (direction === 1 && index < order.length - 1)
        [order[index + 1], order[index]] = [order[index], order[index + 1]];
      return { ...p, sectionOrder: order };
    });
  };
  const handleImportState = () => {
    const s = importText.indexOf(STATE_PREFIX),
      e = importText.indexOf(STATE_SUFFIX, s + STATE_PREFIX.length);
    if (s !== -1 && e !== -1) {
      try {
        const parsed = JSON.parse(
          decodeURIComponent(
            atob(
              importText
                .substring(s + STATE_PREFIX.length, e)
                .replace(/[\r\n\s]+/g, ""),
            ),
          ),
        );
        setFormData(parsed);
        alert("Session restored!");
        setImportText("");
      } catch (err) {
        alert(`Failed: ${err.message}`);
      }
    } else {
      alert(
        "No valid session found. Paste the full text from Save Session tab.",
      );
    }
  };

  const getApiThemes = () => {
    switch (theme) {
      case "elegant-black":
        return {
          stats:
            "bg_color=000000&title_color=ffffff&text_color=8b949e&icon_color=ff0000&border_color=30363d",
          streak:
            "background=000000&border=30363d&stroke=30363d&ring=ff0000&fire=ff0000&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=8b949e&sideLabels=8b949e&dates=8b949e",
          activity:
            "bg_color=000000&color=8b949e&line=ff0000&point=ffffff&hide_border=true",
        };
      case "glassmorphic":
        return {
          stats:
            "bg_color=0f172a&title_color=38bdf8&text_color=94a3b8&icon_color=38bdf8&border_color=1e293b",
          streak:
            "background=0f172a&border=1e293b&stroke=1e293b&ring=38bdf8&fire=38bdf8&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=94a3b8&sideLabels=94a3b8&dates=94a3b8",
          activity:
            "bg_color=0f172a&color=94a3b8&line=38bdf8&point=ffffff&hide_border=true",
        };
      case "colorful":
        return {
          stats: "theme=radical",
          streak: "theme=radical",
          activity: "theme=radical&hide_border=true",
        };
      case "vibe-coded":
        return {
          stats: "theme=synthwave",
          streak: "theme=synthwave",
          activity: "theme=synthwave&hide_border=true",
        };
      case "game-orange":
        return {
          stats: "theme=gruvbox",
          streak: "theme=gruvbox",
          activity: "theme=gruvbox&hide_border=true",
        };
      default:
        return {
          stats: "theme=dark",
          streak: "theme=dark",
          activity: "theme=dark&hide_border=true",
        };
    }
  };

  const getTopHeader = () => {
    const safeDate = formData.joinedDate
      ? formData.joinedDate.trim().replace(/ /g, "%20")
      : "";
    const targetUrl = formData.github
      ? `https://github.com/${formData.github}`
      : "#";
    const joinedBadge = formData.joinedDate
      ? `<a href="${targetUrl}"><img align="right" src="https://img.shields.io/badge/Joined-${safeDate}-181717?style=for-the-badge&logo=github&logoColor=white" alt="Joined GitHub" /></a>`
      : "";
    return `<div>\n  ${joinedBadge}\n  <h1 align="left">Hi 👋, I'm ${formData.name || "Anonymous Developer"}</h1>\n  <h3 align="center">${formData.subtitle}</h3>\n</div>\n\n<br clear="both"/>\n\n`;
  };

  const generateMarkdown = (
    isPreview = false,
    currentOrder = formData.sectionOrder,
    includeState = false,
  ) => {
    const apiThemes = getApiThemes();
    const user = formData.github || "torvalds";
    const buildImg = (key, src, alt) => {
      const dim = formData.dimensions[key];
      if (!dim) return `<img src="${src}" alt="${alt}" width="100%" />\n`;
      const ySpace = "<br>\n".repeat(Number(dim.y) || 0);
      const xSpace = "&nbsp;".repeat(Number(dim.x) || 0);
      let attrs = "";
      if (dim.w?.trim()) attrs += `width="${dim.w}" `;
      if (dim.h?.trim()) attrs += `height="${dim.h}" `;
      if (!attrs && dim.scale?.trim()) attrs = `width="${dim.scale}" `;
      return `${ySpace}${xSpace}<img src="${src}" alt="${alt}" ${attrs.trim()} />\n`;
    };
    let md = getTopHeader();
    const analyticsGroup = [
      "stats",
      "summary",
      "pinball",
      "topLangs",
      "snake",
      "leetcode",
      "visitors",
    ];
    let analyticsRendered = false;
    const renderSection = (section) => {
      let s = "";
      switch (section) {
        case "visitors":
          if (formData.animations.visitors)
            s += `<p align="center">\n  <img src="https://api.iconify.design/mdi:eye.svg?color=yellow" height="28" alt="Views Icon" align="center" />&nbsp;\n  <img src="https://komarev.com/ghpvc/?username=${user}&style=for-the-badge&label=VIEWS&color=orange&labelColor=red" alt="Profile views" align="center" />\n</p>\n\n`;
          break;
        case "board":
          if (
            formData.displayBoard &&
            formData.projects.filter((p) => p.trim()).length > 0
          ) {
            const base = isPreview
              ? window.location.origin
              : "https://YOUR-ACTUAL-SITE.netlify.app";
            const validProj = formData.projects.filter((p) => p.trim());
            const boardUrl = `${base}/.netlify/functions/displayboard?user=${user}&repos=${encodeURIComponent(validProj.join(","))}`;
            s += `<div align="center">\n\n### 🏆 Prominent Works\n\n${buildImg("displayBoard", boardUrl, "Projects Display Board")}\n\n</div>\n\n`;
          }
          break;
        case "about":
          if (formData.about) s += `## 🚀 About Me\n${formData.about}\n\n`;
          break;
        case "skills":
          if (formData.skills.length > 0) {
            s += `## 💻 Core Tech Stack\n\n`;
            Object.entries(SKILLS_CATEGORIES).forEach(
              ([category, categorySkills]) => {
                const selected = categorySkills.filter((sk) =>
                  formData.skills.includes(sk),
                );
                if (selected.length > 0) {
                  s += `### ${category.replace(/_/g, " & ")}\n<p align="center">\n`;
                  selected.forEach((skill) => {
                    const safe = skill
                      .replace(/ /g, "%20")
                      .replace(/\+/g, "%2B")
                      .replace(/#/g, "%23");
                    s += `  <img src="https://img.shields.io/badge/${safe}-151515?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, "")}" alt="${skill}" />\n`;
                  });
                  s += `</p>\n\n`;
                }
              },
            );
          }
          break;
        case "customSkills":
          formData.customCategories.forEach((cat) => {
            if (cat.skills.length > 0) {
              s += `### ${cat.title}\n<p align="center">\n`;
              cat.skills.forEach((skillObj) => {
                if (skillObj.icon.startsWith("http")) {
                  s += `  <img src="${skillObj.icon}" height="28" alt="${skillObj.name}" title="${skillObj.name}" style="margin: 0 4px;" />\n`;
                } else {
                  const safe = skillObj.name
                    .replace(/ /g, "%20")
                    .replace(/\+/g, "%2B")
                    .replace(/#/g, "%23");
                  s += `  <img src="https://img.shields.io/badge/${safe}-151515?style=for-the-badge&logo=${skillObj.icon.toLowerCase().replace(/ /g, "")}" alt="${skillObj.name}" />\n`;
                }
              });
              s += `</p>\n\n`;
            }
          });
          break;
        case "funFact":
          if (formData.funFact)
            s += `<h3 align="center">🌟 <i>Fun Fact: ${formData.funFact}</i></h3>\n\n`;
          break;
        case "socials": {
          const hasSocials =
            formData.github ||
            formData.email ||
            formData.twitter ||
            formData.linkedin ||
            formData.leetcode ||
            formData.codestats ||
            formData.instagram ||
            formData.facebook ||
            formData.snapchat ||
            formData.portfolio ||
            formData.customLinks.length > 0;
          if (hasSocials) {
            s += `## 🌐 Socials\n<p align="center">\n`;
            if (formData.github)
              s += `  <a href="https://github.com/${formData.github}"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>&nbsp;&nbsp;\n`;
            if (formData.email)
              s += `  <a href="mailto:${formData.email}"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>&nbsp;&nbsp;\n`;
            if (formData.linkedin)
              s += `  <a href="${formData.linkedin.startsWith("http") ? formData.linkedin : `https://linkedin.com/in/${formData.linkedin}`}"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>&nbsp;&nbsp;\n`;
            if (formData.twitter)
              s += `  <a href="${formData.twitter.startsWith("http") ? formData.twitter : `https://x.com/${formData.twitter}`}"><img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>&nbsp;&nbsp;\n`;
            if (formData.leetcode)
              s += `  <a href="https://leetcode.com/u/${formData.leetcode}"><img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black" alt="LeetCode" /></a>&nbsp;&nbsp;\n`;
            if (formData.codestats)
              s += `  <a href="https://codestats.net/users/${formData.codestats}"><img src="https://img.shields.io/badge/Code::Stats-20262E?style=for-the-badge&logo=codeigniter&logoColor=white" alt="Code::Stats" /></a>&nbsp;&nbsp;\n`;
            if (formData.instagram)
              s += `  <a href="${formData.instagram.startsWith("http") ? formData.instagram : `https://instagram.com/${formData.instagram}`}"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>&nbsp;&nbsp;\n`;
            if (formData.facebook)
              s += `  <a href="${formData.facebook.startsWith("http") ? formData.facebook : `https://facebook.com/${formData.facebook}`}"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook" /></a>&nbsp;&nbsp;\n`;
            if (formData.snapchat)
              s += `  <a href="${formData.snapchat.startsWith("http") ? formData.snapchat : `https://snapchat.com/add/${formData.snapchat}`}"><img src="https://img.shields.io/badge/Snapchat-FFFC00?style=for-the-badge&logo=snapchat&logoColor=black" alt="Snapchat" /></a>&nbsp;&nbsp;\n`;
            if (formData.portfolio)
              s += `  <a href="${formData.portfolio.startsWith("http") ? formData.portfolio : `https://${formData.portfolio}`}"><img src="https://img.shields.io/badge/Portfolio-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>&nbsp;&nbsp;\n`;
            formData.customLinks.forEach((link) => {
              if (link.icon.startsWith("http"))
                s += `  <a href="${link.url}"><img src="${link.icon}" height="28" alt="${link.label}" title="${link.label}" /></a>&nbsp;&nbsp;\n`;
              else
                s += `  <a href="${link.url}"><img src="https://img.shields.io/badge/${link.label.replace(/ /g, "%20")}-4285F4?style=for-the-badge&logo=${link.icon.toLowerCase().replace(/ /g, "")}&logoColor=white" alt="${link.label}" /></a>&nbsp;&nbsp;\n`;
            });
            s += `</p>\n\n`;
          }
          break;
        }
        case "stats":
          if (formData.animations.streak || formData.animations.stats) {
            s += `<p align="center">\n`;
            if (formData.animations.streak)
              s += `  ${buildImg("streak", `https://streak-stats.demolab.com/?user=${user}&${apiThemes.streak}`, "Streak Stats")}`;
            if (formData.animations.stats)
              s += `  ${buildImg("stats", `https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&${apiThemes.stats}`, "GitHub Stats")}`;
            s += `</p>\n\n`;
          }
          break;
        case "summary":
          if (formData.animations.githubProfileSummary) {
            const themeName = apiThemes.stats.includes("theme=")
              ? apiThemes.stats.replace("theme=", "")
              : "dark";
            s += `<p align="center">\n  ${buildImg("githubProfileSummary", `https://metrics.lecoq.io/${user}?theme=${themeName}&base.header=false&base.activity=false&base.repositories=false&base.metadata=false&isocalendar=true&isocalendar.duration=half-year`, "GitHub Profile Metrics")}</p>\n\n`;
          }
          break;
        case "pinball":
          if (formData.animations.pinball)
            s += `<p align="center">\n  ${buildImg("pinball", `https://github-readme-activity-graph.vercel.app/graph?username=${user}&${apiThemes.activity}`, "Activity Graph")}</p>\n\n`;
          break;
        case "topLangs":
          if (
            formData.animations.topLangsCommit ||
            formData.animations.topLangsRepo
          ) {
            s += `<p align="center">\n`;
            if (formData.animations.topLangsCommit)
              s += `  ${buildImg("topLangsCommit", `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=donut&custom_title=Top%20Languages%20by%20Commit&${apiThemes.stats}`, "Top Languages by Commit")}`;
            if (formData.animations.topLangsRepo)
              s += `  ${buildImg("topLangsRepo", `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=donut-vertical&custom_title=Top%20Languages%20by%20Repo&${apiThemes.stats}`, "Top Languages by Repo")}`;
            s += `</p>\n\n`;
          }
          break;
        case "snake":
          if (formData.animations.snake) {
            const snakeSrc = isPreview
              ? `https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake-dark.svg`
              : `https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg`;
            s += `## 🐍 ${formData.snakeTitle || "Dev Snake"}\n<p align="center">\n  ${buildImg("snake", snakeSrc, formData.snakeTitle || "Dev Snake")}</p>\n\n`;
          }
          break;
        case "leetcode":
          if (
            (formData.leetcode &&
              (formData.animations.showLeetcodeHeatmap ||
                formData.animations.showLeetcodeContest)) ||
            (formData.codeforces && formData.animations.codeforces)
          )
            s += `## ⚔️ Arena Stats\n\n`;
          if (
            formData.leetcode &&
            (formData.animations.showLeetcodeHeatmap ||
              formData.animations.showLeetcodeContest)
          ) {
            s += `<p align="center">\n`;
            if (formData.animations.showLeetcodeHeatmap)
              s += `  ${buildImg("showLeetcodeHeatmap", `https://leetcard.jacoblin.cool/${formData.leetcode}?theme=dark&font=Inter&ext=heatmap`, "LeetCode Heatmap")}`;
            if (formData.animations.showLeetcodeContest)
              s += `  ${buildImg("showLeetcodeContest", `https://leetcard.jacoblin.cool/${formData.leetcode}?theme=dark&font=Inter&ext=contest`, "LeetCode Contest")}`;
            s += `</p>\n\n`;
          }
          if (formData.codeforces && formData.animations.codeforces)
            s += `<p align="center">\n  ${buildImg("codeforces", `https://codeforces-readme-stats.vercel.app/api/card?username=${formData.codeforces}&theme=tokyonight`, "Codeforces Stats")}</p>\n\n`;
          break;
        default:
          break;
      }
      return s;
    };
    currentOrder.forEach((section) => {
      if (analyticsGroup.includes(section)) {
        if (!analyticsRendered) {
          analyticsRendered = true;
          let buf = "";
          currentOrder
            .filter((s) => analyticsGroup.includes(s))
            .forEach((as) => {
              buf += renderSection(as);
            });
          if (buf.trim())
            md += formData.statsDropdown
              ? `<details>\n<summary><b>🏆 View Stats</b></summary>\n<br>\n\n${buf}</details>\n\n`
              : `<div align="center">\n\n### 🏆 View Stats\n\n</div>\n\n${buf}`;
        }
      } else {
        md += renderSection(section);
      }
    });
    if (includeState)
      md += `\n\n${STATE_PREFIX}${btoa(encodeURIComponent(JSON.stringify(formData)))}${STATE_SUFFIX}\n`;
    return md;
  };

  const generateSessionBlob = () =>
    `${STATE_PREFIX}${btoa(encodeURIComponent(JSON.stringify(formData)))}${STATE_SUFFIX}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      generateMarkdown(false, formData.sectionOrder, false),
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const copySession = () => {
    navigator.clipboard.writeText(generateSessionBlob());
    setCopiedSession(true);
    setTimeout(() => setCopiedSession(false), 2000);
  };

  const scheme = SNAKE_COLOR_SCHEMES[selectedSnakeScheme];
  const snakeYml = `name: Generate Snake\n\non:\n  schedule:\n    - cron: "0 0 * * *"\n  workflow_dispatch:\n\njobs:\n  generate:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: Platane/snk@v3\n        with:\n          github_user_name: \${{ github.repository_owner }}\n          outputs: |\n            dist/github-contribution-grid-snake.svg?palette=github&color_snake=%23${scheme.snake}&color_dots=${scheme.light}&color_background=%23${scheme.bg}\n            dist/github-contribution-grid-snake-dark.svg?palette=github-dark&color_snake=%23${scheme.snake}&color_dots=${scheme.dark}&color_background=%23${scheme.bg}\n        env:\n          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}\n\n      - uses: crazy-max/ghaction-github-pages@v3\n        with:\n          target_branch: output\n          build_dir: dist\n        env:\n          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`;

  const PreviewContent = () => {
    const validProjects = formData.projects.filter((p) => p.trim());
    const showBoard = formData.displayBoard && validProjects.length > 0;
    const boardIndex = formData.sectionOrder.indexOf("board");
    const beforeBoard =
      boardIndex > -1
        ? formData.sectionOrder.slice(0, boardIndex)
        : formData.sectionOrder;
    const afterBoard =
      boardIndex > -1 ? formData.sectionOrder.slice(boardIndex + 1) : [];
    const topStr = getTopHeader();
    const mdBefore =
      topStr + generateMarkdown(true, beforeBoard, false).replace(topStr, "");
    const mdAfter = generateMarkdown(true, afterBoard, false).replace(
      topStr,
      "",
    );
    return (
      <div className="markdown-preview custom-scrollbar">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{mdBefore}</ReactMarkdown>
        {showBoard && (
          <div
            style={{
              transform: `scale(${parseFloat(formData.dimensions.displayBoard.scale) / 100})`,
              transformOrigin: "top center",
              width: formData.dimensions.displayBoard.w || "100%",
              marginBottom: 16,
            }}
          >
            <DisplayBoard
              projects={formData.projects}
              username={formData.github}
            />
          </div>
        )}
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{mdAfter}</ReactMarkdown>
      </div>
    );
  };

  const Field = ({ name, label, placeholder, type = "text" }) => (
    <div style={{ marginBottom: 12 }}>
      <label style={S.label}>{label}</label>
      <input
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        style={S.input}
      />
    </div>
  );

  const animKeys = [
    { key: "visitors", label: "Profile Visitors Badge" },
    { key: "stats", label: "GitHub Stats" },
    { key: "streak", label: "GitHub Streak Stats" },
    { key: "githubProfileSummary", label: "GitHub Profile Metrics" },
    { key: "topLangsCommit", label: "Top Langs by Commit" },
    { key: "topLangsRepo", label: "Top Langs by Repo" },
    { key: "pinball", label: "Activity Graph" },
    { key: "snake", label: "Contribution Snake" },
    { key: "showLeetcodeHeatmap", label: "LeetCode Heatmap" },
    { key: "showLeetcodeContest", label: "LeetCode Contest" },
    { key: "codeforces", label: "Codeforces Stats" },
  ];

  return (
    <>
      <CursorBubbles />
      <div className="app-container">
        <header
          className="header"
          style={{
            borderBottom: "1px solid var(--border-color)",
            background: "var(--bg-primary)",
          }}
        >
          <div className="logo-area">
            <Sparkles className="logo-icon" size={18} />
            <h1 style={{ fontSize: "1rem", letterSpacing: "0.05em" }}>
              DevReadME
            </h1>
          </div>
          <div className="theme-selector" style={{ gap: 6 }}>
            <span
              className="theme-label"
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Theme
            </span>
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`theme-btn ${theme === t.id ? "active" : ""}`}
                style={{
                  backgroundColor: t.color,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border:
                    theme === t.id ? "2px solid #fff" : "2px solid transparent",
                }}
                onClick={() => setTheme(t.id)}
                title={t.name}
              />
            ))}
          </div>
        </header>

        <main className="main-content">
          <aside
            className="sidebar"
            style={{ borderRight: "1px solid var(--border-color)" }}
          >
            <div className="sidebar-scrollable" style={{ padding: "12px" }}>
              <div style={S.card}>
                <div style={S.sectionHead}>
                  <Globe size={13} /> Basic Info
                </div>
                <Field name="name" label="Full Name" placeholder="John Doe" />
                <Field
                  name="subtitle"
                  label="Subtitle"
                  placeholder="Full Stack Developer"
                />
                <div style={{ marginBottom: 12 }}>
                  <label style={S.label}>About Me</label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tell the world about yourself..."
                    style={{ ...S.input, resize: "vertical" }}
                  />
                </div>
                <Field
                  name="funFact"
                  label="Fun Fact"
                  placeholder="I can solve a Rubik's cube..."
                />
              </div>

              <div style={S.card}>
                <div style={S.sectionHead}>
                  <ImageIcon size={13} /> Display Board
                </div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    name="displayBoard"
                    checked={formData.displayBoard}
                    onChange={handleInputChange}
                  />
                  <span
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    Enable Display Board
                  </span>
                </label>
                {formData.displayBoard && (
                  <>
                    <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                      {[
                        { prop: "scale", label: "Scale" },
                        { prop: "w", label: "Width" },
                      ].map(({ prop, label }) => (
                        <div key={prop} style={{ flex: 1 }}>
                          <span style={S.dimLabel}>{label}</span>
                          <input
                            type="text"
                            value={formData.dimensions.displayBoard[prop]}
                            onChange={(e) =>
                              handleDimensionChange(
                                "displayBoard",
                                prop,
                                e.target.value,
                              )
                            }
                            style={S.dimInput}
                            placeholder={prop === "scale" ? "100%" : "650px"}
                          />
                        </div>
                      ))}
                    </div>
                    {formData.projects.map((proj, idx) => (
                      <div key={idx} style={{ marginBottom: 6 }}>
                        <input
                          value={proj}
                          onChange={(e) =>
                            handleProjectChange(idx, e.target.value)
                          }
                          placeholder={`Repo ${idx + 1} name`}
                          style={{ ...S.input, fontSize: "0.8rem" }}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div style={S.card}>
                <div style={S.sectionHead}>
                  <LinkIcon size={13} /> Socials & Platforms
                </div>
                {[
                  {
                    name: "github",
                    label: "GitHub Username",
                    placeholder: "torvalds",
                  },
                  {
                    name: "joinedDate",
                    label: "Joined Date",
                    placeholder: "Sept 2021",
                  },
                  {
                    name: "email",
                    label: "Email",
                    placeholder: "you@example.com",
                  },
                  {
                    name: "leetcode",
                    label: "LeetCode",
                    placeholder: "username",
                  },
                  {
                    name: "codeforces",
                    label: "Codeforces",
                    placeholder: "handle",
                  },
                  {
                    name: "codestats",
                    label: "Code::Stats",
                    placeholder: "username",
                  },
                  {
                    name: "twitter",
                    label: "X (Twitter)",
                    placeholder: "handle",
                  },
                  {
                    name: "linkedin",
                    label: "LinkedIn",
                    placeholder: "username or URL",
                  },
                  {
                    name: "instagram",
                    label: "Instagram",
                    placeholder: "handle",
                  },
                  {
                    name: "facebook",
                    label: "Facebook",
                    placeholder: "username",
                  },
                  {
                    name: "snapchat",
                    label: "Snapchat",
                    placeholder: "username",
                  },
                  {
                    name: "portfolio",
                    label: "Portfolio",
                    placeholder: "https://yoursite.com",
                  },
                ].map((f) => (
                  <Field key={f.name} {...f} />
                ))}

                <div
                  style={{
                    borderTop: "1px solid var(--border-color)",
                    paddingTop: 12,
                    marginTop: 4,
                  }}
                >
                  <div style={{ ...S.sectionHead, marginBottom: 8 }}>
                    + Custom Link
                  </div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <input
                      value={newLinkLabel}
                      onChange={(e) => setNewLinkLabel(e.target.value)}
                      placeholder="Label"
                      style={{ ...S.input, flex: 1 }}
                    />
                    <input
                      value={newLinkIcon}
                      onChange={(e) => setNewLinkIcon(e.target.value)}
                      placeholder="Icon / URL"
                      style={{ ...S.input, flex: 1 }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      placeholder="https://..."
                      style={{ ...S.input, flex: 1 }}
                    />
                    <button
                      onClick={addCustomLink}
                      style={{
                        ...S.btn,
                        background: "var(--accent-color)",
                        color: "#fff",
                        padding: "8px 12px",
                      }}
                    >
                      Add
                    </button>
                  </div>
                  {formData.customLinks.length > 0 && (
                    <div
                      style={{
                        marginTop: 8,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                      }}
                    >
                      {formData.customLinks.map((link, idx) => (
                        <div
                          key={idx}
                          style={S.tagSel}
                          onClick={() => removeCustomLink(idx)}
                        >
                          {link.label} <Trash2 size={10} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={S.card}>
                <div style={S.sectionHead}>
                  <Sparkles size={13} /> Metrics & Animations
                </div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    name="statsDropdown"
                    checked={formData.statsDropdown}
                    onChange={handleInputChange}
                  />
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Wrap Stats in Dropdown
                  </span>
                </label>
                {animKeys.map(({ key, label }) => (
                  <div
                    key={key}
                    style={{
                      marginBottom: 8,
                      background: "rgba(0,0,0,0.15)",
                      borderRadius: 6,
                      padding: "8px 10px",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        cursor: "pointer",
                        marginBottom: formData.animations[key] ? 8 : 0,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.animations[key]}
                        onChange={() => toggleAnimation(key)}
                      />
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
                        {label}
                      </span>
                    </label>
                    {formData.animations[key] && (
                      <div style={{ paddingLeft: 24 }}>
                        <div
                          style={{ display: "flex", gap: 6, marginBottom: 4 }}
                        >
                          {[
                            { prop: "scale", ph: "49%" },
                            { prop: "w", ph: "400px" },
                            { prop: "h", ph: "auto" },
                          ].map(({ prop, ph }) => (
                            <div key={prop} style={{ flex: 1 }}>
                              <span style={S.dimLabel}>{prop}</span>
                              <input
                                type="text"
                                value={formData.dimensions[key][prop]}
                                onChange={(e) =>
                                  handleDimensionChange(
                                    key,
                                    prop,
                                    e.target.value,
                                  )
                                }
                                placeholder={ph}
                                style={S.dimInput}
                              />
                            </div>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          {[
                            { prop: "x", ph: "0" },
                            { prop: "y", ph: "0" },
                          ].map(({ prop, ph }) => (
                            <div key={prop} style={{ flex: 1 }}>
                              <span style={S.dimLabel}>{prop}-offset</span>
                              <input
                                type="number"
                                value={formData.dimensions[key][prop]}
                                onChange={(e) =>
                                  handleDimensionChange(
                                    key,
                                    prop,
                                    e.target.value,
                                  )
                                }
                                placeholder={ph}
                                style={S.dimInput}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {formData.animations.snake && (
                  <div
                    style={{
                      marginTop: 4,
                      padding: "8px 10px",
                      background: "rgba(0,0,0,0.15)",
                      borderRadius: 6,
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <label style={S.label}>Snake Section Title</label>
                    <input
                      name="snakeTitle"
                      value={formData.snakeTitle}
                      onChange={handleInputChange}
                      placeholder="Dev Snake"
                      style={S.input}
                    />
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-secondary)",
                        marginTop: 6,
                      }}
                    >
                      Color scheme →{" "}
                      <strong style={{ color: "var(--accent-color)" }}>
                        Snake YML
                      </strong>{" "}
                      tab
                    </p>
                  </div>
                )}
              </div>

              <div style={S.card}>
                <div style={S.sectionHead}>
                  <Settings size={13} /> Section Order
                </div>
                {formData.sectionOrder.map((sec, idx) => (
                  <div
                    key={sec}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px 8px",
                      marginBottom: 4,
                      borderRadius: 4,
                      background: "rgba(0,0,0,0.15)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-primary)",
                        textTransform: "capitalize",
                      }}
                    >
                      {sec.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <div style={{ display: "flex", gap: 3 }}>
                      {[
                        { dir: -1, label: "↑", disabled: idx === 0 },
                        {
                          dir: 1,
                          label: "↓",
                          disabled: idx === formData.sectionOrder.length - 1,
                        },
                      ].map(({ dir, label, disabled }) => (
                        <button
                          key={dir}
                          onClick={() => moveSection(idx, dir)}
                          disabled={disabled}
                          style={{
                            width: 22,
                            height: 22,
                            padding: 0,
                            background: "var(--accent-color)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 3,
                            cursor: disabled ? "not-allowed" : "pointer",
                            opacity: disabled ? 0.35 : 1,
                            fontSize: "0.8rem",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={S.card}>
                <div style={S.sectionHead}>
                  <Code2 size={13} /> Skills Database
                </div>
                {Object.entries(SKILLS_CATEGORIES).map(([category, skills]) => (
                  <div key={category} style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: "var(--text-secondary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {category === "Games_Platforms" && <Gamepad2 size={11} />}
                      {category.replace(/_/g, " & ")}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          style={
                            formData.skills.includes(skill) ? S.tagSel : S.tag
                          }
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ ...S.card, borderColor: "var(--accent-color)" }}>
                <div style={S.sectionHead}>
                  <Plus size={13} /> Custom Skill Categories
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addCustomCategory();
                    }}
                    placeholder="Category name..."
                    style={{ ...S.input, flex: 1 }}
                  />
                  <button
                    onClick={addCustomCategory}
                    style={{
                      ...S.btn,
                      background: "var(--accent-color)",
                      color: "#fff",
                    }}
                  >
                    Create
                  </button>
                </div>
                {formData.customCategories.map((cat) => (
                  <div
                    key={cat.id}
                    style={{
                      marginBottom: 12,
                      background: "rgba(0,0,0,0.15)",
                      padding: "10px",
                      borderRadius: 6,
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 8,
                      }}
                    >
                      <input
                        type="text"
                        value={cat.title}
                        onChange={(e) =>
                          updateCustomCategoryTitle(cat.id, e.target.value)
                        }
                        style={{
                          background: "transparent",
                          border: "none",
                          borderBottom: "1px solid var(--accent-color)",
                          color: "var(--accent-color)",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          outline: "none",
                          flex: 1,
                        }}
                      />
                      <button
                        onClick={() => removeCustomCategory(cat.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ff4444",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                      <input
                        type="text"
                        value={selectedCatId === cat.id ? newCustomSkill : ""}
                        onFocus={() => setSelectedCatId(cat.id)}
                        onChange={(e) => {
                          setSelectedCatId(cat.id);
                          setNewCustomSkill(e.target.value);
                        }}
                        placeholder="Skill name"
                        style={{ ...S.input, flex: 1, fontSize: "0.78rem" }}
                      />
                      <input
                        type="text"
                        value={
                          selectedCatId === cat.id ? newCustomSkillIcon : ""
                        }
                        onFocus={() => setSelectedCatId(cat.id)}
                        onChange={(e) => {
                          setSelectedCatId(cat.id);
                          setNewCustomSkillIcon(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addSkillToCustomCategory();
                        }}
                        placeholder="Icon / URL"
                        style={{ ...S.input, flex: 1, fontSize: "0.78rem" }}
                      />
                      <button
                        onClick={() => {
                          setSelectedCatId(cat.id);
                          addSkillToCustomCategory();
                        }}
                        style={{
                          ...S.btn,
                          background: "var(--accent-color)",
                          color: "#fff",
                          padding: "0 10px",
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {cat.skills.map((skillObj) => (
                        <div
                          key={skillObj.name}
                          style={S.tagSel}
                          onClick={() =>
                            removeSkillFromCustomCategory(cat.id, skillObj.name)
                          }
                        >
                          {skillObj.name} <Trash2 size={10} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="preview-area">
            <div
              className="preview-header"
              style={{
                borderBottom: "1px solid var(--border-color)",
                padding: "0 12px",
                gap: 0,
              }}
            >
              <div className="preview-tabs" style={{ gap: 0 }}>
                {[
                  { id: "preview", icon: <Eye size={13} />, label: "Preview" },
                  { id: "code", icon: <Code2 size={13} />, label: "Markdown" },
                  {
                    id: "session",
                    icon: <Save size={13} />,
                    label: "Save Session",
                  },
                  {
                    id: "import",
                    icon: <RefreshCw size={13} />,
                    label: "Restore",
                  },
                  {
                    id: "snake",
                    icon: <Gamepad2 size={13} />,
                    label: "Snake YML",
                  },
                ].map(({ id, icon, label }) => (
                  <button
                    key={id}
                    className={`tab-btn ${activeTab === id ? "active" : ""}`}
                    onClick={() => setActiveTab(id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: "0.78rem",
                      padding: "10px 14px",
                      borderRadius: 0,
                      borderBottom:
                        activeTab === id
                          ? "2px solid var(--accent-color)"
                          : "2px solid transparent",
                    }}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  padding: "6px 0",
                }}
              >
                {activeTab === "code" && (
                  <button
                    className="copy-btn"
                    onClick={copyToClipboard}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: "0.78rem",
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy MD"}
                  </button>
                )}
                {activeTab === "session" && (
                  <button
                    className="copy-btn"
                    onClick={copySession}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: "0.78rem",
                    }}
                  >
                    {copiedSession ? <Check size={14} /> : <Copy size={14} />}
                    {copiedSession ? "Copied" : "Copy Session"}
                  </button>
                )}
              </div>
            </div>

            <div
              className="preview-container card"
              style={{ borderRadius: 0, border: "none", borderTop: "none" }}
            >
              {activeTab === "preview" && <PreviewContent />}

              {activeTab === "code" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid var(--border-color)",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      📋 How to publish your README
                    </div>
                    {[
                      {
                        n: 1,
                        text: (
                          <>
                            Go to{" "}
                            <strong>
                              github.com/your-username/your-username
                            </strong>{" "}
                            — create it if it doesn't exist.
                          </>
                        ),
                      },
                      {
                        n: 2,
                        text: (
                          <>
                            Edit <code style={S.chip}>README.md</code>, select
                            all, delete, paste the copied markdown.
                          </>
                        ),
                      },
                      {
                        n: 3,
                        text: (
                          <>
                            Replace{" "}
                            <code style={S.chip}>
                              YOUR-ACTUAL-SITE.netlify.app
                            </code>{" "}
                            with your real domain.
                          </>
                        ),
                      },
                      {
                        n: 4,
                        text: (
                          <>
                            Click <strong>Commit changes</strong>. Your profile
                            goes live instantly.
                          </>
                        ),
                      },
                    ].map(({ n, text }) => (
                      <div key={n} style={S.stepRow}>
                        <div style={S.stepNum}>{n}</div>
                        <div style={S.stepText}>{text}</div>
                      </div>
                    ))}
                  </div>
                  <pre
                    className="code-view custom-scrollbar"
                    style={{
                      flex: 1,
                      margin: 0,
                      borderRadius: 0,
                      padding: "16px",
                    }}
                  >
                    {generateMarkdown(false, formData.sectionOrder, false)}
                  </pre>
                </div>
              )}

              {activeTab === "session" && (
                <div style={{ padding: 16 }}>
                  <div style={S.card}>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      💾 Save Your Session
                    </div>
                    <p style={S.stepText}>
                      Your work auto-saves in this browser. To back it up or
                      move to another device, copy the blob below and store it
                      safely — in a note, gist, or message to yourself.
                    </p>
                  </div>
                  <div
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      borderRadius: 6,
                      padding: 12,
                      fontFamily: "monospace",
                      fontSize: "0.7rem",
                      color: "var(--text-secondary)",
                      wordBreak: "break-all",
                      maxHeight: 280,
                      overflowY: "auto",
                      lineHeight: 1.6,
                      marginBottom: 10,
                    }}
                  >
                    {generateSessionBlob()}
                  </div>
                  <button
                    onClick={copySession}
                    style={{
                      ...S.btn,
                      background: "var(--accent-color)",
                      color: "#fff",
                    }}
                  >
                    {copiedSession ? <Check size={14} /> : <Copy size={14} />}{" "}
                    {copiedSession ? "Copied!" : "Copy Session"}
                  </button>
                </div>
              )}

              {activeTab === "import" && (
                <div style={{ padding: 16 }}>
                  <div style={S.card}>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      🔄 Restore a Session
                    </div>
                    {[
                      {
                        n: 1,
                        text: "Go to Save Session tab and copy your blob, or open where you stored it.",
                      },
                      {
                        n: 2,
                        text: "Paste the full text below. It starts with <!--DEVREADME-STATE: and ends with -->.",
                      },
                      {
                        n: 3,
                        text: "Click Restore. All your settings load instantly.",
                      },
                    ].map(({ n, text }) => (
                      <div key={n} style={S.stepRow}>
                        <div style={S.stepNum}>{n}</div>
                        <div style={S.stepText}>{text}</div>
                      </div>
                    ))}
                  </div>
                  <textarea
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    placeholder="Paste session blob here..."
                    style={{
                      width: "100%",
                      height: 200,
                      padding: 12,
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-color)",
                      borderRadius: 6,
                      fontFamily: "monospace",
                      fontSize: "0.78rem",
                      marginBottom: 10,
                      boxSizing: "border-box",
                      resize: "vertical",
                    }}
                  />
                  <button
                    onClick={handleImportState}
                    style={{
                      ...S.btn,
                      background: "var(--accent-color)",
                      color: "#fff",
                    }}
                  >
                    Restore Session
                  </button>
                </div>
              )}

              {activeTab === "snake" && (
                <div style={{ padding: 16 }}>
                  <div style={S.card}>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      🐍 Contribution Snake Setup
                    </div>
                    {[
                      {
                        n: 1,
                        text: (
                          <>
                            Go to your profile repo:{" "}
                            <code style={S.chip}>
                              github.com/username/username
                            </code>
                          </>
                        ),
                      },
                      {
                        n: 2,
                        text: (
                          <>
                            <strong>Add file → Create new file</strong>, type:{" "}
                            <code style={S.chip}>
                              .github/workflows/snake.yml
                            </code>
                          </>
                        ),
                      },
                      {
                        n: 3,
                        text: (
                          <>
                            Pick a scheme below → Copy YML → paste into the file
                            → commit.
                          </>
                        ),
                      },
                      {
                        n: 4,
                        text: (
                          <>
                            <strong>
                              Settings → Actions → General → Workflow
                              permissions → Read and write
                            </strong>
                          </>
                        ),
                      },
                      {
                        n: 5,
                        text: (
                          <>
                            <strong>
                              Actions → Generate Snake → Run workflow
                            </strong>
                            . Creates the <code style={S.chip}>output</code>{" "}
                            branch with your SVG.
                          </>
                        ),
                      },
                      {
                        n: 6,
                        text: "Runs daily via cron. No fake commits — only writes to the output branch.",
                      },
                    ].map(({ n, text }) => (
                      <div key={n} style={S.stepRow}>
                        <div style={S.stepNum}>{n}</div>
                        <div style={S.stepText}>{text}</div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Color Scheme
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 14,
                    }}
                  >
                    {SNAKE_COLOR_SCHEMES.map((sc, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSnakeScheme(i)}
                        style={{
                          padding: "5px 12px",
                          borderRadius: 5,
                          border: `2px solid ${selectedSnakeScheme === i ? `#${sc.snake}` : "var(--border-color)"}`,
                          background:
                            selectedSnakeScheme === i
                              ? `#${sc.snake}22`
                              : "transparent",
                          color: `#${sc.snake}`,
                          fontWeight: 700,
                          cursor: "pointer",
                          fontSize: "0.78rem",
                          transition: "all 0.12s",
                        }}
                      >
                        {sc.label}
                      </button>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginBottom: 14,
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      { label: "Snake", color: `#${scheme.snake}` },
                      ...scheme.dark
                        .split(",")
                        .map((c, i) => ({
                          label: ["BG", "Lvl1", "Lvl2", "Lvl3", "Lvl4"][i],
                          color: c,
                        })),
                    ].map(({ label, color }) => (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 5,
                            background: color,
                            border: "1px solid var(--border-color)",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "0.62rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <pre
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      padding: 14,
                      borderRadius: 6,
                      border: "1px solid var(--border-color)",
                      fontFamily: "monospace",
                      fontSize: "0.75rem",
                      overflowX: "auto",
                      marginBottom: 10,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all",
                      lineHeight: 1.6,
                    }}
                  >
                    {snakeYml}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(snakeYml);
                      setCopiedYml(true);
                      setTimeout(() => setCopiedYml(false), 2000);
                    }}
                    style={{
                      ...S.btn,
                      background: "var(--accent-color)",
                      color: "#fff",
                    }}
                  >
                    {copiedYml ? <Check size={14} /> : <Copy size={14} />}{" "}
                    {copiedYml ? "Copied!" : "Copy YML"}
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
