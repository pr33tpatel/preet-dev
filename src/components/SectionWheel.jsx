import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  { label: "Home", id: "home" },
  { label: "Experience", id: "experience" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const N = SECTIONS.length;
const ITEM_H = 44;
// Triple array for the infinite scroll trick , but the middle array is the real, "determining" one
const ITEMS = [...SECTIONS, ...SECTIONS, ...SECTIONS];

export const SectionWheel = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [virtIdx, setVirtIdx] = useState(N);
  const [isOpen, setIsOpen] = useState(false);
  const [transitionOn, setTransitionOn] = useState(true);
  const containerRef = useRef(null);

  const actualIdx = virtIdx % N;

  // Active section detection
  useEffect(() => {
    const observers = SECTIONS.map((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(i);
        },
        { threshold: 0.35, rootMargin: "-80px 0px -20% 0px" },
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // sync drum to active section when wheel closes
  useEffect(() => {
    if (!isOpen) {
      setTransitionOn(false);
      setVirtIdx(N + activeIdx);
    }
  }, [isOpen]); // eslint-disable-line

  useEffect(() => {
    if (!isOpen) {
      setTransitionOn(false);
      setVirtIdx(N + activeIdx);
    }
  }, [activeIdx]); // eslint-disable-line

  // infinite scroll trick
  useEffect(() => {
    if (virtIdx < N) {
      setTransitionOn(false);
      setVirtIdx((v) => v + N);
    } else if (virtIdx >= 2 * N) {
      setTransitionOn(false);
      setVirtIdx((v) => v - N);
    }
  }, [virtIdx]);

  useEffect(() => {
    if (!transitionOn) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setTransitionOn(true)));
      return () => cancelAnimationFrame(raf);
    }
  }, [transitionOn]);

  const handleWheel = useCallback(
    (e) => {
      if (!isOpen) return;
      e.preventDefault();
      setVirtIdx((v) => v + (e.deltaY > 0 ? 1 : -1));
    },
    [isOpen],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // keyboard
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Enter") navigate(actualIdx);
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowUp") setVirtIdx((v) => v - 1);
      if (e.key === "ArrowDown") setVirtIdx((v) => v + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, actualIdx]); // eslint-disable-line

  const navigate = (idx) => {
    document.getElementById(SECTIONS[idx].id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  // translateY: closed -> selected item at top of 1-slot container
  //             open   -> selected item centered in 3-slot container (offset +1 item)
  const translateY = isOpen ? -(virtIdx * ITEM_H) + ITEM_H : -(virtIdx * ITEM_H);
  return (
    <div
      ref={containerRef}
      className="relative select-none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      tabIndex={0}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      aria-label="Section navigation"
    >
      {/* Clip container */}
      <div
        className="relative overflow-hidden rounded-xl border border-white/10 bg-black/60 backdrop-blur-md"
        style={{
          height: isOpen ? ITEM_H * 3 : ITEM_H,
          width: 168,
          transition: "height 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Top fade mask */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10"
          style={{
            height: ITEM_H,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.92), transparent)",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 200ms",
          }}
        />
        {/* Bottom fade mask */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
          style={{
            height: ITEM_H,
            background: "linear-gradient(to top, rgba(0,0,0,0.92), transparent)",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 200ms",
          }}
        />

        {/* Center row highlight */}
        <div
          className="pointer-events-none absolute inset-x-3 z-0 rounded-md"
          style={{
            top: ITEM_H,
            height: ITEM_H,
            background: "linear-gradient(90deg, rgba(239,68,68,0.08), rgba(168,85,247,0.08))",
            border: "1px solid rgba(168,85,247,0.18)",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 280ms",
          }}
        />

        {/* The drum */}
        <div
          style={{
            transform: `translateY(${translateY}px)`,
            transition: transitionOn ? "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
          }}
        >
          {ITEMS.map((section, i) => {
            const isSel = i === virtIdx;
            const dist = Math.abs(i - virtIdx);
            return (
              <div
                key={`${section.id}-${i}`}
                className="flex cursor-pointer items-center justify-center font-mono font-bold"
                style={{
                  height: ITEM_H,
                  opacity: isSel ? 1 : dist === 1 ? 0.35 : 0.08,
                  fontSize: isSel ? "0.95rem" : "0.78rem",
                  transition: "opacity 180ms, font-size 180ms",
                  pointerEvents: isSel || dist === 1 ? "auto" : "none",
                }}
                onClick={() => {
                  if (isSel) navigate(i % N);
                  else setVirtIdx(i);
                }}
              >
                {isSel ? (
                  <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                    {section.label}
                  </span>
                ) : (
                  <span className="text-gray-400">{section.label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Usage hint */}
      {/* 
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-5 text-center font-mono text-xs text-gray-600"
        style={{ opacity: isOpen ? 1 : 0, transition: "opacity 200ms" }}
      >
        scroll · enter to navigate
      </div>
      */}
    </div>
  );
};
