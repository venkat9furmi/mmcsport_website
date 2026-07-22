import { z } from "zod";

export const MARKETS = [
  "DACH / German",
  "Italy / Italian",
  "France / French",
  "Spain & LATAM / Spanish",
  "Brazil / Portuguese",
  "MENA / Arabic",
  "Indonesia / Bahasa",
  "Japan / Japanese",
  "Multiple markets",
] as const;

export const demoFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  org: z.string().trim().min(1, "Club or organisation is required"),
  email: z
    .string()
    .trim()
    .min(1, "Work email is required")
    .email("Enter a valid work email"),
  market: z
    .string()
    .refine((value) => (MARKETS as readonly string[]).includes(value), {
      message: "Select a market",
    }),
  brief: z.string().trim(),
  company: z.string().max(0),
});

export type DemoFormValues = z.infer<typeof demoFormSchema>;
