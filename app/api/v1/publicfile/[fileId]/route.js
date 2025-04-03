import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req , {params}) {
  try {
    // Extract full URL from the request body
    const { fileId } = await params;
    console.log(fileId);
 
    if (!fileId) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    // Extract the file ID from the URL
    // const fileId = url.split("/").pop();
    // console.log("🔍 Extracted File ID:", fileId);

    // Connect to MongoDB
    await connectToDatabase();
    const db = mongoose.connection.db;

    // Find the shared link using only the extracted file ID
    const link = await db.collection("links").findOne({ url: fileId }); // Searching by file ID in "links"
    if (!link) {
      return NextResponse.json({ message: "Invalid or expired link" }, { status: 404 });
    }


    console.log(`http://localhost:3000/access/${link}`);

    // Find the actual file in GridFS using the stored file ID
    const file = await db.collection("uploads.files").findOne({
      _id: new mongoose.Types.ObjectId(link.fileId),
    });

    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    console.log("✅ File found:", file.filename);

    // Increment access count
    // await db.collection("links").updateOne(
    //   { _id: link._id },
    //   { $inc: { accessCount: 1 } }
    // );
     
    console.log("✅ Access count incremented.");
    // Return file metadata (without requiring a password)
    return NextResponse.json({
      success: true,
      filename: file.filename,
      fileId: file._id,
      contentType: file.contentType,
      length: file.length,
      uploadDate: file.uploadDate,
      color: file.metadata?.color || "Unknown", // Return associated color if available
    });

  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ message: "Error accessing file", error: error.message }, { status: 500 });
  }
}
