import { google } from "googleapis";
import path from "path";

// Placeholder for Spreadsheet ID - User needs to update this
const SPREADSHEET_ID = "13HcLxV7LgmP2QNu00mIhmhRtVoJ0_zozk_GcCFyL48w";

export interface Job {
    company: string;
    role: string;
    location: string;
    posted_date: string;
    job_date: string;
    description: string;
    apply_url: string;
}

export async function getJobs(): Promise<Job[]> {
    try {
        // Authenticate
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(process.cwd(), "service_account.json"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Fetch data from Sheet2
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: "Sheet2!A:Z", // Fetch all columns
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return [];
        }

        // Assume first row is headers, mapping based on column names logic or index if fixed?
        // User requested specific mapping by column name. 
        // "Company" -> company
        // "Job Title" -> role
        // "Location" -> location
        // "Job Posted" -> posted_date
        // "Job Date" -> job_date
        // "Job Description" -> description
        // "Apply Link" / "Apply Link(Linkedin)" -> apply_url

        const headers = rows[0].map(h => h.toString().trim().toLowerCase());

        // Helper to find index
        const getIndex = (name: string) => headers.indexOf(name.toLowerCase());

        const companyIdx = getIndex("Company");
        const roleIdx = getIndex("Job Title");
        const locationIdx = getIndex("Location");
        const postedDateIdx = getIndex("Job Posted");
        const jobDateIdx = getIndex("Job Date");
        const descriptionIdx = getIndex("Job Description");
        const applyLinkIdx = getIndex("Apply Link");
        const linkedinLinkIdx = getIndex("Apply Link(Linkedin)");

        const jobs: Job[] = [];

        // Skip header row
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row) continue;

            // Safe getter
            const getVal = (idx: number) => (idx >= 0 && row[idx]) ? row[idx].toString() : "";

            const applyDirect = getVal(applyLinkIdx);
            const applyLinkedin = getVal(linkedinLinkIdx);
            const finalApplyUrl = applyDirect || applyLinkedin;

            // Only add if there is at least a role or company to show
            if (getVal(roleIdx) || getVal(companyIdx)) {
                jobs.push({
                    company: getVal(companyIdx),
                    role: getVal(roleIdx),
                    location: getVal(locationIdx),
                    posted_date: getVal(postedDateIdx),
                    job_date: getVal(jobDateIdx),
                    description: getVal(descriptionIdx),
                    apply_url: finalApplyUrl
                });
            }
        }

        return jobs;

    } catch (error) {
        console.error("Error fetching jobs from Google Sheets:", error);
        return [];
    }
}
