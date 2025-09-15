import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    { title: "PROJECT STRATEGY", description: "Every project is a canvas where we blend creative vision with strategic foresight..." },
    { title: "DESIGN & MOTION", description: "Our team is a collective of artists, visionaries, and technophiles..." },
    { title: "SMOOTH DEVELOPMENT", description: "We take pride in our meticulous approach, ensuring every element functions seamlessly..." },
    { title: "POWERFUL MARKETING", description: "We're not just marketers; we're storytellers, data analysts, and strategists..." },
    { title: "ONGOING SUPPORT", description: "In the ever-evolving digital landscape, your website isn't static..." },
    { title: "FUTURE EVOLUTION", description: "From immersive experiences to AI-driven personalization, we're your digital architects..." },
];

const RotatedInteractiveExpandingHeadings = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const cardRefs = useRef([]);

    const baseWidth = "180px";
    const expandedWidth = "400px";
    const baseHeight = "400px";
    const TILT_THRESHOLD = 20; // Maximum tilt angle in degrees

    // Calculate 3D transform based on mouse position
    const calculate3DTransform = useCallback((e, cardIndex) => {
        if (!cardRefs.current[cardIndex]) return {};

        const card = cardRefs.current[cardIndex];
        const { clientX, clientY } = e;
        const { left, top, width, height } = card.getBoundingClientRect();

        // Calculate mouse position relative to card center (0.5 = center)
        const horizontal = (clientX - left) / width;
        const vertical = (clientY - top) / height;

        // Convert to rotation values (-threshold to +threshold)
        const rotateY = ((horizontal - 0.5) * TILT_THRESHOLD).toFixed(2);
        const rotateX = (-(vertical - 0.5) * TILT_THRESHOLD).toFixed(2);

        return {
            rotateX: `${rotateX}deg`,
            rotateY: `${rotateY}deg`,
            scale: 1.05,
            transformPerspective: 1000,
        };
    }, [TILT_THRESHOLD]);

    const handleMouseMove = useCallback((e, cardIndex) => {
        if (activeIndex === cardIndex) {
            const transform = calculate3DTransform(e, cardIndex);
            setHoveredCard({ index: cardIndex, transform });
        }
    }, [activeIndex, calculate3DTransform]);

    const handleMouseEnter = useCallback((cardIndex) => {
        setActiveIndex(cardIndex);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setActiveIndex(null);
        setHoveredCard(null);
    }, []);

    return (
        <div className="bg-gray-900 text-black min-h-screen flex flex-col items-center p-10">
            <div className="text-center mb-12 relative top-20 w-full">
                <h3 className="text-md md:text-lg absolute bottom-2 font-semibold tracking-wide uppercase text-gray-600 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span> Our Work Flow
                </h3>
            </div>

            <div className="flex space-x-6 mx-10 h-[80vh] items-center justify-center">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        ref={(el) => (cardRefs.current[idx] = el)}
                        onMouseEnter={() => handleMouseEnter(idx)}
                        onMouseMove={(e) => handleMouseMove(e, idx)}
                        onMouseLeave={handleMouseLeave}
                        className="cursor-pointer bg-white rounded-md shadow-2xl overflow-hidden flex flex-col items-center justify-center p-4 relative"
                        animate={{
                            width: activeIndex === idx ? expandedWidth : baseWidth,
                            // 3D transforms based on mouse position
                            rotateX: hoveredCard?.index === idx ? hoveredCard.transform.rotateX : "0deg",
                            rotateY: hoveredCard?.index === idx ? hoveredCard.transform.rotateY : "0deg",
                            scale: hoveredCard?.index === idx ? hoveredCard.transform.scale : 1,
                            z: activeIndex === idx ? 50 : 0,
                        }}
                        transition={{
                            duration: activeIndex === idx ? 0.15 : 0.6, // Faster response for 3D effects
                            ease: activeIndex === idx ? "easeOut" : [0.43, 0.13, 0.23, 0.96],
                            type: "tween"
                        }}
                        style={{
                            minHeight: baseHeight,
                            transformStyle: "preserve-3d",
                            transformPerspective: hoveredCard?.index === idx ? hoveredCard.transform.transformPerspective : 1000,
                        }}
                        whileHover={{
                            boxShadow: [
                                "0 4px 8px rgba(0,0,0,0.1)",
                                "0 20px 40px rgba(0,0,0,0.3)",
                                "0 25px 50px rgba(255,0,0,0.1)"
                            ],
                            transition: { duration: 0.3 }
                        }}
                    >
                        {/* Glossy overlay effect for 3D depth */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-md"
                            animate={{
                                opacity: hoveredCard?.index === idx ? 0.6 : 0.2,
                                background: hoveredCard?.index === idx
                                    ? "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)"
                                    : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)"
                            }}
                            transition={{ duration: 0.2 }}
                        />

                        {/* Card content with parallax effect */}
                        <motion.div
                            className="relative z-10 w-full h-full flex flex-col items-center justify-center"
                            animate={{
                                translateZ: activeIndex === idx ? "20px" : "0px",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.span
                                className="text-lg font-semibold text-gray-500 relative -top-15"
                                animate={{
                                    color: activeIndex === idx ? "#ef4444" : "#6b7280",
                                    scale: activeIndex === idx ? 1.2 : 1,
                                    translateZ: activeIndex === idx ? "10px" : "0px"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {idx + 1}
                            </motion.span>

                            <motion.div
                                initial={{ rotate: -90 }}
                                animate={{
                                    rotate: activeIndex === idx ? 0 : -90,
                                    translateZ: activeIndex === idx ? "15px" : "0px"
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.43, 0.13, 0.23, 0.96],
                                }}
                                className="font-bold text-2xl mt-8 text-start"
                                style={{
                                    textShadow: activeIndex === idx ? "0 2px 4px rgba(0,0,0,0.1)" : "none"
                                }}
                            >
                                {step.title}
                            </motion.div>

                            <AnimatePresence>
                                {activeIndex === idx && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, translateZ: "0px" }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            translateZ: "25px" // Strongest parallax for description
                                        }}
                                        exit={{ opacity: 0, y: 20, translateZ: "0px" }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeInOut",
                                            translateZ: { duration: 0.4, delay: 0.2 }
                                        }}
                                        className="mt-4 text-sm text-gray-700 px-4 text-center"
                                        style={{
                                            textShadow: "0 1px 2px rgba(0,0,0,0.05)"
                                        }}
                                    >
                                        {step.description}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Subtle glow effect around active card */}
                        <motion.div
                            className="absolute inset-0 rounded-md pointer-events-none"
                            animate={{
                                boxShadow: activeIndex === idx
                                    ? "0 0 20px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                                    : "0 0 0px rgba(239, 68, 68, 0)"
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Enhanced CSS for better 3D effects */}
            <style jsx>{`
                @media (prefers-reduced-motion: reduce) {
                    * {
                        transform: none !important;
                        animation: none !important;
                        transition: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default RotatedInteractiveExpandingHeadings;