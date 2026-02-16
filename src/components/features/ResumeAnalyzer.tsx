"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";

export default function ResumeAnalyzer() {
    return (
        <section className="w-full py-20 flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl px-6"
            >
                <div className="mx-auto w-20 h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-8 shadow-2xl shadow-purple-900/10">
                    <div className="relative">
                        <FileText className="w-10 h-10 text-purple-400" />
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
                            className="absolute -top-3 -right-3"
                        >
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                        </motion.div>
                    </div>
                </div>

                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6 tracking-tight">
                    Resume Intelligence
                </h2>

                <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-lg mx-auto">
                    Our AI-powered analyzer is currently in the lab. Soon, you'll be able to get instant, actionable feedback to optimize your resume for ATS and recruiters.
                </p>

                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300 backdrop-blur-sm">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                    </span>
                    Coming Soon
                </div>
            </motion.div>
        </section>
    );
}
