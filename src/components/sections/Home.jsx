export const Home = () => {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center px-6">
      <div className="z-10 w-full max-w-5xl">
        <div className="flex flex-col items-center">
          <p className="mb-4 font-mono text-base tracking-tight text-gray-400 md:text-3xl">
            $ whoami
          </p>

          <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text font-mono text-4xl leading-none font-bold tracking-tight text-transparent sm:text-5xl md:text-7xl lg:text-5xl">
            preet
          </h1>

          {/*
          <p className="mt-6 max-w-xl text-left text-gray-300 text-lg md:text-xl leading-relaxed">
           insert text here 
          </p>
          */}
          {/* 
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-md bg-blue-700 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]"
            >
              View Projects
            </a>

            <a
              href="#about"
              className="rounded-md border border-purple-400/40 px-6 py-3 font-medium text-purple-400 transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/60 hover:bg-purple-500/10"
            >
              About Me
            </a>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};
