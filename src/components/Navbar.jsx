import { useEffect } from "react";
import { SectionWheel } from "./SectionWheel";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-white/10 bg-black/80 shadow-lg backdrop-blur-lg">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#home" className="font-mono text-2xl font-bold text-white">
            preet<span className="text-red-500">.dev</span>
          </a>

          {/* Mobile: hamburger (unchanged) */}
          <div
            className="relative z-40 h-5 w-7 cursor-pointer md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>

          {/* Desktop: section wheel */}
          <div className="hidden items-center md:flex">
            <SectionWheel />
          </div>
        </div>
      </div>
    </nav>
  );
};
