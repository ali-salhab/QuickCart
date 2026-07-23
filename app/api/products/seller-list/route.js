import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req) {
  //console.log("GET request received at /api/products/seller-list");
  // //console.log("Request headers:", req.headers);

  try {
    const { userId } = getAuth(req);

    const isSeller = await authSeller(userId);

    if (isSeller === false) {
      return NextResponse.json({
        success: false,
        message: "not authorised the user is not a seller",
      });
    }

    await connectDB();

    const products = await Product.find({ userId: userId }).sort({
      createdAt: -1,
    });
    //console.log("Products found:", products);
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
