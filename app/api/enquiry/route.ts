import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { AppointmentFormValues } from "@/components/forms/AppointmentForm";

export async function POST(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  let body: AppointmentFormValues;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, phone, email, service, date, time, message } = body;

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 422 });
  }

  const { error } = await supabase.from("Patient_Master").insert({
    name:             name.trim(),
    phone:            phone.trim(),
    email:            email?.trim() || null,
    service:          service || null,
    appointment_date: date || null,
    appointment_time: time || null,
    message:          message?.trim() || null,
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json({ error: "Failed to save enquiry" }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
