import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { address } = await req.json();
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }
    await connectDB();
    const newAddress = await Address.create({
      userId: userId,
      ...address,
    });
    return NextResponse.json({
      success: true,
      address: newAddress,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
