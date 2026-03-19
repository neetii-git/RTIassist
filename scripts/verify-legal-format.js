const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GROQ_API_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

async function testDraft(complaint) {
  const promptsPath = path.join(process.cwd(), 'src/lib/prompts.ts');
  const promptsContent = fs.readFileSync(promptsPath, 'utf8');
  
  // Extract prompts
  const systemPrompt = promptsContent.match(/export const RTI_SYSTEM_PROMPT = `([\s\S]*?)`;/)[1];
  const genPromptRaw = promptsContent.match(/export const getRtiGenerationPrompt = \([\s\S]*? => `([\s\S]*?)`;/)[1];
  
  const userPrompt = genPromptRaw
    .replace("${state || \"Central Government\"}", "Karnataka")
    .replace("${authorityName}", "Municipal Corporation")
    .replace("${pio}", "Public Information Officer")
    .replace("${complaint}", complaint)
    .replace("${language}", "English");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

async function run() {
  const tc = "The street lights in my colony have been broken for 3 weeks.";
  console.log(`🔍 Generating Draft for: "${tc}"\n`);
  try {
    const draft = await testDraft(tc);
    console.log("--- GENERATED DRAFT ---");
    console.log(draft);
    console.log("-----------------------");
  } catch (e) {
    console.log(`❌ Failed: ${e.message}`);
  }
}

run();
