"use client";
import { useState } from "react";

interface Props {
    jobDescription: string;
    resumeFile: File | null;
}

export default function JobMatchButton({ jobDescription, resumeFile }: Props) {
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {
        if (!resumeFile) return alert("Please upload your Master Resume at the top first!");

        setLoading(true);
        const formData = new FormData();
        formData.append("file", resumeFile);
        formData.append("jobDescription", jobDescription);

        try {
            const response = await fetch("/api/analyze-resume", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.score !== undefined) setScore(data.score);
        } catch (e) {
            alert("Error connecting to AI.");
        } finally {
            setLoading(false);
        }
    };

    // 1. RESULT BADGE (Dark Mode)
    if (score !== null) {
        let colorClass = "bg-red-900/20 text-red-400 border-red-500/30";
        if (score >= 50) colorClass = "bg-yellow-900/20 text-yellow-400 border-yellow-500/30";
        if (score >= 80) colorClass = "bg-green-900/20 text-green-400 border-green-500/30";

        return (
            <div className={`px-3 py-1 rounded-md text-xs font-bold border ${colorClass} inline-flex items-center justify-center min-w-[70px]`}>
                {score}%
            </div>
        );
    }

    // 2. LOADING
    if (loading) return <span className="text-gray-500 text-xs animate-pulse">Scanning...</span>;

    // 3. BUTTON (Dark Mode)
    return (
        <button
            onClick={handleCheck}
            disabled={!resumeFile}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-all ${resumeFile
                ? "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20 cursor-pointer"
                : "bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed"
                }`}
        >
            {resumeFile ? "Check Match" : "Upload Above"}
        </button>
    );
}
