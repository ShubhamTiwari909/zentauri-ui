import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  phone: z
    .string()
    .trim()
    .max(32, "Phone must be 32 characters or fewer.")
    .optional()
    .transform((value) => value || undefined),
  subject: z
    .string()
    .trim()
    .min(2, "Subject must be at least 2 characters.")
    .max(160, "Subject must be 160 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be 5000 characters or fewer."),
});

export type ContactFormValues = z.input<typeof contactFormSchema>;
