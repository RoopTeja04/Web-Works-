import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const services = [
    {
        number: "01",
        title: "Website & App Dev",
        description: "Sites and apps so smooth, your users might just binge them."
    },
    {
        number: "02",
        title: "Branding & Design",
        description: "Logos, looks, and vibes that stick harder than your favorite movie quote."
    },
    {
        number: "03",
        title: "Performance Marketing",
        description: "We don't run ads, we run money machines. ROI or it didn't happen."
    },
    {
        number: "04",
        title: "Social Media Marketing",
        description: "Scroll-stoppers, double-taps, and viral moments — engineered daily."
    },
    {
        number: "05",
        title: "Automation & Growth Tech",
        description: "Bots, CRMs, and growth hacks — the backstage crew making your brand a star."
    }
];

const SubServices = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-200 text-black">
            {/* Header Section with Scroll Animations */}
            <div className="pt-20 pb-16 px-8 md:px-16 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left side - Main heading with scroll animation */}
                        <div>
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                                initial={{ opacity: 0, y: 80 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                    delay: 0.2
                                }}
                            >
                                <motion.span
                                    className="block"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    With Great Skills
                                </motion.span>
                                <motion.span
                                    className="block"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    Come Great
                                </motion.span>
                                <motion.span
                                    className="block text-cyan-600"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                >
                                    Results
                                </motion.span>
                            </motion.h1>
                        </div>

                        {/* Right side - Subtitle with scroll animation */}
                        <div className="lg:pt-16">
                            <motion.p
                                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-md"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{
                                    duration: 1,
                                    ease: "easeOut",
                                    delay: 1
                                }}
                            >
                                We don't just deliver services — we engineer success stories. Every pixel, every line of code, every campaign is crafted to make your competition wonder what hit them.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services List with Enhanced Scroll Animations */}
            <div className="px-8 md:px-16 lg:px-24 pb-20">
                <div className="max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.number}
                            className="border-t border-gray-200 last:border-b cursor-pointer group relative overflow-hidden"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.2,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            whileHover={{
                                backgroundColor: "rgba(0,0,0,0.02)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="py-10 md:py-14">
                                <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
                                    {/* Service Number and Title - Stacked Layout */}
                                    <div className="col-span-12 md:col-span-8 lg:col-span-7">
                                        {/* Service Number - Above heading with scroll animation */}
                                        <motion.span
                                            className="block text-sm md:text-base text-gray-400 font-mono font-semibold mb-4"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.6,
                                                delay: index * 0.1 + 0.3,
                                                ease: "backOut"
                                            }}
                                            animate={{
                                                color: hoveredIndex === index ? "#06b6d4" : "#9ca3af",
                                                scale: hoveredIndex === index ? 1.1 : 1
                                            }}
                                        >
                                            {service.number}
                                        </motion.span>

                                        {/* Service Title - Responsive sizing to fit full text */}
                                        <motion.h3
                                            className="font-bold leading-tight"
                                            initial={{ opacity: 0, x: -100 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.8,
                                                delay: index * 0.1 + 0.5,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }}
                                            animate={{
                                                x: hoveredIndex === index ? 15 : 0,
                                                color: hoveredIndex === index ? "#000000" : "#1f2937"
                                            }}
                                            style={{
                                                fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', // Responsive font size
                                                lineHeight: '1.1'
                                            }}
                                        >
                                            {service.title}
                                        </motion.h3>
                                    </div>

                                    {/* Service Description - Smaller text size */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-5 md:pt-12 lg:pt-16">
                                        <motion.p
                                            className="text-sm md:text-base leading-relaxed" // Reduced from lg:text-xl to base
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 0.7, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.6,
                                                delay: index * 0.1 + 0.7,
                                                ease: "easeOut"
                                            }}
                                            animate={{
                                                opacity: hoveredIndex === index ? 1 : 0.7,
                                                x: hoveredIndex === index ? 10 : 0,
                                                color: hoveredIndex === index ? "#374151" : "#6b7280"
                                            }}
                                        >
                                            {service.description}
                                        </motion.p>
                                    </div>
                                </div>

                                {/* Enhanced animated underline with scroll trigger */}
                                <motion.div
                                    className="mt-8 h-[2.5px] bg-cyan-500 origin-left rounded-full"
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    whileInView={{
                                        scaleX: 0.3,
                                        opacity: 0.3
                                    }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 1,
                                        delay: index * 0.1 + 0.9
                                    }}
                                    animate={{
                                        scaleX: hoveredIndex === index ? 1 : 0.3,
                                        opacity: hoveredIndex === index ? 1 : 0.3
                                    }}
                                />

                                {/* Subtle glow effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-lg pointer-events-none"
                                    animate={{
                                        boxShadow: hoveredIndex === index
                                            ? "0 0 30px rgba(239, 68, 68, 0.1)"
                                            : "0 0 0px rgba(239, 68, 68, 0)"
                                    }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Call-to-action section with scroll animation */}
            <div className="px-8 md:px-16 lg:px-24 pb-20">
                <div className="max-w-8xl mx-auto">
                    <motion.div
                        className="bg-[#2a3f6b] rounded-2xl p-8 md:p-12 text-center"
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.3 }
                        }}
                    >
                        <motion.h3
                            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Ready to Turn Skills into Success?
                        </motion.h3>
                        <motion.p
                            className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            Let's build something that doesn't just work — but works magic.
                        </motion.p>
                        <motion.button
                            className="bg-cyan-600 hover:bg-cyan-800 cursor-pointer text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/contact")}
                        >
                            Let's Make It Happen
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SubServices;