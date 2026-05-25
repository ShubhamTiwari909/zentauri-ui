"use server";

import { revalidatePath } from "next/cache";

import { contactFormSchema, type ContactFormValues } from "./schema";

export type ContactFormActionState = {
  message: string;
  ok: boolean;
};

const backendBaseUrl =
  process.env.ZENTAURI_BACKEND_URL ?? "http://127.0.0.1:8000";

export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactFormActionState> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields and try again.",
    };
  }

  const formData = new URLSearchParams();
  formData.set("name", parsed.data.name);
  formData.set("email", parsed.data.email);
  formData.set("subject", parsed.data.subject);
  formData.set("message", parsed.data.message);

  if (parsed.data.phone) {
    formData.set("phone", parsed.data.phone);
  }

  try {
    const response = await fetch(`${backendBaseUrl}/api/v1/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        ok: false,
        message:
          response.status === 429
            ? "Too many submissions. Please wait a moment before trying again."
            : "We could not send your message right now. Please try again.",
      };
    }

    revalidatePath("/contact-us");

    return {
      ok: true,
      message: "Thanks. Your message has been sent.",
    };
  } catch {
    return {
      ok: false,
      message:
        "The contact API is not reachable. Make sure the backend server is running.",
    };
  }
}
