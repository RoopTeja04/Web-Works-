import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const Faqs = [
    {
        question: "What is WebWorks and what do you offer?",
        answer:
            "WebWorks is a startup that provides modern web solutions including web development, design, and digital tools to help your business grow."
    },
    {
        question: "Do you offer a free trial?",
        answer:
            "Yes, we offer a free 7-day trial for all new users to explore our services before subscribing."
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept major credit cards, debit cards, UPI, and PayPal for global users."
    },
    {
        question: "Is my data secure with WebWorks?",
        answer:
            "Absolutely. We use encryption and follow industry best practices to keep your data safe."
    },
    {
        question: "How can I contact support?",
        answer:
            "You can reach out to our support team via email at support@webworks.com or through our in-app chat."
    }
];

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto my-24 p-6 flex flex-col items-center">
            <motion.h2
                className="text-4xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                Frequently Asked Questions
            </motion.h2>

            <div className="min-w-6xl space-y-6">
                {Faqs.map((faq, i) => (
                    <motion.div
                        key={i}
                        className="border border-gray-300 rounded-2xl shadow-sm overflow-hidden"
                        initial={{ opacity: 0, y: -40 }} 
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: i * 0.2
                        }}
                    >
                        <button
                            onClick={() => toggleFAQ(i)}
                            className="w-full flex justify-between items-center px-7 py-5 text-left cursor-pointer"
                        >
                            <span className="font-medium">{faq.question}</span>
                            <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <div
                            className={`px-7 text-gray-600 transition-all duration-500 ease-in-out overflow-hidden ${openIndex === i ? "max-h-40 pb-4" : "max-h-0"
                                }`}
                        >
                            {faq.answer}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;