"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Job } from "@/types/job";
import JobMatchButton from "./JobMatchButton";

interface JobCardProps {
    job: Job;
    onViewDetails: (job: Job) => void;
    resumeFile: File | null;
}

export default function JobCard({ job, onViewDetails, resumeFile }: JobCardProps) {
    return (
        <motion.tr
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="group border-b border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-200"
        >
            {/* Company */}
            <td className="py-4 px-6 align-middle">
                <div className="font-semibold text-white">{job.company}</div>
            </td>

            {/* Role (Clickable) */}
            <td className="py-4 px-6 align-middle">
                <button
                    onClick={() => onViewDetails(job)}
                    className="text-white hover:text-purple-400 font-medium text-left transition-colors"
                >
                    {job.role}
                </button>
            </td>

            {/* Location */}
            <td className="py-4 px-6 align-middle text-neutral-400 text-sm">
                {job.location}
            </td>

            {/* Posted Date */}
            <td className="py-4 px-6 align-middle text-neutral-400 text-sm">
                {job.posted_date}
            </td>

            {/* Action */}
            <td className="py-4 px-6 align-middle">
                <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-purple-900/20 transition-all hover:scale-105"
                    onClick={(e) => e.stopPropagation()}
                >
                    Apply
                    <ArrowUpRight className="w-3 h-3" />
                </a>
            </td>

            {/* AI Match */}
            <td className="py-4 px-6 align-middle">
                <JobMatchButton jobDescription={job.description} resumeFile={resumeFile} />
            </td>
        </motion.tr>
    );
}
