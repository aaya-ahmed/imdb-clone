import { createOrUpdateUser, deleteUser } from "@/app/lib/actions/user";
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { id } = evt.data;
    const eventType = evt.type;
    if (eventType === "user.created" || eventType === "user.updated") {
      // Handle user created or updated event
      const { first_name, last_name, image_url, email_addresses } = evt.data;
      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
      );
      if (user && eventType === "user.created") {
        try {
          const client = await clerkClient();
          client.users.updateUserMetadata(id ?? "", {
            publicMetadata: {
              appUserId: user._id.toString(),
            },
          });
        } catch (e) {
          return new Response("Error updating user metadata", { status: 400 });
        }
      }
    }
    if (eventType === "user.deleted") {
      try {
        if (id) {
          await deleteUser(id ?? "");
          const client = await clerkClient();
          await client.users.deleteUser(id ?? "");
        }
      } catch (e) {
        return new Response("Error deleting user ", { status: 400 });
      }
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    return new Response("Error verifying webhook", { status: 400 });
  }
}
