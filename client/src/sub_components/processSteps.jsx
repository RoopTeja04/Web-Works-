import React, { useState } from 'react';
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

    const baseWidth = "180px";
    const expandedWidth = "400px";
    const baseHeight = "400px";

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
                        onMouseEnter={() => setActiveIndex(idx)}
                        onMouseLeave={() => setActiveIndex(null)}
                        className="cursor-pointer bg-white rounded-md shadow-md overflow-hidden flex flex-col items-center justify-center p-4"
                        animate={{
                            width: activeIndex === idx ? expandedWidth : baseWidth,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        style={{
                            minHeight: baseHeight,
                        }}
                    >
                        <span className="text-lg font-semibold text-gray-500 relative -top-15">{idx + 1}</span>

                        <motion.div
                            initial={{ rotate: -90 }}
                            animate={{
                                rotate: activeIndex === idx ? 0 : -90,
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.43, 0.13, 0.23, 0.96],
                            }}
                            className="font-bold text-2xl mt-8 text-start"
                        >
                            {step.title}
                        </motion.div>

                        <AnimatePresence>
                            {activeIndex === idx && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="mt-4 text-sm text-gray-700 px-4 text-center"
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