import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image1 from "../images/project-1.png";
import Image2 from "../images/project-2.png";
import Image3 from "../images/project-3.png";
import Image4 from "../images/project-4.png";

const projects = [
    { name: "NELTAS", link: "https://neltas.com/", image: Image2 },
    { name: "ODAK", link: "https://odaksolutions.com/", image: Image3 },
    { name: "All Lines", link: "https://alllines.org/", image: Image4 },
    { name: "Pratham Services", link: "https://prathamservices.com/", image: Image1 },
];

const OurWork = () => {
    const [index, setIndex] = useState(0);

    const nextProject = () => setIndex((prev) => (prev + 1) % projects.length);

    const project = projects[index];

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col justify-center px-10 relative">
            <div className="flex flex-row justify-center items-center pb-10 space-x-40">
                {/* Left Side: Project Image with Animation */}
                <div className="flex relative">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={project.image}
                            src={project.image}
                            alt={project.name}
                            className="w-full object-contain rounded-md shadow-lg"
                            style={{ height: '50vh' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        />
                    </AnimatePresence>

                    {/* Image Index / Total at Bottom Left */}
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white px-3 py-1 rounded-md text-sm">
                        {index + 1} / {projects.length}
                    </div>
                </div>

                {/* Right Side: Project Info */}
                <div className="flex flex-col items-start justify-start gap-6">
                    <h1 className="text-4xl font-bold">{project.name}</h1>

                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center -rotate-40 hover:scale-105 transition duration-300 ease-in-out"
                    >
                        →
                    </a>
                </div>
            </div>

            {/* Dots fixed at bottom center */}
            <div className="absolute bottom-25 left-1/2 -translate-x-1/2 flex gap-2">
                {projects.map((_, i) => (
                    <span
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-gray-500"}`}
                    />
                ))}
            </div>

            {/* Next Button fixed at bottom right */}
            <button
                onClick={nextProject}
                className="absolute bottom-25 right-6 p-3 bg-white/10 rounded-full cursor-pointer"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default OurWork;