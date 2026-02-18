import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
// @ts-ignore
const PDFParser = require("pdf2json");

export const runtime = 'nodejs';

export async function POST(req: Request) {
    console.log("---- API HIT: Gemini 2.5 Flash (Fresh Bucket) ----");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "No API Key" }, { status: 500 });

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const jobDescription = formData.get("jobDescription") as string;

        if (!file || !jobDescription) {
            return NextResponse.json({ error: "Missing file or description" }, { status: 400 });
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

        console.log("🤖 Calling Gemini 2.5 Flash...");
        const genAI = new GoogleGenerativeAI(apiKey);

        // !!! USING THE FRESH MODEL BUCKET !!!
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      Act as a strict technical recruiter.
      Job Description: ${jobDescription}
      Resume: ${resumeText}
      
      Compare them. Return ONLY valid JSON (no markdown):
      {
        "score": number,
        "matchingSkills": ["skill1", "skill2"],
        "missingSkills": ["skill1", "skill2"],
        "summary": "Short verdict (max 2 sentences)"
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();

        console.log("✅ Analysis Complete!");
        return NextResponse.json(JSON.parse(text));

    } catch (error: any) {
        console.error("🔥 ERROR:", error);

        if (error.message.includes("429")) {
            // If this hits a 429, it means your ENTIRE account is locked, not just the model.
            return NextResponse.json({
                error: "Account Daily Limit Reached. Please try again tomorrow."
            }, { status: 429 });
        }
        return NextResponse.json({ error: "Analysis Failed", details: error.message }, { status: 500 });
    }
}