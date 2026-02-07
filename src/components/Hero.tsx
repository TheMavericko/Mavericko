"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Send } from "lucide-react";

export default function Hero() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 1],
        ["#050008", "#0a0014"]
    );

    return (
        <>
            {/* ================= HERO SECTION ================= */}
            <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-900/20 rounded-full blur-[96px]" />
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
                        <span className="text-xs font-medium text-white/70 tracking-wide uppercase">
                            Verified Sources Only
                        </span>
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
                        <span className="text-white/90 font-medium">
                            {" "}
                            No ghost jobs. No spam. Just opportunities.
                        </span>
                    </motion.p>
                </div>
            </section>

            {/* Visual Metaphor: Paper Plane into Black Hole */}
            <motion.section className="relative px-6 overflow-hidden pt-0 pb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative w-full max-w-2xl mx-auto h-96"
                >
                    {/* Black Hole */}
                    <motion.div
                        className="absolute top-1/4 right-12 -translate-y-1/2 w-64 h-64"
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <div className="relative w-full h-full">
                            {/* Outer Ring */}
                            <motion.div
                                className="absolute inset-0 border-4 border-purple-500/30 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}
                            />
                            {/* Middle Ring */}
                            <motion.div
                                className="absolute inset-8 border-4 border-purple-500/50 rounded-full"
                                animate={{
                                    scale: [1.2, 1, 1.2],
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: 0.5,
                                }}
                            />
                            {/* Inner Core */}
                            <div className="absolute inset-16 bg-gradient-to-r from-purple-900 via-black to-purple-900 rounded-full" />
                            <div className="absolute inset-20 bg-black rounded-full shadow-[0_0_80px_rgba(124,58,237,0.8)]" />
                        </div>
                    </motion.div>

                    {/* Paper Plane (Resume) */}
                    <motion.div
                        className="absolute top-1/2 left-12 -translate-y-1/2"
                        animate={{
                            x: [0, 320, 420],
                            y: [0, -20, 0],
                            scale: [1, 0.8, 0.3],
                            opacity: [1, 0.8, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut",
                        }}
                    >
                        <Send className="w-16 h-16 text-purple-300 rotate-45" />
                    </motion.div>

                    {/* Floating Particles Around Black Hole */}
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        const radius = 140;
                        return (
                            <motion.div
                                key={i}
                                className="absolute top-[60%] right-12 w-2 h-2 bg-purple-400/60 rounded-full"
                                style={{
                                    x: Math.cos(angle) * radius,
                                    y: Math.sin(angle) * radius,
                                }}
                                animate={{
                                    x: [
                                        Math.cos(angle) * radius,
                                        Math.cos(angle + Math.PI / 6) * (radius * 0.8),
                                        Math.cos(angle + Math.PI / 3) * (radius * 0.5),
                                    ],
                                    y: [
                                        Math.sin(angle) * radius,
                                        Math.sin(angle + Math.PI / 6) * (radius * 0.8),
                                        Math.sin(angle + Math.PI / 3) * (radius * 0.5),
                                    ],
                                    opacity: [0.6, 0.3, 0],
                                    scale: [1, 0.8, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeIn",
                                }}
                            />
                        );
                    })}
                </motion.div>

                {/* Bigger footer text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center text-3xl md:text-4xl text-purple-300/90 italic"
                >
                    Your application vanishes into the void…
                </motion.p>
            </motion.section >
        </>
    );
}
