import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { parse } from "cookie";
import { verifyToken } from "@/utils/verifyToken";
import { GridFSBucket } from "mongodb";




export async function GET(req , { params}){
         
    try {
          // Parse cookies from the request header
          const cookies = parse(req.headers.get("cookie") || "");
          const token = cookies.token;  // Assuming the token is stored in the cookie as "token"
      
          // Check if token exists in cookies
          if (!token) {
            return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
          }
      
          // Verify the token and extract userId (Assuming you have a utility function to verify JWT token)
          const { userId } = verifyToken(token);
          if (!userId) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
          }
      
          let { fileId }= await params
      
          // Connect to the database
          await connectToDatabase();
          const db = mongoose.connection.db;
          const bucket = new GridFSBucket(db, { bucketName: "uploads" });
      
          // Find the file that matches the id and belongs to the user
          const file = await bucket.find({
            _id: new mongoose.Types.ObjectId(fileId),
            "metadata.userId": userId,
          }).toArray();
      
          // Check if file exists and is authorized for download
          if (file.length === 0) {
            return NextResponse.json({ message: "File not found or unauthorized" }, { status: 404 });
          }
         console.log("File Info:",file);
      return NextResponse.json({ file }, { status:200})
        
    } catch (error) {
        console.error("Error getting file:", error); // Log the error for debugging
    return NextResponse.json({
      message: "Error Getting file",
      error: error.message,
    }, { status: 500 });
    }
}