/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteFavourite } from "@/app/lib/actions/fav";
import { getUserById } from "@/app/lib/actions/user";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
async function getUser() {
  const user = await currentUser();
  if (!user) {
    return { user: null, code: 401 };
  }
  const id: string = (user.publicMetadata?.mongoUserId ?? "").toString();
  return getUserById(id);
}
export async function DELETE(req: Request,
  { params }: { params: Promise<{ id: string }> }) {
    try {
    const { user, code } = await getUser();
    if (code == 401) {
      return new Response("Unauthorized", { status: 401 });
    } else if (code == 404) {
      return new Response("User not found", { status: 404 });
    }
    const client = await clerkClient();
    const movieId = (await params).id;
    if (movieId) {
      const updatedfavs = await deleteFavourite(movieId,user);
      const updatedUser = await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          favs: updatedfavs,
        },
      });
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    }
    return new Response("Invalid data", { status: 400 });
  } catch (e) {
    return new Response("Error updating user metadata", { status: 400 });
  }
}

