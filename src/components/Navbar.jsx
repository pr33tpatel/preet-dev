import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "$WHOAMI", id: "home" },
  { label: "$EXPERIENCE", id: "experience" },
  { label: "$EDUCATION", id: "education" },
  { label: "$PROJECTS", id: "projects" },
  { label: "$BLOG", id: "blog" },
  { label: "$CONTACT", id: "contact" },
];

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [activeId, setActiveId] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Add subtle background once user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observers = NAV_LINKS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.35, rootMargin: "-80px 0px -20% 0px" },
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 z-40 w-full transition-all duration-300"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: scrolled ? "rgba(0,0,0,0.6)" : "transparent",
        borderBottom: scrolled ? "none" : "none",
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="shrink-0 text-xl font-bold tracking-tighter select-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="font-mono text-red-500">preet</span>
          <span className="font-mono text-white">.dev</span>
        </a>

        {/* Desktop nav — only visible at lg (1024px+) */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map(({ label, id }) => {
            const isActive = activeId === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(id);
                }}
                className="font-mono text-[11px] tracking-wider whitespace-nowrap uppercase transition-all duration-300 xl:text-[13px] xl:tracking-widest"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: isActive ? "#ff2323" : "#6b7280",
                  textShadow: isActive ? "0 0 10px rgba(239,68,68,0.4)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "#6b7280";
                }}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-4">
          {/* Location — lg+ only */}
          <span
            className="hidden font-mono text-[11px] tracking-widest text-fuchsia-300 uppercase xl:block"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            NYC | SDF
          </span>

          {/* Résumé — lg+ only */}
          <a
            href="https://www.linkedin.com/in/preet-patel1223/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-[11px] tracking-widest text-red-500 uppercase transition-all duration-150 hover:text-white active:scale-95 active:opacity-70 lg:block xl:text-[13px]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            RÉSUMÉ ↗
          </a>

          {/* Hamburger — visible below lg */}
          <button
            className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-px w-6 origin-center bg-gray-400 transition-all duration-300"
              style={{
                transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none",
                background: menuOpen ? "#ef4444" : "#9ca3af",
              }}
            />
            <span
              className="block h-px w-6 bg-gray-400 transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px w-6 origin-center bg-gray-400 transition-all duration-300"
              style={{
                transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none",
                background: menuOpen ? "#ef4444" : "#9ca3af",
              }}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};
