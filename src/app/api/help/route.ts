import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { queryAuthority } from "@/lib/services/vector-store";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || message.length < 3) {
      return NextResponse.json({ error: "Message too short" }, { status: 400 });
    }

    // Step 1: Search Knowledge Base (RAG)
    // For now, we reuse queryAuthority but this would ideally point to a 'Legal Docs' index
    const vectorResult = await queryAuthority(message);
    const context = vectorResult?.metadata ? 
      `CONTEXT: This is likely related to ${vectorResult.metadata.name}. REASONING: ${vectorResult.metadata.pio}` : 
      "CONTEXT: General RTI inquiry.";

    // Step 2: Answer with Groq
    const response = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: `You are an expert RTI Help Bot. Answer the user's question about RTI laws and procedures in India.
          ${context}
          Provide concise, accurate, and helpful legal advice. Never give actual legal guarantees.` 
        },
        { role: "user", content: message },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.5,
    });

    const reply = response.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Help Bot Error:", error);
    return NextResponse.json({ error: "Failed to fetch help" }, { status: 500 });
  }
}
