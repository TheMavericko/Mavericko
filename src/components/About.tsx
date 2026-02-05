"use client";

import { motion } from "framer-motion";

const founders = ["Soham Phenani", "Aryan Gurjar", "Yash Karnawat"];

export default function About() {
    return (
        <section className="py-20 bg-neutral-900/50 border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">About Mavericko</h2>
                    <p className="text-lg text-white/70">
                        Building honest, transparent digital tools for the next generation of professionals.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    {founders.map((founder, idx) => (
                        <motion.div
                            key={founder}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors shadow-lg"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-black rounded-full mb-3 flex items-center justify-center text-xl font-bold text-primary border border-white/10">
                                    {founder[0]}
                                </div>
                                <h3 className="text-lg font-semibold">{founder}</h3>
                                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Founder</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
