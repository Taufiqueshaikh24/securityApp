// "use client";
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { toast } from "sonner"; // Ensure Sonner is imported
// import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation"; // Use next/navigation for searchParams
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// const ResetPasswordPage = () => {
//   const searchParams = useSearchParams(); // Get query parameters
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [token, setToken] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [passwordColor, setPasswordColor] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     // Get token and email from searchParams
//     const tokenFromQuery = searchParams.get("token");
//     const emailFromQuery = searchParams.get("email");

//     if (tokenFromQuery && emailFromQuery) {
//       setToken(tokenFromQuery);
//       setEmail(emailFromQuery);
//     } else {
//       toast.error("Invalid or missing token/email.", {
//         position: "top-right", // Position the toast in the top-right corner
//         style: {
//           backgroundColor: "#ef233c", // Error color
//           color: "#fff", // White text
//         },
//       });
//       window.location.href = "/login"; // Redirect to login if the token or email is missing
//     }
//   }, [searchParams]);

//   const colorOptions = ["yellow", "orange", "red", "pink", "purple", "green", "blue", "black"];

//   // Password input validation to allow only hexadecimal characters (0-9, A-F)
//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     const hexRegex = /^[0-9A-Fa-f]*$/; // Only allows hexadecimal characters

//     if (hexRegex.test(value)) {
//       setNewPassword(value);
//     } else {
//       toast.error("Password must contain only hexadecimal characters (0-9, A-F).", {
//         position: "top-right", // Position the toast in the top-right corner
//         style: {
//           backgroundColor: "#ef233c", // Error color
//           color: "#fff", // White text
//         },
//       });
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match!", {
//         position: "top-right", // Toast from top-right
//         style: {
//           backgroundColor: "#ef233c", // Error color
//           color: "#fff", // White text
//         },
//       });
//       return;
//     }

//     if (!passwordColor) {
//       toast.error("Please select a password color.", {
//         position: "top-right", // Toast from top-right
//         style: {
//           backgroundColor: "#ef233c", // Error color
//           color: "#fff", // White text
//         },
//       });
//       return;
//     }

//     try {
//       const response = await fetch("/api/v1/resetpassword", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ newPassword, token, email, passwordColor }), // Send token and email along with the new password and color
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success("Password reset successful!", {
//           position: "top-right", // Toast from top-right
//           style: {
//             backgroundColor: "#29bf12", // Success color
//             color: "#fff", // White text
//           },
//         });
//         router.push("/login");
//       } else {
//         toast.error(data.message || "Password reset failed.", {
//           position: "top-right", // Toast from top-right
//           style: {
//             backgroundColor: "#ef233c", // Error color
//             color: "#fff", // White text
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Password reset failed:", error);
//       toast.error("An error occurred while resetting password.", {
//         position: "top-right", // Toast from top-right
//         style: {
//           backgroundColor: "#ef233c", // Error color
//           color: "#fff", // White text
//         },
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
//       <Card className="w-full max-w-md shadow-lg p-8 rounded-lg bg-white border border-gray-200">
//         <h2 className="text-3xl font-semibold text-center text-black mb-6">Reset Password</h2>

//         <form onSubmit={handleResetPassword} className="space-y-4">
//           <Input
//             type={showPassword ? "text" : "password"}
//             placeholder="New Password (Hexadecimal)"
//             value={newPassword}
//             onChange={handlePasswordChange}
//             className="w-full border border-gray-300"
//             required
//           />
//           <Input
//             type={showPassword ? "text" : "password"}
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full border border-gray-300"
//             required
//           />

//           <div className="flex items-center gap-3">
//             <Select value={passwordColor} onValueChange={setPasswordColor}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Password Color" />
//               </SelectTrigger>
//               <SelectContent>
//                 {colorOptions.map((color) => (
//                   <SelectItem key={color} value={color}>
//                     {color.charAt(0).toUpperCase() + color.slice(1)}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {passwordColor && (
//               <div
//                 className="w-10 aspect-square rounded-full border border-gray-400"
//                 style={{ backgroundColor: passwordColor === "green" ? "#affc41" : passwordColor === "purple" ? "#c77dff" : passwordColor }}
//               />
//             )}
//           </div>

//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               id="showPassword"
//               checked={showPassword}
//               onChange={() => setShowPassword(!showPassword)}
//               className="w-4 h-4 accent-black cursor-pointer"
//             />
//             <label htmlFor="showPassword" className="text-gray-700 text-sm cursor-pointer">
//               Show Password
//             </label>
//           </div>

//           <Button type="submit" className="w-full mb-4 bg-black text-white hover:bg-gray-800">
//             Reset Password
//           </Button>
//         </form>

//         <div className="text-center mt-4">
//           <span className="text-sm text-gray-600">Remember your password? </span>
//           <Link href="/login" className="text-sm font-medium text-black hover:underline">
//             Login
//           </Link>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default ResetPasswordPage;






//this is working but because of thhi build preoceess we haveput this
// "use client";
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { toast } from "sonner";
// import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Loader2 } from "lucide-react";

// const ResetPasswordPage = () => {
//   const searchParams = useSearchParams();
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [token, setToken] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [passwordColor, setPasswordColor] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const tokenFromQuery = searchParams.get("token");
//     const emailFromQuery = searchParams.get("email");

//     if (tokenFromQuery && emailFromQuery) {
//       setToken(tokenFromQuery);
//       setEmail(emailFromQuery);
//     } else {
//       toast.error("Invalid or missing token/email.", { position: "top-right" });
//       window.location.href = "/login";
//     }
//   }, [searchParams]);

//   const colorOptions = ["yellow", "orange", "red", "pink", "purple", "green", "blue", "black"];

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match!", { position: "top-right" });
//       return;
//     }
//     if (!passwordColor) {
//       toast.error("Please select a password color.", { position: "top-right" });
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const response = await fetch("/api/v1/resetpassword", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ newPassword, token, email, passwordColor }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         toast.success("Password reset successful!", { position: "top-right" });
//         router.push("/login");
//       } else {
//         toast.error(data.message || "Password reset failed.", { position: "top-right" });
//       }
//     } catch (error) {
//       toast.error("An error occurred while resetting password.", { position: "top-right" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
//       <Card className="w-full max-w-md shadow-lg p-8 rounded-lg bg-white border border-gray-200">
//         <h2 className="text-3xl font-semibold text-center text-black mb-6">Reset Password</h2>

//         <form onSubmit={handleResetPassword} className="space-y-4">
//           <Input type={showPassword ? "text" : "password"} placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
//           <Input type={showPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          
//           <div className="flex items-center gap-3">
//             <Select value={passwordColor} onValueChange={setPasswordColor}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Password Color" />
//               </SelectTrigger>
//               <SelectContent>
//                 {colorOptions.map((color) => (
//                   <SelectItem key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {passwordColor && (
//               <div className="w-10 aspect-square rounded-full border border-gray-400" style={{ backgroundColor: passwordColor }} />
//             )}
//           </div>

//           <div className="flex items-center space-x-2">
//             <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="w-4 h-4 accent-black cursor-pointer" />
//             <label htmlFor="showPassword" className="text-gray-700 text-sm cursor-pointer">Show Password</label>
//           </div>

//           <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
//             {loading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : "Reset Password"}
//           </Button>
//         </form>

//         <div className="text-center mt-4">
//           <span className="text-sm text-gray-600">Remember your password? </span>
//           <Link href="/login" className="text-sm font-medium text-black hover:underline">Login</Link>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default ResetPasswordPage;




"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ArrowLeft } from "lucide-react";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [passwordColor, setPasswordColor] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = queryParams.get("token");
    const emailFromQuery = queryParams.get("email");

    if (tokenFromQuery && emailFromQuery) {
      setToken(tokenFromQuery);
      setEmail(emailFromQuery);
    } else {
      toast.error("Invalid or missing token/email.", { position: "top-right" });
      window.location.href = "/login";
    }
  }, []);

  const colorOptions = ["yellow", "orange", "red", "pink", "purple", "green", "blue", "black"];

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-right" });
      return;
    }
    if (!passwordColor) {
      toast.error("Please select a password color.", { position: "top-right" });
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch("/api/v1/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, token, email, passwordColor }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset successful!", { position: "top-right" });
        router.push("/login");
      } else {
        toast.error(data.message || "Password reset failed.", { position: "top-right" });
      }
    } catch (error) {
      toast.error("An error occurred while resetting password.", { position: "top-right" });
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

  <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full h-[500px]">
    
    {/* 🖼️ Left Side - Image Section */}
    <div className="hidden md:flex items-center justify-center w-1/2 h-full bg-gray-100">
      <img src="/fileaccess.jpeg" alt="Reset Password" className="w-full h-full object-cover" />
    </div>

    {/* 🔑 Right Side - Reset Password Form */}
    <Card className="w-full md:w-1/2 h-full flex flex-col justify-center p-8">
      <h2 className="text-3xl font-semibold text-center text-black mb-6">Reset Password</h2>

      <form onSubmit={handleResetPassword} className="space-y-4">
        <Input 
          type={showPassword ? "text" : "password"} 
          placeholder="New Password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          required 
        />
        <Input 
          type={showPassword ? "text" : "password"} 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        
        <div className="flex items-center gap-3">
          <Select value={passwordColor} onValueChange={setPasswordColor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Password Color" />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((color) => (
                <SelectItem key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {passwordColor && (
            <div className="w-10 aspect-square rounded-full border border-gray-400" style={{ backgroundColor: passwordColor }} />
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="showPassword" 
            checked={showPassword} 
            onChange={() => setShowPassword(!showPassword)} 
            className="w-4 h-4 accent-blue-500 cursor-pointer" 
          />
          <label htmlFor="showPassword" className="text-gray-700 text-sm cursor-pointer">Show Password</label>
        </div>

        <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600" disabled={loading}>
          {loading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : "Reset Password"}
        </Button>
      </form>

      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">Remember your password? </span>
        <Link href="/login" className="text-sm font-medium text-blue-500 hover:underline">Login</Link>
      </div>
    </Card>
  </div>
</div>

  
  );
};

export default ResetPasswordPage;





