import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

const Testimonials = () => {
    const targetRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();

    // Enhanced scroll tracking
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    // Ultra-smooth spring config
    const springConfig = {
        stiffness: 300,
        damping: 50,
        mass: 1,
        restDelta: 0.0001
    };

    const smoothProgress = useSpring(scrollYProgress, springConfig);

    // Animations for rows
    const x1 = useTransform(smoothProgress, [0, 1], ["100%", "-100%"], { clamp: false });
    const x2 = useTransform(smoothProgress, [0, 1], ["-100%", "100%"], { clamp: false });
    const y1 = useTransform(smoothProgress, [0, 1], [0, -30]);
    const y2 = useTransform(smoothProgress, [0, 1], [0, 30]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

    // Clients with name + logo
    const clients = [
        {
            name: "The Ocean Agency",
            logo: "https://images.prismic.io/buzzworthy/Zh6M4UaI3ufuUOh4_client-oa.webp?auto=format,compress"
        },
        {
            name: "WeWork",
            logo: "https://images.prismic.io/buzzworthy/Zh6M5EaI3ufuUOh7_client-wework.webp?auto=format,compress"
        },
        {
            name: "Selene Aviation",
            logo: "https://buzzworthy.cdn.prismic.io/buzzworthy/Zh6M4kaI3ufuUOh5_client-selene.svg?auto=compress,format" 
        },
        {
            name: "O Positive",
            logo: "https://buzzworthy.cdn.prismic.io/buzzworthy/ZqJ8qB5LeNNTxgEK_OPOSITIVE-Logo2013black.svg?auto=compress,format"
        },
        {
            name: "ModernMD",
            logo: "https://buzzworthy.cdn.prismic.io/buzzworthy/Zh6M4EaI3ufuUOh3_client-modernmd.svg?auto=compress,format"
        },
        {
            name: "Sling Shot",
            logo: "https://buzzworthy.cdn.prismic.io/buzzworthy/Zh6M40aI3ufuUOh6_client-ssi.svg?auto=compress,format"
        },
        {
            name: "Helias 100%",
            logo: "https://buzzworthy.cdn.prismic.io/buzzworthy/Zh6M3kaI3ufuUOh1_client-helias.svg?auto=compress,format"
        },
        {
            name: "Awestruck",
            logo: "https://buzzworthy.cdn.prismic.io/buzzworthy/Zh6M3UaI3ufuUOh0_client-awestruck.svg?auto=compress,format"
        }
    ];

    const topRowClients = clients.slice(0, 4);
    const bottomRowClients = clients.slice(4);

    // Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1], staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.25, 0, 1],
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 80, rotateX: 15, scale: 0.9 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                duration: 1.2,
                delay: i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 80,
                damping: 20
            }
        })
    };

    const smoothHover = {
        scale: 1.02,
        y: -8,
        boxShadow: "0 20px 40px -8px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    };

    const textHover = {
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" }
    };

    return (
        <div className="min-h-screen bg-[#2a3f6b] text-white">
            {/* Header Section */}
            <motion.div
                className="px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 pt-20 pb-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Left Side */}
                <motion.div className="flex flex-col max-w-sm lg:max-w-md" variants={itemVariants}>
                    <motion.div
                        className="text-xs uppercase tracking-[0.2em] flex items-center gap-3 text-gray-300 mb-8"
                        variants={itemVariants}
                    >
                        <motion.span
                            className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0"
                            animate={shouldReduceMotion ? {} : {
                                scale: [1, 1.3, 1],
                                opacity: [1, 0.8, 1]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span>TRUE PARTNERSHIP</span>
                    </motion.div>

                    <motion.p
                        className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 font-light"
                        variants={itemVariants}
                    >
                        At Webworks, we don't just deliver projects, we build lasting partnerships.
                        Through collaboration, transparency, and a shared drive for innovation, we craft
                        digital experiences that help brands stand out and scale with confidence.
                    </motion.p>
                </motion.div>

                {/* Right Side */}
                <motion.div className="flex flex-col items-start lg:items-center" variants={itemVariants}>
                    <div className="font-black leading-[0.85] tracking-tight">
                        <motion.div className="text-5xl md:text-6xl lg:text-7xl opacity-70 lowercase mb-1" variants={itemVariants}>
                            we don't
                        </motion.div>
                        <motion.div className="text-8xl md:text-9xl lg:text-10xl xl:text-11xl uppercase mb-1" variants={itemVariants}>
                            JUST WORK
                        </motion.div>
                        <motion.div className="text-8xl md:text-9xl lg:text-10xl xl:text-11xl uppercase mb-1 text-cyan-500" variants={itemVariants}>
                            BRANDS
                        </motion.div>
                        <motion.div className="flex items-baseline gap-4 mb-1" variants={itemVariants}>
                            <span className="text-5xl md:text-6xl lg:text-7xl opacity-70 lowercase">we</span>
                            <motion.span
                                className="text-8xl md:text-9xl lg:text-10xl xl:text-11xl uppercase"
                                animate={shouldReduceMotion ? {} : {
                                    textShadow: [
                                        "0 0 0px rgba(239, 68, 68, 0)",
                                        "0 0 15px rgba(239, 68, 68, 0.4)",
                                        "0 0 0px rgba(239, 68, 68, 0)"
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                JAM
                            </motion.span>
                            <span className="text-5xl md:text-6xl lg:text-7xl opacity-70 lowercase">with</span>
                        </motion.div>
                        <motion.div className="text-5xl md:text-6xl lg:text-7xl opacity-70 lowercase" variants={itemVariants}>
                            them
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Horizontal Scroll Carousel */}
            <div ref={targetRef} className="relative h-[60vh]">
                <motion.div
                    className="sticky top-0 h-screen flex flex-col justify-start pt-16 gap-6 overflow-hidden px-8"
                    style={{ opacity }}
                >
                    {/* TOP ROW */}
                    <motion.div style={{ x: x1, y: y1 }} className="flex gap-6 will-change-transform">
                        {topRowClients.map((client, index) => (
                            <motion.div
                                key={`top-${index}`}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover={smoothHover}
                                viewport={{ once: true, amount: 0.2 }}
                                className="bg-[#1e2a4a] rounded-xl p-6 h-44 flex items-center justify-center cursor-pointer min-w-[380px] flex-shrink-0 will-change-transform"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    perspective: 1000,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <motion.img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-36 object-contain select-none"
                                    whileHover={textHover}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* BOTTOM ROW */}
                    <motion.div style={{ x: x2, y: y2 }} className="flex gap-6 will-change-transform">
                        {bottomRowClients.map((client, index) => (
                            <motion.div
                                key={`bottom-${index}`}
                                custom={index + 4}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover={smoothHover}
                                viewport={{ once: true, amount: 0.2 }}
                                className="bg-[#1e2a4a] rounded-xl p-6 h-44 flex items-center justify-center cursor-pointer min-w-[380px] flex-shrink-0 will-change-transform"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    perspective: 1000,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <motion.img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-36 object-cover select-none"
                                    whileHover={textHover}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.div
                className="text-center py-20 px-8 bg-[#2a3f6b]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <motion.p
                    className="text-gray-400 text-lg md:text-xl lg:text-2xl"
                    animate={shouldReduceMotion ? {} : { opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    Trusted by 500+ companies that believe in authentic partnerships
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Testimonials;