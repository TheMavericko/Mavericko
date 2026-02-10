import { google } from "googleapis";
import path from "path";
import fs from "fs";

// Placeholder for Spreadsheet ID - User needs to update this
// Note: User provided ID in previous step, so we should keep it or update it if they changed it.
// Assuming the ID from the file view is correct: 13HcLxV7LgmP2QNu00mIhmhRtVoJ0_zozk_GcCFyL48w
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
        const filePath = path.join(process.cwd(), "service_account.json");

        // Explicitly read and parse the file to ensure control over private_key formatting
        if (!fs.existsSync(filePath)) {
            console.error("Service account file not found at:", filePath);
            return [];
        }

        const fileContent = fs.readFileSync(filePath, "utf-8");
        const credentials = JSON.parse(fileContent);

        // Robust newline handling: replace literal "\\n" with actual "\n" just in case, 
        // though JSON.parse usually handles standard escaping.
        // Also checks if private_key is present.
        if (!credentials.private_key) {
            console.error("Missing private_key in service_account.json");
            return [];
        }

        // Authenticate
        const auth = new google.auth.GoogleAuth({
            credentials,
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

        const headers = rows[0].map((h: any) => h.toString().trim().toLowerCase());

        // Helper to find index
        const getIndex = (name: string) => headers.indexOf(name.toLowerCase());

        const companyIdx = getIndex("Company");
        const roleIdx = getIndex("Job Title");
        const locationIdx = getIndex("Location");
        const jobDateIdx = getIndex("Job Date");
        const dateIdx = getIndex("Date");
        const descriptionIdx = getIndex("Job Description");
        const applyLinkIdx = getIndex("Apply Link");
        const linkedinLinkIdx = getIndex("Apply Link (LinkedIn)");

        const jobs: Job[] = [];

        // Skip header row
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row) continue;

            // Safe getter
            const getVal = (idx: number) => (idx >= 0 && row[idx]) ? row[idx].toString() : "";

            const rawDirect = getVal(applyLinkIdx);
            const rawLinkedin = getVal(linkedinLinkIdx);

            // Identify "Dirty" Ad Links.
            const isAdLink = (url: string) => {
                if (!url) return false;
                const lower = url.toLowerCase();
                return lower.includes("doubleclick") ||
                    lower.includes("googleadservices") ||
                    lower.includes("ad.atdmt");
            };

            let finalApplyUrl = "#";

            // PRIORITY LOGIC:
            // If the Direct Link is CLEAN, use it.
            if (rawDirect && rawDirect.trim().length > 0 && !isAdLink(rawDirect)) {
                finalApplyUrl = rawDirect;
            }
            // If Direct Link is DIRTY (or empty), check LinkedIn.
            else if (rawLinkedin && rawLinkedin.trim().length > 0) {
                finalApplyUrl = rawLinkedin;
            }
            // Last Resort: If LinkedIn is ALSO empty, use the dirty link (better than nothing).
            else if (rawDirect && rawDirect.trim().length > 0) {
                finalApplyUrl = rawDirect;
            }

            // Prioritize "Job Date", then "Date", then "Job Posted"
            const finalPostedDate = getVal(jobDateIdx) || getVal(dateIdx);

            // Only add if there is at least a role or company to show
            if (getVal(roleIdx) || getVal(companyIdx)) {
                jobs.push({
                    company: getVal(companyIdx),
                    role: getVal(roleIdx),
                    location: getVal(locationIdx),
                    posted_date: finalPostedDate,
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
