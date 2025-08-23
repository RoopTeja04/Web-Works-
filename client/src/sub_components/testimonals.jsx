import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        name: "Rahul Mehta",
        role: "Startup Founder",
        feedback:
            "WebWorks transformed our outdated website into a sleek, modern platform. Our customer engagement doubled within a month!"
    },
    {
        name: "Ananya Gupta",
        role: "Digital Marketer",
        feedback:
            "I love how fast and reliable their team is. They delivered our landing page in record time without compromising quality."
    },
    {
        name: "David Lee",
        role: "Entrepreneur",
        feedback:
            "The smooth UI/UX design provided by WebWorks really helped my brand look professional. Highly recommended!"
    },
    {
        name: "Priya Sharma",
        role: "Freelancer",
        feedback:
            "Affordable and super responsive. Any time I needed changes, the team was quick to help. Amazing experience!"
    },
    {
        name: "Mohammed Ali",
        role: "Small Business Owner",
        feedback:
            "My e-commerce store is now running flawlessly thanks to WebWorks. Sales have gone up by 40%."
    },
    {
        name: "Sophia Johnson",
        role: "Tech Enthusiast",
        feedback:
            "Clean code, modern design, and great communication. I felt confident working with WebWorks from day one."
    }
];

const Testimonals = () => {
    const [index, setIndex] = useState(0);

    const nextTestimonial = () => {
        setIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="max-w-4xl mx-auto my-12 px-4">
            <h2 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h2>

            <div className="relative bg-gray-100 shadow-lg rounded-2xl px-10 py-10 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
                    >
                        <div className="md:col-span-1 text-center md:text-left">
                            <h3 className="font-semibold text-lg">{testimonials[index].name}</h3>
                            <p className="text-sm text-gray-500">{testimonials[index].role}</p>
                        </div>

                        <div className="md:col-span-2">
                            <p className="text-gray-700 italic">"{testimonials[index].feedback}"</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center items-center gap-6 mt-6">
                <button
                    onClick={prevTestimonial}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition cursor-pointer"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextTestimonial}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition cursor-pointer"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default Testimonals