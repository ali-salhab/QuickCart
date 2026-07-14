"use server"; // هذا السطر يخبر Next.js أن هذا الكود يعمل في السيرفر
import connectDB from "@/config/db";

export async function test() {
  await connectDB();
  // جلب البيانات هنا
}
