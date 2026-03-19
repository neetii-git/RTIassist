import { groq } from "@/lib/groq";
import { AUTHORITY_MATCHING_PROMPT, RTI_SYSTEM_PROMPT, getRtiGenerationPrompt, METADATA_EXTRACTION_PROMPT } from "@/lib/prompts";
import { authorities } from "@/lib/authorities";
import { Authority, MatchResult } from "@/types/rti";
import { queryAuthority } from "./vector-store";

export async function matchAuthority(complaint: string): Promise<MatchResult> {
  // Step 1: Semantic Vector Search using Pinecone (RAG)
  const vectorResult = await queryAuthority(complaint);
  
  // Step 2: Use Groq to confirm and provide reasoning
  const matchedAuth = vectorResult?.metadata as any;
  const authorityName = matchedAuth?.name || "Municipal Corporation";

  const matchingResponse = await groq.chat.completions.create({
    messages: [
      { role: "system", content: AUTHORITY_MATCHING_PROMPT },
      { role: "user", content: `CITIZEN'S COMPLAINT: """${complaint}"""\nVECTOR MATCH: ${authorityName}` },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.1,
    response_format: { type: "json_object" },
  });

  const groqResult = JSON.parse(matchingResponse.choices[0]?.message?.content || "{}");
  
  return {
    authorityId: groqResult.authorityId || matchedAuth?.id || 2,
    confidence: groqResult.confidence || (vectorResult?.score ? Math.round(vectorResult.score * 100) : 85),
    reasoning: groqResult.reasoning || "Matched using semantic vector search."
  };
}

export async function generateRtiDraft(
  complaint: string, 
  authority: Authority, 
  language: string, 
  state: string,
  city: string | null = null,
  area: string | null = null
): Promise<string> {
  const draftPrompt = getRtiGenerationPrompt(
    complaint, 
    authority.name, 
    authority.pio, 
    language,
    state,
    city,
    area
  );

  const draftResponse = await groq.chat.completions.create({
    messages: [
      { role: "system", content: RTI_SYSTEM_PROMPT },
      { role: "user", content: draftPrompt },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
  });

  return draftResponse.choices[0]?.message?.content?.trim() || "Error generating draft.";
}

export async function extractMetadata(complaint: string): Promise<any> {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "Linguistic analyst for Indian civic legal context." },
      { role: "user", content: METADATA_EXTRACTION_PROMPT.replace("{{COMPLAINT}}", complaint) }
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.1,
    response_format: { type: "json_object" }
  });

  try {
    return JSON.parse(completion.choices[0]?.message?.content || "{}");
  } catch (err) {
    console.error("Failed to parse metadata:", err);
    return { state: null, city: null, area: null, grievance: null };
  }
}

export async function generateEvidenceChecklist(complaint: string, language: string): Promise<string[]> {
  const checklistPrompt = `
    Based on the following RTI grievance, generate a list of 4-6 specific documents or evidence items the citizen should attach to their application.
    GRIEVANCE: """${complaint}"""
    LANGUAGE: ${language}
    
    RESPOND ONLY WITH A JSON ARRAY OF STRINGS.
    Example: ["Photographs of the site", "Copy of previous complaint dated..."]
  `;

  const checklistResponse = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are a legal evidence assistant. Respond only with JSON arrays." },
      { role: "user", content: checklistPrompt },
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.2,
    response_format: { type: "json_object" },
  });

  try {
    const data = JSON.parse(checklistResponse.choices[0]?.message?.content || "{}");
    return Array.isArray(data) ? data : (data.checklist || data.documents || []);
  } catch (err) {
    console.error("Failed to parse evidence checklist:", err);
    return [];
  }
}

export async function translateLexicon(lexicon: any, targetLanguage: string): Promise<any> {
  const result: any = {};
  const entries = Object.entries(lexicon);
  
  // We chunk the lexicon by top-level keys (nav, hero, dashboard, etc.)
  // and translate them one by one to ensure we don't hit the model's output limit.
  for (const [key, value] of entries) {
    const prompt = `
      You are a professional translator specializing in Indian languages. 
      Translate the following JSON object containing UI strings for the "${key}" section from English to ${targetLanguage}.
      
      RULES:
      1. Keep all JSON keys exactly the same.
      2. Translate only the values.
      3. Maintain the professional yet accessible tone.
      4. If a value contains placeholders like {state} or {accent}, keep them exactly as they are.
      5. Return ONLY the translated JSON object.
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: `Professional translator for ${targetLanguage}.` },
        { role: "user", content: `${prompt}\n\nJSON to translate:\n${JSON.stringify(value)}` }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    try {
      result[key] = JSON.parse(completion.choices[0]?.message?.content || "{}");
    } catch (err) {
      console.error(`Failed to translate chunk [${key}]:`, err);
      result[key] = value; // Fallback to original English for this chunk
    }
  }

  return result;
}

export async function describeImage(base64Image: string): Promise<string> {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe the grievance or public issue shown in this image. What is broken or needs attention? Be brief but specific (e.g., 'A large pothole on a busy road', 'Garbage overflowing from a public bin')." },
          {
            type: "image_url",
            image_url: {
              url: base64Image.startsWith('data:') ? base64Image : `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    model: "llama-3.2-11b-vision-preview",
    temperature: 0.2,
    max_tokens: 300,
  });

  return response.choices[0]?.message?.content || "No issue detected in image.";
}
