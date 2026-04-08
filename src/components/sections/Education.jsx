import { useEffect, useRef, useState } from "react";

const DEGREE_LINES = [
  { key: "Degree", value: "B.S. Computer Science & Engineering" },
  { key: "Minor", value: "Mathematics" },
  { key: "Institution", value: "University of Louisville" },
  { key: "GPA", value: "3.8 / 4.0" },
  { key: "Expected", value: "May 2026" },
];

const COURSEWORK = {
  "systems/": [
    "Operating Systems",
    "Database Design",
    "Computer Networks", // placeholder
    "Computer Architecture", // placeholder
  ],
  "theory/": [
    "Data Structures & Algorithms",
    "Combinatorial Optimization & Modern Heuristics",
    "Discrete Mathematics",
    "Automata & Formal Languages", // placeholder
    "Analysis of Algorithms", // placeholder
  ],
  "ai-ml/": [
    "Data Analytics",
    "Machine Learning", // placeholder
    "Natural Language Processing", // placeholder
    "Artifical Intelligence",
  ],
  "math/": [
    "Calculus I–III", // placeholder
    "Linear Algebra", // placeholder
    "Probability & Statistics", // placeholder
    "Differential Equations", // placeholder
  ],
};

const DIRS = Object.keys(COURSEWORK);

// Staggered reveal hook
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
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
};

const TerminalLine = ({ children, delay = 0, visible, className = "" }) => (
  <div
    className={`font-mono transition-all duration-500 ease-out ${className}`}
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(6px)",
      transitionDelay: `${delay}ms`,
    }}
  >
    {children}
  </div>
);

export const Education = () => {
  const ref = useRef(null);
  const visible = useReveal(ref);
  const [openDirs, setOpenDirs] = useState({});

  const toggleDir = (dir) => setOpenDirs((prev) => ({ ...prev, [dir]: !prev[dir] }));

  return (
    <section id="education" className="px-4 py-20" ref={ref}>
      <div className="mx-auto max-w-4xl">
        {/* Section heading */}
        <TerminalLine visible={visible} delay={0}>
          <h2 className="mb-16 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-5xl font-bold text-transparent">
            Education
          </h2>
        </TerminalLine>

        {/* cat degree.txt */}
        <TerminalLine visible={visible} delay={80} className="mb-3">
          <span className="text-sm text-gray-600">$ </span>
          <span className="text-sm text-purple-400">cat</span>
          <span className="text-sm text-gray-300"> degree.txt</span>
        </TerminalLine>

        <div className="mb-12 space-y-1.5 pl-4">
          {DEGREE_LINES.map((line, i) => (
            <TerminalLine key={line.key} visible={visible} delay={140 + i * 60}>
              <div className="flex gap-3 text-sm">
                <span className="w-28 shrink-0 text-gray-600">{line.key}:</span>
                <span className="text-gray-200">{line.value}</span>
              </div>
            </TerminalLine>
          ))}
        </div>

        {/* ls coursework/ */}
        <TerminalLine visible={visible} delay={500} className="mb-4">
          <span className="text-sm text-gray-600">$ </span>
          <span className="text-sm text-purple-400">ls</span>
          <span className="text-sm text-gray-300"> coursework/</span>
        </TerminalLine>

        {/* Directory row */}
        <TerminalLine visible={visible} delay={580} className="mb-10 pl-4">
          <div className="flex flex-wrap gap-x-8 gap-y-1 text-sm">
            {DIRS.map((dir) => (
              <span key={dir} className="text-red-400">
                {dir}
              </span>
            ))}
          </div>
        </TerminalLine>

        {/* ls coursework/<dir>/ — expandable */}
        <div className="space-y-6 pl-4">
          {DIRS.map((dir, di) => (
            <TerminalLine key={dir} visible={visible} delay={660 + di * 80}>
              {/* Command line — clickable */}
              <button
                onClick={() => toggleDir(dir)}
                className="group mb-2 flex w-full cursor-pointer items-center gap-2 text-left text-sm"
              >
                <span className="text-gray-600">$ </span>
                <span className="text-purple-400">ls</span>
                <span className="text-gray-300"> coursework/{dir}</span>
                <span
                  className="ml-1 text-xs text-gray-600 transition-transform duration-200"
                  style={{
                    display: "inline-block",
                    transform: openDirs[dir] ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  ▸
                </span>
                <span className="ml-1 text-xs text-gray-700 opacity-0 transition-opacity group-hover:opacity-100">
                  {openDirs[dir] ? "collapse" : "expand"}
                </span>
              </button>

              {/* Course list */}
              <div
                style={{
                  maxHeight: openDirs[dir] ? "400px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="flex flex-wrap gap-x-10 gap-y-1 pb-2 pl-4">
                  {COURSEWORK[dir].map((course) => (
                    <span key={course} className="font-mono text-sm text-gray-400">
                      {course
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[&]/g, "and")
                        .replace(/[–—]/g, "-")
                        .replace(/[^a-z0-9-]/g, "")}
                    </span>
                  ))}
                </div>
              </div>
            </TerminalLine>
          ))}
        </div>

        {/* Trailing cursor */}
        <TerminalLine visible={visible} delay={980} className="mt-10">
          <span className="text-sm text-gray-600">$ </span>
          <span className="animate-pulse text-sm text-gray-400">▌</span>
        </TerminalLine>
      </div>
    </section>
  );
};
