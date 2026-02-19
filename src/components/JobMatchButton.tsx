"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // <-- NEW IMPORT

interface Props {
    jobDescription: string;
    resumeFile: File | null;
}

export default function JobMatchButton({ jobDescription, resumeFile }: Props) {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Required for Next.js Portals to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when modal is open (optional but great UX)
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [showModal]);

    const handleCheck = async (e: React.MouseEvent) => {
        e.stopPropagation();
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

            if (data.score !== undefined) {
                setResult(data);
            } else {
                alert("Could not analyze. Try again.");
            }
        } catch (err) {
            alert("Error connecting to AI.");
        } finally {
            setLoading(false);
        }
    };

    // --- MODAL COMPONENT (Using Portal) ---
    const Modal = () => {
        if (!showModal) return null;

        return createPortal(
            <div
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                onClick={(e) => { e.stopPropagation(); setShowModal(false); }}
            >
                <div
                    className="bg-[#111111] border border-gray-800 rounded-xl w-full max-w-md shadow-2xl overflow-hidden relative cursor-default animate-in fade-in zoom-in duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                    >
                        ✕
                    </button>

                    <div className="p-6 space-y-5 max-h-[85vh] overflow-y-auto">
                        <div className="text-center border-b border-gray-800 pb-5">
                            <div className={`text-4xl font-black mb-2 ${result.score >= 80 ? "text-green-400" :
                                result.score >= 50 ? "text-yellow-400" : "text-red-400"
                                }`}>
                                {result.score}% Match
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">"{result.summary}"</p>
                        </div>

                        <div>
                            <h4 className="text-red-400 text-xs uppercase font-bold tracking-wider mb-3">❌ Missing Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {result.missingSkills?.length > 0 ? (
                                    result.missingSkills.map((skill: string, i: number) => (
                                        <span key={i} className="px-2.5 py-1 bg-red-900/20 text-red-300 text-xs rounded border border-red-900/30">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 text-xs italic">None! You hit all the keywords.</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-green-400 text-xs uppercase font-bold tracking-wider mb-3">✅ Matching Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {result.matchingSkills?.length > 0 ? (
                                    result.matchingSkills.map((skill: string, i: number) => (
                                        <span key={i} className="px-2.5 py-1 bg-green-900/20 text-green-300 text-xs rounded border border-green-900/30">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 text-xs italic">No direct matches found.</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            document.body // <-- This is the magic part that teleports it
        );
    };

    // --- RENDER ---
    if (result) {
        let colorClass = "bg-red-500/10 text-red-400 border-red-500/50 hover:bg-red-500/20";
        if (result.score >= 50) colorClass = "bg-yellow-500/10 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/20";
        if (result.score >= 80) colorClass = "bg-green-500/10 text-green-400 border-green-500/50 hover:bg-green-500/20";

        return (
            <>
                <button
                    onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                    className={`px-3 py-1 rounded border text-xs font-bold ${colorClass} inline-flex items-center justify-center min-w-[70px] cursor-pointer transition-colors`}
                >
                    {result.score}%
                </button>
                {mounted && <Modal />}
            </>
        );
    }

    if (loading) return <span className="text-gray-500 text-xs animate-pulse">Scanning...</span>;

    return (
        <button
            onClick={handleCheck}
            disabled={!resumeFile}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-all ${resumeFile
                ? "bg-purple-600/20 text-purple-300 border-purple-500/30 hover:bg-purple-600/30 cursor-pointer"
                : "bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed"
                }`}
        >
            {resumeFile ? "Check Match" : "Upload Above"}
        </button>
    );
}