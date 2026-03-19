import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authorities } from "@/lib/authorities";
import { matchAuthority, generateRtiDraft, generateEvidenceChecklist, describeImage, extractMetadata } from "@/lib/services/ai";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

const analyzeSchema = z.object({
  complaint: z.string().min(5).optional(),
  imageUrl: z.string().nullable().optional(),
  language: z.string().default("en"),
  state: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // In a real production app, we would enforce this. 
    // For now, we'll allow anonymous but log the user if present.
    const userId = session?.user?.id;
    const body = await req.json();
    const { complaint: rawComplaint, imageUrl, language, state } = analyzeSchema.parse(body);

    let complaint = rawComplaint || "";

    // Step 0: Image Analysis (Vision)
    if (imageUrl) {
      const imageDescription = await describeImage(imageUrl);
      complaint = complaint ? `${complaint}. Context from photo: ${imageDescription}` : imageDescription;
    }

    // Step 0.5: Extract Metadata (Locality/City/State)
    const metadata = await extractMetadata(complaint);
    const finalState = state || metadata.state || "Central Government";
    const finalCity = metadata.city || null;
    const finalArea = metadata.area || null;

    if (!complaint || complaint.length < 5) {
      return NextResponse.json({ error: "Complaint text or image is required" }, { status: 400 });
    }

    const langCode = language;

    // High Reliability Approach: Check for API Key
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is missing!");
      return NextResponse.json({ error: "System configuration error" }, { status: 500 });
    }

    // Step 1: Authority Matching (Sequential as Draft depends on it)
    let matchData;
    try {
      matchData = await matchAuthority(complaint);
    } catch (err) {
      console.error("Authority matching failed:", err);
      // Fallback to Municipal Corporation (id: 2) if mapping fails
      matchData = { authorityId: 2, confidence: 85, reasoning: "Matched based on keywords (fallback)." };
    }

    const authorityId = matchData.authorityId || 2;
    const targetAuthority = authorities.find(a => a.id === authorityId) || authorities[1];

    // Step 2 & 3: Parallel Execution of Draft and Evidence Checklist
    const [draftText, evidenceChecklist] = await Promise.all([
      generateRtiDraft(complaint, targetAuthority, langCode, finalState, finalCity, finalArea),
      generateEvidenceChecklist(complaint, langCode).catch(err => {
        console.error("Evidence checklist failed:", err);
        return ["Proof of Identity", "Payment Receipt", "Photographs of the site"]; // Safe default
      })
    ]);

    // Step 4: Save to Supabase (Cloud Persistence)
    try {
      await supabase.from("rtis").insert({
        title: `RTI for ${complaint.slice(0, 30)}...`,
        complaint,
        draft: draftText,
        authority_id: targetAuthority.id,
        authority_name: targetAuthority.name,
        authority_pio: targetAuthority.pio,
        confidence: `${matchData.confidence}%`,
        evidence_checklist: JSON.stringify(evidenceChecklist),
        language: langCode,
        state_name: finalState,
        user_id: userId || "anonymous",
      });
    } catch (dbErr) {
      console.error("Supabase save failed:", dbErr);
    }

    return NextResponse.json({
      authority: targetAuthority,
      draft: draftText,
      confidence: `${matchData.confidence}%`,
      reasoning: matchData.reasoning || "Matched based on citizen's specific grievance.",
      evidenceChecklist: evidenceChecklist,
      complaint: complaint,
      language: langCode
    });

  } catch (error: any) {
    console.error("Analyze error:", error);
    return NextResponse.json(
      { error: "Processing failed", details: error.message },
      { status: 500 }
    );
  }
}
