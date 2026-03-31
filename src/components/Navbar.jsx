import { useEffect } from "react";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);
  return (
    <nav className="bg-[rgba(10, 10, 10, 0.8)] fixed top-0 z-40 w-full border-b border-white/10 shadow-lg backdrop-blur-lg">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="font-mono text-2xl font-bold text-white">
            {" "}
            preet<span className="text-red-500">.dev</span>{" "}
          </a>

          <div
            className="relative z-40 h-5 w-7 cursor-pointer md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            <a
              href="#home"
              className="font-mono text-lg font-bold text-red-500 transition-colors hover:text-white"
            >
              Home{" "}
            </a>

            <a
              href="#experience"
              className="font-mono text-lg font-bold text-red-500 transition-colors hover:text-white"
            >
              Experience{" "}
            </a>

            <a
              href="#about"
              className="font-mono text-lg font-bold text-red-500 transition-colors hover:text-white"
            >
              About{" "}
            </a>

            <a
              href="#projects"
              className="font-mono text-lg font-bold text-red-500 transition-colors hover:text-white"
            >
              Projects{" "}
            </a>

            <a
              href="#contact"
              className="font-mono text-lg font-bold text-red-500 transition-colors hover:text-white"
            >
              Contact{" "}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

