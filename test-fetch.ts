import fs from 'fs';

async function run() {
  try {
    const formData = new FormData();
    const file = new Blob([fs.readFileSync('test-post.md')]);
    formData.append('spreadsheet', file, 'test-post.md');
    
    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData
    });
    
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text);
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
