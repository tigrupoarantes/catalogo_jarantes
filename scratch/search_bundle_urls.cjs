const fs = require('fs');

const bundlePath = "./scratch/old_index_bundle.js";
const content = fs.readFileSync(bundlePath, 'utf8');

console.log("Searching for URL patterns or API calls in bundle...");

// Find any strings starting with http or https
const urls = content.match(/https?:\/\/[^\s"'`<>]+/g) || [];
console.log(`Found ${urls.length} raw URLs:`);
const uniqueUrls = [...new Set(urls)];
uniqueUrls.forEach(url => console.log(`- ${url}`));

// Find any Firestore, Supabase, Firebase, or external API references
const keywords = ["firebase", "firestore", "api", "products", "json", "db", "auth", "login"];
keywords.forEach(kw => {
  const count = (content.toLowerCase().match(new RegExp(kw, 'g')) || []).length;
  console.log(`Keyword "${kw}" count: ${count}`);
});
