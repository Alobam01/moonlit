import { NextResponse } from "next/server";
import { getImageKit } from "@/lib/imagekit";

export async function GET() {
  try {
    const imagekit = getImageKit();
    const authParams = imagekit.getAuthenticationParameters();

    return NextResponse.json({
      ...authParams,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return NextResponse.json({ error: "ImageKit not configured" }, { status: 500 });
  }
}


