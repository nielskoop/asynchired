import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { env } from "~/env";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405);
  }

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const svix_id = req.headers["svix-id"] as string;
  const svix_timestamp = req.headers["svix-timestamp"] as string;
  const svix_signature = req.headers["svix-signature"] as string;

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: "Error occured -- no svix headers" });
  }

  // Get the body
  const body = (await buffer(req)).toString();

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).json({ Error: err });
  }

  // Get the ID and type
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const id = evt.data.id;
    const email = evt.data.email_addresses[0]!.email_address;

    // Handle potential absence of name
    const firstName = evt.data.first_name ?? "";
    const lastName = evt.data.last_name ?? "";
    const name = firstName + (firstName && lastName ? " " : "") + lastName;

    try {
      // Direct database operation
      const user = await prisma.user.upsert({
        where: { id },
        update: { email, name },
        create: {
          id,
          email,
          name,
          job: "",
          location: "",
          techStack: "",
          education: "",
        },
      });

      return res.status(200).json(user);
    } catch (error) {
      console.error("Error processing webhook event:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(200).json({ response: "Success" });
}
