const { Client } = require('pg');
const fs = require('fs');

// Read connection string from .env file
let connectionString = process.env.DATABASE_URL;

if (!connectionString && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const match = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
  if (match) {
    connectionString = match[1];
  }
}

if (!connectionString) {
  console.error("Error: DATABASE_URL not found in environment or .env file!");
  process.exit(1);
}

async function run() {
  console.log("Connecting to PostgreSQL database...");
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false } // Required for Supabase SSL connection
  });

  try {
    await client.connect();
    console.log("Connected successfully!");

    console.log("Adding column 'isNew' to 'products_v2' table if it doesn't exist...");
    const query = `
      ALTER TABLE "public"."products_v2" 
      ADD COLUMN IF NOT EXISTS "isNew" BOOLEAN DEFAULT FALSE;
    `;
    
    await client.query(query);
    console.log("Column 'isNew' has been successfully added/verified!");

  } catch (err) {
    console.error("Error executing query:", err.message);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
}

run();
