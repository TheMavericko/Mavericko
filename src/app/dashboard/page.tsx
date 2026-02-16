"use client";

import Header from "@/components/Header";
import JobListing from "@/components/features/JobListing";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500/30">
            <Header />

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
                <JobListing />
            </main>
        </div>
    );
}
