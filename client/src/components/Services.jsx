import React, { useState, useRef, useEffect } from 'react';
import { FaFigma, FaSketch, FaReact, FaNodeJs } from "react-icons/fa";
import { SiAdobeillustrator, SiAdobexd, SiAdobephotoshop, SiTailwindcss, SiGoogleanalytics, SiHubspot, SiMongodb } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from 'three';
import { FaRedoAlt } from "react-icons/fa";
import RotatedInteractiveExpandingHeadings from '../sub_components/processSteps';

const phrases = [
    "Conversion - First",
    "Trust-Building",
    "Vision-Led",
    "Experience-Driven",
    "Impact-Focused",
    "Future-Ready",
    "Brand-Centric",
    "Growth-Engineered",
    "Performance-Built",
    "Client-Centric",
    "Result-Oriented",
    "Value-Driven"
];

const Services = () => {
    const [hoveredService, setHoveredService] = useState(null);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(3);
    const [displayedHeading, setDisplayedHeading] = useState(phrases[3]);
    const [isAnimating, setIsAnimating] = useState(false);

    const canvasContainerRef = useRef(null);
    const servicesRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const textMeshRef = useRef(null);
    const particleSystemRef = useRef(null);

    const tools = {
        "UI/UX Design": [<FaFigma title="Figma" />, <SiAdobexd title="Adobe XD" />, <FaSketch title="Sketch" />, <SiAdobeillustrator title="Illustrator" />, <SiAdobephotoshop title="Photoshop" />],
        "Web Development": [<FaReact title="React" />, <FaNodeJs title="Node.js" />, <SiTailwindcss title="Tailwind CSS" />, <SiMongodb title="MongoDB" />],
        "Marketing": [<SiGoogleanalytics title="Google Analytics" />, <SiHubspot title="HubSpot" />, <SiAdobexd title="Adobe Creative Cloud" />],
        "Branding": [<SiAdobeillustrator title="Illustrator" />, <SiAdobephotoshop title="Photoshop" />, <FaFigma title="Figma" />]
    };

    // Create text geometry helper function
    const createTextGeometry = (text) => {
        const loader = new THREE.FontLoader();

        // Create a simple geometry first, then replace with proper font geometry
        const geometry = new THREE.TextGeometry(text, {
            font: null, // Will be loaded dynamically
            size: 8,
            height: 2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize: 0.3,
            bevelOffset: 0,
            bevelSegments: 8
        });

        return geometry;
    };

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        canvasContainerRef.current.appendChild(renderer.domElement);

        sceneRef.current = scene;
        rendererRef.current = renderer;
        cameraRef.current = camera;

        // Create floating particles background
        const particleGeometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        const velocities = [];

        for (let i = 0; i < 3000; i++) {
            vertices.push(
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000)
            );

            // Red-orange gradient colors
            const color = new THREE.Color();
            color.setHSL(0.0 + Math.random() * 0.1, 0.7, 0.5 + Math.random() * 0.3);
            colors.push(color.r, color.g, color.b);

            // Random velocities for particle movement
            velocities.push(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            );
        }

        particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        particleGeometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 3,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particleSystemRef.current = particles;
        scene.add(particles);

        // Create initial text mesh (placeholder)
        const textGeometry = new THREE.BoxGeometry(1, 1, 1); // Placeholder
        const textMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMeshRef.current = textMesh;
        scene.add(textMesh);

        camera.position.z = 1000;

        const animate = () => {
            requestAnimationFrame(animate);

            // Animate background particles
            const positions = particles.geometry.attributes.position.array;
            const velocities = particles.geometry.attributes.velocity.array;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Wrap around boundaries
                if (Math.abs(positions[i]) > 1000) velocities[i] *= -1;
                if (Math.abs(positions[i + 1]) > 1000) velocities[i + 1] *= -1;
                if (Math.abs(positions[i + 2]) > 1000) velocities[i + 2] *= -1;
            }

            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.x += 0.0003;
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

    const animateTextTransition = (newText) => {
        if (!sceneRef.current || !textMeshRef.current) return;

        // Create burst effect during transition
        const burstGeometry = new THREE.BufferGeometry();
        const burstVertices = [];
        const burstColors = [];

        for (let i = 0; i < 100; i++) {
            const radius = Math.random() * 50 + 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            burstVertices.push(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            burstColors.push(1, 0.2, 0); // Red burst color
        }

        burstGeometry.setAttribute('position', new THREE.Float32BufferAttribute(burstVertices, 3));
        burstGeometry.setAttribute('color', new THREE.Float32BufferAttribute(burstColors, 3));

        const burstMaterial = new THREE.PointsMaterial({
            size: 8,
            transparent: true,
            opacity: 1,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });

        const burstEffect = new THREE.Points(burstGeometry, burstMaterial);
        sceneRef.current.add(burstEffect);

        // Animate burst effect
        let burstScale = 0;
        const burstAnimation = () => {
            burstScale += 0.1;
            burstEffect.scale.setScalar(burstScale);
            burstMaterial.opacity = Math.max(0, 1 - burstScale * 0.5);

            if (burstScale < 4) {
                requestAnimationFrame(burstAnimation);
            } else {
                sceneRef.current.remove(burstEffect);
                burstGeometry.dispose();
                burstMaterial.dispose();
            }
        };
        burstAnimation();

        // Enhanced particle burst during text change
        if (particleSystemRef.current) {
            const positions = particleSystemRef.current.geometry.attributes.position.array;
            const velocities = particleSystemRef.current.geometry.attributes.velocity.array;

            for (let i = 0; i < velocities.length; i += 3) {
                // Increase particle speeds temporarily
                velocities[i] *= 3;
                velocities[i + 1] *= 3;
                velocities[i + 2] *= 3;
            }

            // Reset particle speeds after animation
            setTimeout(() => {
                for (let i = 0; i < velocities.length; i += 3) {
                    velocities[i] /= 3;
                    velocities[i + 1] /= 3;
                    velocities[i + 2] /= 3;
                }
            }, 1000);
        }
    };

    const handleDotClick = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        const nextIndex = (currentPhraseIndex + 1) % phrases.length;
        const nextPhrase = phrases[nextIndex];

        // Trigger 3D animation effect
        animateTextTransition(nextPhrase);

        // Create smooth text morphing effect
        let i = 0;
        const morphingSpeed = 80; // Faster for smoother effect

        const interval = setInterval(() => {
            if (i < nextPhrase.length) {
                setDisplayedHeading(nextPhrase.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setCurrentPhraseIndex(nextIndex);

                // Add a pause before allowing next animation
                setTimeout(() => {
                    setIsAnimating(false);
                }, 500);
            }
        }, morphingSpeed);
    };

    const scrollToServices = () => {
        servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='min-h-screen bg-[#22355a] text-white overflow-x-hidden relative'>
            <div ref={canvasContainerRef} className="absolute inset-0 z-0 pointer-events-none" />

            <section className="relative z-10 min-h-[100vh] flex flex-col top-34 px-8 md:px-10">
                <div className="flex space-x-6">
                    {/* Enhanced animated dot with 3D effects */}
                    <motion.div
                        className="relative top-34 left-26 w-14 h-14 flex items-center justify-center cursor-pointer"
                        initial={{ scale: 0.9, opacity: 0.9 }}
                        animate={{
                            scale: isAnimating ? [1, 1.5, 1] : [1, 1.2, 1],
                            opacity: [1, 0.6, 1],
                            rotateZ: isAnimating ? 360 : 0
                        }}
                        transition={{
                            duration: isAnimating ? 1 : 2,
                            repeat: isAnimating ? 0 : Infinity,
                            ease: "easeInOut"
                        }}
                        onClick={handleDotClick}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.span
                            className="absolute w-22 h-22 rounded-full bg-red-600 opacity-20"
                            animate={{ scale: isAnimating ? [1, 2, 0] : [1, 1.8, 1] }}
                            transition={{ duration: isAnimating ? 0.8 : 2, repeat: isAnimating ? 0 : Infinity }}
                        />
                        <motion.span
                            className="absolute w-20 h-20 rounded-full bg-red-600 opacity-40"
                            animate={{ scale: isAnimating ? [1, 1.5, 0] : 1 }}
                        />
                        <motion.span
                            className="absolute w-16 h-16 rounded-full bg-red-600 flex items-center justify-center"
                            animate={{
                                boxShadow: isAnimating ?
                                    ["0 0 10px #ff0000", "0 0 30px #ff0000", "0 0 10px #ff0000"] :
                                    "0 0 10px #ff0000"
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                animate={{ rotate: isAnimating ? 360 : 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <FaRedoAlt className="text-white text-xl" />
                            </motion.div>
                        </motion.span>
                    </motion.div>

                    {/* Enhanced text section with 3D-like effects */}
                    <div>
                        <motion.h1
                            className="text-5xl font-extrabold leading-tight uppercase space-y-6 flex flex-col w-full"
                            animate={{
                                textShadow: isAnimating ?
                                    ["0 0 10px #ff0000", "0 0 30px #ff0000", "0 0 10px #ff0000"] :
                                    "0 0 5px #ff0000"
                            }}
                        >
                            <motion.span
                                className="text-cyan-500 md:text-8xl w-full"
                                animate={{
                                    scale: isAnimating ? [1, 1.1, 1] : 1,
                                    rotateX: isAnimating ? [0, 10, 0] : 0
                                }}
                                transition={{ duration: 0.8 }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    textShadow: '0 5px 10px rgba(255,0,0,0.3)'
                                }}
                            >
                                {displayedHeading}
                            </motion.span>
                            <motion.span
                                className="text-white md:text-7xl block ml-32"
                                animate={{
                                    x: isAnimating ? [0, 20, 0] : 0,
                                    rotateY: isAnimating ? [0, -10, 0] : 0
                                }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    textShadow: '0 5px 10px rgba(255,255,255,0.2)'
                                }}
                            >
                                WEBSITES
                            </motion.span>
                        </motion.h1>

                        <motion.div
                            className='absolute right-30 mx-6 -space-y-6'
                            animate={{
                                y: isAnimating ? [0, -10, 0] : 0,
                                opacity: isAnimating ? [1, 0.7, 1] : 1
                            }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 uppercase">
                                That Help Your
                            </h2>
                            <h2 className='text-3xl md:text-9xl font-bold text-white mt-6 uppercase'>
                                Business
                            </h2>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div ref={servicesRef} className="flex flex-col space-y-20 py-16 px-8 relative z-10">
                <div className="text-center mb-12 relative">
                    <h3 className="text-md md:text-md absolute bottom-2 font-semibold tracking-wide uppercase text-gray-400 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full inline-block"></span> What We Do
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
            initial={{ opacity: 0, x: 10, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, x: -10, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
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
            whileHover={{ scale: 1.05, textShadow: "0 0 15px rgba(255,255,255,0.3)" }}
        >
            {text.split("").map((letter, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { y: 30, opacity: 0, rotateX: -90 },
                        visible: { y: 0, opacity: 1, rotateX: 0 }
                    }}
                    transition={{
                        duration: 0.4,
                        delay: i * 0.05,
                        ease: "easeOut"
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    whileHover={{
                        y: -5,
                        rotateX: 15,
                        textShadow: "0 5px 10px rgba(255,255,255,0.2)"
                    }}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.h2>
    );
};

export default Services;