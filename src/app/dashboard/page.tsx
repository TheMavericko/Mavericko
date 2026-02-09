"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import JobModal from "@/components/JobModal";
import { Job } from "@/lib/googleSheets";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500/30">
            <Header />

            {/* Background Ambience matches Login/Home */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold tracking-tight mb-2"
                        >
                            Job Feed
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-neutral-400"
                        >
                            Curated opportunities just for you.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium">{jobs.length} Active Jobs</span>
                    </motion.div>
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
                        className="w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5 text-sm uppercase tracking-wider text-neutral-400">
                                        <th className="px-6 py-4 font-medium">Company</th>
                                        <th className="px-6 py-4 font-medium">Role</th>
                                        <th className="px-6 py-4 font-medium">Location</th>
                                        <th className="px-6 py-4 font-medium">Posted</th>
                                        <th className="px-6 py-4 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {jobs.map((job, index) => (
                                        <JobCard
                                            key={`${job.company}-${index}`}
                                            job={job}
                                            onViewDetails={setSelectedJob}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </main>

            {selectedJob && (
                <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    );
}
