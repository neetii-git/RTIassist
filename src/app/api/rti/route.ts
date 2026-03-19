import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: rtis, error } = await supabase
      .from("rtis")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      throw error;
    }

    return NextResponse.json(rtis);
  } catch (error: any) {
    console.error("Fetch RTI error:", error);
    return NextResponse.json({ error: "Failed to fetch RTI applications" }, { status: 500 });
  }
}
