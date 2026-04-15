"use server";

import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function submitContact(formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  try {
    await dbConnect();
    const contact = await Contact.create(formData);

    // Send Confirmation Email
    try {
      const { resend } = await import("@/lib/resend");
      const { getContactTemplate } = await import("@/lib/mail-templates");
      
      await resend.emails.send({
        from: 'Verve Nova <hello@vervenova.tech>',
        to: formData.email,
        subject: 'TRANSMISSION RECEIVED // VERVE NOVA',
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
