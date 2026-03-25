/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddToFavourite, FavData } from "@/app/lib/actions/fav";
import { getUserById } from "@/app/lib/actions/user";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
async function getUser() {
  const user = await currentUser();
  if (!user) {
    return { user: null, code: 401 };
  }
  const id: any = user.publicMetadata?.mongoUserId ?? "";
  return getUserById(id);
}
export async function PUT(req: Request) {
  try {
    const { user, code } = await getUser();
    if (code == 401) {
      return new Response("Unauthorized", { status: 401 });
    } else if (code == 404) {
      return new Response("User not found", { status: 404 });
    }
    const client = await clerkClient();
    const data = await req.json();
    if (data) {
      const updatedfavs = await AddToFavourite(data as FavData, user);
      const updatedUser = await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          favs: updatedfavs,
        },
      });
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    }
    return new Response("Invalid data", { status: 400 });
  } catch (e:any) {
    console.log("Fav error2:", e);
    return new Response(e, { status: 400 });
  }
}
export async function GET() {
  try {
    const { user, code } = await getUser();
    console.log("User fetched in GET route:", user, code);
    if (code == 401) {
      return new Response("Unauthorized", { status: 401 });
    } else if (code == 404) {
      return new Response("User not found", { status: 404 });
    }
    return new Response(JSON.stringify(user.favs??[]), { status: 200 });
  } catch (e:any) {
    console.log("Fav error:", e);
    return new Response(e, { status: 400 });
  }
}
