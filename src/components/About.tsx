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
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center text-center p-10 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5 rounded-3xl hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 mb-8 p-5 bg-black rounded-2xl border border-white/10 group-hover:border-primary/50 transition-colors text-primary shadow-[0_0_30px_rgba(138,43,226,0.15)] group-hover:shadow-[0_0_50px_rgba(138,43,226,0.4)]">
                                <card.icon size={36} />
                            </div>
                            <h3 className="relative z-10 text-2xl font-bold mb-4">{card.title}</h3>
                            <p className="relative z-10 text-white/50 leading-relaxed font-light">
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
