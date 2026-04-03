import { useEffect, useRef, useState } from "react";

const diffCurrentExperience = false;
const experiences = [
  {
    id: 0,
    title: "Software Engineering Intern II",
    company: "Challenge Technolabs",
    date: "Jan 2026 – Present",
    current: true,
    responsibilities: [
      "[ PLACEHOLDER: Add responsibility 1 ]",
      "[ PLACEHOLDER: Add responsibility 2 ]",
      "[ PLACEHOLDER: Add responsibility 3 ]",
    ],
  },
  {
    id: 1,
    title: "Student Researcher - Operating Systems",
    subtitle: "Computer Systems Lab",
    company: "University of Louisville",
    date: "Aug 2025 – Present",
    current: true,
    responsibilities: [
      "Engineered fio benchmarking experiments across multi-generational storage devices, cutting data collection runtime by 81% while delivering latency, throughput, and queue-depth analysis with direct implications for storage scheduler design.",
      "Analyzed I/O traces of storage system access patterns from ML training workloads targeting caching optimization in large-scale distributed storage systems",
      "",
      "Conducted structured literature reviews of published systems research, developed data visualization to communicate benchmark results, and contextualized findings against prior work.",
    ],
  },
  {
    id: 2,
    title: "Software Engineering Intern I",
    company: "Challenge Technolabs",
    date: "May 2025 – Aug 2025",
    current: false,
    responsibilities: [
      "[ PLACEHOLDER: Add responsibility 1 ]",
      "[ PLACEHOLDER: Add responsibility 2 ]",
      "[ PLACEHOLDER: Add responsibility 3 ]",
    ],
  },
  {
    id: 3,
    title: "Researcher / Data Science Intern",
    subtitle: "Bioinformatics Research",
    company: "OCTC",
    date: "Sep 2021 – May 2023",
    current: false,
    responsibilities: [
      "Designed and executed biological experiments on Drosophila as a model organism for Polycystic Kidney Disease (PKD) research.",
      // "Developed Python pipelines to process, clean, and analyze experimental datasets, surfacing statistically significant trends in disease phenotype expression.",
      "Managed and maintained structured research data across multi-semester experiments, ensuring reproducibility and data integrity.",
    ],
  },
];

const TimelineItem = ({ exp, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // persists after appearing
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      section_id="experience"
      ref={ref}
      className={`relative pb-12 pl-12 transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      {/* Timeline dot */}
      <div
        className={`absolute top-1.5 left-4 h-3.5 w-3.5 -translate-x-1/2 rounded-full transition-all duration-300 ${
          visible
            ? "bg-gradient-to-br from-red-500 to-purple-500 shadow-[0_0_14px_rgba(168,85,247,0.7)]"
            : "border border-gray-600 bg-gray-800"
        }`}
        style={{ transitionDelay: `${index * 130 + 200}ms` }}
      />
      {/* Title + date */}
      <div className="mb-1 flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg leading-snug font-semibold text-white">{exp.title}</h3>
          {exp.subtitle && (
            <p className="mt-0.5 text-sm font-medium text-purple-400">{exp.subtitle}</p>
          )}
        </div>
        <span
          className={`self-start rounded-full border px-2.5 py-1 text-xs whitespace-nowrap ${
            exp.current && diffCurrentExperience
              ? "border-green-400/40 bg-green-400/10 text-green-300"
              : "border-white/10 bg-white/5 text-gray-200"
          }`}
        >
          {exp.date}
        </span>
      </div>

      {/* Company */}
      <p className="mb-3 text-sm font-semibold text-red-500">{exp.company}</p>

      {/* Responsibilities */}
      <ul className="space-y-2">
        {exp.responsibilities.map((r, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-gray-300">
            <span className="mt-0.5 shrink-0 text-xs text-purple-500">▸</span>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Experience = () => {
  return (
    <section id="experience" className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-center text-5xl font-bold text-transparent">
          Experience
        </h2>

        <div className="relative">
          {/* Vertical gradient line */}
          <div className="absolute top-2 bottom-0 left-4 w-px bg-gradient-to-b from-red-700 via-purple-700/75 to-transparent" />

          {experiences.map((exp, index) => (
            <TimelineItem key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
