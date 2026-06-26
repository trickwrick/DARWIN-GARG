"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type {
  ContactInquiry,
  ContactInquiryInput,
  ContactInquiryStatus,
} from "@/data/contactInquiry";
import { getContactPageContent } from "@/lib/contactPage";
import {
  addContactInquiry,
  deleteContactInquiry as removeContactInquiry,
  loadContactInquiries,
  updateContactInquiryStatus,
} from "@/lib/contactInquiryStorage";

function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function requireAdmin() {
  const session = (await cookies()).get("admin_session");
  if (session?.value !== "authenticated") {
    throw new Error("Unauthorized");
  }
}

async function resolveSubjectLabel(subject: string): Promise<string> {
  const content = await getContactPageContent();
  const match = content.form.options.find((option) => option.value === subject);
  return match?.label ?? subject;
}

export async function submitContactInquiry(
  input: ContactInquiryInput
): Promise<{ success: boolean; message: string }> {
  const name = sanitizeString(input.name, 120);
  const email = sanitizeString(input.email, 200);
  const subject = sanitizeString(input.subject, 80);
  const message = sanitizeString(input.message, 5000);

  if (!name || !email || !subject || !message) {
    return { success: false, message: "Please fill in all fields." };
  }

  if (!isValidEmail(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const subjectLabel = await resolveSubjectLabel(subject);

  const inquiry: ContactInquiry = {
    id: crypto.randomUUID(),
    name,
    email,
    subject,
    subjectLabel,
    message,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const result = await addContactInquiry(inquiry);
  if (result.success) {
    revalidatePath("/admin/queries");
    revalidatePath("/admin");
  }
  return result;
}

export async function getContactInquiriesForAdmin(): Promise<ContactInquiry[]> {
  await requireAdmin();
  return loadContactInquiries();
}

export async function setContactInquiryStatus(
  id: string,
  status: ContactInquiryStatus
) {
  await requireAdmin();
  const result = await updateContactInquiryStatus(id, status);
  if (result.success) {
    revalidatePath("/admin/queries");
    revalidatePath("/admin");
  }
  return result;
}

export async function deleteContactInquiry(id: string) {
  await requireAdmin();
  const result = await removeContactInquiry(id);
  if (result.success) {
    revalidatePath("/admin/queries");
    revalidatePath("/admin");
  }
  return result;
}

export async function getPendingContactInquiryCountForAdmin(): Promise<number> {
  await requireAdmin();
  const inquiries = await loadContactInquiries();
  return inquiries.filter((inquiry) => inquiry.status === "pending").length;
}
