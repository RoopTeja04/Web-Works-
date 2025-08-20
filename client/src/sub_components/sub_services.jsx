import React from "react";
import { motion } from "framer-motion";

const Services = [
    {
        title: "Web Development",
        description:
            "Modern, responsive, and scalable websites & web apps tailored to your business needs.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw9ZC2cHZVHgCBsCQ_qrxVw519s3ov9TbCrA&s",
    },
    {
        title: "SEO Optimization",
        description:
            "Drive organic traffic and improve your ranking with proven SEO strategies.",
        img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Digital Marketing",
        description:
            "Targeted campaigns across social media and ads to boost your online presence.",
        img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Design Services",
        description:
            "Engaging UI/UX, branding, and graphic design that connects with your audience.",
        img: "https://media.istockphoto.com/id/1330168130/photo/engineer-meeting-for-an-architectural-project-working-with-partner-and-engineering-tools.jpg?s=612x612&w=0&k=20&c=qvVhYP6SIJeOfERacQa87-RjsmRXs_YhfoQ_oMCHs8k=",
    },
];

const SubServices = () => {
    return (
        <div className="my-24 flex flex-col items-center">
            <motion.span
                className="text-5xl font-semibold tracking-wide"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                Services
            </motion.span>

            <div className="flex flex-wrap gap-10 justify-center mt-12 w-full">
                {Services.map((s, i) => (
                    <motion.div
                        key={i}
                        className="relative group w-72 h-56 rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                        style={{
                            backgroundImage: `url(${s.img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: i * 0.2,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />

                        <h3 className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-xl font-bold text-white z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                            {s.title}
                        </h3>

                        <p className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-500 w-full px-4 text-sm">
                            {s.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SubServices;
