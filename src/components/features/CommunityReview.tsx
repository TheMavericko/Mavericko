"use client";

import { motion } from "framer-motion";

export default function CommunityReview() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl max-w-lg w-full"
            >
                <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Community Review</h2>
                <p className="text-neutral-400 mb-6">
                    Get anonymous feedback on your resume and portfolio from top industry professionals and peers.
                </p>
                <div className="inline-flex items-center justify-center px-4 py-2 border border-indigo-500/30 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                    Coming Soon
                </div>
            </motion.div>
        </div>
    );
}
