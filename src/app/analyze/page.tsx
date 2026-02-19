"use client";
import { useState } from "react";

export default function ResumeAnalyzerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [activeTab, setActiveTab] = useState<"analyze-jd" | "ats-score" | "cover-letter">("analyze-jd");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

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
        <div className="min-h-screen bg-[#0a0a0a] text-gray-200 py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black text-white tracking-tight">AI Resume Workshop</h1>
                    <p className="text-gray-400">Optimize your resume, check ATS compatibility, or generate a cover letter instantly.</p>
                </div>

                {/* Control Panel */}
                <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 shadow-xl">

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6 p-1 bg-[#0a0a0a] rounded-lg border border-gray-800 w-fit">
                        {[
                            { id: "analyze-jd", label: "🎯 In-Depth Match" },
                            { id: "ats-score", label: "🤖 General ATS Score" },
                            { id: "cover-letter", label: "✍️ Auto Cover Letter" }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id as any); setResult(null); }}
                                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === tab.id ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-5">
                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Upload Resume (PDF)</label>
                            <input
                                type="file" accept=".pdf"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-purple-600/20 file:text-purple-400 hover:file:bg-purple-600/30 cursor-pointer border border-gray-800 rounded-md bg-[#0a0a0a]"
                            />
                        </div>

                        {/* Job Description (Hidden for ATS Score) */}
                        {activeTab !== "ats-score" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Target Job Description</label>
                                <textarea
                                    rows={5}
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste the job requirements here..."
                                    className="w-full p-3 bg-[#0a0a0a] border border-gray-800 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm text-gray-300 placeholder-gray-600 transition-all"
                                />
                            </div>
                        )}

                        <button
                            onClick={handleRun}
                            disabled={loading || !file}
                            className={`w-full py-3 rounded-md font-bold transition-all ${loading || !file ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                                }`}
                        >
                            {loading ? "Processing via AI..." : "Run Analysis"}
                        </button>
                    </div>
                </div>

                {/* RESULTS SECTION */}
                {result && (
                    <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* MODE 1: JD MATCH */}
                        {activeTab === "analyze-jd" && result.score !== undefined && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 border-b border-gray-800 pb-6">
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 text-3xl font-black ${result.score >= 80 ? 'border-green-500 text-green-400' : result.score >= 50 ? 'border-yellow-500 text-yellow-400' : 'border-red-500 text-red-400'}`}>
                                        {result.score}%
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-1">Match Analysis</h2>
                                        <p className="text-sm text-gray-400">{result.summary}</p>
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
                                        <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
                                            {result.improvements.map((tip: string, i: number) => <li key={i}>{tip}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* MODE 2: ATS SCORE */}
                        {activeTab === "ats-score" && result.atsScore !== undefined && (
                            <div className="space-y-6">
                                <div className="text-center border-b border-gray-800 pb-6">
                                    <div className="text-5xl font-black text-white mb-2">{result.atsScore}<span className="text-2xl text-gray-600">/100</span></div>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Overall ATS Strength</p>
                                </div>
                                <div className="bg-[#0a0a0a] p-4 rounded-md border border-gray-800">
                                    <h3 className="text-gray-200 font-bold mb-1">Format & Parsability</h3>
                                    <p className="text-sm text-gray-400">{result.formatFeedback}</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <h3 className="text-green-400 text-xs uppercase font-bold tracking-wider">Strengths</h3>
                                        <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">{result.strengths?.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-red-400 text-xs uppercase font-bold tracking-wider">Weaknesses</h3>
                                        <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">{result.weaknesses?.map((w: string, i: number) => <li key={i}>{w}</li>)}</ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MODE 3: COVER LETTER */}
                        {activeTab === "cover-letter" && result.coverLetter && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-purple-400 text-xs uppercase font-bold tracking-wider">Generated Cover Letter</h3>
                                    <button onClick={() => navigator.clipboard.writeText(result.coverLetter)} className="text-xs text-gray-400 hover:text-white border border-gray-700 px-3 py-1 rounded bg-[#0a0a0a]">Copy Text</button>
                                </div>
                                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6 text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {result.coverLetter}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}