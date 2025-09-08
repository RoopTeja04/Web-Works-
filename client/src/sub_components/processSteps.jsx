import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    { title: "PROJECT STRATEGY", description: "We blend creative vision with strategic foresight to define goals and chart a course to success." },
    { title: "DESIGN & MOTION", description: "We create immersive visuals that captivate and communicate messages with impact." },
    { title: "SMOOTH DEVELOPMENT", description: "Seamless design and navigation to engage visitors on any device." },
    { title: "POWERFUL MARKETING", description: "We craft campaigns that resonate and drive lasting impact." },
    { title: "ONGOING SUPPORT", description: "Reliable support to keep your website dynamic and impactful." },
    { title: "FUTURE EVOLUTION", description: "Guiding your brand’s evolution with emerging technologies." },
];

const RotatedInteractiveExpandingHeadings = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const baseWidth = "10%";
    const expandedWidth = "40%";
    const baseHeight = "100%"; // Minimum height
    const expandedHeight = "20%"; // Expansion for hover

    return (
        <div className="bg-black-100 min-h-screen flex flex-col items-center p-10">

            {/* Horizontal Rotated Step Headings */}
            <div className="flex space-x-6 mx-20 h-[80vh] bg-white p-6 rounded-md shadow-lg">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className="cursor-pointer rounded bg-white text-black flex flex-col items-center justify-center overflow-hidden"
                        animate={{
                            width: activeIndex === idx ? expandedWidth : baseWidth,
                            height: activeIndex === idx ? expandedHeight : baseHeight,
                            boxShadow: activeIndex === idx
                                ? "0 20px 40px rgba(0,0,0,0.25)"
                                : "0 5px 15px rgba(0,0,0,0.1)"
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                            textAlign: 'center',
                            minHeight: baseHeight,
                        }}
                    >
                        <motion.div
                            initial={{ rotate: -90 }}
                            animate={{ rotate: activeIndex === idx ? 0 : -90 }}
                            transition={{ duration: 0.5 }}
                            className="font-semibold"
                        >
                            {step.title}
                        </motion.div>

                        {/* Show description inside same box on hover */}
                        <AnimatePresence>
                            {activeIndex === idx && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="mt-4 text-sm text-gray-700 px-4"
                                >
                                    {step.description}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RotatedInteractiveExpandingHeadings;
