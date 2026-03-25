/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "../model/user";
import dbConnect from "../mongodb/mongodb";
export async function getUserById(id:any) {
  await dbConnect();
  const existingUser = await User.findById(id);
  if (!existingUser) {
    return { user: null, code: 404 };
  }
  return { user: existingUser, code: 200 };
}
export const createOrUpdateUser = async (
  id: string | undefined,
  first_name: string|null,
  last_name: string|null,
  image_url: string|null,
  email_addresses:any[]
) => {
  try {
    await dbConnect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0]?.email_address,
        },
      },
      { upsert: true, new: true },
    );
    return user;
  } catch (error) {
    console.log("Error: Could not connected or create or update user:", error);
  }
};
export const deleteUser = async (id: string) => {
  try {
    await dbConnect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("Error: Could not delete user:", error);
  }
};
