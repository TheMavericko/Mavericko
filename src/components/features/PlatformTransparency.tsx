"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Filter, AlertTriangle, UserCheck } from "lucide-react";

const items = [
    {
        title: "The Discovery Model",
        description: "We are a discovery engine, not a job provider. We aggregate, you apply directly.",
        icon: ShieldCheck,
    },
    {
        title: "Filtering Logic",
        description: "Our algorithms scan verified platforms to save you time by removing spam.",
        icon: Filter,
    },
    {
        title: "Integrity Clause",
        description: "We locate links and verify sources, but we do not facilitate the hiring process.",
        icon: AlertTriangle,
    },
    {
        title: "Success Ownership",
        description: "Your outcomes depend on your skills. We just make sure you see the right doors.",
        icon: UserCheck,
    },
];

export default function PlatformTransparency() {
    return (
        <section className="py-24 bg-black text-white relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-blue-900/10 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Platform Transparency</h2>
                    <p className="text-lg text-white/60 leading-relaxed">
                        We believe in honest tools. Here is how Mavericko works for you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 group hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 mb-6 bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-inner">
                                <item.icon size={28} className="drop-shadow-lg text-purple-200" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 tracking-tight">{item.title}</h3>
                            <p className="text-sm text-white/50 leading-relaxed font-light">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
