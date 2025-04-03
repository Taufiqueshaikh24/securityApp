import crypto from "crypto";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/utils/sendEmail"; // A function to send emails
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();

    // ✅ Parse the JSON body correctly
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min expiry

    await user.save();

    // Send reset link via email
    // const resetUrl = `${process.env.PROTOCOL}://${process.env.DOMAIN_NAME}/resetpassword?token=${resetToken}&email=${email}`;
    const resetUrl = `https://security-app-sable.vercel.app//resetpassword?token=${resetToken}&email=${email}`;
    console.log(resetUrl);

    await sendEmail(user.email, 'reset', user.name, resetUrl);

    return NextResponse.json({ message: "Password reset email sent." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
