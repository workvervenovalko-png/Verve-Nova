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
    return { success: true, data: JSON.parse(JSON.stringify(contact)) };
  } catch (error: any) {
    console.error("Database Error:", error);
    return { success: false, error: error.message };
  }
}
