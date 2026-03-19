import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = registerSchema.parse(body);

    // Step 2: Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        }
      }
    });

    if (authError) {
      // If user already exists, Supabase might not return an error but return a user with an empty identity
      // However, we should still handle the case where it DOES return an error
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Step 3: Add/Update users table (idempotent upsert)
    if (authData.user) {
      const { error: dbError } = await supabase.from("users").upsert({
        id: authData.user.id,
        email,
        name,
        created_at: new Date().toISOString(),
      }, { onConflict: 'id' });
      
      if (dbError) {
        console.error("Profile sync error:", dbError);
        // We don't necessarily want to fail registration if just the public profile upsert failed, 
        // but it's good to know.
      }
    }

    return NextResponse.json(
      { message: "Registration successful! If you cannot login, please check your email for a confirmation link (or disable email confirmation in Supabase Dashboard)." },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
