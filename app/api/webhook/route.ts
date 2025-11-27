import { NextRequest, NextResponse } from "next/server";
import { generateAgentReply } from "../../../lib/openai";
import { sendWhatsAppText } from "../../../lib/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET: webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token && challenge) {
    if (token === process.env.WHATSAPP_VERIFY_TOKEN) {
      return new NextResponse(challenge, { status: 200 });
    }
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.json({ ok: true });
}

// POST: incoming messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entries = body?.entry ?? [];
    for (const entry of entries) {
      const changes = entry?.changes ?? [];
      for (const change of changes) {
        const value = change?.value;
        const phoneNumberId: string | undefined = value?.metadata?.phone_number_id;
        const messages = value?.messages ?? [];
        for (const message of messages) {
          const from = message?.from as string; // sender WhatsApp ID
          const type = message?.type as string;
          if (type !== "text") {
            // Non-text messages get a polite response
            if (phoneNumberId && from) {
              await sendWhatsAppText({
                phoneNumberId,
                to: from,
                body:
                  "Thanks for your message! Please send text so I can help best."
              });
            }
            continue;
          }
          const text = message?.text?.body as string;
          if (!text || !phoneNumberId || !from) continue;

          const reply = await generateAgentReply({
            userMessage: text,
            userId: from
          });

          await sendWhatsAppText({
            phoneNumberId,
            to: from,
            body: reply
          });
        }
      }
    }
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err?.message || err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

