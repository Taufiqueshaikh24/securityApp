import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import TempUser from "@/models/TempUser";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/sendEmail";
import { generateOtp } from "@/lib/generateOtp";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { name, email, phone, dob, password, passwordColor, resendOtp } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 🔹 Handle OTP Resend
    if (resendOtp) {
      const existingTempUser = await TempUser.findOne({ email });
      if (!existingTempUser) {
        return NextResponse.json({ error: "User not found. Please register first." }, { status: 400 });
      }

      // 🔢 Generate new OTP
      const { otp, otpExpiresAt } = generateOtp();
      console.log("🔹 Resend OTP:", otp); // ✅ Log OTP to terminal

      // 🔄 Update OTP in database
      await TempUser.updateOne({ email }, { otp, otpExpiresAt });

      // 📧 Resend OTP email (commented out for testing)
      // await sendEmail(email, "Resend OTP - Verify Your Email", `Your new OTP is ${otp}. It expires in 2 minutes.`);

      return NextResponse.json({ message: "OTP resent successfully. Please verify your email." }, { status: 200 });
    }

    // 🔹 Validate new registration data
    // if (!name || !phone || !dob || !password || !passwordColor) {
    if (!name || !phone || !password || !passwordColor) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // ✅ Check if user is already verified
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists. Please log in." }, { status: 400 });
    }

    // ✅ Check if user is in `TempUser` (pending verification)
    const existingTempUser = await TempUser.findOne({ email });

    // 🔢 Generate new OTP
    const { otp, otpExpiresAt } = generateOtp();
    console.log("🔹 New Registration OTP:", otp); // ✅ Log OTP to terminal

    if (existingTempUser) {
      await TempUser.updateOne({ email }, { otp, otpExpiresAt });

      // 📧 Resend OTP email (commented out for testing)
      // await sendEmail(email, "Resend OTP - Verify Your Email", `Your new OTP is ${otp}. It expires in 2 minutes.`);
      await sendEmail(email, "verification", name , otp);
      return NextResponse.json({ message: "OTP resent. Please verify your email." }, { status: 200 });
    }

    // 🔒 Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔄 Store user in `TempUser`
    await TempUser.create({
      name,
      email,
      phone,
      dob,
      password: hashedPassword,
      passwordColor,
      otp,
      otpExpiresAt,
    });

    // 📧 Send OTP email (commented out for testing)
    await sendEmail(email, "verification", name , otp);

    return NextResponse.json({ message: "OTP sent. Please verify your email." }, { status: 201 });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
