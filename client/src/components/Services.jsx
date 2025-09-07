import React, { useState, useRef, useEffect } from 'react';
import { FaArrowDown, FaFigma, FaSketch, FaReact, FaNodeJs } from "react-icons/fa";
import { SiAdobeillustrator, SiAdobexd, SiAdobephotoshop, SiTailwindcss, SiGoogleanalytics, SiHubspot, SiMongodb } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from 'three';
import Footer from '../sub_components/Footer';

const Services = () => {
    const [hoveredService, setHoveredService] = useState(null);
    const canvasContainerRef = useRef(null);
    const servicesRef = useRef(null);

    const leftVariant = { hidden: { x: -100, opacity: 0 }, visible: { x: 0, opacity: 1 } };
    const rightVariant = { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } };

    // Tools for each service
    const tools = {
        "UI/UX Design": [<FaFigma title="Figma" />, <SiAdobexd title="Adobe XD" />, <FaSketch title="Sketch" />, <SiAdobeillustrator title="Illustrator" />, <SiAdobephotoshop title="Photoshop" />],
        "Web Development": [<FaReact title="React" />, <FaNodeJs title="Node.js" />, <SiTailwindcss title="Tailwind CSS" />, <SiMongodb title="MongoDB" />],
        "Marketing": [<SiGoogleanalytics title="Google Analytics" />, <SiHubspot title="HubSpot" />, <SiAdobexd title="Adobe Creative Cloud" />],
        "Branding": [<SiAdobeillustrator title="Illustrator" />, <SiAdobephotoshop title="Photoshop" />, <FaFigma title="Figma" />]
    };

    // Three.js particle animation
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

    // Scroll to services section
    const scrollToServices = () => {
        servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Render a service row
    const renderService = (name, desc, img, reverse = false) => (
        <div className={`flex flex-col md:flex-row items-center ${reverse ? "md:space-x-10 md:flex-row-reverse md:space-x-reverse" : "md:space-x-10"} space-y-6 md:space-y-0 relative`}>
            {/* Text */}
            <motion.div
                className="flex-1 text-center md:text-left relative"
                variants={reverse ? rightVariant : leftVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2
                    className="text-3xl font-bold mb-4 cursor-pointer"
                    onMouseEnter={() => setHoveredService(name)}
                    onMouseLeave={() => setHoveredService(null)}
                >
                    {name}
                </h2>
                <p className="text-gray-400">{desc}</p>

                {/* Tools popup */}
                <AnimatePresence>
                    {hoveredService === name && (
                        <motion.div
                            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded-lg shadow-lg flex space-x-6 z-50"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {tools[name].map((icon, i) => (
                                <motion.div
                                    key={i}
                                    className="text-white text-3xl"
                                    whileHover={{ scale: 1.3 }}
                                >
                                    {icon}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Image */}
            <motion.div
                className="flex-1"
                variants={reverse ? leftVariant : rightVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <img src={img} alt={name} className="rounded-2xl shadow-lg" />
            </motion.div>
        </div>
    );

    return (
        <div className='min-h-screen bg-gray-900 text-white overflow-x-hidden relative'>
            {/* Three.js particles */}
            <div ref={canvasContainerRef} className="absolute inset-0 z-0 pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col space-y-12 items-center justify-center h-170 relative z-10">
                <h1 className='text-6xl tracking-wider font-semibold capitalize'>
                    Services that we offer
                </h1>
                <span
                    className="text-white relative top-20 cursor-pointer p-2 animate-bounce"
                    onClick={scrollToServices}
                >
                    <FaArrowDown size={38} />
                </span>
            </div>

            {/* Services section */}
            <div ref={servicesRef} className="flex flex-col space-y-20 py-16 px-8 relative z-10">
                {renderService(
                    "UI/UX Design",
                    "Crafting intuitive and engaging user experiences with modern UI/UX design principles.",
                    "https://cms.pixso.net/images/articles/pixso-interface.png"
                )}
                {renderService(
                    "Web Development",
                    "Building fast, responsive, and scalable web applications tailored to your needs.",
                    "https://miro.medium.com/v2/resize:fit:1400/1*3QUZQjqz4yAkzI8ulDOVoQ.png",
                    true
                )}
                {renderService(
                    "Marketing",
                    "Expanding your reach with data-driven marketing strategies and campaigns.",
                    "https://thumbs.dreamstime.com/b/digital-marketing-business-concept-business-concept-businessman-click-digital-marketing-button-virtual-screen-text-typography-125648024.jpg"
                )}
                {renderService(
                    "Branding",
                    "Helping you build a powerful brand identity that resonates with your audience.",
                    "https://images.unsplash.com/photo-1654481414716-2f4ab5fe0fbe?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJyYW5kaW5nJTIwZGVzaWdufGVufDB8fDB8fHww",
                    true
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Services;