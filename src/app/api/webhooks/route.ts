import { MUTATIONS } from "@/server/db/queries";
import type { DB_UserType } from "@/server/db/schema";
import type { UserJSON } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );
    console.log("Webhook payload:", evt.data);

    if (evt.type === "user.created") {
      console.log("userId:", evt.data.id);
      const user = {
        clerkUserId: evt.data.id,
        firstname: evt.data.first_name,
        lastname: evt.data.last_name,
        imageUrl: evt.data.image_url,
        email: evt.data.email_addresses[0]!.email_address,
      } satisfies Pick<
        DB_UserType,
        "clerkUserId" | "firstname" | "lastname" | "imageUrl" | "email"
      >;
      MUTATIONS.createUser(user);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
