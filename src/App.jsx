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
  {
    value: "gold",
    label: "Golden Stars",
    dots: "#ebedf0,#ffef99,#ffdf33,#ccb200,#998500",
  },
  {
    value: "green",
    label: "Classic Green",
    dots: "#ebedf0,#9be9a8,#40c463,#30a14e,#216e39",
  },
  {
    value: "red",
    label: "Red Hot",
    dots: "#ebedf0,#ffb3b3,#ff6666,#cc0000,#660000",
  },
  {
    value: "yellow",
    label: "Neon Yellow",
    dots: "#ebedf0,#fff5b1,#ffdf33,#e6b800,#997a00",
  },
  {
    value: "white",
    label: "White Minimal",
    dots: "#161b22,#4a4a4a,#8f8f8f,#d4d4d4,#ffffff",
  },
  {
    value: "purple",
    label: "Violet Vibes",
    dots: "#ebedf0,#d8b4fe,#a855f7,#7e22ce,#581c87",
  },
  {
    value: "blue",
    label: "Ocean Blue",
    dots: "#ebedf0,#93c5fd,#3b82f6,#1d4ed8,#1e3a5f",
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
    "Fortran",
    "COBOL",
    "Erlang",
    "OCaml",
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
    "Storybook",
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
    "InfluxDB",
    "Elasticsearch",
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
    "DaVinci Resolve",
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
    "Football",
    "Basketball",
    "Cricket",
    "Table Tennis",
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
    const ch = str[i].toUpperCase();
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

function DisplayBoard({ projects }) {
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

  const name = validProjects[currentIdx].toUpperCase().slice(0, 12);
  const stars = "★ 2";

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}
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
    </div>
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
    animations: {
      streak: true,
      snake: true,
      pinball: false,
      topLangs: true,
      activityOverview: true,
    },
    snakeSkinColor: "#000000",
    snakeFoodStyle: "gold",
    snakeTitle: "Dev Snake",
    funFact: "I can solve a Rubik's cube in under a minute!",
  });

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCustomSkill, setNewCustomSkill] = useState("");
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

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
          { label: newLinkLabel.trim(), url: newLinkUrl.trim() },
        ],
      }));
      setNewLinkLabel("");
      setNewLinkUrl("");
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
        customCategories: prev.customCategories.map((cat) =>
          cat.id === selectedCatId &&
          !cat.skills.includes(newCustomSkill.trim())
            ? { ...cat, skills: [...cat.skills, newCustomSkill.trim()] }
            : cat,
        ),
      }));
      setNewCustomSkill("");
    }
  };

  const removeCustomCategory = (id) => {
    setFormData((prev) => ({
      ...prev,
      customCategories: prev.customCategories.filter((c) => c.id !== id),
    }));
  };

  const removeSkillFromCustomCategory = (catId, skill) => {
    setFormData((prev) => ({
      ...prev,
      customCategories: prev.customCategories.map((cat) =>
        cat.id === catId
          ? { ...cat, skills: cat.skills.filter((s) => s !== skill) }
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

  const getThemeParams = () => {
    switch (theme) {
      case "elegant-black":
        return "bg_color=0d1117&title_color=ffffff&text_color=8b949e&icon_color=58a6ff&border_color=30363d";
      case "glassmorphic":
        return "bg_color=0f172a&title_color=38bdf8&text_color=94a3b8&icon_color=38bdf8&border_color=1e293b";
      case "colorful":
        return "theme=radical";
      case "vibe-coded":
        return "theme=synthwave";
      case "game-orange":
        return "theme=gruvbox";
      default:
        return "theme=dark";
    }
  };

  const generateMarkdown = (isPreview = false) => {
    const themeParams = getThemeParams();
    const user = formData.github || "torvalds";
    let md = `<div align="center">\n  <h1>Hi 👋, I'm ${formData.name || "Anonymous Developer"}</h1>\n  <h3>${formData.subtitle}</h3>\n</div>\n\n`;

    if (formData.displayBoard) {
      const validProjects = formData.projects.filter((p) => p.trim() !== "");
      if (validProjects.length > 0) {
        const base = isPreview
          ? window.location.origin
          : "https://YOUR_DEPLOY_URL";
        const reposParam = validProjects.join(",");
        md += `<div align="center">\n\n### 🏆 Prominent Projects\n\n`;
        md += `<a href="https://github.com/${user}">\n`;
        md += `  <img src="${base}/.netlify/functions/seven-segment?user=${user}&repos=${encodeURIComponent(reposParam)}" width="650" alt="Projects Display Board" />\n`;
        md += `</a>\n\n</div>\n\n`;
      }
    }

    if (formData.about) {
      md += `## 🚀 About Me\n${formData.about}\n\n`;
    }

    if (formData.skills.length > 0) {
      md += `## 💻 Core Tech Stack\n\n`;
      Object.entries(SKILLS_CATEGORIES).forEach(
        ([category, categorySkills]) => {
          const selected = categorySkills.filter((s) =>
            formData.skills.includes(s),
          );
          if (selected.length > 0) {
            md += `### ${category.replace(/_/g, " & ")}\n<p align="center">\n`;
            selected.forEach((skill) => {
              const safeName = skill
                .replace(/ /g, "%20")
                .replace(/\+/g, "%2B")
                .replace(/#/g, "%23");
              md += `  <img src="https://img.shields.io/badge/${safeName}-151515?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, "")}&logoColor=white" alt="${skill}" />\n`;
            });
            md += `</p>\n\n`;
          }
        },
      );
    }

    formData.customCategories.forEach((cat) => {
      if (cat.skills.length > 0) {
        md += `## ✨ ${cat.title}\n<p align="center">\n`;
        cat.skills.forEach((skill) => {
          const safeName = skill
            .replace(/ /g, "%20")
            .replace(/\+/g, "%2B")
            .replace(/#/g, "%23");
          md += `  <img src="https://img.shields.io/badge/${safeName}-151515?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, "")}&logoColor=white" alt="${skill}" />\n`;
        });
        md += `</p>\n\n`;
      }
    });

    const hasLinks =
      formData.github ||
      formData.twitter ||
      formData.linkedin ||
      formData.codestats ||
      formData.customLinks.length > 0;
    if (hasLinks) {
      md += `## 🌐 Connect with me\n<p align="center">\n`;
      if (formData.github)
        md += `  <a href="https://github.com/${formData.github}"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>\n`;
      if (formData.linkedin)
        md += `  <a href="https://linkedin.com/in/${formData.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n`;
      if (formData.twitter)
        md += `  <a href="https://twitter.com/${formData.twitter}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>\n`;
      if (formData.codestats)
        md += `  <a href="https://codestats.net/users/${formData.codestats}"><img src="https://img.shields.io/badge/Code::Stats-1F2937?style=for-the-badge&logo=codeforces&logoColor=white" alt="Code::Stats" /></a>\n`;
      formData.customLinks.forEach((link) => {
        md += `  <a href="${link.url}"><img src="https://img.shields.io/badge/${link.label.replace(/ /g, "%20")}-4285F4?style=for-the-badge" alt="${link.label}" /></a>\n`;
      });
      md += `</p>\n\n`;
    }

    if (formData.funFact) {
      md += `> 💡 **Fun Fact:** ${formData.funFact}\n\n`;
    }

    md += `## 📊 GitHub Activity Overview\n\n<p align="center">\n`;
    if (formData.animations.activityOverview)
      md += `  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&hide_border=true&${themeParams}" alt="GitHub Stats" />\n`;
    if (formData.animations.topLangs)
      md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&hide_border=true&${themeParams}" alt="Top Languages" />\n`;
    if (formData.animations.streak)
      md += `  <img src="https://streak-stats.demolab.com/?user=${user}&hide_border=true&${themeParams}" alt="Meteor Streak" />\n`;
    md += `</p>\n\n`;

    if (formData.codestats) {
      md += `## 📈 Code::Stats XP Overview\n<p align="center">\n  <img src="https://codestats-readme.wegfan.cn/history/${formData.codestats}?max_languages=8&width=800" alt="Code::Stats XP History" />\n</p>\n\n`;
    }

    if (formData.leetcode || formData.codeforces) {
      md += `## 🧩 Competitive & Code Stats\n\n`;
      if (formData.leetcode)
        md += `<p align="center">\n  <img src="https://leetcard.jacoblin.cool/${formData.leetcode}?theme=dark&font=Inter&ext=heatmap" alt="LeetCode Heatmap" />\n</p>\n\n`;
      if (formData.codeforces)
        md += `<p align="center">\n  <img src="https://codeforces-readme-stats.vercel.app/api/card?username=${formData.codeforces}&theme=tokyonight" alt="Codeforces Stats" />\n</p>\n\n`;
    }

    if (formData.animations.pinball) {
      md += `## 🎯 Pinball Activity Graph\n<p align="center">\n  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${user}&hide_border=true&${themeParams}" alt="Activity Graph" width="100%" />\n</p>\n\n`;
    }

    if (formData.animations.snake) {
      const snakeSrc = isPreview
        ? `https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake-dark.svg`
        : `https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg`;
      md += `## 🐍 ${formData.snakeTitle || "Dev Snake"}\n`;
      md += `<p align="center">\n  <img src="${snakeSrc}" alt="${formData.snakeTitle || "Dev Snake"}" width="100%" />\n</p>\n\n`;
    }

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
      let md = `<div align="center">\n  <h1>Hi 👋, I'm ${formData.name || "Anonymous Developer"}</h1>\n  <h3>${formData.subtitle}</h3>\n</div>\n\n`;
      if (showBoard) {
        md += `<div align="center">\n\n### 🏆 Prominent Projects\n\n</div>\n\n`;
      }
      return md;
    })();

    const mdRest = (() => {
      const full = generateMarkdown(true);
      const aboutIdx = full.indexOf("## 🚀 About Me");
      if (aboutIdx === -1) {
        const connectIdx = full.indexOf("## 🌐");
        return connectIdx !== -1 ? full.slice(connectIdx) : "";
      }
      return full.slice(aboutIdx);
    })();

    return (
      <div className="markdown-preview custom-scrollbar">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {mdWithoutBoard}
        </ReactMarkdown>
        {showBoard && <DisplayBoard projects={formData.projects} />}
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
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    marginBottom: "1rem",
                  }}
                >
                  Shows a custom dynamic seven-segment board for your top
                  projects. Cycling animates on deploy; preview shows one at a
                  time.
                </p>
                <label
                  className="checkbox-label"
                  style={{ marginBottom: "1rem" }}
                >
                  <input
                    type="checkbox"
                    name="displayBoard"
                    checked={formData.displayBoard}
                    onChange={handleInputChange}
                  />
                  <span>Enable Display Board</span>
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
                    name: "codestats",
                    label: "Code::Stats Username (XP graph)",
                    placeholder: "your_codestats_user",
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
                    className="form-group"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <input
                      value={newLinkLabel}
                      onChange={(e) => setNewLinkLabel(e.target.value)}
                      placeholder="Label (e.g. Portfolio)"
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
                <div className="toggle-group">
                  {[
                    {
                      key: "activityOverview",
                      label: "GitHub Activity Overview",
                    },
                    { key: "topLangs", label: "Top Languages" },
                    { key: "streak", label: "Meteor Effect Streak" },
                    { key: "pinball", label: "Pinball Activity Graph" },
                    { key: "snake", label: "Contribution Snake" },
                  ].map(({ key, label }) => (
                    <label key={key} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.animations[key]}
                        onChange={() => toggleAnimation(key)}
                      />
                      <span>{label}</span>
                    </label>
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
                      <div
                        style={{
                          padding: "10px",
                          background: "rgba(88,166,255,0.1)",
                          borderLeft: "4px solid var(--accent-color)",
                          borderRadius: "4px",
                          fontSize: "0.85rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        <strong>⚠️ Important:</strong> The snake requires a
                        GitHub Action. Check the Markdown Code tab for the{" "}
                        <code>snake.yml</code> you need to add to your repo.
                      </div>
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
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.4,
                          margin: 0,
                        }}
                      >
                        Colors apply when you deploy the GitHub Action. The live
                        preview uses a demo snake SVG.
                      </p>
                    </div>
                  )}
                </div>
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
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    marginBottom: "1rem",
                  }}
                >
                  Name your own section titles and add any skills!
                </p>
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
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addSkillToCustomCategory();
                        }}
                        placeholder={`Add skill to "${cat.title}"...`}
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
                      <button
                        onClick={() => {
                          setSelectedCatId(cat.id);
                          addSkillToCustomCategory();
                        }}
                        className="add-skill-btn"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="skills-grid">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill}
                          className="skill-tag selected"
                          onClick={() =>
                            removeSkillFromCustomCategory(cat.id, skill)
                          }
                        >
                          {skill}{" "}
                          <Trash2 size={12} style={{ marginLeft: "4px" }} />
                        </div>
                      ))}
                      {cat.skills.length === 0 && (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-secondary)",
                            fontStyle: "italic",
                          }}
                        >
                          No skills added yet
                        </span>
                      )}
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
