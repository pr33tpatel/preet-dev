export const Projects = () => {
    return (
        <section id ="projects" className="min-h-screen flex items-center justify-center py-20">
        
        <div className="max-w-5xl mx-auto ">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent text-center">
                Projects
            </h2>

            {/* GRID FOR ALL PROJECTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* BALL KNOWLEDGE */}
                <div className="p-6 roudned-xl border border-white/10 hover:-translate-y-0.5 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.4)] transition-all">
                    <h3 className="text-xl text-center font-bold mb-2"> Ball Knowledge </h3>
                    <p className="text-gray-300 mb-4"> NBA Player Stats Website and Database </p>
                
                <div className="mb-4">
                    {["HTML", "CSS", "Node.js", "Express", "MySQL"].map((tech, key) => (
                        <span
                            key={key}
                            className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded text-sm hover:bg-blue-500/20
                                        hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                        >
                            {tech}
                      </span>
                    ))}
                </div>
                
                <div className="flex justify-evenly items-center">
                    <a 
                    href="..." //add ball_knowledge here 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        View Project &rarr;
                    </a>
                    <a 
                    href="..." //add ball_knowledge here 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        View Source Code &rarr;
                    </a>
                </div>

                </div>

                {/* Project 2 */}
                <div className="p-6 roudned-xl border border-white/10 hover:-translate-y-0.5 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.4)] transition-all">
                    <h3 className="text-xl text-center font-bold mb-2"> Project 2 </h3>
                    <p className="text-gray-300 mb-4"> Project 2 </p>
                
                <div className="mb-4">
                    {["HTML", "CSS", "Node.js", "Express", "MySQL"].map((tech, key) => (
                        <span
                            key={key}
                            className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded text-sm hover:bg-blue-500/20
                                        hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                        >
                            {tech}
                      </span>
                    ))}
                </div>
                
                <div className="flex justify-evenly items-center">
                    <a 
                    href="..." //add ball_knowledge here 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        View Project &rarr;
                    </a>
                    <a 
                    href="..." //add ball_knowledge here 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        View Source Code &rarr;
                    </a>
                </div>

                </div>

                
            </div>

            
        </div>
        </section>
    );
}