// this is also working
// "use client";
// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";

// const VerifyOTPPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email");

//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [countdown, setCountdown] = useState(120); // 2 minutes

//   const handleOtpChange = (e) => {
//     const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
//     if (value.length <= 6) setOtp(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (otp.length < 4) return toast.error("Enter a valid OTP", {
//       position: "top-right", // Toast from top-right
//       style: {
//         backgroundColor: "#EF233C", // Error color
//         color: "#fff", // White text
//       },
//     });

//     setLoading(true);
//     try {
//       const response = await fetch("/api/v1/otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success("OTP verified successfully!", {
//           position: "top-right", // Toast from top-right
//           style: {
//             backgroundColor: "#29BF12", // Success color
//             color: "#fff", // White text
//           },
//         });
//         router.push("/login");
//       } else {
//         toast.error(data.error || "Invalid OTP", {
//           position: "top-right", // Toast from top-right
//           style: {
//             backgroundColor: "#EF233C", // Error color
//             color: "#fff", // White text
//           },
//         });
//       }
//     } catch {
//       toast.error("Something went wrong. Try again.", {
//         position: "top-right", // Toast from top-right
//         style: {
//           backgroundColor: "#EF233C", // Error color
//           color: "#fff", // White text
//         },
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setResendLoading(true);
//     try {
//       await fetch("/api/v1/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, resendOtp: true }),
//       });
//       toast.success("OTP resent successfully!", {
//         position: "top-right", // Toast from top-right
//         style: {
//           backgroundColor: "#29BF12", // Success color
//           color: "#fff", // White text
//         },
//       });
//       setCountdown(120);
//     } catch {
//       toast.error("Something went wrong.", {
//         position: "top-right", // Toast from top-right
//         style: {
//           backgroundColor: "#EF233C", // Error color
//           color: "#fff", // White text
//         },
//       });
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   // Convert countdown seconds into MM:SS format
//   const formattedTime = `${String(Math.floor(countdown / 60)).padStart(2, "0")}:${String(countdown % 60).padStart(2, "0")}`;

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <Card className="w-96 p-6 shadow-lg rounded-lg bg-white">
//         <h2 className="text-xl font-semibold text-center">Verify OTP</h2>
//         <p className="text-gray-600 text-sm text-center mb-4">
//           Enter the OTP sent to <span className="font-semibold">{email}</span>
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//           <Input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={handleOtpChange}
//             maxLength={6}
//             className=" text-lg"
//             required
//           />

//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? "Verifying..." : "Verify OTP"}
//           </Button>
//         </form>

//         <div className="text-center mt-4">
//           {countdown > 0 ? (
//             <p className="text-gray-500 text-sm">
//               Resend OTP in <span className="font-semibold">{formattedTime}</span>
//             </p>
//           ) : (
//             <Button
//               variant="link"
//               className="text-blue-600 underline"
//               onClick={handleResendOTP}
//               disabled={resendLoading}
//             >
//               {resendLoading ? "Resending..." : "Resend OTP"}
//             </Button>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default VerifyOTPPage;



"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Loader2 } from "lucide-react";


const VerifyOTPPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes
  // Set email from search params once the component has mounted
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    const register = urlParams.get("register");
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
    if (otp.length < 4) return toast.error("Enter a valid OTP", {
      position: "top-right", // Toast from top-right
      style: {
        backgroundColor: "#EF233C", // Error color
        color: "#fff", // White text
      },
    });

    setLoading(true);
    try {
      const response = await fetch("/api/v1/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("OTP verified successfully!", {
          position: "top-right", // Toast from top-right
          style: {
            backgroundColor: "#29BF12", // Success color
            color: "#fff", // White text
          },
        });
        router.push("/login");
      } else {
        toast.error(data.error || "Invalid OTP", {
          position: "top-right", // Toast from top-right
          style: {
            backgroundColor: "#EF233C", // Error color
            color: "#fff", // White text
          },
        });
      }
    } catch {
      toast.error("Something went wrong. Try again.", {
        position: "top-right", // Toast from top-right
        style: {
          backgroundColor: "#EF233C", // Error color
          color: "#fff", // White text
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await fetch("/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resendOtp: true }),
      });
      toast.success("OTP resent successfully!", {
        position: "top-right", // Toast from top-right
        style: {
          backgroundColor: "#29BF12", // Success color
          color: "#fff", // White text
        },
      });
      setCountdown(120);
    } catch {
      toast.error("Something went wrong.", {
        position: "top-right", // Toast from top-right
        style: {
          backgroundColor: "#EF233C", // Error color
          color: "#fff", // White text
        },
      });
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

  // Convert countdown seconds into MM:SS format
  const formattedTime = `${String(Math.floor(countdown / 60)).padStart(2, "0")}:${String(countdown % 60).padStart(2, "0")}`;

  if (!email) return <div>Loading...</div>;

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-blue-500 p-4">
    <div className=" flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
      
      {/* 🔙 Back Button (Top-Left, Outside the Header) */}
      <button 
        onClick={() => router.back()} 
        className="absolute top-4 left-4 flex cursor-pointer items-center text-white  "
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        Back
      </button>
  
      {/* 🖼️ Left Side - Image Section */}
      <div className="hidden md:flex items-center justify-center w-1/2 p-6">
        <img src="/mfa.jpeg" alt="OTP Verification" className="w-80" />
      </div>
  
      {/* 🔐 Right Side - OTP Verification Form */}
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-semibold text-center text-blue-500">Verify OTP</h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          Enter the OTP sent to <span className="font-semibold">{email}</span>
        </p>
  
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
            className="text-lg border border-gray-300 p-2 rounded"
            required
          />
  
          <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-400 cursor-pointer p-2 rounded" disabled={loading}>
            {loading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : "Verify OTP"}
          </Button>
        </form>
  
        <div className="text-center mt-4">
          {countdown > 0 ? (
            <p className="text-gray-500 text-sm">
              Resend OTP in <span className="font-semibold">{formattedTime}</span>
            </p>
          ) : (
            <Button
              variant="link"
              className="text-blue-600 underline"
              onClick={handleResendOTP}
              disabled={resendLoading}
            >
              {resendLoading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : "Resend OTP"}
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>
  
    
  );
};

export default VerifyOTPPage;





