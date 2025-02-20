import { db } from "@/server/db";
import { list } from "@/server/db/schema";
import { createClerkClient } from "@clerk/backend";
import { eq } from "drizzle-orm";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function GET(request: Request) {
  const res = await clerkClient.authenticateRequest(request);
  if (!res.isSignedIn) return Response.json({ status: 401 });
  const session = res.toAuth();
  const lists = await db.query.list.findMany({
    where: eq(list.clerkId, session.userId),
  });
  return Response.json({ lists });
}
