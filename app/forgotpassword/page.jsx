"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner"; // Ensure Sonner is imported
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    // ✅ Clear previous toasts
    toast.dismiss();

    // ✅ Validate email before making request
    if (!email.trim()) {
      toast.error("Email is required.", {
        position: "top-right", // Position the toast in the top-right corner
        style: {
          backgroundColor: "#ef233c", // Red background color for error
          color: "#fff", // White text color
        },
      });
      return;
    }

    setLoading(true);

    try {
      console.log("Sending email:", email); // ✅ Debugging

      const response = await fetch("/api/v1/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      console.log("Request payload:", JSON.stringify({ email })); // ✅ Debugging

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset link sent! Check your email.", {
          position: "top-right", // Position the toast in the top-right corner
          style: {
            backgroundColor: "#34D399", // Green background color for success
            color: "#fff", // White text color
          },
        });
      } else {
        toast.error(data.message || "Failed to send reset link.", {
          position: "top-right", // Position the toast in the top-right corner
          style: {
            backgroundColor: "#F87171", // Red background color for error
            color: "#fff", // White text color
          },
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right", // Position the toast in the top-right corner
        style: {
          backgroundColor: "#F87171", // Red background color for error
          color: "#fff", // White text color
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 p-6">
  {/* 🔙 Back Button */}
  <button 
    onClick={() => router.back()} 
    className="absolute cursor-pointer top-6 left-6 flex items-center text-white hover:text-gray-200"
  >
    <ArrowLeft className="h-5 w-5 mr-1" />
    Back
  </button>

  <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full h-[400px]">
    
    {/* 🖼️ Left Side - Image Section */}
    <div className="hidden md:flex items-center justify-center w-1/2 h-full">
      <img src="/fileaccess.jpeg" alt="Forgot Password" className="w-full h-full object-cover" />
    </div>

    {/* 📧 Right Side - Forgot Password Form */}
    <Card className="w-full md:w-1/2 h-full flex flex-col justify-center p-8">
      <h2 className="text-2xl font-semibold text-center text-black mb-6">Forgot Password</h2>

      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <Button
        onClick={handleForgotPassword}
        className="w-full bg-blue-500 text-white hover:bg-blue-600 mt-4"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </Button>
    </Card>
  </div>
</div>

  
  );
};

export default ForgotPassword;
