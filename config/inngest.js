import { Inngest } from "inngest";
import connectDB from "./db";
console.log("inngest config file --------------->");

export const inngest = new Inngest({
  id: "quick-cart-production-v1",
});

const getUserModel = async () => {
  console.log("route file --------------->");

  await connectDB();
  return (await import("@/models/user")).default;
};

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-creation", event: "clerk/user.created" },
  async ({ event }) => {
    console.log("syncUserCreation function --------------->");

    const { data } = event;
    const { id, first_name, last_name, email_addresses, image_url } = data;
    const User = await getUserModel();

    const newUser = new User({
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    });
    await newUser.save();
  },
);

// 2. تحديث مستخدم
export const syncUserUpdate = inngest.createFunction(
  { id: "sync-user-update", event: "clerk/user.updated" }, // تم دمج ID و Event هنا
  async ({ event }) => {
    console.log("syncUserUpdate function --------------->");
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const User = await getUserModel();

    await User.findByIdAndUpdate(id, {
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    });
  },
);

// 3. حذف مستخدم
export const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-deletion", event: "clerk/user.deleted" }, // تم دمج ID و Event هنا
  async ({ event }) => {
    console.log("syncUserDeletion function --------------->");
    const { id } = event.data;
    const User = await getUserModel();

    await User.findByIdAndDelete(id);
  },
);
