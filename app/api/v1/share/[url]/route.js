import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { GridFSBucket } from "mongodb";
import Link from "@/models/Link";


import mongoose from "mongoose";
import File from "@/models/File";

// export async function POST(req, { params }) {
//   try {
//     const { fileId } = params;
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

//     return NextResponse.json({ message: "File shared successfully with password and color", file: updatedFile }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Error sharing file", error }, { status: 500 });
//   }
// }





// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import Link from "@/models/Link";
// import { connectToDatabase } from "@/lib/db";
// import { ObjectId } from "mongodb";
// import { GridFSBucket } from "mongodb";

// export async function POST(req, { params }) {
//   try {
//     const db = await connectToDatabase();
//     const bucket = new GridFSBucket(db, { bucketName: "uploads" });

//     const { url } = await  params;
//     const { password } = await req.json();

//     // Find the link in the database
//     const link = await Link.findOne({ url });
//     if (!link) {
//       return NextResponse.json({ message: "Invalid or expired link" }, { status: 404 });
//     }

//     // Find the file in GridFS
//     const file = await db.collection("uploads.files").findOne({ _id: new ObjectId(link.fileId) });
//     if (!file) {
//       return NextResponse.json({ message: "File not found" }, { status: 404 });
//     }

//     // If the file is password protected, verify it
//     if (file.metadata?.password) {
//       const isMatch = await bcrypt.compare(password, file.metadata.password);
//       if (!isMatch) {
//         return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
//       }
//     }

//     // Increment access count
//     link.accessCount += 1;
//     await link.save();

//     return NextResponse.json(
//       { success: true, filename: file.filename, fileId: file._id },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ message: "Error accessing file", error }, { status: 500 });
//   }
// }






import { ObjectId } from "mongodb";
// import bcrypt from "bcryptjs";
// import { connectToDatabase } from "@/lib/db";
// import { NextResponse } from "next/server";
// import Link from "@/models/Link"; // Ensure this is correctly imported

export async function POST(req, { params }) {
  try {
    // Extract only the unique file ID from the URL
    const fileId = await params.url.split("/").pop(); // Extract last part of URL
    const { password } = await req.json();

    console.log("🔍 Extracted File ID:", fileId);
    console.log("🔍 Password received:", password);

    // Database connection
    const db = await connectToDatabase();
    if (!db) {
      console.error("❌ Database connection failed!");
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }
    console.log("✅ Database connected!");

    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    // Find the shared link using only the extracted file ID
    const link = await Link.findOne({ url: fileId }); // Query using extracted file ID
    if (!link) {
      return NextResponse.json({ message: "Invalid or expired link" }, { status: 404 });
    }

    // Find the actual file in GridFS using the stored file ID
    const file = await db.collection("uploads.files").findOne({ _id: new ObjectId(link.fileId) });
    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    console.log(file);

    // Password check
    if (file.metadata?.password !== password) {
      // const isMatch = await bcrypt.compare(password, file.metadata.password);
      // if (!isMatch) {
        return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
      // }
    }

    // Increment access count
    link.accessCount += 1;
    await link.save();

    return NextResponse.json({
      success: true,
      filename: file.filename,
      fileId: file._id,
      contentType: file.contentType,
      length:file.length,
      uploadDate:file.uploadDate
    });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ message: "Error accessing file", error: error.message }, { status: 500 });
  }
}
