import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

import Image1 from "../images/project-1.png";
import Image2 from "../images/project-2.png";
import Image3 from "../images/project-3.png";
import Image4 from "../images/project-4.png";

const Data = [
    { name: "NELTAS", Link: "https://neltas.com/", image: Image2 },
    { name: "ODAK", Link: "https://odaksolutions.com/", image: Image3 },
    { name: "All Lines", Link: "https://alllines.org/", image: Image4 },
    { name: "Pratham Services", Link: "https://prathamservices.com/", image: Image1 },
];

const OurWork = () => {
    const cometRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // fade out title
    const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(100, 100);

        if (cometRef.current) {
            cometRef.current.appendChild(renderer.domElement);
        }

        // Gold comet
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: "#facc15",
        });
        const comet = new THREE.Mesh(geometry, material);
        scene.add(comet);

        // Glow
        const glowGeometry = new THREE.SphereGeometry(0.7, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: "#f59e0b",
            transparent: true,
            opacity: 0.5,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        scene.add(glow);

        camera.position.z = 3;

        const animate = () => {
            requestAnimationFrame(animate);
            comet.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (cometRef.current && renderer.domElement) {
                cometRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-[#0b1030] overflow-hidden scroll-smooth">
            {/* Comet */}
            <motion.div
                ref={cometRef}
                className="fixed top-20 -left-6 z-20"
                style={{
                    y: useTransform(scrollYProgress, [0, 1], [0, 800]),
                }}
            />

            {/* Title in middle */}
            <motion.h1
                style={{ opacity: titleOpacity }}
                className="text-white text-7xl font-extrabold tracking-wide text-center pt-40 pb-32"
            >
                WE WORK
            </motion.h1>

            {/* Projects with 1s delay stagger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-12 pb-24">
                {Data.map((item, index) => (
                    <motion.a
                        key={index}
                        href={item.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 120 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className="bg-[#11183d] rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition transform"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4 text-white font-semibold text-lg">
                            {item.name}
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );
};

export default OurWork;