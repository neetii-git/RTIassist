import { NextResponse } from "next/server";
import { translateLexicon } from "@/lib/services/ai";

export async function POST(req: Request) {
  try {
    const { lexicon, targetLanguage } = await req.json();

    if (!lexicon || !targetLanguage) {
      return NextResponse.json({ error: "Missing lexicon or targetLanguage" }, { status: 400 });
    }

    const translatedLexicon = await translateLexicon(lexicon, targetLanguage);
    return NextResponse.json(translatedLexicon);
  } catch (error: any) {
    console.error("Translation API error:", error);
    return NextResponse.json({ 
      error: "Failed to translate lexicon",
      details: error.message 
    }, { status: 500 });
  }
}
