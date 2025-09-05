import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
    const [showSlider, setShowSlider] = useState(false);

    const nextProject = () => setIndex((prev) => (prev + 1) % projects.length);
    const prevProject = () =>
        setIndex((prev) => (prev - 1 + projects.length) % projects.length);

    const project = projects[index];

    // Auto-slide
    useEffect(() => {
        if (!showSlider) return;
        const interval = setInterval(() => {
            nextProject();
        }, 5000);
        return () => clearInterval(interval);
    }, [index, showSlider]);

    return (
        <div className="w-full h-screen relative overflow-hidden bg-black text-white flex items-center justify-center">
            <AnimatePresence mode="wait">
                {!showSlider ? (
                    // 👇 Intro Page
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <h1 className="text-4xl font-bold">Let's See Our Work</h1>
                        <button
                            onClick={() => setShowSlider(true)}
                            className="px-3 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition font-semibold cursor-pointer flex items-center gap-2"
                        >
                            →
                        </button>
                    </motion.div>
                ) : (
                    // 👇 Slider Page
                    <motion.div
                        key="slider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full relative"
                    >
                        {/* Background Image with Fade */}
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={project.image}
                                src={project.image}
                                alt={project.name}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        </AnimatePresence>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60"></div>

                        {/* Prev Button */}
                        <button
                            onClick={prevProject}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
                        >
                            <ChevronLeft />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={nextProject}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
                        >
                            <ChevronRight />
                        </button>

                        {/* Project Info */}
                        <motion.div
                            key={project.name}
                            className="absolute bottom-12 right-12 text-white flex flex-col items-end gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-3xl font-bold">{project.name}</h1>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full hover:bg-purple-700 transition group"
                            >
                                <ArrowRight
                                    size={20}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </a>
                        </motion.div>

                        {/* Dots */}
                        <div className="flex gap-3 absolute bottom-8 left-1/2 -translate-x-1/2">
                            {projects.map((_, i) => (
                                <motion.span
                                    key={i}
                                    className={`w-4 h-4 rounded-full ${i === index ? "bg-white" : "bg-gray-500"
                                        }`}
                                    animate={{ scale: i === index ? 1.3 : 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OurWork;