import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
// @ts-ignore
const PDFParser = require("pdf2json");

export const runtime = 'nodejs';

export async function POST(req: Request) {
    console.log("---- API HIT: Gemini 2.5 Flash (Multi-Mode Workshop) ----");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "No API Key" }, { status: 500 });

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const jobDescription = formData.get("jobDescription") as string || "";
        // NEW: Grab the action (defaults to analyze-jd so the Job Board doesn't break)
        const action = formData.get("action") as string || "analyze-jd";

        // Validation updated: ATS score doesn't need a job description
        if (!file) {
            return NextResponse.json({ error: "Missing file" }, { status: 400 });
        }
        if (action !== "ats-score" && !jobDescription) {
            return NextResponse.json({ error: "Missing job description" }, { status: 400 });
        }

        console.log("📄 Parsing PDF...");
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const resumeText = await new Promise((resolve, reject) => {
            const pdfParser = new PDFParser(null, 1);
            pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
            pdfParser.on("pdfParser_dataReady", () => resolve(pdfParser.getRawTextContent()));
            pdfParser.parseBuffer(buffer);
        });

        console.log(`🤖 Calling Gemini 2.5 Flash for action: [${action}]...`);
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        let prompt = "";

        // ---------------------------------------------------------
        // THE 3 MODES
        // ---------------------------------------------------------
        if (action === "analyze-jd") {
            prompt = `
            Act as a strict technical recruiter.
            Job Description: ${jobDescription}
            Resume: ${resumeText}
            
            Compare them. Return ONLY valid JSON (no markdown):
            {
              "score": number,
              "matchingSkills": ["skill1", "skill2"],
              "missingSkills": ["skill1", "skill2"],
              "summary": "Short verdict (max 2 sentences)",
              "improvements": ["Actionable fix 1", "Actionable fix 2"]
            }`;
        } else if (action === "ats-score") {
            prompt = `
            Act as an ATS (Applicant Tracking System) software. Analyze this resume globally.
            Resume: ${resumeText}
            
            Return ONLY valid JSON (no markdown):
            {
              "atsScore": number (0-100),
              "formatFeedback": "Feedback on parsability and structure",
              "strengths": ["Strong point 1", "Strong point 2"],
              "weaknesses": ["Weakness 1", "Weakness 2"]
            }`;
        } else if (action === "cover-letter") {
            prompt = `
            Write a highly professional, 3-paragraph cover letter based on this Resume and Job Description.
            Job: ${jobDescription}
            Resume: ${resumeText}
            
            Return ONLY valid JSON (no markdown):
            {
              "coverLetter": "The full cover letter text with line breaks\\n\\nLike this."
            }`;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();

        console.log("✅ Analysis Complete!");
        return NextResponse.json(JSON.parse(text));

    } catch (error: any) {
        console.error("🔥 ERROR:", error);

        if (error.message.includes("429")) {
            return NextResponse.json({
                error: "Account Daily Limit Reached. Please try again tomorrow."
            }, { status: 429 });
        }
        return NextResponse.json({ error: "Analysis Failed", details: error.message }, { status: 500 });
    }
}