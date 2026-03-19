const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GROQ_API_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

async function testMapping(complaint) {
  // We need to read the latest prompt from the file to test the 'live' logic
  const promptsPath = path.join(process.cwd(), 'src/lib/prompts.ts');
  const promptsContent = fs.readFileSync(promptsPath, 'utf8');
  const matchPromptRaw = promptsContent.match(/AUTHORITY_MATCHING_PROMPT = `([\s\S]*?)`;/)[1];
  const prompt = matchPromptRaw.replace("{{COMPLAINT}}", complaint);

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
  return JSON.parse(data.choices[0].message.content);
}

async function run() {
  const tc = "The street lights in my colony have not been working for a week.";
  console.log(`🔍 Testing: "${tc}"`);
  try {
    const res = await testMapping(tc);
    const authorities = ["PWD", "Municipal Corporation", "Revenue", "Health", "Education", "Police", "Food", "Electricity"];
    console.log(`✅ Result: ${authorities[res.authorityId - 1]}`);
    console.log(`💡 Logic: ${res.reasoning}`);
  } catch (e) {
    console.log(`❌ Failed: ${e.message}`);
  }
}

run();
