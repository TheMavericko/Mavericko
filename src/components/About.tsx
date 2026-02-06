"use client";

import { motion } from "framer-motion";
import { Target, Heart, Lightbulb } from "lucide-react";

export default function About() {
    const cards = [
        {
            title: "Our Mission",
            text: "To eliminate the frustration of ghost jobs and bring transparency to the job market. Every application should count.",
            icon: Target,
        },
        {
            title: "Built for Job Seekers",
            text: "We've been there. Hours spent applying to jobs that don't exist. That's why we built Mavericko—for people like us.",
            icon: Heart,
        },
        {
            title: "Powered by Community",
            text: "Our strength lies in our community. Real reviews from real applicants make our detection system unbeatable.",
            icon: Lightbulb,
        },
    ];

    return (
        <section id="about" className="py-24 bg-black text-white relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* SECTION HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">The Team Behind the Mission</h2>
                    <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
                        We're a team of engineers, designers, and former job seekers who got tired of being ghosted. Now we're fighting back.
                    </p>
                </motion.div>

                {/* CARD GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="p-8 bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-primary/40 hover:bg-neutral-900/80 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 mb-6 bg-white/5 rounded-xl flex items-center justify-center text-primary border border-white/5 group-hover:scale-110 transition-transform duration-300 custom-shadow">
                                <card.icon size={28} className="drop-shadow-[0_0_10px_rgba(138,43,226,0.5)]" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                            <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                                {card.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* QUOTE SECTION */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-gradient-to-r from-neutral-900 to-black border border-white/10 rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                    <p className="text-xl md:text-2xl text-white/90 italic font-light mb-8 leading-relaxed">
                        "We believe every job seeker deserves honesty. Ghost jobs waste time, drain energy, and erode trust. We're here to change that."
                    </p>

                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold text-white text-xs">M</div>
                        <span className="font-semibold text-white tracking-wide">Mavericko Team</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
