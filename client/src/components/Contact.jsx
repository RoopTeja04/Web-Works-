import React, { useState, useEffect, useCallback, useRef } from 'react'
import emailjs from '@emailjs/browser';
import { IoArrowBack } from 'react-icons/io5'
import * as THREE from 'three'

const Contact = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        projectType: '',
        projectCategory: '',
        firstName: '',
        lastName: '',
        phone: '',
        company: '',
        requirements: '',
        message: '',
        email: '',
        deadline: ''
    });
    const [particles, setParticles] = useState(null);

    // ✅ React ref instead of querySelector
    const canvasContainerRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);

        if (canvasContainerRef.current) {
            canvasContainerRef.current.appendChild(renderer.domElement);
        }

        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < 5000; i++) {
            vertices.push(
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000)
            );
        }

        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(vertices, 3)
        );

        const particles = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0xff0000,
                size: 2,
                transparent: true,
                opacity: 0.5
            })
        );

        scene.add(particles);
        camera.position.z = 1000;
        setParticles(particles);

        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.0001;
            particles.rotation.y += 0.0001;
            renderer.render(scene, camera);
        };

        animate();

        // ✅ Cleanup
        return () => {
            if (canvasContainerRef.current?.contains(renderer.domElement)) {
                canvasContainerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBack = () => {
        setStep(prevStep => prevStep - 1);
    };

    const handleOptionClick = useCallback((type) => {
        if (particles) {
            const duration = 1000;
            const start = Date.now();

            const explode = () => {
                const elapsed = Date.now() - start;
                const progress = elapsed / duration;

                if (progress < 1) {
                    particles.scale.set(1 + progress, 1 + progress, 1 + progress);
                    particles.material.opacity = 1 - progress;
                    requestAnimationFrame(explode);
                } else {
                    particles.scale.set(1, 1, 1);
                    particles.material.opacity = 0.5;
                }
            };

            explode();
        }

        setFormData(prev => ({ ...prev, projectType: type }));
        setStep(2);
    }, [particles]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['firstName', 'lastName', 'email', 'company', 'deadline'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            console.log('Missing required fields:', missingFields);
            return;
        }

        try {
            const templateParams = {
                to_email: 'tejaroop082@gmail.com',
                project_type: formData.projectType,
                from_name: `${formData.firstName} ${formData.lastName}`,
                from_email: formData.email,
                phone: formData.phone,
                company: formData.company,
                deadline: formData.deadline,
                message: formData.message,
            };

            const response = await emailjs.send(
                'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
                'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
                templateParams,
                'YOUR_PUBLIC_KEY'  // Replace with your EmailJS public key
            );

            if (response.status === 200) {
                console.log('Email sent successfully!');
                setFormData({
                    projectType: '',
                    projectCategory: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    company: '',
                    requirements: '',
                    message: '',
                    email: '',
                    deadline: ''
                });
                setStep(1);
            }
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-8 text-center relative z-10">
                        <h3 className="text-6xl md:text-5xl sm:text-4xl font-bold mb-12 text-white tracking-wider px-4">
                            WHAT TYPE OF PROJECT?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto px-4">
                            {['FULL WEBSITE', 'UX/UI DESIGN', 'WEB DEVELOPMENT', 'BRANDING', 'MARKETING'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => handleOptionClick(type)}
                                    className="flex items-center space-x-2 text-white text-xl hover:text-red-500 transition-colors cursor-pointer"
                                >
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <span>{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-8 max-w-4xl mx-auto w-full relative z-10 px-4">
                        <div className="flex items-center justify-center relative w-full">
                            <button
                                onClick={handleBack}
                                className="absolute left-4 text-white hover:text-red-500 transition-colors p-2"
                            >
                                <IoArrowBack size={24} />
                            </button>
                            <h3 className="text-6xl md:text-5xl sm:text-4xl font-bold text-white text-center">
                                READY TO CREATE MAGIC?
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name *" required className="bg-transparent border-b border-gray-600 p-2 text-white focus:border-red-500 focus:outline-none" />
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name *" required className="bg-transparent border-b border-gray-600 p-2 text-white focus:border-red-500 focus:outline-none" />
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone (optional)" className="bg-transparent border-b border-gray-600 p-2 text-white focus:border-red-500 focus:outline-none" />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email *" required className="bg-transparent border-b border-gray-600 p-2 text-white focus:border-red-500 focus:outline-none" />
                            <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company *" required className="bg-transparent border-b border-gray-600 p-2 text-white focus:border-red-500 focus:outline-none" />
                            <input type="text" name="deadline" value={formData.deadline} onChange={handleInputChange} placeholder="Deadline in weeks *" required className="bg-transparent border-b border-gray-600 p-2 text-white focus:border-red-500 focus:outline-none" />
                            <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your message here..." className="col-span-2 bg-transparent border-b border-gray-600 p-2 text-white focus:border-red-500 focus:outline-none h-32" />
                            <div className="col-span-2 flex justify-end">
                                <button type="submit" className="bg-red-500 text-white rounded-full w-32 h-32 hover:bg-red-600 transition-colors flex items-center justify-center font-semibold cursor-pointer">
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='min-h-screen bg-[#0a0f2c] p-4 md:p-8 lg:p-12 flex flex-col justify-center items-center relative overflow-x-hidden'>
            <div ref={canvasContainerRef} id="canvas-container" className="absolute inset-0 overflow-hidden" />
            <div className='w-full max-w-6xl relative z-10'>
                {renderStep()}
                <div className="mt-12 flex items-center max-w-2xl mx-auto px-4">
                    <span className="text-gray-500">01</span>
                    <div className="flex-grow mx-4">
                        <div className="h-1 bg-gray-700 rounded">
                            <div
                                className="h-1 bg-red-500 rounded"
                                style={{ width: `${(step / 2) * 100}%` }}
                            />
                        </div>
                    </div>
                    <span className="text-gray-500">03</span>
                </div>
            </div>
        </div>
    );
};

export default Contact;