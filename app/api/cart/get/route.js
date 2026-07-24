import User from "@/models/user";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }
    return NextResponse.json({
      success: true,
      cartItems: user.cartItems,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
