"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle, X, Loader2, Sparkles, ArrowRight } from "lucide-react";

interface AnalysisResult {
    score: number;
    matchingSkills: string[];
    missingSkills: string[];
    summary: string;
}

export default function ResumeAnalyzer() {
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (selectedFile: File) => {
        if (selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setResult(null);
            setError(null);
        } else {
            alert("Please upload a PDF file.");
        }
    };


    const handleAnalyze = async () => {
        if (!file || !jobDescription) return;

        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("jobDescription", jobDescription);

            const response = await fetch("/api/analyze-resume", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Analysis failed");
            }

            const data: AnalysisResult = await response.json();
            setResult(data);
        } catch (err: any) {
            console.error("Analysis Error:", err);
            setError(err.message || "An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setResult(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-400";
        if (score >= 60) return "text-yellow-400";
        return "text-red-400";
    };

    const getScoreBorderColor = (score: number) => {
        if (score >= 80) return "border-green-400/50";
        if (score >= 60) return "border-yellow-400/50";
        return "border-red-400/50";
    };

    return (
        <section className="w-full py-12 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4 tracking-tight">
                    Resume Matcher
                </h2>
                <p className="text-neutral-400 max-w-2xl mx-auto">
                    Upload your resume and the job description to get an instant AI match analysis.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                {/* Column 1: Inputs */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    {/* File Upload Area */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => !file && fileInputRef.current?.click()}
                        className={`
                            relative group border-2 border-dashed rounded-3xl p-8 transition-all duration-300 cursor-pointer
                            flex flex-col items-center justify-center text-center min-h-[250px]
                            ${isDragging
                                ? "border-purple-500 bg-purple-500/10"
                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                            }
                            ${file ? "border-purple-500/50 bg-purple-900/10" : ""}
                        `}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf"
                            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                        />

                        <AnimatePresence mode="wait">
                            {file ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="relative z-10 w-full"
                                >
                                    <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <p className="text-lg font-medium text-white mb-1 truncate px-4">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-neutral-400 mb-4">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile();
                                        }}
                                        className="text-sm text-red-400 hover:text-red-300 flex items-center justify-center gap-1 mx-auto transition-colors z-20 relative"
                                    >
                                        <X size={14} /> Remove File
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="relative z-10"
                                >
                                    <div className="mx-auto w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="w-8 h-8 text-neutral-400 group-hover:text-purple-400 transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Upload Resume
                                    </h3>
                                    <p className="text-neutral-400 text-sm max-w-[200px] mx-auto">
                                        Drag & drop your PDF here, or click to browse
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Job Description Input */}
                    <div className="relative">
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the Job Description here..."
                            className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none transition-all duration-300"
                        />
                        <div className="absolute bottom-4 right-4 text-xs text-neutral-600">
                            {jobDescription.length} chars
                        </div>
                    </div>

                    {/* Analyze Button */}
                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !file || !jobDescription}
                        className={`
                            w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
                            ${loading || !file || !jobDescription
                                ? "bg-white/5 text-neutral-500 cursor-not-allowed"
                                : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_30px_rgba(138,43,226,0.3)] hover:scale-[1.02]"
                            }
                        `}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" /> Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" /> Analyze Match
                            </>
                        )}
                    </button>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}
                </motion.div>

                {/* Column 2: Results */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="h-full min-h-[500px] bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                            >
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                                    <Sparkles className="absolute inset-0 m-auto text-purple-400 w-8 h-8 animate-pulse" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Analyzing Resume...</h3>
                                <p className="text-neutral-400 text-sm">Comparing skills, experience, and keywords...</p>
                            </motion.div>
                        ) : result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="h-full flex flex-col"
                            >
                                <div className="text-center mb-8">
                                    <div className={`
                                        inline-flex items-center justify-center w-32 h-32 rounded-full border-8 mb-4 shadow-2xl
                                        ${getScoreBorderColor(result.score)} bg-black/20 backdrop-blur-xl
                                    `}>
                                        <span className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                                            {result.score}%
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1">Match Score</h3>
                                    <p className={`text-sm font-medium ${getScoreColor(result.score)}`}>
                                        {result.score >= 80 ? "Excellent Match!" : result.score >= 60 ? "Good Potential" : "Needs Improvement"}
                                    </p>
                                </div>

                                <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                                    <p className="text-neutral-300 text-sm leading-relaxed">
                                        "{result.summary}"
                                    </p>
                                </div>

                                <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                                    {/* Matching Skills */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <h4 className="text-lg font-semibold text-white">Matching Skills</h4>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {result.matchingSkills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Missing Skills */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <AlertCircle className="w-5 h-5 text-red-400" />
                                            <h4 className="text-lg font-semibold text-white">Missing Skills</h4>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {result.missingSkills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                    <Sparkles className="w-10 h-10 text-neutral-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Ready to Analyze</h3>
                                <p className="text-neutral-400 max-w-xs">
                                    Upload your resume and paste the job description to see how well you match.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
