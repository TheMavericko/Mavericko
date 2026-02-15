"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, MapPin, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { Job } from "@/lib/googleSheets";

interface JobModalProps {
    job: Job | null;
    onClose: () => void;
}

export default function JobModal({ job, onClose }: JobModalProps) {
    if (!job) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    layoutId={`job-${job.role}-${job.company}`}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">{job.role}</h2>
                            <div className="flex items-center gap-2 text-neutral-400">
                                <Building2 className="w-4 h-4" />
                                <span>{job.company}</span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-2 text-sm text-neutral-400 mb-1">
                                    <MapPin className="w-4 h-4" />
                                    Location
                                </div>
                                <div className="text-white font-medium">{job.location}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-2 text-sm text-neutral-400 mb-1">
                                    <Calendar className="w-4 h-4" />
                                    Date Posted
                                </div>
                                <div className="text-white font-medium">{job.posted_date}</div>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-lg font-semibold text-white mb-4">Job Description</h3>
                            <div className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
                                {job.description || "No description provided."}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-xl mt-auto">
                        <a
                            href={job.apply_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
                        >
                            Apply Now
                            <ArrowUpRight className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
