import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import VerveApplication from "@/models/Application";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();

    const application = await VerveApplication.findById(id).select("links");

    if (!application || !application.links?.resumeContent) {
      return new NextResponse("Resume not found", { status: 404 });
    }

    const { resumeContent, resumeType, resumeUrl } = application.links;

    // Convert Base64 back to Buffer
    const base64Data = resumeContent.split(",")[1] || resumeContent;
    const buffer = Buffer.from(base64Data, "base64");

    const filename = resumeUrl || "resume.pdf";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": resumeType || "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error("Resume API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
