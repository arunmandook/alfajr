import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, condition, preferred_time, message, source } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const { error } = await supabase.rpc("submit_lead", {
      p_name: name.trim(),
      p_phone: phone.trim(),
      p_email: email?.trim() || null,
      p_condition: condition?.trim() || null,
      p_preferred_time: preferred_time?.trim() || null,
      p_message: message?.trim() || null,
      p_source: source || "website",
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
