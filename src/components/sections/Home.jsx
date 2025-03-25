export const Home = () => {
    return ( 
        <section 
        id="home"
        className="min-h-screen flex items-center justify-center relative" 
    >

        <div className="text-center z-10 px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent leading-right">
                {"Hi, I'm Preet"}
            </h1>

            <p className="text-gray-300 text-2xl mb-8 max-w-lg mx-auto">
                Computer Scientist
            </p>

            <div className="flex justify-center space-x-4">
                <a href="#projects" className="bg-blue-700 text-white py-3 px-6 rounded font-medium transition relative duration-300
                overflow-hidden hover:-translate-y-1
                hover:shadow-[0_0_75px_rgba(59,130,246,0.9)]"
                >
                    View Projects
                </a>

                <a href="#about" className=" border-purple-400/55 border text-purple-500 py-3 px-8 rounded font-medium transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_0_55px_rgba(255,0,255,.9)]
                hover:bg-purple-500/15"
                >
                    About Me
                </a>

            </div>
        </div>

    </section>
    )
}