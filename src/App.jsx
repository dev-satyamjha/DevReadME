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
  Star,
  GitFork,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const STATE_PREFIX = "";

const THEMES = [
  { id: "elegant-black", name: "Elegant Black", color: "#000000" },
  { id: "glassmorphic", name: "Glassmorphic", color: "#0f172a" },
  { id: "colorful", name: "Colorful", color: "#ec4899" },
  { id: "vibe-coded", name: "Vibe Coded", color: "#a91079" },
  { id: "game-orange", name: "Game Orange", color: "#ff8c00" },
  { id: "green-white", name: "Green + White", color: "#16a34a" },
  { id: "black-white", name: "Black + White", color: "#ffffff" },
  { id: "slate-minimal", name: "Slate Minimal", color: "#64748b" },
  { id: "neon-red", name: "Neon Red", color: "#ff003c" },
];

const PRESET_SCHEMES = [
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
    label: "Pure White",
    snake: "ffffff",
    bg: "000000",
    light: "#222222,#555555,#888888,#bbbbbb,#ffffff",
    dark: "#111111,#333333,#666666,#999999,#ffffff",
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
  {
    label: "Cyber Pink",
    snake: "f472b6",
    bg: "0d0010",
    light: "#ebedf0,#fbcfe8,#f9a8d4,#ec4899,#f472b6",
    dark: "#161b22,#3b0764,#6b21a8,#a21caf,#f472b6",
  },
  {
    label: "Solar Orange",
    snake: "f97316",
    bg: "0d0800",
    light: "#ebedf0,#fed7aa,#fb923c,#ea580c,#f97316",
    dark: "#161b22,#431407,#7c2d12,#c2410c,#f97316",
  },
  {
    label: "Ice Teal",
    snake: "22d3ee",
    bg: "000d10",
    light: "#ebedf0,#a5f3fc,#67e8f9,#06b6d4,#22d3ee",
    dark: "#161b22,#083344,#155e75,#0e7490,#22d3ee",
  },
  {
    label: "Monochrome",
    snake: "e5e7eb",
    bg: "111111",
    light: "#222,#555,#888,#bbb,#e5e7eb",
    dark: "#1a1a1a,#333,#555,#888,#e5e7eb",
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

function buildDots(str, y, pw, px, offsetX = null) {
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
            <circle
              key={`${i}-${ri}-${ci}`}
              cx={charX + ci * (DOT + GAP) + DOT / 2}
              cy={y + ri * (DOT + GAP) + DOT / 2}
              r={DOT / 2}
              fill={ON}
              filter="url(#glow)"
            />,
          );
        }
      }
    });
  }
  return dots;
}

function DisplayBoard({ projects }) {
  const validProjects = projects.filter((p) => p.trim() !== "");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const timerRef = useRef(null);
  const scrollRef = useRef(null);

  const innerPerimeter = (PW + PH) * 2;

  const rainDrops = useMemo(
    () =>
      Array.from({ length: 55 }).map((_, i) => ({
        id: i,
        cx: PX + Math.floor(Math.random() * PW),
        dur: (1 + Math.random() * 2).toFixed(2),
        delay: (Math.random() * 3).toFixed(2),
      })),
    [],
  );

  const currentName = validProjects[currentIdx] || "";
  const nameW = currentName.length * (CW + GAP * 3);
  const needsScroll = nameW > PW - 32;

  useEffect(() => {
    if (validProjects.length <= 1) {
      setCurrentIdx(0);
      return;
    }
    timerRef.current = setInterval(() => {
      setCurrentIdx((p) => (p + 1) % validProjects.length);
      setScrollX(0);
    }, 10000);
    return () => clearInterval(timerRef.current);
  }, [validProjects.length]);

  useEffect(() => {
    setScrollX(0);
    if (!needsScroll) return;
    let x = 0;
    scrollRef.current = setInterval(() => {
      x += 1.5;
      if (x > nameW + 20) x = -PW;
      setScrollX(x);
    }, 30);
    return () => clearInterval(scrollRef.current);
  }, [currentIdx, needsScroll, nameW]);

  if (!validProjects.length) return null;

  const TEXT_Y = PY + PH / 2 - 45;
  const STARS_Y = TEXT_Y + 75;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: BW,
        margin: "0 auto",
        background: "#060000",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 0 50px #ff000022, inset 0 0 60px #0a0000",
        border: "1.5px solid #1a0000",
      }}
    >
      <svg
        width="100%"
        viewBox={`0 0 ${BW} ${BH}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <pattern
            id="bgdots"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <rect width="8" height="8" fill="#040000" />
            <circle cx="4" cy="4" r="1.2" fill="#0b0000" />
          </pattern>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="redglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="innerclip">
            <rect x={PX} y={PY} width={PW} height={PH} />
          </clipPath>
          <style>{`
            @keyframes drop{0%{transform:translateY(-20px);opacity:0}10%{opacity:1}80%{opacity:.6}100%{transform:translateY(${PH}px);opacity:0}}
            @keyframes blurSlide{0%{opacity:0;filter:blur(6px)}15%{opacity:1;filter:blur(0)}80%{opacity:1;filter:blur(0)}100%{opacity:0;filter:blur(6px)}}
            @keyframes chase { 100% { stroke-dashoffset: -${innerPerimeter}; } }
          `}</style>
        </defs>
        <rect width={BW} height={BH} fill="url(#bgdots)" />

        {/* Cave of Maya inner border chase */}
        <rect
          x={PX}
          y={PY}
          width={PW}
          height={PH}
          fill="#0a0000"
          stroke="#330000"
          strokeWidth="2"
        />
        <rect
          x={PX}
          y={PY}
          width={PW}
          height={PH}
          fill="none"
          stroke={ON}
          strokeWidth="4"
          strokeDasharray={`250 ${innerPerimeter - 250}`}
          filter="url(#redglow)"
          style={{ animation: "chase 3s linear infinite" }}
        />

        <g clipPath="url(#innerclip)">
          {/* Green Matrix Rain */}
          {rainDrops.map((d) => (
            <circle
              key={d.id}
              cx={d.cx}
              cy={PY}
              r="1.5"
              fill="#00ff00"
              opacity="0.6"
              filter="url(#glow)"
              style={{
                animation: `drop ${d.dur}s ${d.delay}s infinite linear`,
              }}
            />
          ))}
          <g
            key={currentIdx}
            style={{
              animation:
                validProjects.length > 1 ? "blurSlide 10s infinite" : undefined,
            }}
          >
            {needsScroll ? (
              <g transform={`translate(${PX + 16 - scrollX}, 0)`}>
                {buildDots(currentName, TEXT_Y, nameW, 0, 0)}
              </g>
            ) : (
              buildDots(currentName, TEXT_Y, PW, PX)
            )}
            {buildDots(
              `★ ${validProjects[currentIdx] ? "2" : "0"}`,
              STARS_Y,
              PW,
              PX,
            )}
          </g>
        </g>

        {[
          [PX + 3, PY + 3],
          [PX + PW - 3, PY + 3],
          [PX + 3, PY + PH - 3],
          [PX + PW - 3, PY + PH - 3],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={6}
            fill={ON}
            filter="url(#redglow)"
            opacity={0.95}
          />
        ))}
      </svg>
    </div>
  );
}

const SnakePreview = ({ sc }) => {
  const L = [
    sc.darkL0 || "#000",
    sc.darkL1 || "#000",
    sc.darkL2 || "#000",
    sc.darkL3 || "#000",
    sc.darkL4 || "#000",
  ];
  const scColor = sc.snakeColor || "#fff";
  const bg = sc.bgColor || "#000";
  return (
    <div
      style={{
        marginTop: 12,
        background: bg,
        padding: "12px",
        borderRadius: 6,
        border: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <svg width="100%" viewBox="0 0 240 70">
        {Array.from({ length: 24 }).map((_, x) =>
          Array.from({ length: 7 }).map((_, y) => (
            <rect
              key={`${x}-${y}`}
              x={x * 10}
              y={y * 10}
              width="8"
              height="8"
              rx="2"
              fill={L[Math.floor(Math.random() * 2 + (x > 15 ? 2 : 0))]}
            />
          )),
        )}
        <path
          d="M14,34 L14,14 L54,14 L54,54 L94,54 L94,34 L154,34"
          fill="none"
          stroke={scColor}
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="154" cy="34" r="4" fill={scColor} />
      </svg>
    </div>
  );
};

const DEFAULT_SNAKE = {
  snakeColor: "#ffffff",
  bgColor: "#000000",
  commitL0: "#222222",
  commitL1: "#555555",
  commitL2: "#888888",
  commitL3: "#bbbbbb",
  commitL4: "#ffffff",
  darkL0: "#111111",
  darkL1: "#333333",
  darkL2: "#666666",
  darkL3: "#999999",
  darkL4: "#ffffff",
};

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
  snakeCustom: DEFAULT_SNAKE,
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
      return {
        ...DEFAULT_STATE,
        ...parsed,
        snakeCustom: parsed.snakeCustom || DEFAULT_SNAKE,
      };
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
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [formData, setFormData] = useState(loadInitialState);
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkIcon, setNewLinkIcon] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [newCustomSkill, setNewCustomSkill] = useState("");
  const [newCustomSkillIcon, setNewCustomSkillIcon] = useState("");
  const [githubStars, setGithubStars] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/dev-satyamjha/DevReadME")
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined)
          setGithubStars(data.stargazers_count);
      })
      .catch(() => {});
  }, []);

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

  const setSnakeField = (field, value) =>
    setFormData((p) => ({
      ...p,
      snakeCustom: { ...(p.snakeCustom || DEFAULT_SNAKE), [field]: value },
    }));

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
    const s = importText.indexOf(STATE_PREFIX);
    const e = importText.indexOf(STATE_SUFFIX, s + STATE_PREFIX.length);
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
        setFormData({
          ...DEFAULT_STATE,
          ...parsed,
          snakeCustom: parsed.snakeCustom || DEFAULT_SNAKE,
        });
        alert("Session restored!");
        setImportText("");
      } catch (err) {
        alert(`Failed: ${err.message}`);
      }
    } else
      alert(
        "No valid session found. Paste the full text from Save Session tab.",
      );
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
      case "green-white":
        return {
          stats:
            "bg_color=0a1f0a&title_color=4ade80&text_color=bbf7d0&icon_color=4ade80&border_color=166534",
          streak:
            "background=0a1f0a&border=166534&stroke=166534&ring=4ade80&fire=4ade80&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=bbf7d0&sideLabels=bbf7d0&dates=bbf7d0",
          activity:
            "bg_color=0a1f0a&color=bbf7d0&line=4ade80&point=ffffff&hide_border=true",
        };
      case "black-white":
        return {
          stats:
            "bg_color=000000&title_color=ffffff&text_color=aaaaaa&icon_color=ffffff&border_color=333333",
          streak:
            "background=000000&border=333333&stroke=333333&ring=ffffff&fire=cccccc&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=aaaaaa&sideLabels=aaaaaa&dates=aaaaaa",
          activity:
            "bg_color=000000&color=aaaaaa&line=ffffff&point=ffffff&hide_border=true",
        };
      case "slate-minimal":
        return {
          stats:
            "bg_color=0f172a&title_color=94a3b8&text_color=64748b&icon_color=94a3b8&border_color=1e293b",
          streak:
            "background=0f172a&border=1e293b&stroke=1e293b&ring=94a3b8&fire=94a3b8&currStreakNum=e2e8f0&sideNums=e2e8f0&currStreakLabel=64748b&sideLabels=64748b&dates=64748b",
          activity:
            "bg_color=0f172a&color=64748b&line=94a3b8&point=e2e8f0&hide_border=true",
        };
      case "neon-red":
        return {
          stats:
            "bg_color=0d0000&title_color=ff003c&text_color=ff6666&icon_color=ff003c&border_color=3a0000",
          streak:
            "background=0d0000&border=3a0000&stroke=3a0000&ring=ff003c&fire=ff003c&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=ff6666&sideLabels=ff6666&dates=ff6666",
          activity:
            "bg_color=0d0000&color=ff6666&line=ff003c&point=ffffff&hide_border=true",
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
            s += `<div align="center">\n\n### Prominent Works\n\n${buildImg("displayBoard", boardUrl, "Projects Display Board")}\n\n</div>\n\n`;
          }
          break;
        case "about":
          if (formData.about) s += `## About Me\n${formData.about}\n\n`;
          break;
        case "skills":
          if (formData.skills.length > 0) {
            s += `## Core Tech Stack\n\n`;
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
                if (skillObj.icon.startsWith("http"))
                  s += `  <img src="${skillObj.icon}" height="28" alt="${skillObj.name}" title="${skillObj.name}" style="margin: 0 4px;" />\n`;
                else {
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
            s += `<h3 align="center"><i>Fun Fact: ${formData.funFact}</i></h3>\n\n`;
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
            s += `## Socials\n<p align="center">\n`;
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
            s += `## ${formData.snakeTitle || "Dev Snake"}\n<p align="center">\n  ${buildImg("snake", snakeSrc, formData.snakeTitle || "Dev Snake")}</p>\n\n`;
          }
          break;
        case "leetcode":
          if (
            (formData.leetcode &&
              (formData.animations.showLeetcodeHeatmap ||
                formData.animations.showLeetcodeContest)) ||
            (formData.codeforces && formData.animations.codeforces)
          )
            s += `## Arena Stats\n\n`;
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
              ? `<details>\n<summary><b>View Stats</b></summary>\n<br>\n\n${buf}</details>\n\n`
              : `<div align="center">\n\n### View Stats\n\n</div>\n\n${buf}`;
        }
      } else md += renderSection(section);
    });

    if (includeState)
      md += `\n\n${STATE_PREFIX}${btoa(encodeURIComponent(JSON.stringify(formData)))}${STATE_SUFFIX}\n`;
    return md;
  };

  const generateSessionBlob = () =>
    `${STATE_PREFIX}${btoa(encodeURIComponent(JSON.stringify(formData)))}${STATE_SUFFIX}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      generateMarkdown(false, formData.sectionOrder, true),
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copySession = () => {
    navigator.clipboard.writeText(generateSessionBlob());
    setCopiedSession(true);
    setTimeout(() => setCopiedSession(false), 2000);
  };

  const copyYml = () => {
    navigator.clipboard.writeText(snakeYml);
    setCopiedYml(true);
    setTimeout(() => setCopiedYml(false), 2000);
  };

  const sc = formData.snakeCustom || DEFAULT_SNAKE;
  const safeHex = (val, def) => (val || def).replace("#", "");
  const lightDotsEncoded = [
    sc.commitL0,
    sc.commitL1,
    sc.commitL2,
    sc.commitL3,
    sc.commitL4,
  ]
    .map((c) => `%23${safeHex(c, "#fff")}`)
    .join(",");
  const darkDotsEncoded = [
    sc.darkL0,
    sc.darkL1,
    sc.darkL2,
    sc.darkL3,
    sc.darkL4,
  ]
    .map((c) => `%23${safeHex(c, "#fff")}`)
    .join(",");
  const snakeHex = safeHex(sc.snakeColor, "#fff");
  const bgHex = safeHex(sc.bgColor, "#000");

  const snakeYml = `name: Generate Snake

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v6
      - name: Generate snake
        uses: Platane/snk@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg?palette=github&color_snake=%23${snakeHex}&color_dots=${lightDotsEncoded}&color_background=%23${bgHex}
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark&color_snake=%23${snakeHex}&color_dots=${darkDotsEncoded}&color_background=%23${bgHex}
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
      - name: Push snake to output branch
        run: |
          sudo chown -R $USER:$USER dist
          cd dist
          git init
          git checkout -b output
          git add .
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git commit -m "chore: update dev snake animation"
          git push --force https://x-access-token:\${{ secrets.GITHUB_TOKEN }}@github.com/\${{ github.repository }}.git output`;

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
            <DisplayBoard projects={formData.projects} />
          </div>
        )}
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{mdAfter}</ReactMarkdown>
      </div>
    );
  };

  const Field = ({ name, label, placeholder }) => (
    <div style={{ marginBottom: 12 }}>
      <label style={S.label}>{label}</label>
      <input
        name={name}
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

  const ColorField = ({ field, label }) => (
    <div style={{ flex: 1, minWidth: 80 }}>
      <span style={S.dimLabel}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <input
          type="color"
          value={sc[field]}
          onChange={(e) => setSnakeField(field, e.target.value)}
          style={{
            width: 28,
            height: 28,
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            background: "none",
            padding: 0,
          }}
        />
        <input
          type="text"
          value={sc[field]}
          onChange={(e) => setSnakeField(field, e.target.value)}
          style={{
            ...S.dimInput,
            flex: 1,
            fontFamily: "monospace",
            fontSize: "0.68rem",
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <header
        className="header"
        style={{
          borderBottom: "1px solid var(--border-color)",
          background: "var(--bg-primary)",
        }}
      >
        <div
          className="logo-area"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Sparkles className="logo-icon" size={18} />
          <h1 style={{ fontSize: "1rem", letterSpacing: "0.05em", margin: 0 }}>
            DevReadME
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginLeft: "auto",
            marginRight: "20px",
          }}
        >
          <a
            href="https://github.com/dev-satyamjha/DevReadME"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              textDecoration: "none",
              color: "var(--text-primary)",
              fontSize: "0.8rem",
              fontWeight: 600,
              padding: "5px 10px",
              borderRadius: "6px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-color)";
              e.currentTarget.style.color = "var(--accent-color)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
          >
            <Star size={14} /> Star{" "}
            {githubStars > 0 && (
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "1px 5px",
                  borderRadius: "10px",
                  fontSize: "0.7rem",
                }}
              >
                {githubStars}
              </span>
            )}
          </a>
          <a
            href="https://github.com/dev-satyamjha/DevReadME/fork"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              textDecoration: "none",
              color: "var(--text-primary)",
              fontSize: "0.8rem",
              fontWeight: 600,
              padding: "5px 10px",
              borderRadius: "6px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-color)";
              e.currentTarget.style.color = "var(--accent-color)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
          >
            <GitFork size={14} /> Fork
          </a>
          <a
            href="https://github.com/dev-satyamjha/DevReadME"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-primary)", transition: "color 0.2s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent-color)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
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
                  theme === t.id
                    ? "2px solid var(--accent-color)"
                    : "2px solid var(--border-color)",
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
          style={{
            borderRight: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="sidebar-scrollable"
            style={{ padding: "12px", flex: 1 }}
          >
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
                          placeholder={prop === "scale" ? "100%" : "950px"}
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
                      <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
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
                                handleDimensionChange(key, prop, e.target.value)
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
                                handleDimensionChange(key, prop, e.target.value)
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
                    Color scheme in Snake YML tab
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
                      value={selectedCatId === cat.id ? newCustomSkillIcon : ""}
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

          <div
            style={{
              borderTop: "1px solid var(--border-color)",
              padding: "12px",
              textAlign: "center",
              fontSize: "0.7rem",
              color: "var(--text-secondary)",
              background: "rgba(0,0,0,0.1)",
            }}
          >
            <p style={{ margin: "0 0 8px 0" }}>
              Made with <span style={{ color: "var(--accent-color)" }}>❤️</span>{" "}
              by Satyam Jha
            </p>
            <a
              href="https://github.com/dev-satyamjha/DevReadME"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://komarev.com/ghpvc/?username=devreadmetool&style=flat-square&color=blue&label=VISITORS"
                alt="Visitors"
              />
            </a>
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
                  {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
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
                  {copiedSession ? <Check size={14} /> : <Copy size={14} />}{" "}
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
                    How to publish your README
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
                          and create the repo if needed.
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
                  {generateMarkdown(false, formData.sectionOrder, true)}
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
                    Save Your Session
                  </div>
                  <p style={S.stepText}>
                    Your work auto-saves in this browser. To back it up or move
                    to another device, copy the blob below and store it safely
                    in a note, gist, or message to yourself.
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
                    Restore a Session
                  </div>
                  {[
                    {
                      n: 1,
                      text: "Go to Save Session tab and copy your blob, or open where you stored it.",
                    },
                    {
                      n: 2,
                      text: "Paste the full text below. It starts with the state marker and ends with the closing tag.",
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
              <div
                style={{ padding: 16, height: "100%", overflow: "auto" }}
                className="custom-scrollbar"
              >
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
                    Contribution Snake Setup
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
                          Add file, type:{" "}
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
                          Customize colors below, copy YML, paste into the file,
                          commit.
                        </>
                      ),
                    },
                    {
                      n: 4,
                      text: (
                        <>
                          <strong>
                            Settings &gt; Actions &gt; General &gt; Workflow
                            permissions &gt; Read and write
                          </strong>
                        </>
                      ),
                    },
                    {
                      n: 5,
                      text: (
                        <>
                          <strong>
                            Actions &gt; Generate Snake &gt; Run workflow
                          </strong>
                          . Creates the <code style={S.chip}>output</code>{" "}
                          branch with your SVG.
                        </>
                      ),
                    },
                    {
                      n: 6,
                      text: "Runs daily via cron. No fake commits, only writes to the output branch.",
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
                  Live Preview
                </div>
                <SnakePreview sc={sc} />

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
                  Quick Presets
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 16,
                  }}
                >
                  {PRESET_SCHEMES.map((sc2, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedPreset(i);
                        setFormData((p) => ({
                          ...p,
                          snakeCustom: {
                            snakeColor: `#${sc2.snake}`,
                            bgColor: `#${sc2.bg}`,
                            commitL0: sc2.light.split(",")[0],
                            commitL1: sc2.light.split(",")[1],
                            commitL2: sc2.light.split(",")[2],
                            commitL3: sc2.light.split(",")[3],
                            commitL4: sc2.light.split(",")[4],
                            darkL0: sc2.dark.split(",")[0],
                            darkL1: sc2.dark.split(",")[1],
                            darkL2: sc2.dark.split(",")[2],
                            darkL3: sc2.dark.split(",")[3],
                            darkL4: sc2.dark.split(",")[4],
                          },
                        }));
                      }}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 5,
                        border: `2px solid ${selectedPreset === i ? `#${sc2.snake}` : "var(--border-color)"}`,
                        background:
                          selectedPreset === i
                            ? `#${sc2.snake}22`
                            : "transparent",
                        color: `#${sc2.snake}`,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        transition: "all 0.12s",
                      }}
                    >
                      {sc2.label}
                    </button>
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
                  Custom Colors
                </div>
                <div
                  style={{
                    ...S.card,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <ColorField field="snakeColor" label="Snake Skin" />
                    <ColorField field="bgColor" label="Background" />
                  </div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--text-secondary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginTop: 4,
                    }}
                  >
                    Light Mode Commit Levels (L0 = empty, L4 = max)
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {[
                      "commitL0",
                      "commitL1",
                      "commitL2",
                      "commitL3",
                      "commitL4",
                    ].map((f, i) => (
                      <ColorField key={f} field={f} label={`L${i}`} />
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--text-secondary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginTop: 4,
                    }}
                  >
                    Dark Mode Commit Levels
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["darkL0", "darkL1", "darkL2", "darkL3", "darkL4"].map(
                      (f, i) => (
                        <ColorField key={f} field={f} label={`D${i}`} />
                      ),
                    )}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    margin: "14px 0 8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Generated YML
                </div>
                <button
                  onClick={copyYml}
                  style={{
                    ...S.btn,
                    background: "var(--accent-color)",
                    color: "#fff",
                    marginBottom: 12,
                  }}
                >
                  {copiedYml ? <Check size={14} /> : <Copy size={14} />}{" "}
                  {copiedYml ? "Copied!" : "Copy YML"}
                </button>
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
                    overflowY: "auto",
                    maxHeight: 380,
                    whiteSpace: "pre",
                    lineHeight: 1.7,
                    marginBottom: 12,
                  }}
                >
                  {snakeYml}
                </pre>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
