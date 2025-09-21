import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef
    });

    // Horizontal movement controlled by vertical scroll
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-73%"]);

    return (
        <div
            ref={targetRef}
            className="relative h-[400vh] bg-gray-900"
        >
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Horizontal Moving Container */}
                <motion.div
                    style={{ x }}
                    className="flex gap-12 px-16"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="min-w-[90vw] relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >

                            {/* Project Card with Background Image */}
                            <motion.div
                                className="relative w-full h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
                                style={{
                                    backgroundImage: `url(${project.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {/* Dark Overlay for Better Button Visibility */}
                                <div className="absolute inset-0 bg-black/30" />

                                {/* Visit Site Button Overlay */}
                                <motion.div
                                    className="absolute top-8 right-10"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <motion.a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-900 font-semibold rounded-full shadow-xl hover:bg-white transition-all duration-300"
                                        whileHover={{
                                            scale: 1.1,
                                            boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
                                            y: -2
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        Visit Site
                                        <ChevronRight className="w-4 h-4" />
                                    </motion.a>
                                </motion.div>

                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Scroll Progress Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-white/20 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ scaleX: scrollYProgress }}
                        transformOrigin="left"
                    />
                </motion.div>

                {/* Floating Elements for Depth */}
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                            left: `${25 + (i * 20)}%`,
                            top: `${20 + (i * 15)}%`,
                            y: useTransform(scrollYProgress, [0, 1], [0, -(40 + i * 10)])
                        }}
                        animate={{
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default OurWork;