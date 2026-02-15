import { NextResponse } from "next/server";
import { getJobs } from "@/lib/googleSheets";

export const dynamic = 'force-dynamic'; // Ensure not cached statically

export async function GET() {
    try {
        const jobs = await getJobs();
        return NextResponse.json({ jobs });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch jobs" },
            { status: 500 }
        );
    }
}
