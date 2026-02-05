"use client";

import { motion } from "framer-motion";
import { Zap, CheckCircle2, Layers } from "lucide-react";

const features = [
    {
        title: "Real-Time Accuracy",
        description: "Updated daily to ensure you only see active opportunities.",
        icon: Zap,
    },
    {
        title: "Automated Verification",
        description: "Community surveys and automated scripts flag suspicion instantly.",
        icon: CheckCircle2,
    },
    {
        title: "Aggregated Efficiency",
        description: "A consolidated filtered view across multiple platforms.",
        icon: Layers,
    },
];

export default function TheAdvantage() {
    return (
        <section className="py-24 bg-black text-white relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The Mavericko Advantage</h2>
                    <p className="text-lg text-white/60">Why top candidates choose us.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
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
                                <feature.icon size={36} />
                            </div>
                            <h3 className="relative z-10 text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="relative z-10 text-white/50 leading-relaxed font-light">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
