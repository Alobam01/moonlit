import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import { sendInquiryEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, breed, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    // Save inquiry to database
    const { error } = await supabase.from("inquiries").insert({
      name,
      email,
      phone,
      breed_interest: breed || null,
      message,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
    }

    // Send email notification to admin (from environment variable)
    try {
      await sendInquiryEmail({
        name,
        email,
        phone: phone || undefined,
        breed: breed || undefined,
        message,
      });
      console.log("Email sent successfully to admin");
    } catch (emailError) {
      // Log email error but don't fail the request if database save succeeded
      console.error("Failed to send email notification:", emailError);
      // Log the error details for debugging
      if (emailError instanceof Error) {
        console.error("Email error details:", emailError.message);
      }
      // Continue - the inquiry was saved to the database
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}

