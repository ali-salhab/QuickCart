import { Inngest } from "inngest";
// لا تستورد الـ Model هنا، استورده داخل الدوال
import connectDB from "./db";

export const inngest = new Inngest({
  id: "QuickCart",
});

// دالة مساعدة للحصول على الـ Model داخل الـ handler
const getUserModel = async () => {
  await connectDB();
  return (await import("@/models/user")).default;
};

export const syncUserCreation = inngest.createFunction(
  { id: "Sync User Creation" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const User = await getUserModel(); // استدعاء ديناميكي للـ Model

    const newUser = new User({
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    });
    await newUser.save();
  },
);

export const syncUserUpdate = inngest.createFunction(
  { id: "Sync User Update" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const User = await getUserModel(); // استدعاء ديناميكي للـ Model

    await User.findByIdAndUpdate(id, {
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    });
  },
);

export const syncUserDeletion = inngest.createFunction(
  { id: "Sync User Deletion" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    const User = await getUserModel(); // استدعاء ديناميكي للـ Model

    await User.findByIdAndDelete(id);
  },
);
