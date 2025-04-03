// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
// } from "@/components/ui/dropdown-menu";

// const Header = () => {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   const fetchUserDetails = async () => {
//     try {
//       console.log("🔹 Fetching user details...");

//       const response = await fetch("/api/v1/me", {
//         method: "GET",
//         credentials: "include", // Ensure cookies are sent for authentication
//       });

//       if (!response.ok) {
//         console.warn("⚠ User not authenticated");
//         return;
//       }

//       const data = await response.json();
//       console.log("✅ User Data Fetched:", data);
//       setUser(data);
//     } catch (error) {
//       console.error("❌ Error fetching user details:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await fetch("/api/v1/logout", { method: "POST", credentials: "include" });

//       console.log("✅ User logged out");
//       setUser(null);
//       router.push("/login"); // Redirect to login after logout
//     } catch (error) {
//       console.error("❌ Error during logout:", error);
//     }
//   };

//   const renderUserInitials = (name) => {
//     if (!name) return "G"; // Default to "G" for Guest
//     return name
//       .split(" ")
//       .map((word) => word[0]?.toUpperCase())
//       .join("");
//   };

//   return (
//     <header className="w-full p-4 shadow-md flex justify-between items-center bg-white text-black">
//       <h1 className="text-xl font-semibold">My App</h1>

//       <div className="flex items-center gap-4">
//         {user ? (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <button className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center text-lg font-semibold">
//                 {renderUserInitials(user.name)}
//               </button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         ) : (
//           <Button onClick={() => router.push("/login")} className="bg-black text-white hover:bg-gray-800">
//             Login
//           </Button>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;





// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Loader2, User, LogOut, HomeIcon } from "lucide-react";

// export default function Header() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loggingOut, setLoggingOut] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         setLoading(true);
//         const res = await fetch("/api/v1/me", { credentials: "include" });
//         const data = await res.json();
//         if (res.ok) {
//           setUser(data);
//         }
//       } catch (error) {
//         console.error("User fetch failed:", error);
//         toast.error("Failed to fetch user");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       setLoggingOut(true);
//       const res = await fetch("/api/v1/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       if (res.ok) {
//         toast.success("Logged out successfully");
//         router.push("/login");
//       } else {
//         toast.error("Logout failed");
//       }
//     } catch (error) {
//       toast.error("Logout error");
//     } finally {
//       setLoggingOut(false);
//     }
//   };

//   // Extract initials
//   const initials = user?.name
//   ? user.name.charAt(0).toUpperCase() // Only take the first letter of the name
//   : "U";


//   // Define a set of colors
//   const colors = [
//     "bg-red-500",
//     "bg-green-500",
//     "bg-blue-500",
//     "bg-yellow-500",
//     "bg-purple-500",
//     "bg-pink-500",
//     "bg-teal-500",
//     "bg-orange-500",
//   ];

//   // Generate a color based on the first letter of the initials
//   const colorIndex = initials.charCodeAt(0) % colors.length;
//   const bgColor = colors[colorIndex];

//   return (
//     <>
//       {loggingOut && (
//         <div className="fixed inset-0 flex justify-center items-center bg-white z-[9999] m">
//           <Loader2 className="animate-spin text-black w-10 h-10 " />
//         </div>
//       )}

//       {/* <header className="fixed top-0 left-0 w-full z-10 bg-background shadow-md px-6 py-4 flex items-center justify-between"> */}
//       <header className="  w-full shadow-lg px-6 py-4 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-primary">MyApp</h1>

//         {loading ? (
//           <Loader2 className="animate-spin w-6 h-6 text-gray-700" />
//         ) : user ? (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <button className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-border">
//                 {user?.profileImage ? (
//                   <img
//                     src={user.profileImage || "/default-avatar.png"}
//                     alt="Profile"
//                     className="w-full h-full object-cover rounded-full"
//                   />
//                 ) : (
//                   <span className={`w-full h-full flex items-center justify-center text-white  ${bgColor}`}>
//                     {initials}
//                   </span>
//                 )}
//               </button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end" className="w-48 bg-popover border border-border rounded-lg shadow-lg">
//               {/* Home Item */}
//               <DropdownMenuItem
//                 onClick={() => router.push("/")}
//                 className="hover:bg-accent px-4 py-2 flex items-center gap-2"
//               >
//                 <HomeIcon size={18} className="text-gray-600" /> Home
//               </DropdownMenuItem>

//               {/* Profile Item */}
//               <DropdownMenuItem
//                 onClick={() => router.push("/profile")}
//                 className="hover:bg-accent px-4 py-2 flex items-center gap-2"
//               >
//                 <User size={18} className="text-gray-600" /> Profile
//               </DropdownMenuItem>

//               {/* Logout Item */}
//               <DropdownMenuItem
//                 onClick={handleLogout}
//                 className="hover:bg-accent px-4 py-2 flex items-center gap-2"
//               >
//                 <LogOut size={18} className="text-gray-600" /> Sign Out
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         ) : null}
//       </header>
//     </>
//   );
// }








// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Loader2, User, LogOut, HomeIcon } from "lucide-react";
// import Image from "next/image";
// import { parse } from "cookie";
// import Link from "next/link";

// export default function Header() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loggingOut, setLoggingOut] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         setLoading(true);
//         const res = await fetch("/api/v1/me", { credentials: "include" });
//         const data = await res.json();
//         if (res.ok) {
//           setUser(data);
//         }
//       } catch (error) {
//         console.error("User fetch failed:", error);
//         toast.error("Failed to fetch user");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUser();
//   }, []);



//   const handleLogout = async () => {
//     try {
//       setLoggingOut(true);
//       const res = await fetch("/api/v1/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       if (res.ok) {
//         toast.success("Logged out successfully");
//         router.push("/login");
//       } else {
//         toast.error("Logout failed");
//       }
//     } catch (error) {
//       toast.error("Logout error");
//     } finally {
//       setLoggingOut(false);
//     }
//   };

//   // Extract initials
//   const initials = user?.name
//     ? user.name.charAt(0).toUpperCase() // Only take the first letter of the name
//     : "U";

//   // Define a set of colors
//   const colors = [
//     "bg-red-500",
//     "bg-green-500",
//     "bg-blue-500",
//     "bg-yellow-500",
//     "bg-purple-500",
//     "bg-pink-500",
//     "bg-teal-500",
//     "bg-orange-500",
//   ];

//   // Generate a color based on the first letter of the initials
//   const colorIndex = initials.charCodeAt(0) % colors.length;
//   const bgColor = colors[colorIndex];

//   return (
//     <>
//       {/* Full-screen loader when logging out */}
//       {loggingOut && (
//         <div className="fixed inset-0 flex justify-center items-center bg-white z-[9999]">
//           <Loader2 className="animate-spin text-black w-10 h-10 " />
//         </div>
//       )}

//       {/* 🔥 Fixed & Styled Header */}
//       <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md px-6 flex items-center justify-between z-50">
//         {/* <h1 className="text-2xl font-bold text-primary">MyApp</h1> */}
//         <Link href="/home"><Image src="/Logo2.png" height={0} width={0} sizes="100vw" alt="logo"
//          className="w-[100px] h-[50px] "  /></Link>


//         {loading ? (
//           <Loader2 className="animate-spin w-6 h-6 text-gray-700" />
//         ) : user ? (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <button className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
//                 <span className={`w-full h-full flex items-center justify-center text-white text-lg  ${bgColor}`}>
//                   {initials}
//                 </span>
//               </button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
//               <DropdownMenuItem
//                 onClick={() => router.push("/")}
//                 className="hover:bg-gray-100 px-4 py-2 flex items-center gap-2"
//               >
//                 <HomeIcon size={18} className="text-gray-600" /> Home
//               </DropdownMenuItem>

            
//               <DropdownMenuItem
//                 onClick={handleLogout}
//                 className="hover:bg-gray-100 px-4 py-2 flex items-center gap-2"
//               >
//                 <LogOut size={18} className="text-gray-600" /> Sign Out
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         ) : null}
//       </header>
//     </>
//   );
// }







"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, LogOut, HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch("/api/v1/me", { credentials: "include" });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.error("User fetch failed:", error);
        toast.error("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const res = await fetch("/api/v1/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Logged out successfully");
        setUser(null); // Clear user state on logout
        router.push("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Logout error");
    } finally {
      setLoggingOut(false);
    }
  };

  // Extract initials
  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  // Define a set of colors
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-orange-500",
  ];

  // Generate a color based on the first letter of the initials
  const colorIndex = initials.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <>
      {/* Full-screen loader when logging out */}
      {loggingOut && (
        <div className="fixed inset-0 flex justify-center items-center bg-white z-[9999]">
          <Loader2 className="animate-spin text-black w-10 h-10 " />
        </div>
      )}

      {/* 🔥 Fixed & Styled Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md px-6 flex items-center justify-between z-50">
        {/* Logo */}
        <Link href="/home">
          <Image
            src="/Logo2.png"
            height={0}
            width={0}
            sizes="100vw"
            alt="logo"
            className="w-[100px] h-[60px]"
          />
        </Link>

        {/* Right Side: Either Buttons or User Menu */}
        {loading ? (
          <Loader2 className="animate-spin w-6 h-6 text-gray-700" />
        ) : user ? (
          // User Profile Dropdown
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
                <span className={`w-full h-full flex items-center justify-center text-white text-lg ${bgColor}`}>
                  {initials}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <DropdownMenuItem
                onClick={() => router.push("/")}
                className="hover:bg-gray-100 px-4 py-2 flex items-center gap-2"
              >
                <HomeIcon size={18} className="text-gray-600" /> Home
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="hover:bg-gray-100 px-4 py-2 flex items-center gap-2"
              >
                <LogOut size={18} className="text-gray-600" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // Login & Signup Buttons
          <div className="flex gap-4">
            <Link href="/login">
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg  transition">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg  transition">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
