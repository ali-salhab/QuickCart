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

export async function POST(req) {
  // //console.log("POST request received at /api/products/add");
  //console.log("Request headers:", req.headers);

  try {
    const { userId } = getAuth(req);
    // //console.log("User ID from getAuth:", userId);
    const isSeller = await authSeller(userId);
    // //console.log("User ID:", userId);
    if (isSeller === false) {
      return NextResponse.json({
        success: false,
        message: "not authorised",
      });
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");
    const images = formData.getAll("images");
    const category = formData.get("category");
    if (!images || images.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Please upload at least one image",
      });
    } else {
      // //console.log("Images received:", images);
    }
    // upload image to cloudinary
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        // //console.log("Uploading image:", image);
        const file = await image.arrayBuffer();
        const buffer = Buffer.from(file);
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            },
          );
          stream.end(buffer);
        });
      }),
    );
    const image = uploadedImages.map((img) => img);

    await connectDB();
    const newProduct = await Product.create({
      name,
      description,
      price: Number(price),
      offerPrice: Number(offerPrice),
      category,
      images: image,
      userId,
      date: Date.now(),
    });

    return NextResponse.json({
      success: true,
      message: "product added successfully",
      data: {
        name,
        description,
        price,
        offerPrice,
        category,
        images: image,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
