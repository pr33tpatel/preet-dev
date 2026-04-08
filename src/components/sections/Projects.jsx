import { useEffect, useRef, useState } from "react";

// ─── Project Data ──────────────────────────────────────────────────────────────
// Replace these with your real projects. tag is the short category label.
const PROJECTS = [
  {
    id: "01",
    tag: "01_WEB",
    name: "Ball Knowledge",
    description:
      "NBA Player Stats Website and Database — full-stack application for querying and visualizing player statistics.",
    stack: ["HTML", "CSS", "Node.js", "Express", "MySQL"],
    github: "https://github.com/pr33tpatel", // replace with direct repo link
    demo: null,
  },
  {
    id: "02",
    tag: "02_PLACEHOLDER",
    name: "Project 2",
    description:
      "[ PLACEHOLDER: Add a 1–2 sentence description of what this project does and why it's interesting. ]",
    stack: ["HTML", "CSS", "Node.js", "Express", "MySQL"],
    github: "#",
    demo: null,
  },
  {
    id: "03",
    tag: "03_PLACEHOLDER",
    name: "Project 3",
    description: "[ PLACEHOLDER: Add project description. ]",
    stack: ["Python", "React"],
    github: "#",
    demo: null,
  },
  {
    id: "04",
    tag: "04_PLACEHOLDER",
    name: "Project 4",
    description: "[ PLACEHOLDER: Add project description. ]",
    stack: ["Rust", "C++"],
    github: "#",
    demo: null,
  },
];

// ─── Reveal Hook ───────────────────────────────────────────────────────────────
const useReveal = (ref) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
};

const FadeIn = ({ children, delay = 0, visible, className = "" }) => (
  <div
    className={`transition-all duration-600 ease-out ${className}`}
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(12px)",
      transitionDelay: `${delay}ms`,
    }}
  >
    {children}
  </div>
);

// ─── Grid Card ─────────────────────────────────────────────────────────────────
const GridCard = ({ project, index, visible }) => (
  <article
    className="group relative transition-all duration-500 ease-out"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transitionDelay: `${300 + index * 100}ms`,
    }}
  >
    {/* Left accent line */}
    <div
      className="absolute top-0 bottom-0 -left-6 w-px transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background: "linear-gradient(to bottom, #ef4444, #a855f7)",
        opacity: 0.2,
      }}
    />

    <div className="flex flex-col gap-5">
      {/* Name + tag */}
      <div className="flex items-baseline justify-between gap-4">
        <h3
          className="text-3xl font-bold tracking-tighter uppercase transition-all duration-300 md:text-4xl"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: "linear-gradient(to right, #ef4444, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {project.name}
        </h3>
        <span className="shrink-0 font-mono text-xs tracking-[0.2em] text-gray-600">
          {project.tag}
        </span>
      </div>

      {/* Description */}
      <p className="max-w-md text-base leading-relaxed text-gray-400">{project.description}</p>

      {/* Stack */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tracking-widest uppercase">
        {project.stack.map((tech) => (
          <div key={tech} className="flex items-center gap-2">
            <span className="text-red-500">&gt;</span>
            <span className="text-white">{tech}</span>
          </div>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-6 pt-2">
        {project.github && project.github !== "#" && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-purple-400 transition-transform duration-300 group-hover:translate-x-2"
          >
            VIEW_SOURCE
            <span className="material-symbols-outlined text-sm">north_east</span>
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-red-400 transition-transform duration-300 group-hover:translate-x-2"
          >
            LIVE_DEMO
            <span className="material-symbols-outlined text-sm">north_east</span>
          </a>
        )}
      </div>
    </div>
  </article>
);

// ─── Tree Row ──────────────────────────────────────────────────────────────────
const TreeRow = ({ project, index, visible }) => {
  const [open, setOpen] = useState(false);
  const isLast = index === PROJECTS.length - 1;

  return (
    <div
      className="font-mono transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transitionDelay: `${300 + index * 80}ms`,
      }}
    >
      {/* Directory row */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="group flex w-full items-center gap-3 py-1 text-left"
      >
        <span className="text-gray-600 select-none">{isLast ? "└─" : "├─"}</span>
        <span
          className="material-symbols-outlined text-base text-red-400 transition-transform duration-200"
          style={{ display: "inline-block", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          chevron_right
        </span>
        <span
          className="text-base font-bold tracking-tight uppercase transition-all duration-200 group-hover:text-red-400"
          style={{
            background: open ? "linear-gradient(to right, #ef4444, #a855f7)" : undefined,
            WebkitBackgroundClip: open ? "text" : undefined,
            WebkitTextFillColor: open ? "transparent" : undefined,
            color: open ? undefined : "#e5e7eb",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {project.name}/
        </span>
        <span className="ml-auto text-xs tracking-widest text-gray-700">{project.tag}</span>
      </button>

      {/* Expanded content */}
      <div
        style={{
          maxHeight: open ? "300px" : "0px",
          overflow: "hidden",
          transition: "max-height 350ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="ml-2 space-y-2 border-l border-white/5 py-3 pl-10">
          <div className="flex items-start gap-3 text-sm">
            <span className="shrink-0 text-gray-700">├─</span>
            <span className="shrink-0 text-gray-600">description:</span>
            <span className="text-gray-400">{project.description}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="shrink-0 text-gray-700">├─</span>
            <span className="shrink-0 text-gray-600">stack:</span>
            <span className="text-gray-400">{project.stack.join(", ")}</span>
          </div>
          {project.github && project.github !== "#" && (
            <div className="flex items-center gap-3 text-sm">
              <span className="shrink-0 text-gray-700">└─</span>
              <span className="shrink-0 text-gray-600">source:</span>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 transition-colors hover:text-purple-300"
              >
                {project.github}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
export const Projects = () => {
  const ref = useRef(null);
  const visible = useReveal(ref);
  const [view, setView] = useState("grid"); // "grid" | "tree"

  return (
    <section id="projects" className="px-6 py-32 md:px-12" ref={ref}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}

        {/* Terminal breadcrumb */}
        <FadeIn visible={visible} delay={0}>
          <div className="mb-6 flex items-center gap-3 font-mono text-sm text-red-400/80">
            <span className="material-symbols-outlined text-sm">terminal</span>
            <span>~/profile/projects</span>
          </div>
        </FadeIn>
        <FadeIn visible={visible} delay={0}>
          <header className="mb-10 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div className="flex flex-col">
              <div className="mb-1 flex items-center gap-4">
                {/* <span className="font-mono text-xl text-red-500">$</span>*/}
                <h2
                  className="text-4xl font-bold tracking-tight uppercase md:text-6xl"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: "linear-gradient(to right, #ef4444, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  projects <span className="animate-pulse">_</span>
                </h2>

                <FadeIn visible={visible} delay={80}>
                  <h2
                    className="mb-5 bg-gradient-to-r from-red-500 to-purple-700 bg-clip-text text-7xl leading-tight font-bold tracking-tighter text-transparent md:text-8xl"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    EDUCATION
                  </h2>
                </FadeIn>
              </div>
              <p className="ml-8 font-mono text-xs tracking-widest text-gray-600 uppercase md:ml-12">
                [{PROJECTS.length}] entries found in local directory /src/bin/
              </p>
            </div>

            {/* View toggle */}
            <div
              className="flex items-center self-start border border-white/10 p-1 md:self-auto"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <button
                onClick={() => setView("grid")}
                title="Grid View"
                className="flex items-center justify-center p-2 transition-all duration-200"
                style={{
                  background:
                    view === "grid" ? "linear-gradient(to right, #ef4444, #a855f7)" : "transparent",
                  color: view === "grid" ? "#000" : "#6b7280",
                }}
              >
                <span className="material-symbols-outlined text-xl">grid_view</span>
              </button>
              <button
                onClick={() => setView("tree")}
                title="Tree View"
                className="flex items-center justify-center p-2 transition-all duration-200"
                style={{
                  background:
                    view === "tree" ? "linear-gradient(to right, #ef4444, #a855f7)" : "transparent",
                  color: view === "tree" ? "#000" : "#6b7280",
                }}
              >
                <span className="material-symbols-outlined text-xl">account_tree</span>
              </button>
            </div>
          </header>
        </FadeIn>

        {/* Grid View */}
        {view === "grid" && (
          <div className="grid grid-cols-1 gap-x-24 gap-y-20 lg:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <GridCard key={project.id} project={project} index={i} visible={visible} />
            ))}
          </div>
        )}

        {/* Tree View */}
        {view === "tree" && (
          <div className="font-mono">
            <FadeIn visible={visible} delay={200}>
              <div className="mb-4 text-sm text-gray-500">projects/</div>
            </FadeIn>
            <div className="space-y-1">
              {PROJECTS.map((project, i) => (
                <TreeRow key={project.id} project={project} index={i} visible={visible} />
              ))}
            </div>
          </div>
        )}

        {/* Terminal footer */}
        <FadeIn visible={visible} delay={700}>
          <div
            className="mt-24 pt-10 font-mono text-sm text-gray-600"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-purple-500">#</span>
              <span>End of directory listing.</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-red-500">&gt;</span>
              <span className="animate-pulse text-gray-400">_</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

