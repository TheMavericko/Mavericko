"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import JobModal from "@/components/JobModal";
import { Job } from "@/types/job";
import { motion } from "framer-motion";

export default function JobListing() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const filteredJobs = jobs.filter(job =>
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch("/api/jobs");
                const data = await res.json();
                if (data.jobs) {
                    setJobs(data.jobs);
                }
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <>
            <div className="flex flex-col gap-8 mb-12">
                {/* Master Resume Upload Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group"
                >
                    <div className="relative z-10 w-full md:w-auto">
                        <h1 className="text-2xl font-bold mb-1 text-white">Master Resume Upload</h1>
                        <p className="text-neutral-400 text-sm max-w-md">
                            Upload once to instantly match with all jobs below.
                        </p>
                    </div>

                    <div className="relative z-10 w-full md:w-auto bg-black/20 p-2 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                            className="block w-full text-sm text-neutral-300
                            file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                            file:text-sm file:font-semibold file:bg-purple-600 file:text-white
                            hover:file:bg-purple-500 cursor-pointer transition-colors"
                        />
                        {resumeFile && (
                            <div className="absolute top-full mt-2 right-0 text-green-400 text-xs flex items-center gap-1">
                                ✓ Ready: {resumeFile.name}
                            </div>
                        )}
                    </div>
                </motion.div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-bold tracking-tight mb-1"
                        >
                            Available Positions
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-neutral-400 text-sm"
                        >
                            Browse opportunities tailored to your skills.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium text-white">{jobs.length} Active Jobs</span>
                    </motion.div>
                </div>
            </div>

            {loading ? (
                // Loading Skeleton for Table
                <div className="w-full bg-white/5 rounded-2xl border border-white/10 overflow-hidden animate-pulse">
                    <div className="h-12 border-b border-white/10 bg-white/5" />
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-16 border-b border-white/10" />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    {/* Search Input */}
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Search by Role, Company, or City..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-4 pl-6 bg-white/10 backdrop-blur-md rounded-2xl text-white placeholder:text-neutral-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-neutral-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Jobs Table */}
                    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5 text-sm uppercase tracking-wider text-neutral-400">
                                        <th className="px-6 py-4 font-medium">Company</th>
                                        <th className="px-6 py-4 font-medium">Role</th>
                                        <th className="px-6 py-4 font-medium">Location</th>
                                        <th className="px-6 py-4 font-medium">Posted</th>
                                        <th className="px-6 py-4 font-medium">Action</th>
                                        <th className="px-6 py-4 font-medium">AI Match</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredJobs.length > 0 ? (
                                        filteredJobs.map((job, index) => (
                                            <JobCard
                                                key={`${job.company}-${index}`}
                                                job={job}
                                                onViewDetails={setSelectedJob}
                                                resumeFile={resumeFile}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                                                No jobs found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            )}

            {selectedJob && (
                <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </>
    );
}
