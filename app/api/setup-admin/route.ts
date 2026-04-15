import { NextResponse } from "next/server";
import { setupAdmin } from "@/app/actions/auth";

export async function GET() {
  try {
    const result = await setupAdmin();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
