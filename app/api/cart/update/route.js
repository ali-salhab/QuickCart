import User from "@/models/user";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
// this function to add items to the cart or update the quantity of items in the cart
export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { cartData } = await req.json();
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }
    user.cartItems = cartData;
    await user.save();
    return NextResponse.json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
