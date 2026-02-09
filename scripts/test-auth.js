const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Time Travel Hack: Patch global Date to subtract 1 year
const OriginalDate = Date;
// @ts-ignore
global.Date = class extends OriginalDate {
    constructor(...args) {
        if (args.length === 0) {
            super(OriginalDate.now() - 31536000000); // Subtract 1 year
        } else {
            super(...args);
        }
    }
    static now() {
        return OriginalDate.now() - 31536000000;
    }
};

async function testAuth() {
    try {
        const keyPath = path.join(process.cwd(), 'service_account.json');
        console.log('Reading key from:', keyPath);

        if (!fs.existsSync(keyPath)) {
            console.error('ERROR: service_account.json not found!');
            return;
        }

        const content = fs.readFileSync(keyPath, 'utf8');
        const credentials = JSON.parse(content);

        console.log('Project ID:', credentials.project_id);
        console.log('Client Email:', credentials.client_email);
        console.log('Private Key Length:', credentials.private_key ? credentials.private_key.length : 'MISSING');

        // Check for literal \n
        if (credentials.private_key && credentials.private_key.includes('\\n')) {
            console.log('WARNING: Private key contains literal "\\n" characters. Attempting to fix...');
            credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
        }

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const client = await auth.getClient();
        console.log('Auth Client created successfully.');

        const token = await client.getAccessToken();
        console.log('Access Token obtained:', token.token ? 'YES' : 'NO');

    } catch (error) {
        console.error('AUTH FAILED:');
        console.error(error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

testAuth();
