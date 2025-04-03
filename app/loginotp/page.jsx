"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react"; // Import Loader2 for spinner
import { ArrowLeft } from "lucide-react";

const VerifyLoginOTPPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (value.length <= 6) setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length < 4) return toast.error("Enter a valid OTP");

    setLoading(true);
    try {
      const response = await fetch("/api/v1/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("OTP verified successfully!");
        router.push("/"); // Redirect after success
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await fetch("/api/v1/login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      toast.success("OTP resent successfully!");
      setCountdown(120);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formattedTime = `${String(Math.floor(countdown / 60)).padStart(2, "0")}:${String(countdown % 60).padStart(2, "0")}`;

  if (!email) return <div>Loading...</div>;

  return (
<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 p-6 relative">
      
      {/* 🔙 Back Button (Top Left) */}
      <button 
        onClick={() => router.back()} 
        className="absolute top-6 left-6 flex items-center text-white hover:text-gray-200 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Back
      </button>

      <div className="flex flex-col md:flex-row bg-white bg-opacity-90 shadow-2xl rounded-lg overflow-hidden max-w-4xl w-full">
        
        {/* 🖼️ Image Section (Left) */}
        <div className="hidden md:flex items-center justify-center w-1/2 p-6">
          <img src="/mfa.jpeg" alt="OTP Verification" className="w-80" />
        </div>

        {/* 🔐 OTP Verification Form (Right) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Verify OTP</h2>
          <p className="text-gray-700 text-sm text-center mb-5">
            Enter the OTP sent to <span className="">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className=" border border-gray-300 p-2 rounded w-full "
              required
            />

            <button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-400 cursor-pointer py-2 text-white font-semibold rounded transition duration-300 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="text-center mt-4">
            {countdown > 0 ? (
              <p className="text-gray-500 text-sm">
                Resend OTP in <span className="font-semibold">{formattedTime}</span>
              </p>
            ) : (
              <button
                className="text-blue-600 underline cursor-pointer"
                onClick={handleResendOTP}
                disabled={resendLoading}
              >
                {resendLoading ? "Resending..." : "Resend OTP"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default VerifyLoginOTPPage;
