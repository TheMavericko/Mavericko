"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisResult {
    // Mode 1: Job Match
    score?: number;
    matchingSkills?: string[];
    missingSkills?: string[];
    summary?: string;
    improvements?: string[];

    // Mode 2: ATS Score
    atsScore?: number;
    formatFeedback?: string;
    strengths?: string[];
    weaknesses?: string[];

    // Mode 3: Cover Letter
    coverLetter?: string;
}

export default function ResumeAnalyzer() {
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [activeTab, setActiveTab] = useState<"analyze-jd" | "ats-score" | "cover-letter">("analyze-jd");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const handleRun = async () => {
        if (!file) return alert("Please upload a resume.");
        if (activeTab !== "ats-score" && !jobDescription) return alert("Please enter a job description for this mode.");

        setLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("jobDescription", jobDescription);
        formData.append("action", activeTab);

        try {
            const response = await fetch("/api/analyze-resume", { method: "POST", body: formData });
            const data = await response.json();
            if (data.error) alert(data.error);
            else setResult(data);
        } catch (e) {
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-8">

            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-white mb-2">AI Resume Workshop</h1>
                <p className="text-neutral-400">Optimize your resume, check ATS compatibility, or generate a cover letter instantly.</p>
            </div>

            {/* Control Panel */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50" />

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-black/40 rounded-xl border border-white/5 w-fit mx-auto">
                    {[
                        { id: "analyze-jd", label: "🎯 In-Depth Match" },
                        { id: "ats-score", label: "🤖 General ATS Score" },
                        { id: "cover-letter", label: "✍️ Auto Cover Letter" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id as any); setResult(null); }}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${activeTab === tab.id
                                ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20"
                                : "text-neutral-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    {/* File Upload */}
                    <div className="relative group">
                        <label className="block text-sm font-medium text-neutral-300 mb-2 ml-1 cursor-pointer">Upload Resume (PDF)</label>
                        <div className="relative overflow-hidden rounded-xl bg-black/20 border border-white/10 focus-within:border-purple-500/50 transition-colors">
                            <input
                                type="file" accept=".pdf"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="block w-full text-sm text-neutral-400 
                                file:mr-4 file:py-4 file:px-6 file:border-0 
                                file:text-sm file:font-semibold file:bg-white/5 file:text-purple-400
                                hover:file:bg-white/10 file:cursor-pointer cursor-pointer transition-colors
                                focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Job Description (Hidden for ATS Score) */}
                    {activeTab !== "ats-score" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <label className="block text-sm font-medium text-neutral-300 mb-2 ml-1">Target Job Description</label>
                            <textarea
                                rows={6}
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the full job description here..."
                                className="w-full p-4 bg-black/20 border border-white/10 rounded-xl focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 outline-none text-sm text-neutral-200 placeholder-neutral-600 transition-all resize-y min-h-[120px]"
                            />
                        </motion.div>
                    )}

                    <button
                        onClick={handleRun}
                        disabled={loading || !file}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2
                            ${loading || !file
                                ? "bg-white/5 text-neutral-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/30 hover:scale-[1.01] hover:shadow-purple-900/50 cursor-pointer"
                            }`}
                    >
                        {loading ? "Processing via AI..." :
                            activeTab === "ats-score" ? "Generate ATS Score" :
                                activeTab === "cover-letter" ? "Generate Cover Letter" :
                                    "Run Match Analysis"}
                    </button>
                </div>
            </div>

            {/* RESULTS SECTION */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl"
                    >

                        {/* MODE 1: JD MATCH */}
                        {activeTab === "analyze-jd" && result.score !== undefined && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 border-b border-white/10 pb-6">
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 text-3xl font-bold ${result.score >= 80 ? 'border-green-500 text-green-400' : result.score >= 50 ? 'border-yellow-500 text-yellow-400' : 'border-red-500 text-red-400'}`}>
                                        {result.score}%
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-1">Match Analysis</h2>
                                        <p className="text-sm text-neutral-400">{result.summary}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <h3 className="text-red-400 text-xs uppercase font-bold tracking-wider">Missing Skills</h3>
                                        <div className="flex flex-wrap gap-2">{result.missingSkills?.map((s: string, i: number) => <span key={i} className="px-2 py-1 bg-red-900/20 text-red-300 text-xs rounded border border-red-900/30">{s}</span>)}</div>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-green-400 text-xs uppercase font-bold tracking-wider">Matching Skills</h3>
                                        <div className="flex flex-wrap gap-2">{result.matchingSkills?.map((s: string, i: number) => <span key={i} className="px-2 py-1 bg-green-900/20 text-green-300 text-xs rounded border border-green-900/30">{s}</span>)}</div>
                                    </div>
                                </div>

                                {result.improvements && (
                                    <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-5">
                                        <h3 className="text-purple-400 text-xs uppercase font-bold tracking-wider mb-3">AI Improvement Tips</h3>
                                        <ul className="space-y-2 text-sm text-neutral-300 list-disc list-inside">
                                            {result.improvements.map((tip: string, i: number) => <li key={i}>{tip}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* MODE 2: ATS SCORE */}
                        {activeTab === "ats-score" && result.atsScore !== undefined && (
                            <div className="space-y-6">
                                <div className="text-center border-b border-white/10 pb-6">
                                    <div className="text-5xl font-bold text-white mb-2">{result.atsScore}<span className="text-2xl text-neutral-600">/100</span></div>
                                    <p className="text-sm text-neutral-400 uppercase tracking-widest font-bold">Overall ATS Strength</p>
                                </div>
                                <div className="bg-black/20 p-4 rounded-md border border-white/10">
                                    <h3 className="text-neutral-200 font-bold mb-1">Format & Parsability</h3>
                                    <p className="text-sm text-neutral-400">{result.formatFeedback}</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <h3 className="text-green-400 text-xs uppercase font-bold tracking-wider">Strengths</h3>
                                        <ul className="text-sm text-neutral-300 space-y-1 list-disc list-inside">{result.strengths?.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-red-400 text-xs uppercase font-bold tracking-wider">Weaknesses</h3>
                                        <ul className="text-sm text-neutral-300 space-y-1 list-disc list-inside">{result.weaknesses?.map((w: string, i: number) => <li key={i}>{w}</li>)}</ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MODE 3: COVER LETTER */}
                        {activeTab === "cover-letter" && result.coverLetter && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-purple-400 text-xs uppercase font-bold tracking-wider">Generated Cover Letter</h3>
                                    <button onClick={() => navigator.clipboard.writeText(result.coverLetter!)} className="text-xs text-neutral-400 hover:text-white border border-white/10 px-3 py-1 rounded bg-black/20 cursor-pointer">Copy Text</button>
                                </div>
                                <div className="bg-black/20 border border-white/10 rounded-lg p-6 text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
                                    {result.coverLetter}
                                </div>
                            </div>
                        )}

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
