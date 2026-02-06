"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-20 bg-black px-4 md:px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-6xl mx-auto rounded-[2.5rem] bg-gradient-to-b from-neutral-900 to-black border border-white/10 relative overflow-hidden text-center py-20 px-6 md:px-12"
            >
                {/* Decorative Background Glows (Subtlety Adjusted) */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px] pointer-events-none -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[128px] pointer-events-none translate-y-1/2" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-8">
                        <Sparkles size={16} />
                        <span>For The Real Job Seekers</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Ready to Stop <br className="hidden md:block" />
                        Being Ghosted?
                    </h2>

                    {/* Subtext */}
                    <p className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
                        Join thousands of job seekers who've reclaimed their time and sanity.
                        No more phantom listings. No more wasted applications.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <Link
                            href="/signup"
                            className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_30px_rgba(138,43,226,0.3)]"
                        >
                            Join the Revolution
                            <ArrowRight size={20} />
                        </Link>
                        <Link
                            href="#listings"
                            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-medium rounded-xl backdrop-blur-sm transition-all hover:scale-105"
                        >
                            View Job Listings
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
