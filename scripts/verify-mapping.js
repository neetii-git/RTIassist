const { Groq } = require("groq-sdk");
require("dotenv").config({ path: ".env.local" });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const AUTHORITY_MATCHING_PROMPT = `
You are an expert Indian Government Ombudsman. Your task is to match a citizen's complaint to the correct government authority.

### AUTHORITIES LIST:
1. Public Works Department (PWD): Roads, bridges, government buildings, civic infrastructure.
2. Municipal Corporation: Garbage, street lights, local water supply, sanitation, trade licenses.
3. Revenue Department: Land records, titles, caste/income certificates, property tax.
4. Health & Family Welfare: Hospitals, clinics, birth/death certificates, public health.
5. Education Department: Schools, scholarships, teacher records, mid-day meals.
6. Police Department: Law and order, FIR status, security, traffic.
7. Food & Civil Supplies: Ration cards, PDS shops, essential commodities.
8. Electricity Board / DISCOM: Power supply, high bills, meters, new connections.

### COMPLAINT:
"{{COMPLAINT}}"

### INSTRUCTIONS:
- Analyze the complaint's intent.
- Select the most relevant authority ID from the list.
- Provide a confidence score (0.0 to 1.0).
- Provide a concise reasoning for your choice.

### OUTPUT FORMAT (Strict JSON):
{
  "authorityId": number,
  "confidence": number,
  "reasoning": "string"
}
`;

const testCases = [
  "My street light has been broken for 3 weeks and it's dangerous at night.",
  "I applied for a ration card 6 months ago but haven't received it yet.",
  "The primary school in our village doesn't have a teacher since January.",
  "My electricity bill is 5 times higher than usual this month despite no extra usage.",
  "I need a certified copy of my land records for a bank loan."
];

async function verify() {
  console.log("🚀 Starting Authority Mapping Verification...\n");

  for (const complaint of testCases) {
    console.log(`📝 Complaint: "${complaint}"`);
    try {
      const prompt = AUTHORITY_MATCHING_PROMPT.replace("{{COMPLAINT}}", complaint);
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(completion.choices[0].message.content);
      const authorityNames = [
        "PWD", "Municipal Corporation", "Revenue Dept", "Health Dept", 
        "Education Dept", "Police Dept", "Food & Supplies", "Electricity Board"
      ];
      
      console.log(`✅ Mapped To: ${authorityNames[result.authorityId - 1]}`);
      console.log(`📊 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
      console.log(`💡 Reasoning: ${result.reasoning}`);
      console.log("-".repeat(50));
    } catch (err) {
      console.error(`❌ Error mapping "${complaint}":`, err.message);
    }
  }
}

verify();
