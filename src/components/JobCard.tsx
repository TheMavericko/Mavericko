"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin, Building2, Clock } from "lucide-react";
import { Job } from "@/lib/googleSheets";

interface JobCardProps {
    job: Job;
    onViewDetails: (job: Job) => void;
}

export default function JobCard({ job, onViewDetails }: JobCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {job.role}
                    </h3>
                    <div className="flex items-center gap-2 text-neutral-400 mt-1">
                        <Building2 className="w-4 h-4" />
                        <span className="text-sm">{job.company}</span>
                    </div>
                </div>
                <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 text-neutral-400"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ArrowUpRight className="w-5 h-5" />
                </a>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <Clock className="w-4 h-4" />
                    <span>Posted: {job.posted_date}</span>
                </div>
            </div>

            <button
                onClick={() => onViewDetails(job)}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-all duration-300"
            >
                View Details
            </button>
        </motion.div>
    );
}
