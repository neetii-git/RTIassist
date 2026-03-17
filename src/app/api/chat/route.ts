import { NextResponse } from 'next/server';
import { groq } from '@/lib/groq';

const CHAT_SYSTEM_PROMPT = `
You are 'Bharat Bot', a helpful and knowledgeable AI assistant for the Bharat RTI Portal. 
Your goal is to help Indian citizens understand the Right to Information (RTI) Act, 2005, and guide them on how to file RTIs for various grievances.

CRITICAL RULES:
1. Provide accurate information about the RTI Act.
2. If a user describes a problem, suggest which government department they should target.
3. Keep responses concise, supportive, and professional.
4. Support the language requested by the user. If they ask in Hindi, respond in Hindi.
5. Do NOT claim to be an official government representative. You are an AI assistant.
6. If the user wants to file an RTI, encourage them to use the "File New RTI" feature on the portal.
7. Whenever you suggest a government department or provide details about an authority, ALWAYS include their physical address, contact numbers, and email addresses if known or generally available, in the first response. Do not wait for the user to ask for contact information.

Current context:
- Bharat RTI Portal helps automate RTI drafting.
- It covers all 28 States and 8 Union Territories.
- It supports multilingual input/output (English, Hindi, Tamil, Kannada, Telugu).
`;

export async function POST(req: Request) {
  try {
    const { messages, language: langCode = 'en' } = await req.json();
    
    const langMap: Record<string, string> = {
      en: 'English',
      hi: 'Hindi',
      ta: 'Tamil',
      te: 'Telugu',
      kn: 'Kannada'
    };
    
    const language = langMap[langCode] || 'English';

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: `${CHAT_SYSTEM_PROMPT}\nYou should primarily respond in ${language}.` },
        ...messages
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const botMessage = response.choices[0]?.message?.content || "I apologize, but I'm having trouble processing your request right now.";

    return NextResponse.json({ message: botMessage });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to connect to AI engine." }, { status: 500 });
  }
}
