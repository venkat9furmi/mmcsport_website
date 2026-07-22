import { NextResponse } from "next/server";
import { Resend } from "resend";
import { demoFormSchema } from "@/lib/schemas/demo";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = demoFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { name, org, email, market, brief, company } = parsed.data;

  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping demo request email.");
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "mmc sport <demo@mmcsport.de>",
      to: "hello@mmcsport.de",
      replyTo: email,
      subject: `Demo request — ${org}`,
      text: `Name: ${name}\nOrganisation: ${org}\nEmail: ${email}\nMarket: ${market}\nBrief: ${brief || "—"}`,
    });
  } catch (error) {
    console.error("Failed to send demo request email", error);
    return NextResponse.json({ error: "Could not send request." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
