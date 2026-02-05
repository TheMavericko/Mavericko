"use client";

import { motion } from "framer-motion";
import { Clock, Users, Zap } from "lucide-react";

export default function EfficiencyMission() {
    return (
        <section className="py-32 bg-neutral-900/30 relative">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                {/* Left: Content */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6"
                    >
                        Efficiency First
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                        Efficiency is not a feature.<br />
                        <span className="text-white/40">It's our Mission.</span>
                    </h2>

                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex gap-5 group"
                        >
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300">
                                    <Clock size={24} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">Protecting Your Time</h3>
                                <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                                    We filter out ghost jobs and expired listings so you stop applying into the void.
                                    Your time is your most valuable asset.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-5 group"
                        >
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300">
                                    <Users size={24} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">Experience-Driven Data</h3>
                                <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                                    Community feedback powers our filters. When users flag a job, our system learns
                                    and adapts instantly.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right: Abstract Graphic representation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[500px] w-full bg-gradient-to-tr from-purple-900/10 to-black border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden backdrop-blur-3xl group"
                >
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />

                    {/* Glowing Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-[60px]" />

                    <div className="text-center p-12 relative z-10 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl transform group-hover:scale-105 transition-transform duration-500">
                        <div className="flex justify-center mb-4 text-green-400">
                            <Zap size={48} className="drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                        </div>
                        <div className="text-7xl font-bold text-white mb-2 tracking-tighter">98%</div>
                        <div className="text-white/40 uppercase tracking-[0.2em] text-xs font-semibold">Ghost Jobs Filtered</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
