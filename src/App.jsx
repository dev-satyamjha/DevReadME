import React, { useState, useEffect } from "react";
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
  Award,
  Settings,
  Image as ImageIcon,
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

const DINO_DAY_NIGHT_GIF =
  "https://raw.githubusercontent.com/saadeghi/saadeghi/master/dino.gif";

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
    customCategories: [
      { id: 1, title: "My Favorite Design Tools", skills: ["Krita", "Figma"] },
    ],
    projects: ["", "", "", "", ""],
    displayBoard: true,
    animations: {
      streak: true,
      snake: true,
      pinball: false,
      topLangs: true,
      activityOverview: true,
      leetcodeHeatmap: true,
    },
    snakeSkinColor: "#000000",
    snakeFoodStyle: "gold",
    snakeTitle: "Dev Snake",
    funFact: "I can solve a Rubik's cube in under a minute!",
  });

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCustomSkill, setNewCustomSkill] = useState("");
  const [targetCustomCategory, setTargetCustomCategory] = useState(1);
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
      setTargetCustomCategory(newId);
      setNewCategoryName("");
    }
  };

  const addSkillToCustomCategory = () => {
    if (newCustomSkill.trim() && targetCustomCategory) {
      setFormData((prev) => ({
        ...prev,
        customCategories: prev.customCategories.map((cat) => {
          if (
            cat.id === targetCustomCategory &&
            !cat.skills.includes(newCustomSkill.trim())
          ) {
            return { ...cat, skills: [...cat.skills, newCustomSkill.trim()] };
          }
          return cat;
        }),
      }));
      setNewCustomSkill("");
    }
  };

  const removeCustomCategory = (id) => {
    setFormData((prev) => ({
      ...prev,
      customCategories: prev.customCategories.filter((cat) => cat.id !== id),
    }));
  };

  const removeSkillFromCustomCategory = (catId, skill) => {
    setFormData((prev) => ({
      ...prev,
      customCategories: prev.customCategories.map((cat) => {
        if (cat.id === catId) {
          return { ...cat, skills: cat.skills.filter((s) => s !== skill) };
        }
        return cat;
      }),
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
      animations: {
        ...prev.animations,
        [anim]: !prev.animations[anim],
      },
    }));
  };

  const getThemeQueryParams = () => {
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

  const getSelectedFoodDots = () => {
    const found = SNAKE_FOOD_OPTIONS.find(
      (o) => o.value === formData.snakeFoodStyle,
    );
    return found ? found.dots : SNAKE_FOOD_OPTIONS[0].dots;
  };

  const generateMarkdown = (isPreview = false) => {
    const themeParams = getThemeQueryParams();
    const githubUser = formData.github || "torvalds";

    let md = `<div align="center">\n  <h1>Hi 👋, I'm ${formData.name || "Anonymous Developer"}</h1>\n  <h3>${formData.subtitle}</h3>\n</div>\n\n`;

    /*Display Board*/
    if (formData.displayBoard) {
      md += `<div align="center">\n`;
      md += `  <img src="${DINO_DAY_NIGHT_GIF}" alt="Dino Day-Night Loop" width="100%" style="border-radius:12px; margin-bottom:16px;" />\n`;

      const validProjects = formData.projects.filter((p) => p.trim() !== "");
      if (validProjects.length > 0) {
        md += `\n### 🏆 Prominent Projects\n\n`;
        md += `<table>\n<tr>\n`;
        validProjects.forEach((repo, idx) => {
          md += `<td align="center">\n`;
          md += `  <a href="https://github.com/${githubUser}/${repo}">\n`;
          md += `    <img src="https://github-readme-stats.vercel.app/api/pin/?username=${githubUser}&repo=${repo}&${themeParams}&show_icons=true" width="320" alt="${repo}" />\n`;
          md += `  </a>\n`;
          md += `</td>\n`;
          if ((idx + 1) % 2 === 0 && idx < validProjects.length - 1) {
            md += `</tr>\n<tr>\n`;
          }
        });
        md += `</tr>\n</table>\n`;
      }

      md += `</div>\n\n`;
    }

    /* About */
    if (formData.about) {
      md += `## 🚀 About Me\n${formData.about}\n\n`;
    }

    /* Tech Stack  */
    if (formData.skills.length > 0) {
      md += `## 💻 Core Tech Stack\n<p align="center">\n`;
      formData.skills.forEach((skill) => {
        const safeName = skill
          .replace(/ /g, "%20")
          .replace(/\+/g, "%2B")
          .replace(/#/g, "%23");
        md += `  <img src="https://img.shields.io/badge/${safeName}-151515?style=for-the-badge&logo=${skill.toLowerCase().replace(/ /g, "")}&logoColor=white" alt="${skill}" />\n`;
      });
      md += `</p>\n\n`;
    }

    /* Custom skills */
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

    /*  Social */
    const hasAnyLink =
      formData.github ||
      formData.twitter ||
      formData.linkedin ||
      formData.codestats ||
      formData.customLinks.length > 0;
    if (hasAnyLink) {
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
        const safeLbl = link.label.replace(/ /g, "%20");
        md += `  <a href="${link.url}"><img src="https://img.shields.io/badge/${safeLbl}-4285F4?style=for-the-badge" alt="${link.label}" /></a>\n`;
      });
      md += `</p>\n\n`;
    }

    /* Fun Fact  */
    if (formData.funFact) {
      md += `> 💡 **Fun Fact:** ${formData.funFact}\n\n`;
    }

    /* GitHub Activity Overview  */
    md += `## 📊 GitHub Activity Overview\n\n<p align="center">\n`;
    if (formData.animations.activityOverview) {
      md += `  <img src="https://github-readme-stats.vercel.app/api?username=${githubUser}&show_icons=true&hide_border=true&${themeParams}" alt="GitHub Stats" />\n`;
    }
    if (formData.animations.topLangs) {
      md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUser}&layout=compact&hide_border=true&${themeParams}" alt="Top Languages" />\n`;
    }
    if (formData.animations.streak) {
      md += `  <img src="https://streak-stats.demolab.com/?user=${githubUser}&hide_border=true&${themeParams}" alt="Meteor Streak" />\n`;
    }
    md += `</p>\n\n`;

    /* CodeStats */
    if (formData.codestats) {
      md += `## 📈 Code::Stats XP Overview\n<p align="center">\n`;
      md += `  <img src="https://codestats-readme.wegfan.cn/history/${formData.codestats}?max_languages=8&width=800" alt="Code::Stats XP History" />\n`;
      md += `</p>\n\n`;
    }

    /*Competitive */
    const hasCompetitive = formData.leetcode || formData.codeforces;
    if (hasCompetitive) {
      md += `## 🧩 Competitive & Code Stats\n\n`;
      if (formData.leetcode) {
        md += `<p align="center">\n`;
        md += `  <img src="https://leetcard.jacoblin.cool/${formData.leetcode}?theme=dark&font=Inter&ext=heatmap" alt="LeetCode Heatmap" />\n`;
        md += `</p>\n\n`;
      }
      if (formData.codeforces) {
        md += `<p align="center">\n`;
        md += `  <img src="https://codeforces-readme-stats.vercel.app/api/card?username=${formData.codeforces}&theme=tokyonight" alt="Codeforces Stats" />\n`;
        md += `</p>\n\n`;
      }
    }

    /* Pinball Activity Graph  */
    if (formData.animations.pinball) {
      md += `## 🎯 Pinball Activity Graph\n<p align="center">\n`;
      md += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${githubUser}&hide_border=true&${themeParams}" alt="Activity Graph" width="100%" />\n`;
      md += `</p>\n\n`;
    }

    /* Snake */
    if (formData.animations.snake) {
      md += `## 🐍 ${formData.snakeTitle || "Dev Snake"}\n`;

      const snakeSrc = isPreview
        ? `https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake-dark.svg`
        : `https://raw.githubusercontent.com/${githubUser}/${githubUser}/output/github-contribution-grid-snake.svg`;

      md += `<p align="center">\n`;
      md += `  <img src="${snakeSrc}" alt="${formData.snakeTitle || "Dev Snake"}" width="100%" />\n`;
      md += `</p>\n\n`;

      if (!isPreview) {
        md += `<!-- \n  🐍 SNAKE SETUP — Add .github/workflows/snake.yml to your profile repo:\n\n`;
        md += `  name: Generate Snake\n`;
        md += `  on:\n    schedule:\n      - cron: "0 0 * * *"\n    workflow_dispatch:\n\n`;
        md += `  jobs:\n    build:\n      runs-on: ubuntu-latest\n      steps:\n`;
        md += `        - uses: Platane/snk@v3\n          with:\n`;
        md += `            github_user_name: \${{ github.repository_owner }}\n`;
        md += `            outputs: |\n              dist/github-contribution-grid-snake.svg?color_snake=${formData.snakeSkinColor}&color_dots=${getSelectedFoodDots()}\n\n`;
        md += `        - uses: crazy-max/ghaction-github-pages@v3.1.0\n          with:\n`;
        md += `            target_branch: output\n            build_dir: dist\n`;
        md += `          env:\n            GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}\n`;
        md += `\n  Snake Skin: ${SNAKE_SKIN_OPTIONS.find((o) => o.value === formData.snakeSkinColor)?.label || "Custom"} (${formData.snakeSkinColor})`;
        md += `\n  Food Style: ${SNAKE_FOOD_OPTIONS.find((o) => o.value === formData.snakeFoodStyle)?.label || "Custom"}\n`;
        md += `-->\n\n`;
      }
    }

    return md;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMarkdown(false));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <CursorBubbles />
      <div className="app-container">
        <header className="header">
          <div className="logo-area">
            <Sparkles className="logo-icon" size={2} />
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
                  Shows the classic dinosaur day-to-night pixel loop animation
                  above your top 5 pinned projects.
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
                <div className="form-group">
                  <label>GitHub Username (Crucial)</label>
                  <input
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="torvalds"
                  />
                </div>
                <div className="form-group">
                  <label>LeetCode Username</label>
                  <input
                    name="leetcode"
                    value={formData.leetcode}
                    onChange={handleInputChange}
                    placeholder="your_leetcode"
                  />
                </div>
                <div className="form-group">
                  <label>Codeforces Handle</label>
                  <input
                    name="codeforces"
                    value={formData.codeforces}
                    onChange={handleInputChange}
                    placeholder="tourist"
                  />
                </div>
                <div className="form-group">
                  <label>Code::Stats Username (shows XP graph)</label>
                  <input
                    name="codestats"
                    value={formData.codestats}
                    onChange={handleInputChange}
                    placeholder="your_codestats_user"
                  />
                </div>
                <div className="form-group">
                  <label>Twitter / X</label>
                  <input
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="elonmusk"
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="williamgates"
                  />
                </div>

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
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.animations.activityOverview}
                      onChange={() => toggleAnimation("activityOverview")}
                    />
                    <span>GitHub Activity Overview</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.animations.topLangs}
                      onChange={() => toggleAnimation("topLangs")}
                    />
                    <span>Top Languages</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.animations.streak}
                      onChange={() => toggleAnimation("streak")}
                    />
                    <span>Meteor Effect Streak</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.animations.leetcodeHeatmap}
                      onChange={() => toggleAnimation("leetcodeHeatmap")}
                    />
                    <span>LeetCode Heatmap (needs username)</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.animations.pinball}
                      onChange={() => toggleAnimation("pinball")}
                    />
                    <span>Pinball Activity Graph</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.animations.snake}
                      onChange={() => toggleAnimation("snake")}
                    />
                    <span>Contribution Snake</span>
                  </label>

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
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.4,
                          margin: 0,
                        }}
                      >
                        These colors are applied when you deploy the GitHub
                        Action from the generated code. The live preview uses a
                        demo snake SVG.
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
                        value={
                          targetCustomCategory === cat.id ? newCustomSkill : ""
                        }
                        onFocus={() => setTargetCustomCategory(cat.id)}
                        onChange={(e) => {
                          setTargetCustomCategory(cat.id);
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
                          setTargetCustomCategory(cat.id);
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
                <div className="markdown-preview custom-scrollbar">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {generateMarkdown(true)}
                  </ReactMarkdown>
                </div>
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
