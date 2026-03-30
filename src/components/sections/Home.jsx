export const Home = () => {
  return   (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative px-6"
    >
      <div className="w-full max-w-5xl z-10">
        <div className="flex flex-col items-center ">
          <p className="font-mono text-base md:text-3xl text-gray-400 mb-4 tracking-tight">
            $ whoami
          </p>
    

          <h1 className="text-4xl font-mono sm:text-5xl md:text-7xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent leading-none tracking-tight">
            preet 
          </h1>

          {/*
          <p className="mt-6 max-w-xl text-left text-gray-300 text-lg md:text-xl leading-relaxed">
           insert text here 
          </p>
          */}
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="#projects"
              className="bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]"
            >
              View Projects
            </a>

            <a
              href="#about"
              className="border border-purple-400/40 text-purple-400 py-3 px-6 rounded-md font-medium transition-all duration-300 hover:-translate-y-1 hover:bg-purple-500/10 hover:border-purple-300/60"
            >
              About Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
