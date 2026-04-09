import { useEffect, useRef, useState } from "react";

// Add these to your index.html <head> if not already present:
// <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet">

const showCourseNumber = false;

const DEGREE = {
  title: "B.S. Computer Science & Engineering",
  school: "University of Louisville",
  department: "J.B. Speed School of Engineering",
  minor: "Minor in Mathematics",
  concentration: "Systems and ML",
  graduation: "Dec 2026",
  gpa: "3.8 / 4.0",
};

const COURSEWORK = [
  {
    category: "Systems",
    icon: "settings_ethernet",
    color: "red",
    courses: [
      { name: "Operating Systems", number: "CSE 420" },
      { name: "Database Design", number: "CSE 335" },
      { name: "Computer Architecture", number: "CSE 621" },
      { name: "Computer Networks", number: "CSE 516" },
    ],
  },
  {
    category: "Theory",
    icon: "account_tree",
    color: "purple",
    courses: [
      { name: "Data Structures & Algorithms", number: "CSE " },
      { name: "Analysis of Algorithms", number: "CSE " },
      { name: "Discrete Mathematics", number: "CSE " },
      { name: "Formal Languages", number: "CSE " },
    ],
  },
  {
    category: "AI / ML",
    icon: "memory",
    color: "red",
    courses: [
      { name: "Machine Learning", number: "CSE " },
      { name: "Artifical Intelligence", number: "CSE " },
      { name: "Natural Language Processing", number: "CSE " },
      { name: "Data Analytics", number: "CSE " },
    ],
  },
  {
    category: "Math",
    icon: "functions",
    color: "purple",
    courses: [
      { name: "Calculus I–III", number: "MATH " },
      { name: "Linear Algebra", number: "MATH " },
      { name: "Probability & Statistics", number: "MATH " },
      { name: "Differential Equations", number: "MATH " },
    ],
  },
];

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

const CourseColumn = ({ category, icon, color, courses, colIndex, visible }) => {
  const accentClass = color === "red" ? "text-red-500" : "text-purple-500";
  const hoverClass = color === "red" ? "hover:text-red-500" : "hover:text-purple-500";

  return (
    <FadeIn visible={visible} delay={400 + colIndex * 100} className="space-y-4">
      {/* Category header */}
      <div className="flex items-center gap-2 font-mono text-sm tracking-widest text-gray-400 uppercase">
        <span className={`material-symbols-outlined text-lg ${accentClass}`}>{icon}</span>
        {category}
      </div>

      {/* Course list with tree connectors */}
      <ul className="space-y-4 font-mono">
        {courses.map((course, i) => {
          const isLast = i === courses.length - 1;
          return (
            <li
              key={course}
              className="group ml-0.5 flex items-center gap-3 transition-all duration-500 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(6px)",
                transitionDelay: `${500 + colIndex * 100 + i * 60}ms`,
              }}
            >
              <span className={`${accentClass} mt-0.5 shrink-0 select-none`}>
                {isLast ? "└─" : "├─"}
              </span>
              <span
                className={`text-sm leading-snug text-gray-300 transition-colors duration-200 ${hoverClass} cursor-default`}
              >
                {course.name}
              </span>

              {showCourseNumber && (
                <span className={`cursor-default text-sm leading-snug text-gray-600`}>
                  {course.number}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </FadeIn>
  );
};

export const Education = () => {
  const ref = useRef(null);
  const visible = useReveal(ref);

  return (
    <section id="education" className="px-6 py-32 md:px-12" ref={ref}>
      <div className="mx-auto max-w-5xl">
        {/* Terminal breadcrumb */}
        <FadeIn visible={visible} delay={0}>
          <div className="mb-6 flex items-center gap-3 font-mono text-sm text-red-400/80">
            <span className="material-symbols-outlined text-sm">terminal</span>
            <span>~/profile/academic_path</span>
          </div>
        </FadeIn>
        {/* Hero heading */}
        <FadeIn visible={visible} delay={80}>
          <h2
            className="bg-gradient-to-r from-red-500 to-purple-700 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-7xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            EDUCATION
          </h2>
        </FadeIn>
        {/* Degree info — left/right split */}
        <FadeIn visible={visible} delay={160}>
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h3 className="font-mono text-2xl text-white md:text-3xl">{DEGREE.title}</h3>
              <p className="mt-2 font-mono text-sm text-gray-500">
                {DEGREE.school} • {DEGREE.concentration} • {DEGREE.minor}
              </p>
            </div>
            <div className="shrink-0 text-left font-mono md:text-right">
              <span className="text--500 block text-lg">{DEGREE.graduation}</span>
              <span className="text-sm tracking-widest text-gray-500">GPA: {DEGREE.gpa}</span>
            </div>
          </div>
        </FadeIn>
        {/* $ ls coursework/ */}
        <FadeIn visible={visible} delay={260}>
          <div className="md:text-md mb-4 flex items-center gap-3 font-mono text-sm">
            <span className="text-gray-600">$</span>
            <span className="text-white">ls</span>
            <span className="text-fuchsia-300">coursework/</span>
          </div>
        </FadeIn>
        {/* 4-column grid */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Vertical separator lines — desktop only */}
          {[25, 50, 75].map((pos) => (
            <div
              key={pos}
              className="pointer-events-none absolute inset-y-0 hidden w-px lg:block"
              style={{
                left: `${pos}%`,
                background:
                  "linear-gradient(to bottom, rgba(239,68,68,0.15), rgba(168,85,247,0.15), transparent)",
              }}
            />
          ))}

          {COURSEWORK.map((col, i) => (
            <CourseColumn
              key={col.category}
              category={col.category}
              icon={col.icon}
              color={col.color}
              courses={col.courses}
              colIndex={i}
              visible={visible}
            />
          ))}
        </div>
        {/* Terminal footer */}
        <FadeIn visible={visible} delay={900}>
          <div
            className="pt-0 font-mono text-sm text-gray-600 md:mt-45"
            style={{ borderTop: "1px solid rgba(255,255,255,0.5)" }}
          >
            {/* 
            <div className="flex items-center gap-2">
              <span className="text-purple-500">#</span>
              <span>System operational. Knowledge graph updated.</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-red-500">&gt;</span>
              <span className="animate-pulse text-gray-400">_</span>
            </div>
*/}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
