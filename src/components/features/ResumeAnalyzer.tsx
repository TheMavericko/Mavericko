"use client";

import { motion } from "framer-motion";

export default function ResumeAnalyzer() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl max-w-lg w-full"
            >
                <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Resume Analyzer</h2>
                <p className="text-neutral-400 mb-6">
                    AI-powered resume scoring and optimization is coming soon. Get ready to boost your interview chances.
                </p>
                <div className="inline-flex items-center justify-center px-4 py-2 border border-purple-500/30 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium">
                    Coming Soon
                </div>
            </motion.div>
        </div>
    );
}
