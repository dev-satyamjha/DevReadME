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
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CursorBubbles from "./CursorBubbles";

const THEMES = [
  { id: "elegant-black", name: "Elegant Black", color: "#000000" },
  { id: "glassmorphic", name: "Glassmorphic", color: "#0f172a" },
  { id: "colorful", name: "Colorful", color: "#ec4899" },
  { id: "vibe-coded", name: "Vibe Coded", color: "#a91079" },
  { id: "game-orange", name: "Game Orange", color: "#ff8c00" },
];

const SNAKE_SKIN_OPTIONS = [
  { value: "#000000", label: "Black" },
  { value: "#ffffff", label: "White" },
  { value: "#d4a017", label: "Gold" },
  { value: "#216e39", label: "Green" },
  { value: "#ff0000", label: "Red" },
  { value: "#6e40c9", label: "Purple" },
  { value: "#1f6feb", label: "Blue" },
];

const SNAKE_FOOD_OPTIONS = [
  { value: "gold", label: "Golden Stars" },
  { value: "green", label: "Classic Green" },
  { value: "red", label: "Red Hot" },
  { value: "yellow", label: "Neon Yellow" },
  { value: "white", label: "White Minimal" },
  { value: "purple", label: "Violet Vibes" },
  { value: "blue", label: "Ocean Blue" },
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
    const ch = str[i];
    const matrix = MATRIX_FONT[ch] || MATRIX_FONT[" "];
    const charX = startX + i * (CHAR_WIDTH + DOT_GAP * 3);

    matrix.forEach((row, rowIdx) => {
      for (let colIdx = 0; colIdx < 5; colIdx++) {
        if ((row & (0x80 >> colIdx)) !== 0) {
          const cx = charX + colIdx * (DOT_SIZE + DOT_GAP) + DOT_SIZE / 2;
          const cy = y + rowIdx * (DOT_SIZE + DOT_GAP) + DOT_SIZE / 2;
          dots.push(
            <circle
              key={`${i}-${rowIdx}-${colIdx}`}
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

  const SVG_W = 650;
  const SVG_H = 440;
  const ON = "#ff0000";
  const OFF = "#1a0000";

  const rainDrops = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      cx: Math.floor(Math.random() * SVG_W),
      dur: 1 + Math.random() * 2,
      delay: Math.random() * 3,
    }));
  }, [SVG_W]);

  useEffect(() => {
    if (validProjects.length <= 1) {
      setCurrentIdx(0);
      return;
    }
    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % validProjects.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [validProjects.length]);

  if (validProjects.length === 0) return null;

  const currentProject = validProjects[currentIdx];
  const name = currentProject.slice(0, 12);
  const stars = "★ 2";
  const targetUrl = username
    ? `https://github.com/${username}/${currentProject}`
    : "#";

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      <style>
        {`
          @keyframes blurTransition {
            0% { filter: blur(8px); opacity: 0; }
            15% { filter: blur(0px); opacity: 1; }
            85% { filter: blur(0px); opacity: 1; }
            100% { filter: blur(8px); opacity: 0; }
          }
          @keyframes drop {
            0% { transform: translateY(-20px); opacity: 0; }
            10% { opacity: 1; }
            80% { opacity: 0.8; }
            100% { transform: translateY(${SVG_H}px); opacity: 0; }
          }
          .blur-animate {
            animation: blurTransition 5s infinite;
          }
        `}
      </style>
      <svg
        width="100%"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: SVG_W, borderRadius: 16 }}
      >
        <defs>
          <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#050100" />
            <circle cx="4" cy="4" r="2" fill="#110000" />
          </pattern>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width={SVG_W} height={SVG_H} fill="url(#dots)" rx="16" />
        <rect
          width={SVG_W}
          height={SVG_H}
          fill="none"
          rx="16"
          stroke="#110000"
          strokeWidth="12"
        />
        <g className="rain-container">
          {rainDrops.map((drop) => (
            <circle
              key={drop.id}
              cx={drop.cx}
              cy="0"
              r="2"
              fill={ON}
              filter="url(#glow)"
              style={{
                animation: `drop ${drop.dur}s ${drop.delay}s infinite linear`,
              }}
            />
          ))}
        </g>
        <g
          key={currentIdx}
          className={validProjects.length > 1 ? "blur-animate" : ""}
          filter="url(#glow)"
        >
          <DotMatrixString str={name} totalW={SVG_W} y={140} onColor={ON} />
          <DotMatrixString str={stars} totalW={SVG_W} y={260} onColor={ON} />
        </g>
        {validProjects.length > 1 && (
          <text
            x={SVG_W - 16}
            y={SVG_H - 16}
            fill={OFF}
            fontSize="14"
            fontFamily="monospace"
            textAnchor="end"
          >
            {currentIdx + 1}/{validProjects.length}
          </text>
        )}
      </svg>
    </a>
  );
}

export default function App() {
  const [theme, setTheme] = useState("elegant-black");
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: "John Doe",
    subtitle: "Full Stack Developer | Open Source Enthusiast",
    about:
      "I am a passionate software engineer building scalable web applications.",
    github: "johndoe",
    twitter: "",
    linkedin: "",
    leetcode: "",
    codeforces: "",
    codestats: "",
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
    },
    dimensions: {
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
    snakeSkinColor: "#ff0000",
    snakeFoodStyle: "white",
    snakeTitle: "Dev Snake",
    funFact: "I can solve a Rubik's cube in under a minute!",
  });

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCustomSkill, setNewCustomSkill] = useState("");
  const [newCustomSkillIcon, setNewCustomSkillIcon] = useState("");
  const [selectedCatId, setSelectedCatId] = useState(null);

  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkIcon, setNewLinkIcon] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProjectChange = (index, value) => {
    const updated = [...formData.projects];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, projects: updated }));
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const addCustomLink = () => {
    if (newLinkLabel.trim() && newLinkUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        customLinks: [
          ...prev.customLinks,
          {
            label: newLinkLabel.trim(),
            url: newLinkUrl.trim(),
            icon: newLinkIcon.trim() || newLinkLabel.trim(),
          },
        ],
      }));
      setNewLinkLabel("");
      setNewLinkUrl("");
      setNewLinkIcon("");
    }
  };

  const removeCustomLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      customLinks: prev.customLinks.filter((_, i) => i !== index),
    }));
  };

  const addCustomCategory = () => {
    if (newCategoryName.trim()) {
      const newId = Date.now();
      setFormData((prev) => ({
        ...prev,
        customCategories: [
          ...prev.customCategories,
          { id: newId, title: newCategoryName.trim(), skills: [] },
        ],
      }));
      setSelectedCatId(newId);
      setNewCategoryName("");
    }
  };

  const addSkillToCustomCategory = () => {
    if (newCustomSkill.trim() && selectedCatId) {
      setFormData((prev) => ({
        ...prev,
        customCategories: prev.customCategories.map((cat) => {
          if (cat.id === selectedCatId) {
            const skillExists = cat.skills.some(
              (s) => s.name === newCustomSkill.trim(),
            );
            if (!skillExists) {
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
            }
          }
          return cat;
        }),
      }));
      setNewCustomSkill("");
      setNewCustomSkillIcon("");
    }
  };

  const removeCustomCategory = (id) => {
    setFormData((prev) => ({
      ...prev,
      customCategories: prev.customCategories.filter((c) => c.id !== id),
    }));
  };

  const removeSkillFromCustomCategory = (catId, skillName) => {
    setFormData((prev) => ({
      ...prev,
      customCategories: prev.customCategories.map((cat) =>
        cat.id === catId
          ? { ...cat, skills: cat.skills.filter((s) => s.name !== skillName) }
          : cat,
      ),
    }));
  };

  const updateCustomCategoryTitle = (catId, newTitle) => {
    setFormData((prev) => ({
      ...prev,
      customCategories: prev.customCategories.map((cat) =>
        cat.id === catId ? { ...cat, title: newTitle } : cat,
      ),
    }));
  };

  const toggleAnimation = (anim) => {
    setFormData((prev) => ({
      ...prev,
      animations: { ...prev.animations, [anim]: !prev.animations[anim] },
    }));
  };

  const handleDimensionChange = (key, prop, value) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [key]: { ...prev.dimensions[key], [prop]: value },
      },
    }));
  };

  const moveSection = (index, direction) => {
    setFormData((prev) => {
      const newOrder = [...prev.sectionOrder];
      if (direction === -1 && index > 0) {
        [newOrder[index - 1], newOrder[index]] = [
          newOrder[index],
          newOrder[index - 1],
        ];
      } else if (direction === 1 && index < newOrder.length - 1) {
        [newOrder[index + 1], newOrder[index]] = [
          newOrder[index],
          newOrder[index + 1],
        ];
      }
      return { ...prev, sectionOrder: newOrder };
    });
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
          summaryFolder: "github-dark",
        };
      case "glassmorphic":
        return {
          stats:
            "bg_color=0f172a&title_color=38bdf8&text_color=94a3b8&icon_color=38bdf8&border_color=1e293b",
          streak:
            "background=0f172a&border=1e293b&stroke=1e293b&ring=38bdf8&fire=38bdf8&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=94a3b8&sideLabels=94a3b8&dates=94a3b8",
          activity:
            "bg_color=0f172a&color=94a3b8&line=38bdf8&point=ffffff&hide_border=true",
          summaryFolder: "tokyonight",
        };
      case "colorful":
        return {
          stats: "theme=radical",
          streak: "theme=radical",
          activity: "theme=radical&hide_border=true",
          summaryFolder: "radical",
        };
      case "vibe-coded":
        return {
          stats: "theme=synthwave",
          streak: "theme=synthwave",
          activity: "theme=synthwave&hide_border=true",
          summaryFolder: "synthwave",
        };
      case "game-orange":
        return {
          stats: "theme=gruvbox",
          streak: "theme=gruvbox",
          activity: "theme=gruvbox&hide_border=true",
          summaryFolder: "gruvbox",
        };
      default:
        return {
          stats: "theme=dark",
          streak: "theme=dark",
          activity: "theme=dark&hide_border=true",
          summaryFolder: "dark",
        };
    }
  };

  const generateMarkdown = (isPreview = false) => {
    const apiThemes = getApiThemes();
    const user = formData.github || "torvalds";

    const buildImg = (key, src, alt, extraStyle = "") => {
      const dim = formData.dimensions[key];
      if (!dim) return `<img src="${src}" alt="${alt}" width="100%" />\n`;
      const ySpace = "<br>\n".repeat(Number(dim.y) || 0);
      const xSpace = "&nbsp;".repeat(Number(dim.x) || 0);
      let attrs = "";
      if (dim.w && dim.w.trim() !== "") attrs += `width="${dim.w}" `;
      if (dim.h && dim.h.trim() !== "") attrs += `height="${dim.h}" `;
      if (attrs === "" && dim.scale && dim.scale.trim() !== "") {
        attrs = `width="${dim.scale}" `;
      }
      return `${ySpace}${xSpace}<img src="${src}" alt="${alt}" ${attrs.trim()}${extraStyle ? ` style="${extraStyle}"` : ""} />\n`;
    };

    let md = `<div align="center">\n  <h1>Hi 👋, I'm ${formData.name || "Anonymous Developer"}</h1>\n  <h3>${formData.subtitle}</h3>\n</div>\n\n`;

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
      let secMd = "";
      switch (section) {
        case "visitors":
          if (formData.animations.visitors) {
            const labelText = "VIEWS";
            const eyeColor = "yellow";
            const boxColor = "orange";
            const labelBgColor = "red";
            const eyeIconUrl = `https://api.iconify.design/mdi:eye.svg?color=${eyeColor}`;
            const badgeUrl = `https://komarev.com/ghpvc/?username=${user}&style=for-the-badge&label=${labelText}&color=${boxColor}&labelColor=${labelBgColor}`;

            secMd += `<p align="center">\n`;
            secMd += `  <img src="${eyeIconUrl}" height="28" alt="Views Icon" style="vertical-align: middle; margin-right: 4px;" />\n`;
            secMd += `  ${buildImg("visitors", badgeUrl, "Profile views", "vertical-align: middle;")}`;
            secMd += `</p>\n\n`;
          }
          break;
        case "board":
          if (
            formData.displayBoard &&
            formData.projects.filter((p) => p.trim() !== "").length > 0
          ) {
            const base = isPreview
              ? window.location.origin
              : "https://YOUR_DEPLOY_URL";
            const validProj = formData.projects.filter((p) => p.trim() !== "");
            const boardUrl = `${base}/.netlify/functions/seven-segment?user=${user}&repos=${encodeURIComponent(validProj.join(","))}`;

            secMd += `<div align="center">\n\n### 🏆 Prominent Works\n\n`;
            secMd += `<a href="https://github.com/${user}/${validProj[0]}">\n`;
            secMd += `  <img src="${boardUrl}" width="100%" alt="Projects Display Board" />\n`;
            secMd += `</a>\n\n</div>\n\n`;
          }
          break;
        case "about":
          if (formData.about) secMd += `## 🚀 About Me\n${formData.about}\n\n`;
          break;
        case "skills":
          if (formData.skills.length > 0) {
            secMd += `## 💻 Core Tech Stack\n\n`;
            Object.entries(SKILLS_CATEGORIES).forEach(
              ([category, categorySkills]) => {
                const selected = categorySkills.filter((s) =>
                  formData.skills.includes(s),
                );
                if (selected.length > 0) {
                  secMd += `### ${category.replace(/_/g, " & ")}\n<p align="center">\n`;
                  selected.forEach((skill) => {
                    const safeName = skill
                      .replace(/ /g, "%20")
                      .replace(/\+/g, "%2B")
                      .replace(/#/g, "%23");
                    secMd += `  <img src="https://img.shields.io/badge/${safeName}-151515?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, "")}" alt="${skill}" />\n`;
                  });
                  secMd += `</p>\n\n`;
                }
              },
            );
          }
          break;
        case "customSkills":
          formData.customCategories.forEach((cat) => {
            if (cat.skills.length > 0) {
              secMd += `### ${cat.title}\n<p align="center">\n`;
              cat.skills.forEach((skillObj) => {
                if (skillObj.icon.startsWith("http")) {
                  secMd += `  <img src="${skillObj.icon}" height="28" alt="${skillObj.name}" title="${skillObj.name}" style="margin: 0 4px;" />\n`;
                } else {
                  const safeName = skillObj.name
                    .replace(/ /g, "%20")
                    .replace(/\+/g, "%2B")
                    .replace(/#/g, "%23");
                  const safeIcon = skillObj.icon
                    .toLowerCase()
                    .replace(/ /g, "");
                  secMd += `  <img src="https://img.shields.io/badge/${safeName}-151515?style=for-the-badge&logo=${safeIcon}" alt="${skillObj.name}" />\n`;
                }
              });
              secMd += `</p>\n\n`;
            }
          });
          break;
        case "funFact":
          if (formData.funFact)
            secMd += `<h3 align="center">🌟 <i>Fun Fact: ${formData.funFact}</i></h3>\n\n`;
          break;
        case "socials":
          if (
            formData.github ||
            formData.twitter ||
            formData.linkedin ||
            formData.codestats ||
            formData.customLinks.length > 0
          ) {
            secMd += `## 🌐 Connect with me\n<p align="center">\n`;
            if (formData.github)
              secMd += `  <a href="https://github.com/${formData.github}"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github" alt="GitHub" /></a>\n`;
            if (formData.linkedin)
              secMd += `  <a href="https://linkedin.com/in/${formData.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin" alt="LinkedIn" /></a>\n`;
            if (formData.twitter)
              secMd += `  <a href="https://twitter.com/${formData.twitter}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter" alt="Twitter" /></a>\n`;
            if (formData.codestats)
              secMd += `  <a href="https://codestats.net/users/${formData.codestats}"><img src="https://img.shields.io/badge/Code::Stats-1F2937?style=for-the-badge&logo=codeforces" alt="Code::Stats" /></a>\n`;
            formData.customLinks.forEach((link) => {
              if (link.icon.startsWith("http")) {
                secMd += `  <a href="${link.url}"><img src="${link.icon}" height="28" alt="${link.label}" title="${link.label}" style="margin: 0 4px;" /></a>\n`;
              } else {
                const safeIcon = link.icon.toLowerCase().replace(/ /g, "");
                secMd += `  <a href="${link.url}"><img src="https://img.shields.io/badge/${link.label.replace(/ /g, "%20")}-4285F4?style=for-the-badge&logo=${safeIcon}" alt="${link.label}" /></a>\n`;
              }
            });
            secMd += `</p>\n\n`;
          }
          break;
        case "stats":
          if (formData.animations.streak || formData.animations.stats) {
            secMd += `<p align="center">\n`;
            if (formData.animations.streak)
              secMd += `  ${buildImg("streak", `https://streak-stats.demolab.com/?user=${user}&${apiThemes.streak}`, "Streak Stats")}`;
            if (formData.animations.stats)
              secMd += `  ${buildImg("stats", `https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&${apiThemes.stats}`, "GitHub Stats")}`;
            secMd += `</p>\n\n`;
          }
          break;
        case "summary":
          if (formData.animations.githubProfileSummary) {
            const summarySrc = isPreview
              ? `https://placehold.co/800x200/111827/4ade80?text=Profile+Summary+Graph+(Requires+GitHub+Action)`
              : `profile-summary-card-output/${apiThemes.summaryFolder}/0-profile-details.svg`;
            secMd += `<p align="center">\n  ${buildImg("githubProfileSummary", summarySrc, "GitHub Profile Summary")}</p>\n\n`;
          }
          break;
        case "pinball":
          if (formData.animations.pinball) {
            secMd += `<p align="center">\n  ${buildImg("pinball", `https://github-readme-activity-graph.vercel.app/graph?username=${user}&${apiThemes.activity}`, "Activity Graph")}</p>\n\n`;
          }
          break;
        case "topLangs":
          if (
            formData.animations.topLangsCommit ||
            formData.animations.topLangsRepo
          ) {
            secMd += `<p align="center">\n`;
            if (formData.animations.topLangsCommit)
              secMd += `  ${buildImg("topLangsCommit", `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=donut&custom_title=Top%20Languages%20by%20Commit&${apiThemes.stats}`, "Top Languages by Commit")}`;
            if (formData.animations.topLangsRepo)
              secMd += `  ${buildImg("topLangsRepo", `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=donut-vertical&custom_title=Top%20Languages%20by%20Repo&${apiThemes.stats}`, "Top Languages by Repo")}`;
            secMd += `</p>\n\n`;
          }
          break;
        case "snake":
          if (formData.animations.snake) {
            const snakeSrc = isPreview
              ? `https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake-dark.svg`
              : `https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg`;
            secMd += `<p align="center">\n  ${buildImg("snake", snakeSrc, formData.snakeTitle || "Dev Snake")}</p>\n\n`;
          }
          break;
        case "leetcode":
          if (
            (formData.leetcode &&
              (formData.animations.showLeetcodeHeatmap ||
                formData.animations.showLeetcodeContest)) ||
            formData.codeforces
          ) {
            if (
              formData.leetcode &&
              (formData.animations.showLeetcodeHeatmap ||
                formData.animations.showLeetcodeContest)
            ) {
              secMd += `<p align="center">\n`;
              if (formData.animations.showLeetcodeHeatmap)
                secMd += `  ${buildImg("showLeetcodeHeatmap", `https://leetcard.jacoblin.cool/${formData.leetcode}?theme=dark&font=Inter&ext=heatmap`, "LeetCode Heatmap")}`;
              if (formData.animations.showLeetcodeContest)
                secMd += `  ${buildImg("showLeetcodeContest", `https://leetcard.jacoblin.cool/${formData.leetcode}?theme=dark&font=Inter&ext=contest`, "LeetCode Contest")}`;
              secMd += `</p>\n\n`;
            }
            if (formData.codeforces) {
              secMd += `<p align="center">\n  <img src="https://codeforces-readme-stats.vercel.app/api/card?username=${formData.codeforces}&theme=tokyonight" alt="Codeforces Stats" width="100%" />\n</p>\n\n`;
            }
          }
          break;
        default:
          break;
      }
      return secMd;
    };

    formData.sectionOrder.forEach((section) => {
      if (analyticsGroup.includes(section)) {
        if (!analyticsRendered) {
          analyticsRendered = true;
          let analyticsBuffer = "";
          const orderedAnalytics = formData.sectionOrder.filter((s) =>
            analyticsGroup.includes(s),
          );
          orderedAnalytics.forEach((as) => {
            analyticsBuffer += renderSection(as);
          });
          if (analyticsBuffer.trim() !== "") {
            if (formData.statsDropdown) {
              md += `<details>\n<summary><b>🏆 View Stats</b></summary>\n<br>\n\n${analyticsBuffer}</details>\n\n`;
            } else {
              md += `<div align="center">\n\n### 🏆 View Stats\n\n</div>\n\n${analyticsBuffer}`;
            }
          }
        }
      } else {
        md += renderSection(section);
      }
    });

    return md;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMarkdown(false));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PreviewContent = () => {
    const validProjects = formData.projects.filter((p) => p.trim() !== "");
    const showBoard = formData.displayBoard && validProjects.length > 0;

    const mdWithoutBoard = (() => {
      const tempOrder = [...formData.sectionOrder];
      const boardIndex = tempOrder.indexOf("board");
      if (boardIndex > -1) tempOrder.splice(boardIndex, 1);

      const beforeBoard = tempOrder.filter(
        (sec) =>
          formData.sectionOrder.indexOf(sec) <
          formData.sectionOrder.indexOf("board"),
      );

      let md = `<div align="center">\n  <h1>Hi 👋, I'm ${formData.name || "Anonymous Developer"}</h1>\n  <h3>${formData.subtitle}</h3>\n</div>\n\n`;

      const oldOrder = formData.sectionOrder;
      formData.sectionOrder = beforeBoard;
      md += generateMarkdown(true).replace(
        `<div align="center">\n  <h1>Hi 👋, I'm ${formData.name || "Anonymous Developer"}</h1>\n  <h3>${formData.subtitle}</h3>\n</div>\n\n`,
        "",
      );
      formData.sectionOrder = oldOrder;

      if (showBoard) {
        md += `<div align="center">\n\n### 🏆 Prominent Works\n\n</div>\n\n`;
      }
      return md;
    })();

    const mdRest = (() => {
      const tempOrder = [...formData.sectionOrder];
      const afterBoard = tempOrder.filter(
        (sec) =>
          formData.sectionOrder.indexOf(sec) >
          formData.sectionOrder.indexOf("board"),
      );

      const oldOrder = formData.sectionOrder;
      formData.sectionOrder = afterBoard;
      let md = generateMarkdown(true).replace(
        `<div align="center">\n  <h1>Hi 👋, I'm ${formData.name || "Anonymous Developer"}</h1>\n  <h3>${formData.subtitle}</h3>\n</div>\n\n`,
        "",
      );
      formData.sectionOrder = oldOrder;
      return md;
    })();

    return (
      <div className="markdown-preview custom-scrollbar">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {mdWithoutBoard}
        </ReactMarkdown>
        {showBoard && (
          <DisplayBoard
            projects={formData.projects}
            username={formData.github}
          />
        )}
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{mdRest}</ReactMarkdown>
      </div>
    );
  };

  return (
    <>
      <CursorBubbles />
      <div className="app-container">
        <header className="header">
          <div className="logo-area">
            <Sparkles className="logo-icon" size={20} />
            <h1>DevReadME</h1>
          </div>
          <div className="theme-selector">
            <span className="theme-label">Theme:</span>
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`theme-btn ${theme === t.id ? "active" : ""}`}
                style={{ backgroundColor: t.color }}
                onClick={() => setTheme(t.id)}
                title={t.name}
              />
            ))}
          </div>
        </header>

        <main className="main-content">
          <aside className="sidebar">
            <div className="sidebar-scrollable">
              <div className="card">
                <h3 className="section-title">
                  <Globe size={18} /> Basic Info
                </h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label>Subtitle / Tagline</label>
                  <input
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="Full Stack Developer"
                  />
                </div>
                <div className="form-group">
                  <label>About Me</label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tell the world about yourself..."
                  />
                </div>
                <div className="form-group">
                  <label>Fun Fact</label>
                  <input
                    name="funFact"
                    value={formData.funFact}
                    onChange={handleInputChange}
                    placeholder="I can solve a Rubik's cube..."
                  />
                </div>
              </div>

              <div className="card">
                <h3 className="section-title">
                  <ImageIcon size={18} /> Display Board &amp; Projects
                </h3>
                <label
                  className="checkbox-label"
                  style={{ marginBottom: "1rem", width: "100%" }}
                >
                  <input
                    type="checkbox"
                    name="displayBoard"
                    checked={formData.displayBoard}
                    onChange={handleInputChange}
                  />
                  <span style={{ fontWeight: 600 }}>Enable Display Board</span>
                </label>

                {formData.displayBoard &&
                  formData.projects.map((proj, idx) => (
                    <div
                      className="form-group"
                      key={idx}
                      style={{ marginBottom: "0.5rem" }}
                    >
                      <input
                        value={proj}
                        onChange={(e) =>
                          handleProjectChange(idx, e.target.value)
                        }
                        placeholder={`Project ${idx + 1} repo name`}
                      />
                    </div>
                  ))}
              </div>

              <div className="card">
                <h3 className="section-title">
                  <LinkIcon size={18} /> Social &amp; Platforms
                </h3>
                {[
                  {
                    name: "github",
                    label: "GitHub Username (Crucial)",
                    placeholder: "torvalds",
                  },
                  {
                    name: "leetcode",
                    label: "LeetCode Username",
                    placeholder: "your_leetcode",
                  },
                  {
                    name: "codeforces",
                    label: "Codeforces Handle",
                    placeholder: "tourist",
                  },
                  {
                    name: "twitter",
                    label: "Twitter / X",
                    placeholder: "elonmusk",
                  },
                  {
                    name: "linkedin",
                    label: "LinkedIn",
                    placeholder: "williamgates",
                  },
                ].map((f) => (
                  <div className="form-group" key={f.name}>
                    <label>{f.label}</label>
                    <input
                      name={f.name}
                      value={formData[f.name]}
                      onChange={handleInputChange}
                      placeholder={f.placeholder}
                    />
                  </div>
                ))}

                <div
                  style={{
                    marginTop: "1rem",
                    borderTop: "1px solid var(--border-color)",
                    paddingTop: "1rem",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "var(--accent-color)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    + Add Custom Link
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <input
                      value={newLinkLabel}
                      onChange={(e) => setNewLinkLabel(e.target.value)}
                      placeholder="Label (e.g. Portfolio)"
                      style={{
                        flex: 1,
                        padding: "0.6rem",
                        borderRadius: "6px",
                        border: "1px solid var(--border-color)",
                        background: "var(--input-bg)",
                        color: "var(--text-primary)",
                      }}
                    />
                    <input
                      value={newLinkIcon}
                      onChange={(e) => setNewLinkIcon(e.target.value)}
                      placeholder="Icon Name or URL"
                      style={{
                        flex: 1,
                        padding: "0.6rem",
                        borderRadius: "6px",
                        border: "1px solid var(--border-color)",
                        background: "var(--input-bg)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      placeholder="https://yoursite.com"
                      style={{
                        flex: 1,
                        padding: "0.6rem",
                        borderRadius: "6px",
                        border: "1px solid var(--border-color)",
                        background: "var(--input-bg)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                      }}
                    />
                    <button
                      onClick={addCustomLink}
                      className="add-skill-btn"
                      style={{ width: "auto", padding: "0 0.8rem" }}
                    >
                      Add
                    </button>
                  </div>
                  {formData.customLinks.length > 0 && (
                    <div
                      style={{
                        marginTop: "0.75rem",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      {formData.customLinks.map((link, idx) => (
                        <div
                          key={idx}
                          className="skill-tag selected"
                          onClick={() => removeCustomLink(idx)}
                        >
                          {link.label}{" "}
                          <Trash2 size={12} style={{ marginLeft: "4px" }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <h3 className="section-title">
                  <Sparkles size={18} /> Metrics &amp; Animations
                </h3>
                <div className="toggle-group" style={{ marginBottom: "1rem" }}>
                  <label
                    className="checkbox-label"
                    style={{
                      borderBottom: "1px solid var(--border-color)",
                      paddingBottom: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="statsDropdown"
                      checked={formData.statsDropdown}
                      onChange={handleInputChange}
                    />
                    <span>Wrap Analytics in Dropdown</span>
                  </label>

                  {[
                    { key: "visitors", label: "Profile Visitors Badge" },
                    { key: "stats", label: "GitHub Stats" },
                    { key: "streak", label: "GitHub Streak Stats" },
                    {
                      key: "githubProfileSummary",
                      label: "GitHub Profile Summary",
                    },
                    { key: "topLangsCommit", label: "Top Languages by Commit" },
                    { key: "topLangsRepo", label: "Top Languages by Repo" },
                    { key: "pinball", label: "Pinball Activity Graph" },
                    { key: "snake", label: "Contribution Snake" },
                    { key: "showLeetcodeHeatmap", label: "LeetCode Heatmap" },
                    {
                      key: "showLeetcodeContest",
                      label: "LeetCode Contest Stats",
                    },
                  ].map(({ key, label }) => (
                    <div
                      key={key}
                      style={{
                        marginBottom: "1rem",
                        background: "rgba(0,0,0,0.2)",
                        padding: "0.75rem",
                        borderRadius: "6px",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      <label
                        className="checkbox-label"
                        style={{ margin: "0 0 0.5rem 0", width: "100%" }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.animations[key]}
                          onChange={() => toggleAnimation(key)}
                        />
                        <span style={{ fontWeight: 600 }}>{label}</span>
                      </label>
                      {formData.animations[key] && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.4rem",
                            marginLeft: "1.8rem",
                          }}
                        >
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <div style={{ flex: 1 }}>
                              <span
                                style={{
                                  fontSize: "0.65rem",
                                  color: "var(--text-secondary)",
                                  display: "block",
                                  marginBottom: "2px",
                                }}
                              >
                                Scale
                              </span>
                              <input
                                type="text"
                                value={formData.dimensions[key].scale}
                                onChange={(e) =>
                                  handleDimensionChange(
                                    key,
                                    "scale",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g. 49%"
                                style={{
                                  width: "100%",
                                  padding: "0.3rem",
                                  fontSize: "0.75rem",
                                  borderRadius: "4px",
                                  border: "1px solid var(--border-color)",
                                  background: "var(--input-bg)",
                                  color: "var(--text-primary)",
                                }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <span
                                style={{
                                  fontSize: "0.65rem",
                                  color: "var(--text-secondary)",
                                  display: "block",
                                  marginBottom: "2px",
                                }}
                              >
                                Width
                              </span>
                              <input
                                type="text"
                                value={formData.dimensions[key].w}
                                onChange={(e) =>
                                  handleDimensionChange(
                                    key,
                                    "w",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g. 400px"
                                style={{
                                  width: "100%",
                                  padding: "0.3rem",
                                  fontSize: "0.75rem",
                                  borderRadius: "4px",
                                  border: "1px solid var(--border-color)",
                                  background: "var(--input-bg)",
                                  color: "var(--text-primary)",
                                }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <span
                                style={{
                                  fontSize: "0.65rem",
                                  color: "var(--text-secondary)",
                                  display: "block",
                                  marginBottom: "2px",
                                }}
                              >
                                Height
                              </span>
                              <input
                                type="text"
                                value={formData.dimensions[key].h}
                                onChange={(e) =>
                                  handleDimensionChange(
                                    key,
                                    "h",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g. 200px"
                                style={{
                                  width: "100%",
                                  padding: "0.3rem",
                                  fontSize: "0.75rem",
                                  borderRadius: "4px",
                                  border: "1px solid var(--border-color)",
                                  background: "var(--input-bg)",
                                  color: "var(--text-primary)",
                                }}
                              />
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <div style={{ flex: 1 }}>
                              <span
                                style={{
                                  fontSize: "0.65rem",
                                  color: "var(--text-secondary)",
                                  display: "block",
                                  marginBottom: "2px",
                                }}
                              >
                                X-Offset (Spaces)
                              </span>
                              <input
                                type="number"
                                value={formData.dimensions[key].x}
                                onChange={(e) =>
                                  handleDimensionChange(
                                    key,
                                    "x",
                                    e.target.value,
                                  )
                                }
                                placeholder="0"
                                style={{
                                  width: "100%",
                                  padding: "0.3rem",
                                  fontSize: "0.75rem",
                                  borderRadius: "4px",
                                  border: "1px solid var(--border-color)",
                                  background: "var(--input-bg)",
                                  color: "var(--text-primary)",
                                }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <span
                                style={{
                                  fontSize: "0.65rem",
                                  color: "var(--text-secondary)",
                                  display: "block",
                                  marginBottom: "2px",
                                }}
                              >
                                Y-Offset (Breaks)
                              </span>
                              <input
                                type="number"
                                value={formData.dimensions[key].y}
                                onChange={(e) =>
                                  handleDimensionChange(
                                    key,
                                    "y",
                                    e.target.value,
                                  )
                                }
                                placeholder="0"
                                style={{
                                  width: "100%",
                                  padding: "0.3rem",
                                  fontSize: "0.75rem",
                                  borderRadius: "4px",
                                  border: "1px solid var(--border-color)",
                                  background: "var(--input-bg)",
                                  color: "var(--text-primary)",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {formData.animations.snake && (
                    <div
                      style={{
                        marginLeft: "2rem",
                        marginTop: "0.75rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        padding: "1rem",
                        background: "var(--input-bg)",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Snake Section Title</label>
                        <input
                          name="snakeTitle"
                          value={formData.snakeTitle}
                          onChange={handleInputChange}
                          placeholder="Dev Snake"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Snake Skin Color</label>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                          }}
                        >
                          <select
                            name="snakeSkinColor"
                            value={formData.snakeSkinColor}
                            onChange={handleInputChange}
                            style={{ flex: 1 }}
                          >
                            {SNAKE_SKIN_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              background: formData.snakeSkinColor,
                              border: "2px solid var(--border-color)",
                              flexShrink: 0,
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Food / Commit Dot Color</label>
                        <select
                          name="snakeFoodStyle"
                          value={formData.snakeFoodStyle}
                          onChange={handleInputChange}
                        >
                          {SNAKE_FOOD_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <h3 className="section-title">
                  <Settings size={18} /> Reorder Sections
                </h3>
                {formData.sectionOrder.map((sec, idx) => (
                  <div
                    key={sec}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "var(--bg-secondary)",
                      padding: "0.5rem",
                      marginBottom: "0.25rem",
                      borderRadius: "4px",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-primary)",
                        textTransform: "capitalize",
                      }}
                    >
                      {sec.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      <button
                        onClick={() => moveSection(idx, -1)}
                        disabled={idx === 0}
                        style={{
                          padding: "0.2rem 0.4rem",
                          background: "var(--accent-color)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: idx === 0 ? "not-allowed" : "pointer",
                          opacity: idx === 0 ? 0.5 : 1,
                        }}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveSection(idx, 1)}
                        disabled={idx === formData.sectionOrder.length - 1}
                        style={{
                          padding: "0.2rem 0.4rem",
                          background: "var(--accent-color)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor:
                            idx === formData.sectionOrder.length - 1
                              ? "not-allowed"
                              : "pointer",
                          opacity:
                            idx === formData.sectionOrder.length - 1 ? 0.5 : 1,
                        }}
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card">
                <h3 className="section-title">
                  <Code2 size={18} /> Global Skills Database
                </h3>
                {Object.entries(SKILLS_CATEGORIES).map(([category, skills]) => (
                  <div key={category} className="skill-category">
                    <h4 className="category-title">
                      {category === "Games_Platforms" && (
                        <Gamepad2
                          size={14}
                          style={{ display: "inline", marginRight: "4px" }}
                        />
                      )}
                      {category.replace(/_/g, " & ")}
                    </h4>
                    <div className="skills-grid">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className={`skill-tag ${formData.skills.includes(skill) ? "selected" : ""}`}
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="card"
                style={{ border: "1px solid var(--accent-color)" }}
              >
                <h3 className="section-title">
                  <Settings size={18} /> Your Custom Skill Categories
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addCustomCategory();
                    }}
                    placeholder="E.g. Tools I Use Daily"
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      borderRadius: "6px",
                      border: "1px solid var(--border-color)",
                      background: "var(--input-bg)",
                      color: "var(--text-primary)",
                    }}
                  />
                  <button
                    onClick={addCustomCategory}
                    className="add-skill-btn"
                    style={{ width: "auto", padding: "0 1rem" }}
                  >
                    Create
                  </button>
                </div>

                {formData.customCategories.map((cat) => (
                  <div
                    key={cat.id}
                    style={{
                      marginBottom: "1.5rem",
                      background: "var(--bg-secondary)",
                      padding: "1rem",
                      borderRadius: "8px",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.75rem",
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
                          fontSize: "0.95rem",
                          outline: "none",
                          flex: 1,
                          marginRight: "0.5rem",
                        }}
                      />
                      <button
                        onClick={() => removeCustomCategory(cat.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ff4444",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <input
                        type="text"
                        value={selectedCatId === cat.id ? newCustomSkill : ""}
                        onFocus={() => setSelectedCatId(cat.id)}
                        onChange={(e) => {
                          setSelectedCatId(cat.id);
                          setNewCustomSkill(e.target.value);
                        }}
                        placeholder={`Skill (e.g. MongoDB)`}
                        style={{
                          flex: 1,
                          padding: "0.4rem 0.6rem",
                          borderRadius: "4px",
                          border: "1px solid var(--border-color)",
                          background: "var(--input-bg)",
                          color: "var(--text-primary)",
                          fontSize: "0.85rem",
                        }}
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
                        placeholder={`Icon Name or URL`}
                        style={{
                          flex: 0.8,
                          padding: "0.4rem 0.6rem",
                          borderRadius: "4px",
                          border: "1px solid var(--border-color)",
                          background: "var(--input-bg)",
                          color: "var(--text-primary)",
                          fontSize: "0.85rem",
                        }}
                      />
                      <button
                        onClick={() => {
                          setSelectedCatId(cat.id);
                          addSkillToCustomCategory();
                        }}
                        className="add-skill-btn"
                        style={{ width: "32px", height: "32px", flexShrink: 0 }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="skills-grid">
                      {cat.skills.map((skillObj) => (
                        <div
                          key={skillObj.name}
                          className="skill-tag selected"
                          onClick={() =>
                            removeSkillFromCustomCategory(cat.id, skillObj.name)
                          }
                        >
                          {skillObj.name}{" "}
                          <Trash2 size={12} style={{ marginLeft: "4px" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="preview-area">
            <div className="preview-header">
              <div className="preview-tabs">
                <button
                  className={`tab-btn ${activeTab === "preview" ? "active" : ""}`}
                  onClick={() => setActiveTab("preview")}
                >
                  <Eye size={16} className="icon-inline" /> Live Preview
                </button>
                <button
                  className={`tab-btn ${activeTab === "code" ? "active" : ""}`}
                  onClick={() => setActiveTab("code")}
                >
                  <Code2 size={16} className="icon-inline" /> Markdown Code
                </button>
              </div>
              {activeTab === "code" && (
                <button className="copy-btn" onClick={copyToClipboard}>
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? "Copied to Clipboard" : "Copy Code"}
                </button>
              )}
            </div>

            <div className="preview-container card">
              {activeTab === "preview" ? (
                <PreviewContent />
              ) : (
                <pre className="code-view custom-scrollbar">
                  {generateMarkdown(false)}
                </pre>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
