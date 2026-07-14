import { Inngest } from "inngest";
import User from "@/models/user";
import connectDB from "./db";
export const inngest = new Inngest({
  id: "QuickCart",
});

// Inngest function to save users data to databse
export const syncUserCreation = inngest.createFunction(
  { id: "Sync User Creation" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const newUser = new User({
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    });
    await connectDB();
    await newUser.save();
  },
);
// inngest function to update users data in the database
export const syncUserUpdate = inngest.createFunction(
  { id: "Sync User Update" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    await connectDB();
    await User.findByIdAndUpdate(id, {
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    });
  },
);

// inngest function to delete users data from the database
export const syncUserDeletion = inngest.createFunction(
  { id: "Sync User Deletion" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
  },
);
