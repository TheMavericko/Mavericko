"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-20">
            {/* Background Abstract Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-900/20 rounded-full blur-[96px]" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center mt-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-medium text-white/70 tracking-wide uppercase">Verified Sources Only</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
                >
                    Stop Chasing <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bca1ff] via-white to-[#bca1ff] animate-gradient-x bg-[length:200%_auto]">
                        Ghosts
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Aggregating data from verified sources and filtering it for you.
                    <span className="text-white/90 font-medium"> No ghost jobs. No spam. Just opportunities.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <button className="relative group px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(255,255,255,0.5)]">
                        <span className="relative z-10 flex items-center gap-2">
                            Join the Revolution
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button className="px-10 py-5 text-white font-medium rounded-full border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all backdrop-blur-sm">
                        Learn How it Works
                    </button>
                </motion.div>
            </div>

            {/* Ghost-Buster Radar Visual */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-24 h-64 w-full max-w-2xl mx-auto flex items-end justify-center relative perspective-[1000px]"
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Glowing Core */}
                    <div className="w-16 h-16 bg-white rounded-full shadow-[0_0_50px_rgba(138,43,226,0.8)] z-20 relative animate-pulse flex items-center justify-center">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                            <div className="w-6 h-6 bg-primary rounded-full animate-ping" />
                        </div>
                    </div>

                    {/* Concentric Radar Rings */}
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute border border-primary/30 rounded-full"
                            style={{ width: `${i * 120}px`, height: `${i * 120}px` }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.3, 0.1],
                                borderColor: ["rgba(138,43,226,0.1)", "rgba(138,43,226,0.5)", "rgba(138,43,226,0.1)"]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut"
                            }}
                        />
                    ))}

                    {/* Scanning Beam (Rotated) */}
                    <motion.div
                        className="absolute w-[300px] h-[300px] bg-gradient-to-t from-transparent via-primary/10 to-transparent z-10 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        style={{ maskImage: "conic-gradient(from 0deg, transparent 0deg, black 360deg)" }}
                    />

                    {/* Floating Particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full"
                            style={{
                                top: `${50 + Math.random() * 60 - 30}%`,
                                left: `${50 + Math.random() * 60 - 30}%`,
                            }}
                            animate={{
                                y: [-10, 10, -10],
                                opacity: [0, 0.8, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>

                {/* Floor Reflection/Fade */}
                <div className="absolute -bottom-8 w-full h-24 bg-gradient-to-t from-black via-black to-transparent z-30" />
            </motion.div>
        </section>
    );
}
