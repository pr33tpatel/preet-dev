const NAV_LINKS = [
  { label: "$WHOAMI", id: "home" },
  { label: "$EXPERIENCE", id: "experience" },
  { label: "$EDUCATION", id: "education" },
  { label: "$PROJECTS", id: "projects" },
  { label: "$BLOG", id: "blog" },
  { label: "$CONTACT", id: "contact" },
];

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-30 transition-all duration-500 lg:hidden"
        style={{
          background: "rgba(0,0,0,0.1)",
          backdropFilter: menuOpen ? "blur(4px)" : "none",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer — slides in from right */}
      <div
        className="fixed top-0 right-0 z-40 flex h-full flex-col lg:hidden"
        style={{
          width: "min(320px, 85vw)",
          background: "rgba(1,1,1,0.93)",
          borderLeft: "1px solid rgba(255,255,255,0.07)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 350ms cubic-bezier(0.35, 1, 0.3, 1)",
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-white/5 px-8 py-6">
          <span
            className="font-mono text-sm tracking-widest text-gray-300 uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Navigation
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="font-mono text-lg text-gray-300 transition-colors hover:text-white"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col gap-1 px-8 py-10">
          {NAV_LINKS.map(({ label, id }, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(id);
              }}
              className="group flex items-center gap-4 border-b border-white/5 py-4 transition-all duration-200"
              style={{
                transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(12px)",
                transition: `opacity 300ms ${i * 40}ms, transform 300ms ${i * 40}ms, color 150ms`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.querySelector(".link-label").style.color = "#ef4444")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.querySelector(".link-label").style.color = "#9ca3af")
              }
            >
              <span className="text-md font-mono text-red-500/70 transition-colors group-hover:text-red-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="link-label font-mono text-lg tracking-widest uppercase transition-colors duration-150"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#cccccc",
                }}
              >
                {label}
              </span>
            </a>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="space-y-4 border-t border-white/5 px-8 py-8">
          <a
            href="https://www.linkedin.com/in/preet-patel1223/"
            target="_blank"
            rel="noopener noreferrer"
            className="block font-mono text-sm tracking-widest text-red-500 uppercase transition-colors hover:text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            RÉSUMÉ ↗
          </a>
          <p
            className="font-mono text-sm tracking-widest text-fuchsia-300/60 uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            NYC | SDF
          </p>
        </div>
      </div>
    </>
  );
};

