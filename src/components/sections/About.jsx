export const About = () => {
    
    const frontendSkills = ["React", "TypeScript", "TailwindCSS"];
    const backendSkills = ["Node.js", "C++","Python",  "Java", "AWS", "MySQL","MongoDB"];
    const aimlSkills = ["NumPy", "Pandas", "TensorFlow", "Scikit-Learn"]

    return (
    <section id ="about" className="min-h-screen flex items-center justify-center py-20"
    >
        <div className="max-w-4xl mx-auto ">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent text-center">
                About Me
            </h2>

        <div className="rounded-xl p-8 border-purple-300/55 border ">
        <p className="text-gray-300 mb-6">
              I am Preet Patel. I am studying Computer Science and Engineering (ML Concentration) with a minor in Mathematics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    
                    {/* Education Section */}
                    <div className="py-3 px-6 rounded-xl border-white/10 border hover:-translate-y-0.75 transition-all">
                        <h3 className="text-xl font-bold text-center mb-2">Education</h3>
                        
                        <div className="text-gray-300">
                            <ul className="list-none list-inside text-gray-300 space-y-3">
                                {/* B.S. CSE @ UofL */}
                                <li className="text-sm">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold w-10/10 text-sm">
                                            B.S. Computer Science and Engineering, Math Minor <br /> 
                                            <h3>@ University of Louisville</h3>
                                        </h4>
                                        <span className="text-sm text-gray-400 w-5/10 text-right">
                                            2023 - 2026 < br />
                                            GPA: 3.8
                                        </span>
                                    </div>
                                </li>
                                <div className="grid grid-cols-1 mt-6" >
                                    <p className="text-center font-bold">Relevant Coursework:</p>
                                    <div className="flex justify-center">
                                        <ul className="justify-center text-left text-sm list-disc list-inside text-gray-300 space-y-0.3">
                                            <li>Data Sturctures and Algorithms</li>
                                            <li>Operating Systems</li>
                                            <li>Data Analytics</li>
                                            <li>Database Design</li>
                                            <li>Discrete Mathematics</li>
                                        </ul>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>

                    {/* Experience Section*/}
                    <div className="py-3 px-6 rounded-xl border-white/10 border hover:-translate-y-0.75 transition-all">
                        <h3 className="text-xl font-bold text-center mb-2">Experience</h3>
                        <div className="text-gray-300 space-y-4">
                            <div>
                            {/* Software Engineering Intern @ Challenge Technolabs
                            <div className="flex flex-col sm:flex-col sm:justify-between text-sm">
                                <h4 className="font-semibold text-center text-sm">
                                    Software Engineering Intern <br/> @Challenge Technolabs
                                </h4>
                                <span className="text-sm text-gray-400">
                                    (Apr 2025 - Aug 2025)
                                </span>
                                <div className="flex">
                                    <ul className="justify-center text-left text-sm list-disc list-inside text-gray-300 space-y-0.3">
                                        <li>Backend and Infrastructure</li>
                                        <li>...</li>
                                        <li>...</li>
                                    </ul>
                                </div>
                            </div> */}
                            </div>
                            {/* Software Engineering Intern @ Challenge Technolabs */}
                            <div>
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold w-10/10 text-sm">
                                        Software Engineering Intern @Challenge Technolabs
                                    </h4>
                                    <span className="text-sm text-gray-400 w-4/10 text-right">
                                        Apr 2025 - <br />Aug 2025
                                    </span>
                                </div>
                                    <ul className="text-sm list-disc list-inside mt-2 space-y-0.3">
                                        <li>Backend and Infrastructure</li>
                                        <li>...</li>
                                        <li>...</li>
                                    </ul>
                            </div>

                            {/* Bioinformatics Research @ OCTC */}
                            <div>
                                <div className="flex justify-between">
                                    <h4 className="font-semibold w-10/10 text-sm">
                                        Bioinformatics Researcher @ OCTC 
                                    </h4>
                                    <span className="text-sm text-gray-400 w-4/10 text-right">
                                        Sep 2021 - <br />May 2023
                                    </span>
                                </div>
                                    <ul className="text-sm list-disc list-outside mt-2 px-3 space-y-0.3">
                                        <li>Conducted data analysis Polycystic Kidney Disease</li>
                                    </ul>
                            </div>
                        </div>
                    </div>

            </div>
            


            {/* Skills Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl text-center font-bold mb-6">Frontend</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {frontendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-2 px-3 rounded text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl text-center font-bold mb-6"> Backend</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {backendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-red-500/10 text-red-400 py-2 px-3 rounded text-sm hover:bg-red-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,2246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl text-center font-bold mb-6">AI/ML</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {aimlSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-purple-500/10 text-purple-500 py-2 px-3 rounded text-sm hover:bg-purple-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,2246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
        </div>


        </div>

    </section>
    );
}