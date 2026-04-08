import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  { label: "Home", id: "home" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const N = SECTIONS.length;
const ITEM_H = 50; // bigger: was 44
const WIDTH = 150; // bigger: was 168
const NAVBAR_H = 64;
const PILL_TOP_OFFSET = (NAVBAR_H - ITEM_H) / 2;
const BORDER_OFFSET = NAVBAR_H - PILL_TOP_OFFSET;
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
        { threshold: 0.3, rootMargin: "-80px 0px -20% 0px" },
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Sync drum when wheel closes or active section changes
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

  // Infinite boundary reset
  useEffect(() => {
    if (virtIdx < N) {
      setTransitionOn(false);
      setVirtIdx((v) => v + N);
    } else if (virtIdx >= 2 * N) {
      setTransitionOn(false);
      setVirtIdx((v) => v - N);
    }
  }, [virtIdx]);

  // Re-enable transition after instant snap
  useEffect(() => {
    if (!transitionOn) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setTransitionOn(true)));
      return () => cancelAnimationFrame(raf);
    }
  }, [transitionOn]);

  // Mouse wheel
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

  // Keyboard
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

  const translateY = isOpen
    ? -(virtIdx * ITEM_H) + ITEM_H // center selected in 3-slot drum
    : -(virtIdx * ITEM_H); // show only selected in 1-slot drum

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ height: ITEM_H, width: WIDTH }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      tabIndex={0}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      aria-label="Section navigation"
    >
      {/* Glass pill */}
      <div
        className="relative overflow-hidden rounded-xl border border-white/20"
        style={{
          boxShadow: isOpen
            ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(168,85,247,0.12)"
            : "0 2px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
          height: isOpen ? ITEM_H * 3 : ITEM_H,
          width: WIDTH,
          zIndex: 50,
          transition: "height 300ms cubic-bezier(0.2, 0, 0, 1), box-shadow 300ms",
          background: isOpen ? "rgba(5, 5, 5, 0.99)" : "rgba(1, 1, 1, 0.99)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0"
          style={{
            top: BORDER_OFFSET,
            height: 1,
            background: "rgba(8, 8, 8, 0.98)",
            zIndex: 20,
            opacity: isOpen ? 1 : 0,
            transition: "opacity 150ms",
          }}
        />
        {/*
          FIX: masks are now only ITEM_H * 0.45 tall (not full ITEM_H)
          so the neighbor text centered in its slot sits BELOW the fully
          opaque portion and is clearly readable.
        */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10"
          style={{
            height: ITEM_H * 0.45,
            background: "linear-gradient(to bottom, rgba(4,4,4,0.88), transparent)",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 220ms",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
          style={{
            height: ITEM_H * 0.45,
            background: "linear-gradient(to top, rgba(4,4,4,0.88), transparent)",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 220ms",
          }}
        />

        {/* Subtle horizontal center dividers — visible only when open */}
        {/* 
        <div
          className="pointer-events-none absolute inset-x-4 z-10"
          style={{
            top: ITEM_H,
            height: 1,
            background: "rgba(255,255,255,0.06)",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 220ms",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-4 z-10"
          style={{
            top: ITEM_H * 2,
            height: 1,
            background: "rgba(255,255,255,0.06)",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 220ms",
          }}
        />
      */}
        {/* The drum */}
        <div
          style={{
            transform: `translateY(${translateY}px)`,
            transition: transitionOn ? "transform 230ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
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
                  // FIX: neighbors at 0.72 opacity (was 0.35) — clearly readable
                  opacity: isSel ? 1 : dist === 1 ? 0.72 : 0.05,
                  fontSize: isSel ? "1.15rem" : "1.03rem",
                  // letterSpacing: isSel ? "0.025em" : "0.06em",
                  // textTransform: !isSel ? "uppercase" : "none",
                  transition: "opacity 200ms, font-size 200ms, letter-spacing 200ms",
                  pointerEvents: isSel || dist === 1 ? "auto" : "none",
                }}
                onClick={() => {
                  if (isSel) navigate(i % N);
                  else setVirtIdx(i);
                }}
              >
                {isSel ? (
                  // Selected: gradient text only, no card
                  <span className="text-red-500">{section.label}</span>
                ) : (
                  // Neighbors: plain white, no gradient
                  <span className="text-white/80">{section.label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hint — slides in from right when open */}
      <div
        className="pointer-events-none absolute top-0 flex items-center font-mono text-xs tracking-widest whitespace-nowrap text-purple-400 uppercase"
        style={{
          height: ITEM_H * 3,
          left: WIDTH + 12,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 250ms 100ms, transform 250ms 100ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        scroll · click/enter to go
      </div>
    </div>
  );
};
