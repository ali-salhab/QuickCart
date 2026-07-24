import Address from "@/models/Address";
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
    const addresses = await Address.find({ userId: userId }).sort({
      createdAt: -1,
    });
    return NextResponse.json({
      success: true,
      addresses,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
