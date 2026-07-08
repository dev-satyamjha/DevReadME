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
  Box,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CursorBubbles from "./CursorBubbles";
import {
  MATRIX_FONT,
  DOT,
  GAP,
  CW,
  ON,
  BW,
  BH,
  PW,
  PH,
  PX,
  PY,
} from "./utils/matrixUtils";

const STATE_PREFIX = "<!--DEVREADME_STATE:";
const STATE_SUFFIX = ":DEVREADME_STATE-->";

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
    "Crystal",
    "Solidity",
    "OCaml",
    "Erlang",
    "Fortran",
    "MATLAB",
    "Groovy",
    "WebAssembly",
    "F#",
    "Objective-C",
    "Vala",
    "V",
    "Apex",
    "ColdFusion",
    "Hack",
    "Prolog",
    "Lisp",
    "Scheme",
    "Racket",
    "Delphi",
    "Ada",
    "COBOL",
    "VBScript",
    "ActionScript",
    "Smalltalk",
    "Tcl",
    "Verilog",
    "VHDL",
    "SystemVerilog",
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
    "Remix",
    "Qwik",
    "Storybook",
    "Sass",
    "Styled Components",
    "Jest",
    "Vitest",
    "Cypress",
    "Playwright",
    "ESLint",
    "Prettier",
    "Turbopack",
    "Rollup.js",
    "esbuild",
    "Alpine.js",
    "Lit",
    "Preact",
    "Bulma",
    "Ant Design",
    "Mantine",
    "Vuetify",
    "Quasar",
    "RxJS",
    "Gulp",
    "Grunt",
    "Pug",
    "Less",
    "Stylus",
    "JQuery",
    "HTMX",
    "GSAP",
    "Babylon.js",
    "Testing Library",
    "Mocha",
    "Chai",
    "Jasmine",
    "Karma",
    "Puppeteer",
    "Selenium",
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
    "Bun",
    "Deno",
    "Symfony",
    "Phoenix",
    "tRPC",
    "RabbitMQ",
    "Apache Kafka",
    "Strapi",
    "Hasura",
    "Supabase Edge Functions",
    "AdonisJS",
    "Sails.js",
    "LoopBack",
    "CakePHP",
    "CodeIgniter",
    "Yii",
    "Lumen",
    "Tornado",
    "Bottle",
    "CherryPy",
    "Pyramid",
    "Ktor",
    "Play Framework",
    "Echo",
    "Beego",
    "Revel",
    "Rocket",
    "Iron",
    "Kemal",
    "Celery",
    "ActiveMQ",
    "ZeroMQ",
    "NATS",
    "MQTT",
    "Memcached",
    "TypeORM",
    "Sequelize",
    "SQLAlchemy",
    "Hibernate",
    "Entity Framework",
    "Knex.js",
    "Waterline",
    "Bookshelf.js",
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
    "PlanetScale",
    "CockroachDB",
    "InfluxDB",
    "Elasticsearch",
    "ClickHouse",
    "Drizzle",
    "Couchbase",
    "Realm",
    "ArangoDB",
    "RethinkDB",
    "OrientDB",
    "RavenDB",
    "TimeScaleDB",
    "RocksDB",
    "LevelDB",
    "HBase",
    "Solr",
    "Splunk",
    "Milvus",
    "Pinecone",
    "Weaviate",
    "Qdrant",
    "Chroma",
    "FaunaDB",
    "HarperDB",
    "ScyllaDB",
    "Snowflake",
    "BigQuery",
    "Redshift",
    "Teradata",
    "Firebird",
    "Db2",
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
    "Podman",
    "Helm",
    "Prometheus",
    "Grafana",
    "ArgoCD",
    "Pulumi",
    "Vagrant",
    "Render",
    "Fly.io",
    "Railway",
    "Ubuntu",
    "Debian",
    "Arch Linux",
    "Fedora",
    "Proxmox",
    "OpenShift",
    "Rancher",
    "Istio",
    "Linkerd",
    "Consul",
    "Vault",
    "Packer",
    "Puppet",
    "Chef",
    "SaltStack",
    "Datadog",
    "New Relic",
    "Dynatrace",
    "AppDynamics",
    "Sentry",
    "Logstash",
    "Kibana",
    "Fluentd",
    "Spinnaker",
    "Bitrise",
    "AppVeyor",
    "Bamboo",
    "TeamCity",
    "Linode",
    "Vultr",
    "UpCloud",
    "OVH",
    "Hetzner",
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
    "Expo",
    "Jetpack Compose",
    "SwiftUI",
    "Capacitor",
    "Cordova",
    "NativeScript",
    "Qt",
    "GTK",
    "wxWidgets",
    "Tkinter",
    "PyQt",
    "Kivy",
    "JavaFX",
    "Swing",
    "WinForms",
    "WPF",
    "UWP",
    "WinUI",
    "Appcelerator",
    "PhoneGap",
    "Sencha Touch",
    "Corona",
    "Cocos2d",
    "Defold",
    "Construct 3",
    "GameMaker",
    "LibGDX",
    "MonoGame",
    "Phaser",
    "CryEngine",
    "Lumberyard",
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
    "Anthropic",
    "Ollama",
    "ONNX",
    "Plotly",
    "Apache Spark",
    "Polars",
    "Gradio",
    "Streamlit",
    "Weights & Biases",
    "Anaconda",
    "RStudio",
    "Apache Airflow",
    "dbt",
    "LlamaIndex",
    "ChromaDB",
    "Pinecone",
    "Milvus",
    "Weaviate",
    "Qdrant",
    "FAISS",
    "Transformers",
    "Diffusers",
    "Detectron2",
    "YOLO",
    "Spacy",
    "NLTK",
    "Gensim",
    "Fastai",
    "XGBoost",
    "LightGBM",
    "CatBoost",
    "Prophet",
    "Statsmodels",
    "Seaborn",
    "Bokeh",
    "Dash",
    "Tableau",
    "Power BI",
    "Looker",
    "Metabase",
    "Superset",
    "Hadoop",
    "Hive",
    "Pig",
    "Presto",
    "Trino",
    "Flink",
    "Kafka Streams",
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
    "Framer",
    "Adobe Lightroom",
    "Adobe InDesign",
    "DaVinci Resolve",
    "Affinity Designer",
    "Spline",
    "CorelDRAW",
    "PaintTool SAI",
    "Clip Studio Paint",
    "Maya",
    "3ds Max",
    "ZBrush",
    "Cinema 4D",
    "Houdini",
    "Marvelous Designer",
    "Substance Painter",
    "Miro",
    "Whimsical",
    "Balsamiq",
    "Zeplin",
    "InVision",
    "Marvel",
    "ProtoPie",
    "Principle",
    "Origami Studio",
    "Lottie",
    "Rive",
    "Webflow",
  ],
  Editors_OS: [
    "VS Code",
    "Antigravity",
    "Vim",
    "Neovim",
    "Nano",
    "Sublime Text",
    "Zed",
    "Notepad++",
    "IntelliJ IDEA",
    "PyCharm",
    "WebStorm",
    "CLion",
    "Emacs",
    "Windows",
    "macOS",
    "Ubuntu",
    "Debian",
    "Arch Linux",
    "Fedora",
    "Kali Linux",
    "NixOS",
    "Hyprland",
    "KDE Plasma",
    "GNOME",
    "i3",
    "Sway",
    "Proxmox",
    "WSL",
    "Eclipse",
    "NetBeans",
    "Visual Studio",
    "Xcode",
    "Android Studio",
    "Fleet",
    "Cursor",
    "Rider",
    "PhpStorm",
    "RubyMine",
    "DataGrip",
    "GoLand",
    "Atom",
    "Brackets",
    "Helix",
    "Kakoune",
    "Micro",
    "Geany",
    "Pop!_OS",
    "Linux Mint",
    "Manjaro",
    "CentOS",
    "RHEL",
    "openSUSE",
    "Alpine Linux",
    "Raspberry Pi OS",
    "FreeBSD",
    "OpenBSD",
  ],
  Productivity_Collab: [
    "Git",
    "GitHub",
    "GitLab",
    "Bitbucket",
    "Notion",
    "Slack",
    "Jira",
    "Trello",
    "Confluence",
    "Linear",
    "Postman",
    "Insomnia",
    "Obsidian",
    "Zoom",
    "Google Meet",
    "Asana",
    "ClickUp",
    "Microsoft Teams",
    "Discord",
    "Monday.com",
    "Basecamp",
    "Wrike",
    "Smartsheet",
    "Airtable",
    "Coda",
    "Evernote",
    "Roam Research",
    "Logseq",
    "Bear",
    "Ulysses",
    "Miro",
    "Mural",
    "Lucidchart",
    "Draw.io",
    "Figma FigJam",
    "Swagger",
    "Stoplight",
    "Hoppscotch",
    "SoapUI",
    "Katalon",
    "BrowserStack",
    "Sauce Labs",
    "Vagrant",
    "Packer",
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
    "Roblox Studio",
    "PlayCanvas",
    "Origin",
    "Uplay",
    "Battle.net",
    "GeForce Now",
    "Stadia",
    "Luna",
    "Xbox Game Pass",
    "PS Now",
    "Viveport",
    "SideQuest",
    "ModDB",
    "Nexus Mods",
    "CurseForge",
    "Game Jolt",
    "Kongregate",
    "Newgrounds",
    "Armorgames",
    "Miniclip",
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
    "Spotify",
    "YouTube",
    "Reddit",
    "Letterboxd",
    "Cooking",
    "Baking",
    "Gardening",
    "Reading",
    "Traveling",
    "Hiking",
    "Camping",
    "Fishing",
    "Woodworking",
    "Metalworking",
    "Electronics",
    "Robotics",
    "3D Printing",
    "Drawing",
    "Painting",
    "Sculpting",
    "Calligraphy",
    "Origami",
    "Knitting",
    "Sewing",
    "Dancing",
    "Singing",
    "Acting",
    "Stand-up Comedy",
    "Magic",
    "Juggling",
    "Skateboarding",
    "Surfing",
    "Snowboarding",
    "Skiing",
    "Martial Arts",
    "Weightlifting",
    "CrossFit",
    "Powerlifting",
    "Bodybuilding",
    "Calisthenics",
    "Gymnastics",
    "Parkour",
    "Climbing",
    "Bouldering",
    "Scuba Diving",
    "Skydiving",
    "Paragliding",
  ],
};

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

const RAIN_DROPS = Array.from({ length: 110 }).map((_, i) => ({
  id: i,
  cx: PX + Math.floor(Math.random() * PW),
  dur: (1.2 + Math.random() * 2).toFixed(2),
  delay: (Math.random() * 3).toFixed(2),
}));

function DisplayBoard({ projects, github }) {
  const validProjects = useMemo(
    () => projects.filter((p) => p && String(p).trim() !== ""),
    [projects],
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [starCounts, setStarCounts] = useState({});
  const timerRef = useRef(null);
  const scrollRef = useRef(null);
  const innerPerimeter = (PW + PH) * 2;

  const rainDrops = RAIN_DROPS;

  const fullMatrix = useMemo(() => {
    const spacing = 22;
    const cols = Math.floor(BW / spacing);
    const rows = Math.floor(BH / spacing);
    const offsetX = (BW - cols * spacing) / 2;
    const offsetY = (BH - rows * spacing) / 2;
    const dots = [];
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const delay = ((r * 0.09 + c * 0.05) % 3).toFixed(2);
        dots.push({
          id: `M-${r}-${c}`,
          cx: offsetX + c * spacing,
          cy: offsetY + r * spacing,
          delay,
        });
      }
    }
    return dots;
  }, []);

  const currentName = validProjects[currentIdx] || "";
  const nameW = currentName.length * (CW + GAP * 3);
  const needsScroll = nameW > PW - 32;

  useEffect(() => {
    if (validProjects.length <= 1) {
      return;
    }
    timerRef.current = setInterval(() => {
      setCurrentIdx((p) => (p + 1) % validProjects.length);
      setScrollX(0);
    }, 10000);
    return () => clearInterval(timerRef.current);
  }, [validProjects.length]);

  useEffect(() => {
    const reset = setTimeout(() => setScrollX(0), 0);
    if (!needsScroll) return () => clearTimeout(reset);
    let x = 0;
    scrollRef.current = setInterval(() => {
      x += 1.5;
      if (x > nameW + 20) x = -PW;
      setScrollX(x);
    }, 30);
    return () => {
      clearTimeout(reset);
      clearInterval(scrollRef.current);
    };
  }, [currentIdx, needsScroll, nameW]);

  useEffect(() => {
    const trimmedUser = String(github || "").trim();
    if (!trimmedUser || !validProjects.length) return;
    validProjects.forEach((repo) => {
      const trimmedRepo = String(repo).trim();
      fetch(
        `https://api.github.com/repos/${encodeURIComponent(trimmedUser)}/${encodeURIComponent(trimmedRepo)}`,
      )
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data && typeof data.stargazers_count === "number") {
            setStarCounts((prev) => ({
              ...prev,
              [trimmedRepo]: data.stargazers_count,
            }));
          }
        })
        .catch(() => {});
    });
  }, [github, validProjects]);

  if (!validProjects.length) return null;

  const TEXT_Y = PY + PH / 2 - 45;
  const STARS_Y = TEXT_Y + 75;
  const starCount =
    starCounts[currentName] !== undefined ? starCounts[currentName] : "?";

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
            @keyframes chase{100%{stroke-dashoffset:-${innerPerimeter};}}
            @keyframes dotFade{0%,100%{opacity:0.03}50%{opacity:0.22}}
          `}</style>
        </defs>

        <rect width={BW} height={BH} fill="url(#bgdots)" />

        {fullMatrix.map((d) => (
          <circle
            key={d.id}
            cx={d.cx}
            cy={d.cy}
            r="1.8"
            fill={ON}
            style={{ animation: `dotFade 3s ${d.delay}s infinite ease-in-out` }}
          />
        ))}

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
          {rainDrops.map((d) => (
            <circle
              key={d.id}
              cx={d.cx}
              cy={PY}
              r="1.5"
              fill="#00ff00"
              opacity="0.5"
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
            {buildDots(`★ ${starCount}`, STARS_Y, PW, PX)}
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

const SnakePreview = ({ snakeConfig }) => {
  const L = [
    snakeConfig.darkL0 || "#000",
    snakeConfig.darkL1 || "#000",
    snakeConfig.darkL2 || "#000",
    snakeConfig.darkL3 || "#000",
    snakeConfig.darkL4 || "#000",
  ];
  const scColor = snakeConfig.snakeColor || "#fff";
  const bg = snakeConfig.bgColor || "#000";
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

const ISOMETRIC_3D_THEMES = [
  { label: "Green Animate", value: "profile-green-animate", accent: "#39d353" },
  { label: "Green", value: "profile-green", accent: "#30a14e" },
  { label: "Night View", value: "profile-night-view", accent: "#58a6ff" },
  { label: "Night Green", value: "profile-night-green", accent: "#56d364" },
  { label: "Night Rainbow", value: "profile-night-rainbow", accent: "#a371f7" },
  {
    label: "Season Animate",
    value: "profile-season-animate",
    accent: "#f9826c",
  },
  { label: "Season", value: "profile-season", accent: "#e3b341" },
  {
    label: "South Season Animate",
    value: "profile-south-season-animate",
    accent: "#3fb950",
  },
  { label: "South Season", value: "profile-south-season", accent: "#f78166" },
  { label: "Gitblock", value: "profile-gitblock", accent: "#d29922" },
];

const DEFAULT_STATE = {
  name: "John Doe",
  subtitle: "Full Stack Developer | Open Source Enthusiast",
  about:
    "I am a passionate software engineer building scalable web applications.",
  github: "",
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
  discord: "",
  producthunt: "",
  youtube: "",
  twitch: "",
  medium: "",
  stackoverflow: "",
  dribbble: "",
  behance: "",
  kaggle: "",
  devto: "",
  mastodon: "",
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
    pinball: true,
    snake: true,
    lecoqLanguage: true,
    showLeetcodeHeatmap: true,
    showLeetcodeContest: true,
    codeforces: true,
    isometric3D: true,
  },
  dimensions: {
    displayBoard: { w: "", h: "", scale: "100%", x: 0, y: 0 },
    stats: { w: "", h: "", scale: "46%", x: 0, y: 0 },
    streak: { w: "", h: "", scale: "49%", x: 0, y: 0 },
    githubProfileSummary: { w: "", h: "", scale: "49%", x: 0, y: 0 },
    topLangsCommit: { w: "", h: "", scale: "49%", x: 0, y: 0 },
    topLangsRepo: { w: "", h: "", scale: "25%", x: 58, y: 0 },
    pinball: { w: "", h: "", scale: "100%", x: 0, y: 0 },
    visitors: { w: "", h: "", scale: "8%", x: 0, y: 0 },
    isometric3D: { w: "", h: "", scale: "49%", x: 0, y: 0 },
    lecoqLanguage: { w: "", h: "", scale: "49%", x: 0, y: 0 },
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
    "isometric3D",
    "summary",
    "topLangs",
    "pinball",
    "visitors",
    "snake",
    "leetcode",
  ],
  snakeTitle: "Dev Snake",
  funFact: "I can solve a Rubik's cube in under a minute!",
  isometric3dTheme: "profile-green-animate",
  sectionTitles: {
    board: "Prominent Works",
    about: "About Me",
    skills: "Core Tech Stack",
    socials: "Socials",
    stats: "View Stats",
    snake: "Dev Snake",
    isometric3D: "3D Contribution Graph",
    leetcode: "Arena Stats",
    funFact: "Fun Fact",
  },
};

function loadInitialState() {
  try {
    const saved = localStorage.getItem("devreadme-state");
    if (!saved) return DEFAULT_STATE;
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object") return DEFAULT_STATE;

    return {
      ...DEFAULT_STATE,
      ...parsed,
      snakeCustom: { ...DEFAULT_SNAKE, ...(parsed.snakeCustom || {}) },
      animations: { ...DEFAULT_STATE.animations, ...(parsed.animations || {}) },
      sectionTitles: {
        ...DEFAULT_STATE.sectionTitles,
        ...(parsed.sectionTitles || {}),
      },
      dimensions: Object.keys(DEFAULT_STATE.dimensions).reduce((acc, key) => {
        acc[key] = {
          ...DEFAULT_STATE.dimensions[key],
          ...(parsed.dimensions?.[key] || {}),
        };
        return acc;
      }, {}),
      customLinks: Array.isArray(parsed.customLinks)
        ? parsed.customLinks
        : DEFAULT_STATE.customLinks,
      customCategories: Array.isArray(parsed.customCategories)
        ? parsed.customCategories
        : DEFAULT_STATE.customCategories,
      projects: Array.isArray(parsed.projects)
        ? parsed.projects
        : DEFAULT_STATE.projects,
      sectionOrder: Array.isArray(parsed.sectionOrder)
        ? (() => {
            let order = parsed.sectionOrder;
            if (!order.includes("isometric3D")) {
              const summaryIndex = order.indexOf("summary");
              if (summaryIndex !== -1) {
                order = [
                  ...order.slice(0, summaryIndex),
                  "isometric3D",
                  ...order.slice(summaryIndex),
                ];
              } else {
                order = [...order, "isometric3D"];
              }
            }
            return order;
          })()
        : DEFAULT_STATE.sectionOrder,
    };
  } catch {
    return DEFAULT_STATE;
  }
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

const getApiThemes = (theme) => {
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

const escapeHtml = (str) =>
  String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const isSafeUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};

const getTopHeader = (formData) => {
  const safeDate = formData.joinedDate
    ? String(formData.joinedDate).trim().replace(/ /g, "%20")
    : "";
  const targetUrl = formData.github
    ? `https://github.com/${String(formData.github).trim()}`
    : "#";
  const joinedBadge = formData.joinedDate
    ? `<a href="${targetUrl}"><img align="right" src="https://img.shields.io/badge/Joined-${safeDate}-181717?style=for-the-badge&logo=github&logoColor=white" alt="Joined GitHub" /></a>`
    : "";
  const safeName = escapeHtml(formData.name) || "Anonymous Developer";
  const safeSubtitle = escapeHtml(formData.subtitle);
  return `<div>\n  ${joinedBadge}\n  <h1 align="left">Hi 👋, I'm ${safeName}</h1>\n  <h3 align="center">${safeSubtitle}</h3>\n</div>\n\n<br clear="both"/>\n\n`;
};

const generateMarkdown = (isPreview = false, currentOrder, formData, theme) => {
  try {
    const apiThemes = getApiThemes(theme);
    const user = formData.github ? String(formData.github).trim() : "torvalds";
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
    let md = getTopHeader(formData);
    const analyticsGroup = [
      "stats",
      "summary",
      "pinball",
      "topLangs",
      "snake",
      "isometric3D",
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
            formData.projects.filter((p) => p && String(p).trim()).length > 0
          ) {
            const base = isPreview
              ? window.location.origin
              : "https://dev-readme.netlify.app";
            const validProj = formData.projects.filter(
              (p) => p && String(p).trim(),
            );
            const boardUrl = `${base}/.netlify/functions/displayboard?user=${user}&repos=${encodeURIComponent(validProj.join(","))}`;
            s += `<div align="center">\n\n### Prominent Works\n\n${buildImg("displayBoard", boardUrl, "Projects Display Board")}\n\n</div>\n\n`;
          }
          break;
        case "about":
          if (formData.about)
            s += `## ${formData.sectionTitles?.about || "About Me"}\n${escapeHtml(formData.about)}\n\n`;
          break;
        case "skills":
          if (formData.skills.length > 0) {
            s += `## ${formData.sectionTitles?.skills || "Core Tech Stack"}\n\n`;
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
              s += `### ${escapeHtml(cat.title)}\n<p align="center">\n`;
              cat.skills.forEach((skillObj) => {
                if (
                  skillObj.icon.startsWith("http") &&
                  isSafeUrl(skillObj.icon)
                )
                  s += `  <img src="${skillObj.icon}" height="28" alt="${escapeHtml(skillObj.name)}" title="${escapeHtml(skillObj.name)}" style="margin: 0 4px;" />\n`;
                else if (!skillObj.icon.startsWith("http")) {
                  const safe = skillObj.name
                    .replace(/ /g, "%20")
                    .replace(/\+/g, "%2B")
                    .replace(/#/g, "%23");
                  s += `  <img src="https://img.shields.io/badge/${safe}-151515?style=for-the-badge&logo=${skillObj.icon.toLowerCase().replace(/ /g, "")}" alt="${escapeHtml(skillObj.name)}" />\n`;
                }
              });
              s += `</p>\n\n`;
            }
          });
          break;
        case "funFact":
          if (formData.funFact)
            s += `<div align="center">\n\n### 🌟 Fun Fact: *${escapeHtml(formData.funFact)}*\n\n</div>\n\n`;
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
            formData.discord ||
            formData.producthunt ||
            formData.youtube ||
            formData.twitch ||
            formData.medium ||
            formData.stackoverflow ||
            formData.dribbble ||
            formData.behance ||
            formData.kaggle ||
            formData.devto ||
            formData.mastodon ||
            formData.portfolio ||
            formData.customLinks.length > 0;
          if (hasSocials) {
            s += `## ${formData.sectionTitles?.socials || "Socials"}\n<p align="center">\n`;
            if (formData.github)
              s += `  <a href="https://github.com/${formData.github}"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>&nbsp;&nbsp;\n`;
            if (formData.email)
              s += `  <a href="mailto:${formData.email}"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>&nbsp;&nbsp;\n`;
            if (formData.linkedin) {
              const lnUrl = formData.linkedin.startsWith("http")
                ? isSafeUrl(formData.linkedin)
                  ? formData.linkedin
                  : "#"
                : `https://linkedin.com/in/${formData.linkedin}`;
              s += `  <a href="${lnUrl}"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.twitter) {
              const twUrl = formData.twitter.startsWith("http")
                ? isSafeUrl(formData.twitter)
                  ? formData.twitter
                  : "#"
                : `https://x.com/${formData.twitter}`;
              s += `  <a href="${twUrl}"><img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.leetcode)
              s += `  <a href="https://leetcode.com/u/${formData.leetcode}"><img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black" alt="LeetCode" /></a>&nbsp;&nbsp;\n`;
            if (formData.codestats)
              s += `  <a href="https://codestats.net/users/${formData.codestats}"><img src="https://img.shields.io/badge/Code::Stats-20262E?style=for-the-badge&logo=codeigniter&logoColor=white" alt="Code::Stats" /></a>&nbsp;&nbsp;\n`;
            if (formData.instagram) {
              const igUrl = formData.instagram.startsWith("http")
                ? isSafeUrl(formData.instagram)
                  ? formData.instagram
                  : "#"
                : `https://instagram.com/${formData.instagram}`;
              s += `  <a href="${igUrl}"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.facebook) {
              const fbUrl = formData.facebook.startsWith("http")
                ? isSafeUrl(formData.facebook)
                  ? formData.facebook
                  : "#"
                : `https://facebook.com/${formData.facebook}`;
              s += `  <a href="${fbUrl}"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.snapchat) {
              const scUrl = formData.snapchat.startsWith("http")
                ? isSafeUrl(formData.snapchat)
                  ? formData.snapchat
                  : "#"
                : `https://snapchat.com/add/${formData.snapchat}`;
              s += `  <a href="${scUrl}"><img src="https://img.shields.io/badge/Snapchat-FFFC00?style=for-the-badge&logo=snapchat&logoColor=black" alt="Snapchat" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.discord) {
              const dcUrl = formData.discord.startsWith("http")
                ? isSafeUrl(formData.discord)
                  ? formData.discord
                  : "#"
                : `https://discord.com/users/${formData.discord}`;
              s += `  <a href="${dcUrl}"><img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.producthunt) {
              const phUrl = formData.producthunt.startsWith("http")
                ? isSafeUrl(formData.producthunt)
                  ? formData.producthunt
                  : "#"
                : `https://www.producthunt.com/@${formData.producthunt}`;
              s += `  <a href="${phUrl}"><img src="https://img.shields.io/badge/Product_Hunt-DA552F?style=for-the-badge&logo=product-hunt&logoColor=white" alt="Product Hunt" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.youtube) {
              const ytUrl = formData.youtube.startsWith("http")
                ? isSafeUrl(formData.youtube)
                  ? formData.youtube
                  : "#"
                : `https://youtube.com/@${formData.youtube}`;
              s += `  <a href="${ytUrl}"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.twitch) {
              const twUrl = formData.twitch.startsWith("http")
                ? isSafeUrl(formData.twitch)
                  ? formData.twitch
                  : "#"
                : `https://twitch.tv/${formData.twitch}`;
              s += `  <a href="${twUrl}"><img src="https://img.shields.io/badge/Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white" alt="Twitch" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.medium) {
              const mdUrl = formData.medium.startsWith("http")
                ? isSafeUrl(formData.medium)
                  ? formData.medium
                  : "#"
                : `https://medium.com/@${formData.medium}`;
              s += `  <a href="${mdUrl}"><img src="https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white" alt="Medium" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.stackoverflow) {
              const soUrl = formData.stackoverflow.startsWith("http")
                ? isSafeUrl(formData.stackoverflow)
                  ? formData.stackoverflow
                  : "#"
                : `https://stackoverflow.com/users/${formData.stackoverflow}`;
              s += `  <a href="${soUrl}"><img src="https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stackoverflow&logoColor=white" alt="Stack Overflow" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.dribbble) {
              const drUrl = formData.dribbble.startsWith("http")
                ? isSafeUrl(formData.dribbble)
                  ? formData.dribbble
                  : "#"
                : `https://dribbble.com/${formData.dribbble}`;
              s += `  <a href="${drUrl}"><img src="https://img.shields.io/badge/Dribbble-EA4C89?style=for-the-badge&logo=dribbble&logoColor=white" alt="Dribbble" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.behance) {
              const beUrl = formData.behance.startsWith("http")
                ? isSafeUrl(formData.behance)
                  ? formData.behance
                  : "#"
                : `https://www.behance.net/${formData.behance}`;
              s += `  <a href="${beUrl}"><img src="https://img.shields.io/badge/Behance-1769FF?style=for-the-badge&logo=behance&logoColor=white" alt="Behance" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.kaggle) {
              const kgUrl = formData.kaggle.startsWith("http")
                ? isSafeUrl(formData.kaggle)
                  ? formData.kaggle
                  : "#"
                : `https://www.kaggle.com/${formData.kaggle}`;
              s += `  <a href="${kgUrl}"><img src="https://img.shields.io/badge/Kaggle-20BEFF?style=for-the-badge&logo=kaggle&logoColor=white" alt="Kaggle" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.devto) {
              const dtUrl = formData.devto.startsWith("http")
                ? isSafeUrl(formData.devto)
                  ? formData.devto
                  : "#"
                : `https://dev.to/${formData.devto}`;
              s += `  <a href="${dtUrl}"><img src="https://img.shields.io/badge/DEV.TO-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white" alt="DEV.TO" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.mastodon) {
              const msUrl = formData.mastodon.startsWith("http")
                ? isSafeUrl(formData.mastodon)
                  ? formData.mastodon
                  : "#"
                : `https://mastodon.social/@${formData.mastodon}`;
              s += `  <a href="${msUrl}"><img src="https://img.shields.io/badge/Mastodon-6364FF?style=for-the-badge&logo=mastodon&logoColor=white" alt="Mastodon" /></a>&nbsp;&nbsp;\n`;
            }
            if (formData.portfolio) {
              const ptUrl = formData.portfolio.startsWith("http")
                ? isSafeUrl(formData.portfolio)
                  ? formData.portfolio
                  : "#"
                : `https://${formData.portfolio}`;
              s += `  <a href="${ptUrl}"><img src="https://img.shields.io/badge/Portfolio-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>&nbsp;&nbsp;\n`;
            }
            formData.customLinks.forEach((link) => {
              const safeUrl = isSafeUrl(link.url) ? link.url : "#";
              if (link.icon.startsWith("http") && isSafeUrl(link.icon))
                s += `  <a href="${safeUrl}"><img src="${link.icon}" height="28" alt="${escapeHtml(link.label)}" title="${escapeHtml(link.label)}" /></a>&nbsp;&nbsp;\n`;
              else if (!link.icon.startsWith("http"))
                s += `  <a href="${safeUrl}"><img src="https://img.shields.io/badge/${link.label.replace(/ /g, "%20")}-4285F4?style=for-the-badge&logo=${link.icon.toLowerCase().replace(/ /g, "")}&logoColor=white" alt="${escapeHtml(link.label)}" /></a>&nbsp;&nbsp;\n`;
            });
            s += `</p>\n\n`;
          }
          break;
        }
        case "stats":
          if (formData.animations.streak || formData.animations.stats) {
            s += `<p align="center">\n`;
            if (formData.animations.streak)
              s += `  ${buildImg("streak", `https://gr-streak.vercel.app/?user=${user}&${apiThemes.streak}`, "Streak Stats")}`;
            if (formData.animations.stats)
              s += `  ${buildImg("stats", `https://github-rs.vercel.app/api?username=${user}&show_icons=true&${apiThemes.stats}`, "GitHub Stats")}`;
            s += `</p>\n\n`;
          }
          break;
        case "summary":
          if (formData.animations.lecoqLanguage) {
            s += `<p align="center">\n  <img src="https://metrics.lecoq.io/${user}?base=0&plugin_isocalendar=yes&plugin_isocalendar_duration=half-year" alt="Isometric Commit Calendar" width="100%" />\n</p>\n\n`;
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
              s += `  ${buildImg("topLangsCommit", `https://github-rs.vercel.app/api/top-langs/?username=${user}&layout=donut&custom_title=Top%20Languages%20by%20Commit&${apiThemes.stats}`, "Top Languages by Commit")}`;
            if (formData.animations.topLangsRepo)
              s += `  ${buildImg("topLangsRepo", `https://github-rs.vercel.app/api/top-langs/?username=${user}&layout=donut-vertical&custom_title=Top%20Languages%20by%20Repo&${apiThemes.stats}`, "Top Languages by Repo")}`;
            s += `</p>\n\n`;
          }
          break;
        case "snake":
          if (formData.animations.snake) {
            const snakeSrc = isPreview
              ? `https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake-dark.svg`
              : `https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg`;
            const snakeHeading =
              formData.sectionTitles?.snake ||
              formData.snakeTitle ||
              "Dev Snake";
            s += `## ${snakeHeading}\n<p align="center">\n  ${buildImg("snake", snakeSrc, snakeHeading)}</p>\n\n`;
          }
          break;
        case "isometric3D":
          if (
            formData.animations.isometric3D ||
            formData.animations.githubProfileSummary
          ) {
            const isoHeading =
              formData.sectionTitles?.isometric3D || "3D Contribution Graph";
            s += `## ${isoHeading}\n<p align="center">\n`;

            if (formData.animations.githubProfileSummary) {
              const themeName = apiThemes.stats.includes("theme=")
                ? apiThemes.stats.replace("theme=", "")
                : "dark";
              s += `  ${buildImg("githubProfileSummary", `https://metrics.lecoq.io/${user}?theme=${themeName}`, "Classic User Account")}\n`;
            }

            if (formData.animations.isometric3D) {
              const isoTheme =
                formData.isometric3dTheme || "profile-green-animate";
              const isoSrc = isPreview
                ? `https://raw.githubusercontent.com/yoshi389111/github-profile-3d-contrib/main/docs/demo/${isoTheme}.svg`
                : `https://raw.githubusercontent.com/${user}/${user}/main/profile-3d-contrib/${isoTheme}.svg`;
              s += `  ${buildImg("isometric3D", isoSrc, "3D Contribution Graph")}\n`;
            }

            s += `</p>\n\n`;
          }
          break;
        case "leetcode":
          if (
            (formData.leetcode &&
              (formData.animations.showLeetcodeHeatmap ||
                formData.animations.showLeetcodeContest)) ||
            (formData.codeforces && formData.animations.codeforces)
          )
            s += `## ${formData.sectionTitles?.leetcode || "Arena Stats"}\n\n`;
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
    return md;
  } catch (err) {
    return `ERROR GENERATING MARKDOWN:\n\n${err.message}\n${err.stack}`;
  }
};

const Field = ({ name, label, placeholder, value, onChange }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={S.label}>{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={S.input}
    />
  </div>
);

const ColorField = ({ field, label, value, onChange }) => (
  <div style={{ flex: 1, minWidth: 80 }}>
    <span style={S.dimLabel}>{label}</span>
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
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
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
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

const PreviewContent = ({ formData, theme }) => {
  const validProjects = formData.projects.filter(
    (p) => p && String(p).trim() !== "",
  );
  const showBoard = formData.displayBoard && validProjects.length > 0;
  const topStr = useMemo(() => getTopHeader(formData), [formData]);
  const mdBefore = useMemo(() => {
    const boardIndex = formData.sectionOrder.indexOf("board");
    const beforeBoard =
      boardIndex > -1
        ? formData.sectionOrder.slice(0, boardIndex)
        : formData.sectionOrder;
    return (
      topStr +
      generateMarkdown(true, beforeBoard, formData, theme).replace(topStr, "")
    );
  }, [topStr, formData, theme]);
  const mdAfter = useMemo(() => {
    const boardIndex = formData.sectionOrder.indexOf("board");
    const afterBoard =
      boardIndex > -1 ? formData.sectionOrder.slice(boardIndex + 1) : [];
    return generateMarkdown(true, afterBoard, formData, theme).replace(
      topStr,
      "",
    );
  }, [topStr, formData, theme]);

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
          <DisplayBoard projects={formData.projects} github={formData.github} />
        </div>
      )}
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{mdAfter}</ReactMarkdown>
    </div>
  );
};

let globalCounterCalled = false;

export default function App() {
  const [theme, setTheme] = useState("elegant-black");
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);
  const [copiedSession, setCopiedSession] = useState(false);
  const [copiedYml, setCopiedYml] = useState(false);
  const [copiedIsometricYml, setCopiedIsometricYml] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
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
  const [visitorCount, setVisitorCount] = useState("...");

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

  useEffect(() => {
    if (!globalCounterCalled) {
      globalCounterCalled = true;
      fetch("https://api.counterapi.dev/v1/dev-readme/dev-readme/up")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.count !== undefined) {
            setVisitorCount(data.count);
          }
        })
        .catch(() => setVisitorCount("Error"));
    }
  }, []);

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

  const setIsometric3dTheme = (theme) =>
    setFormData((p) => ({ ...p, isometric3dTheme: theme }));

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
        setImportText("");
        setImportError("");
      } catch {
        setImportError(
          "Invalid session blob. Please check the format and try again.",
        );
      }
    } else {
      setImportError(
        "No valid session marker found. Paste the full blob from the Save Session tab.",
      );
    }
  };

  const generateSessionBlob = () => {
    try {
      return `${STATE_PREFIX}${btoa(encodeURIComponent(JSON.stringify(formData)))}${STATE_SUFFIX}`;
    } catch {
      return "";
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      generateMarkdown(false, formData.sectionOrder, false, formData, theme),
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

  const copyIsometricYml = () => {
    navigator.clipboard.writeText(isometricYml);
    setCopiedIsometricYml(true);
    setTimeout(() => setCopiedIsometricYml(false), 2000);
  };

  const snakeConfig = formData.snakeCustom || DEFAULT_SNAKE;
  const safeHex = (val, def) => (val || def).replace("#", "");
  const lightDotsEncoded = [
    snakeConfig.commitL0,
    snakeConfig.commitL1,
    snakeConfig.commitL2,
    snakeConfig.commitL3,
    snakeConfig.commitL4,
  ]
    .map((c) => `%23${safeHex(c, "#fff")}`)
    .join(",");
  const darkDotsEncoded = [
    snakeConfig.darkL0,
    snakeConfig.darkL1,
    snakeConfig.darkL2,
    snakeConfig.darkL3,
    snakeConfig.darkL4,
  ]
    .map((c) => `%23${safeHex(c, "#fff")}`)
    .join(",");
  const snakeHex = safeHex(snakeConfig.snakeColor, "#fff");
  const bgHex = safeHex(snakeConfig.bgColor, "#000");

  const snakeYml = `name: Generate Snake\n\non:\n  schedule:\n    - cron: "0 0 * * *"\n  workflow_dispatch:\n\npermissions:\n  contents: write\n\njobs:\n  generate:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout repository\n        uses: actions/checkout@v6\n      - name: Generate snake\n        uses: Platane/snk@v3\n        with:\n          github_user_name: \${{ github.repository_owner }}\n          outputs: |\n            dist/github-contribution-grid-snake.svg?palette=github&color_snake=%23${snakeHex}&color_dots=${lightDotsEncoded}&color_background=%23${bgHex}\n            dist/github-contribution-grid-snake-dark.svg?palette=github-dark&color_snake=%23${snakeHex}&color_dots=${darkDotsEncoded}&color_background=%23${bgHex}\n        env:\n          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}\n      - name: Push snake to output branch\n        run: |\n          sudo chown -R $USER:$USER dist\n          cd dist\n          git init\n          git checkout -b output\n          git add .\n          git config user.name "github-actions[bot]"\n          git config user.email "github-actions[bot]@users.noreply.github.com"\n          git commit -m "chore: update dev snake animation"\n          git push --force https://x-access-token:\${{ secrets.GITHUB_TOKEN }}@github.com/\${{ github.repository }}.git output`;

  const isometricYml = `name: GitHub-Profile-3D-Contrib\n\non:\n  schedule:\n    - cron: "0 18 * * *"\n  workflow_dispatch:\n\npermissions:\n  contents: write\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    name: generate-github-profile-3d-contrib\n    steps:\n      - uses: actions/checkout@v5\n      - uses: yoshi389111/github-profile-3d-contrib@latest\n        env:\n          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}\n          USERNAME: \${{ github.repository_owner }}\n      - name: Commit & Push\n        run: |\n          git config user.name github-actions\n          git config user.email github-actions@github.com\n          git add -A .\n          if git commit -m "generated"; then\n            git push\n          fi`;

  const animKeys = [
    { key: "visitors", label: "Profile Visitors Badge" },
    { key: "stats", label: "GitHub Stats" },
    { key: "streak", label: "GitHub Streak Stats" },
    { key: "githubProfileSummary", label: "Classic User Account Card" },
    { key: "lecoqLanguage", label: "Lecoq 3D Calendar & Languages" },
    { key: "isometric3D", label: "Yoshi 3D Contribution Graph" },
    { key: "topLangsCommit", label: "Top Langs by Commit" },
    { key: "topLangsRepo", label: "Top Langs by Repo" },
    { key: "pinball", label: "Activity Graph" },
    { key: "snake", label: "Contribution Snake" },
    { key: "showLeetcodeHeatmap", label: "LeetCode Heatmap" },
    { key: "showLeetcodeContest", label: "LeetCode Contest" },
    { key: "codeforces", label: "Codeforces Stats" },
  ];

  return (
    <div className="app-container">
      <CursorBubbles />
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
          <img
            src="/logo.png"
            alt="DevReadME Logo"
            width={20}
            height={20}
            style={{ display: "block" }}
          />
          <h1
            style={{
              fontSize: "1rem",
              letterSpacing: "0.05em",
              margin: 0,
              fontWeight: 700,
              color: "var(--accent-color)",
              background: "none",
              WebkitTextFillColor: "initial",
            }}
          >
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
            style={{ padding: "12px", flex: 1, overflowY: "auto" }}
          >
            <div style={S.card}>
              <div style={S.sectionHead}>
                <Globe size={13} /> Basic Info
              </div>
              <Field
                name="name"
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Field
                name="subtitle"
                label="Subtitle"
                placeholder="Full Stack Developer"
                value={formData.subtitle}
                onChange={handleInputChange}
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
                value={formData.funFact}
                onChange={handleInputChange}
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
                {
                  name: "discord",
                  label: "Discord",
                  placeholder: "username or ID",
                },
                {
                  name: "producthunt",
                  label: "Product Hunt",
                  placeholder: "username",
                },
                {
                  name: "youtube",
                  label: "YouTube",
                  placeholder: "handle or channel URL",
                },
                {
                  name: "twitch",
                  label: "Twitch",
                  placeholder: "username",
                },
                {
                  name: "medium",
                  label: "Medium",
                  placeholder: "username",
                },
                {
                  name: "stackoverflow",
                  label: "Stack Overflow",
                  placeholder: "user ID",
                },
                {
                  name: "dribbble",
                  label: "Dribbble",
                  placeholder: "username",
                },
                {
                  name: "behance",
                  label: "Behance",
                  placeholder: "username",
                },
                {
                  name: "kaggle",
                  label: "Kaggle",
                  placeholder: "username",
                },
                {
                  name: "devto",
                  label: "DEV Community",
                  placeholder: "username",
                },
                {
                  name: "mastodon",
                  label: "Mastodon",
                  placeholder: "username",
                },
              ].map((f) => (
                <Field
                  key={f.name}
                  {...f}
                  value={formData[f.name]}
                  onChange={handleInputChange}
                />
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
                    value={
                      formData.sectionTitles?.snake ??
                      formData.snakeTitle ??
                      "Dev Snake"
                    }
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        sectionTitles: {
                          ...p.sectionTitles,
                          snake: e.target.value,
                        },
                      }))
                    }
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
              {formData.animations.isometric3D && (
                <div
                  style={{
                    marginTop: 4,
                    padding: "8px 10px",
                    background: "rgba(0,0,0,0.15)",
                    borderRadius: 6,
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <label style={S.label}>3D Graph Section Title</label>
                  <input
                    value={
                      formData.sectionTitles?.isometric3D ??
                      "3D Contribution Graph"
                    }
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        sectionTitles: {
                          ...p.sectionTitles,
                          isometric3D: e.target.value,
                        },
                      }))
                    }
                    placeholder="3D Contribution Graph"
                    style={S.input}
                  />
                </div>
              )}
              {formData.animations.visitors && (
                <div
                  style={{
                    marginTop: 4,
                    padding: "8px 10px",
                    background: "rgba(0,0,0,0.15)",
                    borderRadius: 6,
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <label style={S.label}>About Me Section Title</label>
                  <input
                    value={formData.sectionTitles?.about ?? "About Me"}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        sectionTitles: {
                          ...p.sectionTitles,
                          about: e.target.value,
                        },
                      }))
                    }
                    placeholder="About Me"
                    style={S.input}
                  />
                </div>
              )}
              {formData.skills.length > 0 && (
                <div
                  style={{
                    marginTop: 4,
                    padding: "8px 10px",
                    background: "rgba(0,0,0,0.15)",
                    borderRadius: 6,
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <label style={S.label}>Skills Section Title</label>
                  <input
                    value={formData.sectionTitles?.skills ?? "Core Tech Stack"}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        sectionTitles: {
                          ...p.sectionTitles,
                          skills: e.target.value,
                        },
                      }))
                    }
                    placeholder="Core Tech Stack"
                    style={S.input}
                  />
                </div>
              )}
              <div
                style={{
                  marginTop: 4,
                  padding: "8px 10px",
                  background: "rgba(0,0,0,0.15)",
                  borderRadius: 6,
                  border: "1px solid var(--border-color)",
                }}
              >
                <label style={S.label}>Socials Section Title</label>
                <input
                  value={formData.sectionTitles?.socials ?? "Socials"}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      sectionTitles: {
                        ...p.sectionTitles,
                        socials: e.target.value,
                      },
                    }))
                  }
                  placeholder="Socials"
                  style={S.input}
                />
              </div>
              <div
                style={{
                  marginTop: 4,
                  padding: "8px 10px",
                  background: "rgba(0,0,0,0.15)",
                  borderRadius: 6,
                  border: "1px solid var(--border-color)",
                }}
              >
                <label style={S.label}>Arena Stats Section Title</label>
                <input
                  value={formData.sectionTitles?.leetcode ?? "Arena Stats"}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      sectionTitles: {
                        ...p.sectionTitles,
                        leetcode: e.target.value,
                      },
                    }))
                  }
                  placeholder="Arena Stats"
                  style={S.input}
                />
              </div>
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
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#555555",
                borderRadius: "4px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "10px",
                letterSpacing: "0.5px",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  background: "#0e76e8",
                  padding: "4px 6px",
                }}
              >
                VISITORS
              </span>
              <span style={{ padding: "4px 8px" }}>{visitorCount}</span>
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
                {
                  id: "isometricYml",
                  icon: <Box size={13} />,
                  label: "3D Graph YML",
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
            {activeTab === "preview" && (
              <PreviewContent formData={formData} theme={theme} />
            )}

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
                      stepNumber: 1,
                      stepText: (
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
                      stepNumber: 2,
                      stepText: (
                        <>
                          Edit <code style={S.chip}>README.md</code>, select
                          all, delete, paste the copied markdown.
                        </>
                      ),
                    },
                    {
                      stepNumber: 3,
                      stepText: (
                        <>
                          Click <strong>Commit changes</strong>. Your profile
                          goes live instantly.
                        </>
                      ),
                    },
                  ].map(({ stepNumber, stepText }) => (
                    <div key={stepNumber} style={S.stepRow}>
                      <div style={S.stepNum}>{stepNumber}</div>
                      <div style={S.stepText}>{stepText}</div>
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
                  {generateMarkdown(
                    false,
                    formData.sectionOrder,
                    false,
                    formData,
                    theme,
                  )}
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
                      stepNumber: 1,
                      stepText:
                        "Go to Save Session tab and copy your blob, or open where you stored it.",
                    },
                    {
                      stepNumber: 2,
                      stepText:
                        "Paste the full text below. It starts with the state marker and ends with the closing tag.",
                    },
                    {
                      stepNumber: 3,
                      stepText:
                        "Click Restore. All your settings load instantly.",
                    },
                  ].map(({ stepNumber, stepText }) => (
                    <div key={stepNumber} style={S.stepRow}>
                      <div style={S.stepNum}>{stepNumber}</div>
                      <div style={S.stepText}>{stepText}</div>
                    </div>
                  ))}
                </div>
                <textarea
                  value={importText}
                  onChange={(e) => {
                    setImportText(e.target.value);
                    if (importError) setImportError("");
                  }}
                  placeholder="Paste session blob here..."
                  style={{
                    width: "100%",
                    height: 200,
                    padding: 12,
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    border: `1px solid ${importError ? "#ff4444" : "var(--border-color)"}`,
                    borderRadius: 6,
                    fontFamily: "monospace",
                    fontSize: "0.78rem",
                    marginBottom: 10,
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
                {importError && (
                  <p
                    style={{
                      color: "#ff4444",
                      fontSize: "0.78rem",
                      marginTop: 0,
                      marginBottom: 10,
                    }}
                  >
                    {importError}
                  </p>
                )}
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
                      stepNumber: 1,
                      stepText: (
                        <>
                          Go to your profile repo:{" "}
                          <code style={S.chip}>
                            github.com/username/username
                          </code>
                        </>
                      ),
                    },
                    {
                      stepNumber: 2,
                      stepText: (
                        <>
                          Add file, type:{" "}
                          <code style={S.chip}>
                            .github/workflows/snake.yml
                          </code>
                        </>
                      ),
                    },
                    {
                      stepNumber: 3,
                      stepText: (
                        <>
                          Customize colors below, copy YML, paste into the file,
                          commit.
                        </>
                      ),
                    },
                    {
                      stepNumber: 4,
                      stepText: (
                        <>
                          <strong>
                            Settings &gt; Actions &gt; General &gt; Workflow
                            permissions &gt; Read and write
                          </strong>
                        </>
                      ),
                    },
                    {
                      stepNumber: 5,
                      stepText: (
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
                      stepNumber: 6,
                      stepText:
                        "Runs daily via cron. No fake commits, only writes to the output branch.",
                    },
                  ].map(({ stepNumber, stepText }) => (
                    <div key={stepNumber} style={S.stepRow}>
                      <div style={S.stepNum}>{stepNumber}</div>
                      <div style={S.stepText}>{stepText}</div>
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
                <SnakePreview snakeConfig={snakeConfig} />

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
                  {PRESET_SCHEMES.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedPreset(i);
                        setFormData((p) => ({
                          ...p,
                          snakeCustom: {
                            snakeColor: `#${preset.snake}`,
                            bgColor: `#${preset.bg}`,
                            commitL0: preset.light.split(",")[0],
                            commitL1: preset.light.split(",")[1],
                            commitL2: preset.light.split(",")[2],
                            commitL3: preset.light.split(",")[3],
                            commitL4: preset.light.split(",")[4],
                            darkL0: preset.dark.split(",")[0],
                            darkL1: preset.dark.split(",")[1],
                            darkL2: preset.dark.split(",")[2],
                            darkL3: preset.dark.split(",")[3],
                            darkL4: preset.dark.split(",")[4],
                          },
                        }));
                      }}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 5,
                        border: `2px solid ${selectedPreset === i ? `#${preset.snake}` : "var(--border-color)"}`,
                        background:
                          selectedPreset === i
                            ? `#${preset.snake}22`
                            : "transparent",
                        color: `#${preset.snake}`,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        transition: "all 0.12s",
                      }}
                    >
                      {preset.label}
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
                    <ColorField
                      field="snakeColor"
                      label="Snake Skin"
                      value={snakeConfig.snakeColor}
                      onChange={setSnakeField}
                    />
                    <ColorField
                      field="bgColor"
                      label="Background"
                      value={snakeConfig.bgColor}
                      onChange={setSnakeField}
                    />
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
                      <ColorField
                        key={f}
                        field={f}
                        label={`L${i}`}
                        value={snakeConfig[f]}
                        onChange={setSnakeField}
                      />
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
                        <ColorField
                          key={f}
                          field={f}
                          label={`D${i}`}
                          value={snakeConfig[f]}
                          onChange={setSnakeField}
                        />
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

            {activeTab === "isometricYml" && (
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
                    3D Contribution Graph Setup
                  </div>
                  {[
                    {
                      stepNumber: 1,
                      stepText: (
                        <>
                          Go to your profile repo:{" "}
                          <code style={S.chip}>
                            github.com/username/username
                          </code>
                        </>
                      ),
                    },
                    {
                      stepNumber: 2,
                      stepText: (
                        <>
                          Add file, type:{" "}
                          <code style={S.chip}>
                            .github/workflows/isometric3d.yml
                          </code>
                        </>
                      ),
                    },
                    {
                      stepNumber: 3,
                      stepText: (
                        <>
                          <strong>
                            Settings &gt; Actions &gt; General &gt; Workflow
                            permissions &gt; Read and write
                          </strong>
                        </>
                      ),
                    },
                    {
                      stepNumber: 4,
                      stepText:
                        "Pick a theme below, copy the YML, paste into the file, commit.",
                    },
                    {
                      stepNumber: 5,
                      stepText: (
                        <>
                          <strong>
                            Actions &gt; Generate 3D Contribution Graph &gt; Run
                            workflow
                          </strong>
                          . Creates{" "}
                          <code style={S.chip}>profile-3d-contrib/</code> folder
                          in <code style={S.chip}>main</code>.
                        </>
                      ),
                    },
                    {
                      stepNumber: 6,
                      stepText:
                        "Runs daily via cron. SVG commits directly to main so no extra branches are needed.",
                    },
                  ].map(({ stepNumber, stepText }) => (
                    <div key={stepNumber} style={S.stepRow}>
                      <div style={S.stepNum}>{stepNumber}</div>
                      <div style={S.stepText}>{stepText}</div>
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
                <div
                  style={{
                    marginBottom: 16,
                    background: "var(--bg-secondary)",
                    borderRadius: 6,
                    border: "1px solid var(--border-color)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 120,
                  }}
                >
                  <img
                    src={`https://raw.githubusercontent.com/yoshi389111/github-profile-3d-contrib/main/docs/demo/${formData.isometric3dTheme || "profile-green-animate"}.svg`}
                    alt="3D Contribution Graph Preview"
                    style={{ width: "100%", display: "block" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
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
                  Theme
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 16,
                  }}
                >
                  {ISOMETRIC_3D_THEMES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setIsometric3dTheme(t.value)}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 5,
                        border: `2px solid ${
                          (formData.isometric3dTheme ||
                            "profile-green-animate") === t.value
                            ? t.accent
                            : "var(--border-color)"
                        }`,
                        background:
                          (formData.isometric3dTheme ||
                            "profile-green-animate") === t.value
                            ? `${t.accent}22`
                            : "transparent",
                        color: t.accent,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        transition: "all 0.12s",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
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
                  onClick={copyIsometricYml}
                  style={{
                    ...S.btn,
                    background: "var(--accent-color)",
                    color: "#fff",
                    marginBottom: 12,
                  }}
                >
                  {copiedIsometricYml ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}{" "}
                  {copiedIsometricYml ? "Copied!" : "Copy YML"}
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
                  {isometricYml}
                </pre>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
