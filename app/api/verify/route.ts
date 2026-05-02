import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import VerveApplication from "@/models/Application";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

  try {
    await dbConnect();
    
    // Find the application that contains this verification ID in its documents array
    const app = await VerveApplication.findOne({
      "documents.verificationId": id.trim()
    }).populate('userId', 'name email vn_id');

    if (!app) {
      return NextResponse.json({ success: false, error: "Record not found" }, { status: 404 });
    }

    const doc = app.documents.find((d: any) => d.verificationId === id.trim());

    return NextResponse.json({
      success: true,
      data: {
        candidateName: app.userId.name,
        vnId: app.userId.vn_id,
        verificationId: doc.verificationId,
        issuedAt: doc.issuedAt,
        type: doc.type,
        domain: doc.metadata?.domain || "Web Development",
        metadata: doc.metadata
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
