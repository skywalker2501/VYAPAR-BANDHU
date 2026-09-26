const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://postgres:rahulgupta@7985#@db.cltilmvuvfznyjxarolv.supabase.co:5432/postgres';

const client = new Client({
    connectionString,
});

async function runSeed() {
    try {
        await client.connect();
        console.log("Connected to Supabase!");

        const sqlPath = path.join(__dirname, 'backend', 'src', 'main', 'resources', 'data.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Filter out the schema creation since Hibernate just did it, we only run the INSERTs.
        // Or just run it all, INSERT IGNORE or ON CONFLICT.
        console.log("Executing SQL...");
        await client.query(sql);

        console.log("Seeding complete!");
    } catch (err) {
        console.error("Error executing SQL:", err.message);
    } finally {
        await client.end();
    }
}

runSeed();
