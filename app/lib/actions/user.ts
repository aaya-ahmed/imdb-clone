/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "../model/user";
import dbConnect from "../mongodb/mongodb";

export const createOrUpdateUser = async (
  id: string | undefined,
  first_name: string|null,
  last_name: string|null,
  image_url: string|null,
  email_addresses:any[]
) => {
  try {
    await dbConnect();
    console.log("db connected in createOrUpdateUser");
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
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
