"use server";

import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function submitContact(formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
}) {
  try {
    await dbConnect();
    const contact = await Contact.create(formData);

    // Send Professional Confirmation Email
    try {
      const { resend } = await import("@/lib/resend");
      const { getContactTemplate } = await import("@/lib/mail-templates");
      
      await resend.emails.send({
        from: 'Verve Nova Technologies <hello@vervenovatech.com>',
        to: formData.email,
        subject: 'Project Inquiry Received // Verve Nova Technologies',
        html: getContactTemplate(formData.name),
      });
    } catch (mailError) {
      console.error("Mail Error (Non-blocking):", mailError);
    }

    return { success: true, data: JSON.parse(JSON.stringify(contact)) };
  } catch (error: any) {
    console.error("Database Error:", error);
    return { success: false, error: error.message };
  }
}
