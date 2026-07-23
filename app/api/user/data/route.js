import connectDB from "@/config/db";
import User from "@/models/user";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    console.log(userId);

    await connectDB();

    const user = await User.find({});
    console.log(user);
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
        success: false,
      });
    } else {
      return NextResponse.json({
        message: "User found",
        status: 200,
        success: true,
        data: user,
      });
    }
  } catch (error) {
    // console.error("Error in GET /api/user/data:", error);
    return NextResponse.json({
      message: error.message || "Internal Server Error",
      status: 500,
      success: false,
    });
  }
}
