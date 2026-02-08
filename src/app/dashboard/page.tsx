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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job, index) => (
                            <JobCard
                                key={`${job.company}-${index}`}
                                job={job}
                                onViewDetails={setSelectedJob}
                            />
                        ))}
                    </div>
                )}
            </main>

            {selectedJob && (
                <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    );
}
