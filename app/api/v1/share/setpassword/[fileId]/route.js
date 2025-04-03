// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import File from "@/models/File";
// import { connectToDatabase } from "@/lib/db";

// export async function POST(req, { params }) {
    
//     try {
//       await connectToDatabase();


//     const { fileId } = await params;
//     const { password, color } = await req.json();

//     if (!password || !color) {
//       return NextResponse.json({ message: "Password and color are required!" }, { status: 400 });
//     }

//     // Hash password before saving
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Update file with password and color
//     const updatedFile = await File.findByIdAndUpdate(
//       fileId,
//       { password: hashedPassword, color },
//       { new: true }
//     );

//     if (!updatedFile) {
//       return NextResponse.json({ message: "File not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "File password & color set successfully", file: updatedFile },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ message: "Error updating file", error }, { status: 500 });
//   }
// }







import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { verifyToken } from "@/utils/verifyToken";
import { parse } from "cookie";
import bcrypt from "bcryptjs";

export async function POST(req, context) {
  try {
    // Extract params correctly
    const { params } = context;  // ✅ Correctly accessing params
    const { fileId } = params;  // ✅ Extracting id properly
    console.log("File ID:", fileId);  // ✅ Debugging `id`

    // Parse cookies
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
    }

    // Verify the token and extract userId
    const { userId } = verifyToken(token);
    if (!userId) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    // Parse request body
    const { password, color } = await req.json();
    console.log("Received Password:", password, "Color:", color);  // ✅ Debugging password & color

    if (!password || !color) {
      return NextResponse.json({ message: "Password and color are required!" }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();
    const db = mongoose.connection.db;
    const filesCollection = db.collection("uploads.files");

    // Check if the file exists
    const file = await filesCollection.findOne({
      _id: new mongoose.Types.ObjectId(fileId),
      "metadata.userId": userId,
    });

    if (!file) {
      return NextResponse.json({ message: "File not found or unauthorized" }, { status: 404 });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Update the file's metadata
    await filesCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(fileId) },
      {
        $set: {
          "metadata.password": password,
          "metadata.color": color,
        },
      }
    );

    return NextResponse.json(
      { message: "Password and color updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating file metadata:", error);
    return NextResponse.json({ message: "Error updating file", error: error.message }, { status: 500 });
  }
}
