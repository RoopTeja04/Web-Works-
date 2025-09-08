import React, { useState, useRef, useEffect } from 'react';
import { FaArrowDown, FaFigma, FaSketch, FaReact, FaNodeJs } from "react-icons/fa";
import { SiAdobeillustrator, SiAdobexd, SiAdobephotoshop, SiTailwindcss, SiGoogleanalytics, SiHubspot, SiMongodb } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from 'three';
import { FaRedoAlt } from "react-icons/fa";
import RotatedHeadingsProcessSteps from '../sub_components/processSteps';
import RotatedCompactHeadings from '../sub_components/processSteps';
import RotatedInteractiveHeadings from '../sub_components/processSteps';
import RotatedInteractiveExpandingHeadings from '../sub_components/processSteps';

const phrases = ["Creative", "Compelling", "Results-Driven", "User-Centric", "Problem-Solvers", "Goal-Oriented"];

const Services = () => {
    const [hoveredService, setHoveredService] = useState(null);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(3); // Start with "Results-Driven"
    const [displayedHeading, setDisplayedHeading] = useState(phrases[3]);
    const [isAnimating, setIsAnimating] = useState(false);

    const canvasContainerRef = useRef(null);
    const servicesRef = useRef(null);

    const tools = {
        "UI/UX Design": [<FaFigma title="Figma" />, <SiAdobexd title="Adobe XD" />, <FaSketch title="Sketch" />, <SiAdobeillustrator title="Illustrator" />, <SiAdobephotoshop title="Photoshop" />],
        "Web Development": [<FaReact title="React" />, <FaNodeJs title="Node.js" />, <SiTailwindcss title="Tailwind CSS" />, <SiMongodb title="MongoDB" />],
        "Marketing": [<SiGoogleanalytics title="Google Analytics" />, <SiHubspot title="HubSpot" />, <SiAdobexd title="Adobe Creative Cloud" />],
        "Branding": [<SiAdobeillustrator title="Illustrator" />, <SiAdobephotoshop title="Photoshop" />, <FaFigma title="Figma" />]
    };

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasContainerRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for (let i = 0; i < 5000; i++) {
            vertices.push(
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000)
            );
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const particles = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({ color: 0xff0000, size: 2, transparent: true, opacity: 0.5 })
        );

        scene.add(particles);
        camera.position.z = 1000;

        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (canvasContainerRef.current?.contains(renderer.domElement)) {
                canvasContainerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    const scrollToServices = () => {
        servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDotClick = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        const nextIndex = (currentPhraseIndex + 1) % phrases.length;
        const nextPhrase = phrases[nextIndex];

        let i = 0;
        const interval = setInterval(() => {
            setDisplayedHeading(nextPhrase.slice(0, i + 1));
            i++;

            if (i === nextPhrase.length) {
                clearInterval(interval);
                setCurrentPhraseIndex(nextIndex);
                setIsAnimating(false);
            }
        }, 100);
    };

    return (
        <div className='min-h-screen bg-gray-900 text-white overflow-x-hidden relative'>
            <div ref={canvasContainerRef} className="absolute inset-0 z-0 pointer-events-none" />

            <section className="relative z-10 min-h-[100vh] flex flex-col top-34 px-8 md:px-10">
                <div className="flex space-x-6">

                    {/* Red pulsing dot with click handler */}
                    <motion.div
                        className="relative top-42 left-26 w-14 h-14 flex items-center justify-center cursor-pointer"
                        initial={{ scale: 0.9, opacity: 0.9 }}
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        onClick={handleDotClick}
                    >
                        <span className="absolute w-22 h-22 rounded-full bg-red-600 opacity-20 animate-ping"></span>
                        <span className="absolute w-20 h-20 rounded-full bg-red-600 opacity-40"></span>
                        <span className="absolute w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                            <FaRedoAlt className="text-white text-xl" />
                        </span>
                    </motion.div>

                    {/* Text Section */}
                    <div>
                        <h1 className="text-5xl font-extrabold leading-tight uppercase space-y-6 flex flex-col">
                            <span className="text-red-500 md:text-9xl ">{displayedHeading}</span>
                            <span className="text-white md:text-7xl block ml-32">WEBSITES</span>
                        </h1>

                        <div className='absolute right-30 mx-6 -space-y-6'>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 uppercase">
                                That Help Your
                            </h2>
                            <h2 className='text-3xl md:text-9xl font-bold text-white mt-6 uppercase'>
                                Business
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            <div ref={servicesRef} className="flex flex-col space-y-20 py-16 px-8 relative z-10">
                <div className="text-center mb-12 relative">
                    <h3 className="text-md md:text-md absolute bottom-2 font-semibold tracking-wide uppercase text-gray-400 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span> What We Do
                    </h3>
                </div>

                {Object.entries({
                    "UI/UX Design": "Crafting intuitive and engaging user experiences with modern UI/UX design principles.",
                    "Web Development": "Building fast, responsive, and scalable web applications tailored to your needs.",
                    "Marketing": "Expanding your reach with data-driven marketing strategies and campaigns.",
                    "Branding": "Helping you build a powerful brand identity that resonates with your audience."
                }).map(([name, desc], idx) => (
                    <motion.div
                        key={name}
                        className="flex items-center justify-between border-b border-gray-700 pb-10 relative"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                    >
                        <div
                            className="relative flex items-center"
                            onMouseEnter={() => setHoveredService(name)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <AnimatedHeading text={name} />

                            <AnimatePresence>
                                {hoveredService === name && (
                                    <ToolSlideshow tools={tools[name]} />
                                )}
                            </AnimatePresence>
                        </div>

                        <p className="text-md text-gray-400 max-w-lg">{desc}</p>
                    </motion.div>
                ))}
            </div>

            <RotatedInteractiveExpandingHeadings />
        </div>
    );
};

const ToolSlideshow = ({ tools }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % tools.length);
        }, 1200);
        return () => clearInterval(interval);
    }, [tools.length]);

    return (
        <motion.div
            key={index}
            className="ml-4 text-white text-5xl inline-block"
            initial={{ opacity: 0, x: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            transition={{ duration: 0.4 }}
        >
            {tools[index]}
        </motion.div>
    );
};

const AnimatedHeading = ({ text }) => {
    return (
        <motion.h2
            className="text-4xl md:text-5xl font-bold cursor-pointer flex"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {text.split("").map((letter, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { y: 30, opacity: 0 },
                        visible: { y: 0, opacity: 1 }
                    }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.h2>
    );
};

export default Services;