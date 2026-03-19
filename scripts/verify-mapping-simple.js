const fs = require('fs');
const path = require('path');

// Extract API Key from .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GROQ_API_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

if (!apiKey) {
  console.error("❌ GROQ_API_KEY not found in .env.local");
  process.exit(1);
}

const AUTHORITIES = [
  "Public Works Department (PWD)", "Municipal Corporation", "Revenue Department",
  "Health & Family Welfare", "Education Department", "Police Department",
  "Food & Civil Supplies", "Electricity Board / DISCOM"
];

const testCases = [
  "The road in front of my house has a huge pothole causing accidents.",
  "Garbage hasn't been collected from our street for over a week.",
  "I need my land title deed for rural property verification.",
  "My daughter didn't receive her state scholarship for the 2023 session.",
  "There's a gas leak near the main market area."
];

async function testMapping(complaint) {
  const prompt = `Match this complaint to an authority ID (1-8).
1. PWD (Roads)
2. Municipal (Garbage/Sanitation)
3. Revenue (Land)
4. Health
5. Education
6. Police
7. Food (Ration)
8. Electricity

Complaint: "${complaint}"
Output JSON: {"id": number, "reason": "string"}`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    })
  });

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);
  return { ...result, authority: AUTHORITIES[result.id - 1] };
}

async function run() {
  console.log("🔍 Verifying RTIAssist Semantic Matching Logic...\n");
  for (const tc of testCases) {
    console.log(`Input: "${tc}"`);
    try {
      const res = await testMapping(tc);
      console.log(`✅ Result: ${res.authority}`);
      console.log(`💡 Logic: ${res.reason}`);
      console.log("--------------------------------------------------\n");
    } catch (e) {
      console.log(`❌ Failed: ${e.message}`);
    }
  }
}

run();
