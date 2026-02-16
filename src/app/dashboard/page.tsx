"use client";

import { useState } from "react";
import Header from "@/components/Header";
import JobListing from "@/components/features/JobListing";
import ResumeAnalyzer from "@/components/features/ResumeAnalyzer";
import CommunityReview from "@/components/features/CommunityReview";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, FileText, Users, ArrowLeft } from "lucide-react";

export default function DashboardPage() {
    const [activeFeature, setActiveFeature] = useState<"hub" | "jobs" | "resume" | "community">("hub");

    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500/30">
            <Header />

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
                <AnimatePresence mode="wait">
                    {activeFeature === "hub" ? (
                        <motion.div
                            key="hub"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-6xl mx-auto"
                        >
                            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
                            <p className="text-neutral-400 mb-12">Select a tool to get started with your career journey.</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Job Listings Card */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveFeature("jobs")}
                                    className="group p-8 text-left rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.07] transition-all duration-300 shadow-xl shadow-black/20"
                                >
                                    <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                                        <Briefcase className="w-7 h-7 text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">Job Listings</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        Browse curated job opportunities tailored to your skills and preferences interactively.
                                    </p>
                                </motion.button>

                                {/* Resume Analyzer Card */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveFeature("resume")}
                                    className="group p-8 text-left rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.07] transition-all duration-300 shadow-xl shadow-black/20"
                                >
                                    <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                                        <FileText className="w-7 h-7 text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">Resume Analyzer</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        Get AI-powered insights on your resume to correct mistakes and clear the ATS.
                                    </p>
                                </motion.button>

                                {/* Community Review Card */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveFeature("community")}
                                    className="group p-8 text-left rounded-3xl bg-white/5 border border-white/10 hover:border-pink-500/30 hover:bg-white/[0.07] transition-all duration-300 shadow-xl shadow-black/20"
                                >
                                    <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-500/30 transition-colors">
                                        <Users className="w-7 h-7 text-pink-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-pink-300 transition-colors">Community Review</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        Connect with peers and mentors for honest feedback on your career materials.
                                    </p>
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="feature"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            <button
                                onClick={() => setActiveFeature("hub")}
                                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group"
                            >
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                                    <ArrowLeft className="w-5 h-5" />
                                </div>
                                <span className="font-medium">Back to Dashboard</span>
                            </button>

                            {activeFeature === "jobs" && <JobListing />}
                            {activeFeature === "resume" && <ResumeAnalyzer />}
                            {activeFeature === "community" && <CommunityReview />}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
