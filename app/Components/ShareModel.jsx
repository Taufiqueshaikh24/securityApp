// "use client";
// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { X } from "lucide-react";
// import { toast } from "sonner";

// export default function ShareModal({ fileId, open, onClose }) {
//   const [password, setPassword] = useState("");
//   const [color, setColor] = useState("");
//   const [shareLink, setShareLink] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleShare = async () => {
//     if (!password || !color) {
//       toast.error("Password and color are required!");
//       return;
//     }

//     setLoading(true);
    
//     try {
//       // Step 1: Save password & color
//       const res = await fetch(`/api/v1/share/set-password/${fileId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ password, color }),
//       });

//       if (!res.ok) throw new Error("Failed to set password!");

//       // Step 2: Generate shareable link
//       const linkRes = await fetch(`/api/v1/share/generate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fileId }),
//       });

//       if (!linkRes.ok) throw new Error("Failed to generate link!");

//       const { url } = await linkRes.json();
//       setShareLink(`${window.location.origin}${url}`);

//       toast.success("Shareable link generated!");
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose} className="bg-white">
//       <DialogContent className="flex flex-col items-center justify-center bg-black bg-opacity-50 p-6">
        
//         {/* Header */}
//         <DialogHeader>
//           <DialogTitle className="text-lg font-semibold">Set Password & Generate Link</DialogTitle>
//         </DialogHeader>

//         {/* Close Button */}
//         {/* <DialogClose className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
//           <X size={20} className="text-gray-700" />
//         </DialogClose> */}

//         {/* Password Input */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//           <Input 
//             type="password" 
//             placeholder="Enter a password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         {/* Color Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Select Color</label>
//           <Select onValueChange={setColor}>
//             <SelectTrigger>
//               <SelectValue placeholder="Choose a color" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="red">Red</SelectItem>
//               <SelectItem value="blue">Blue</SelectItem>
//               <SelectItem value="green">Green</SelectItem>
//               <SelectItem value="yellow">Yellow</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Generate Link Button */}
//         <Button 
//           onClick={handleShare} 
//           className="w-full mt-4"
//           disabled={loading}
//         >
//           {loading ? "Generating..." : "Generate Link"}
//         </Button>

//         {/* Display Generated Link */}
//         {shareLink && (
//           <div className="mt-4 p-3 bg-gray-100 rounded-md">
//             <p className="text-sm text-gray-600">Share this link:</p>
//             <p className="font-medium text-blue-600 break-words">{shareLink}</p>
//           </div>
//         )}

//       </DialogContent>
//     </Dialog>
//   );
// }









// "use client";
// import { useState } from "react";
// import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// export default function ShareModal({ fileId, filename, open, onClose }) {
//   const [password, setPassword] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");

//   const handleShare = () => {
//     console.log("Sharing file:", { fileId, filename, password, selectedColor });
//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
  
  
//     <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full bg-white p-6 rounded-lg shadow-xl">
//       <DialogTitle className="text-lg font-semibold text-center">Share File</DialogTitle>
  
//       {/* Filename (Read-only) */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Filename</label>
//         <Input type="text" value={filename} readOnly className="w-full bg-gray-100 cursor-not-allowed" />
//       </div>
  
//       {/* Password Input */}
//       <div className="mt-3">
//         <label className="block text-sm font-medium text-gray-700">Set Password</label>
//         <Input
//           type="password"
//           placeholder="Enter a password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full"
//         />
//       </div>
  
//       {/* Color Selection */}
//       <div className="mt-3 flex items-center gap-3">
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700">Select Color</label>
//           <Select onValueChange={setSelectedColor}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Choose a color" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="red">Red</SelectItem>
//               <SelectItem value="blue">Blue</SelectItem>
//               <SelectItem value="green">Green</SelectItem>
//               <SelectItem value="yellow">Yellow</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         {/* Color Preview */}
//         {selectedColor && (
//           <div
//             className="w-8 h-8 rounded-full border"
//             style={{ backgroundColor: selectedColor }}
//           />
//         )}
//       </div>
  
//       {/* Share Button */}
//       <DialogFooter>
//         <Button onClick={handleShare} className="w-full mt-4">
//           Generate Link
//         </Button>
//       </DialogFooter>
//     </DialogContent>
//   </Dialog>
  
//   );
// }








// "use client";
// import { useState } from "react";
// import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react"; // Import loader icon

// const colorMap = {
//   yellow: 0,
//   orange: 1,
//   black: 2,
//   red: 3,
//   pink: 4,
//   purple: 5,
//   green: 6,
//   blue: 7,
// };

// export default function ShareModal({ fileId, filename, open, onClose }) {
//   const [password, setPassword] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [shareLink, setShareLink] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClose = () => {
//     setPassword("");
//     setSelectedColor("");
//     setShareLink(null);
//     onClose();
//   };

//   const handleShare = async () => {
//     if (!password || !selectedColor) {
//       toast.error("Password and color are required!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`/api/v1/share/setpassword/${fileId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ password, color: selectedColor }),
//       });

//       if (!res.ok) throw new Error("Failed to set password!");

//       const linkRes = await fetch(`/api/v1/share/generate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fileId }),
//       });

//       if (!linkRes.ok) throw new Error("Failed to generate link!");

//       const { url } = await linkRes.json();
//       setShareLink(`${window.location.origin}${url}`);

//       toast.success("Shareable link generated!");
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleClose}>
//       <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full bg-white p-6 rounded-lg shadow-xl">
//         <DialogTitle className="text-lg font-semibold text-center">Share File</DialogTitle>

//         {/* Filename (Read-only) */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Filename</label>
//           <Input type="text" value={filename} readOnly className="w-full bg-gray-100 cursor-not-allowed text-gray-500" />
//         </div>

//         {/* Password Input */}
//         <div className="mt-3">
//           <label className="block text-sm font-medium text-gray-700">Set Password</label>
//           <Input
//             type={showPassword ? "text" : "password"}
//             placeholder="Hexadecimal password (0-9, a-f)"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full"
//           />
         
//         </div>

//         {/* Color Selection */}
//         <div className="mt-3 flex items-center gap-3">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700">Select Color</label>
//             <Select onValueChange={setSelectedColor} value={selectedColor}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Choose a color" />
//               </SelectTrigger>
//               <SelectContent>
//                 {Object.keys(colorMap).map((colorKey) => (
//                   <SelectItem key={colorKey} value={colorKey}>
//                     {colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Color Preview */}
//           {selectedColor && (
//             <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center mt-5" style={{ backgroundColor: selectedColor }} />
//           )}
//         </div>
//         <div className="flex items-center gap-1 ">
//             <input
//               type="checkbox"
//               checked={showPassword}
//               onChange={() => setShowPassword(!showPassword)}
//               className="cursor-pointer"
//             />
//             <label className="text-sm text-gray-700">Show Password</label>
//           </div>

       

//         {/* Share Button with Loader */}
//         <DialogFooter>
//           <Button onClick={handleShare} className="w-full mt-4 flex items-center justify-center" disabled={loading}>
//             {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Generate Link"}
//           </Button>
//         </DialogFooter>

//         {/* Display Generated Link */}
//         {shareLink && (
//           <div className="mt-4 p-3 bg-gray-100 rounded-md">
//             <p className="text-sm text-gray-600">Share this link:</p>
//             <p className="font-medium text-blue-600 break-words">{shareLink}</p>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }







"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; // Import loader icon

const colorMap = {
  yellow: 0,
  orange: 1,
  black: 2,
  red: 3,
  pink: 4,
  purple: 5,
  green: 6,
  blue: 7,
};

export default function ShareModal({ fileId, filename, open, onClose  }) {
  const [password, setPassword] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generated , setGenerated] = useState("")

  const handleClose = () => {
    setPassword("");
    setSelectedColor("");
    // setShareLink(null);
    onClose();
  };

  const handleShare = async () => {
    if (!password || !selectedColor) {
      toast.error("Password and color are required!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/v1/share/setpassword/${fileId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, color: selectedColor }),
      });

      if (!res.ok) throw new Error("Failed to set password!");

      const linkRes = await fetch(`/api/v1/share/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId }),
      });

      if (!linkRes.ok) throw new Error("Failed to generate link!");
      
      const fileInfo = await fetch(`/api/v1/readfile/${fileId}` , {
          method:'GET', 
          headers: { "Content-Type": "application/json" },
          credentials: "include",
      })
      
      
      const  data  = await fileInfo.json();
      console.log("fileinfo",data)
      const  data2 = data.file[0].metadata

      

      const { url } = await linkRes.json();
      
      // const fullUrl = `${window.location.origin}${url}`;
       const fullUrl = `
        url : ${window.location.origin}${url}
        password : ${password}
        color : ${data2.color}`;

      console.log("uurl", fullUrl);
      setGenerated(fullUrl);

      // Show success toast with the link and copy it to the clipboard
      toast.success("Shareable link generated!");
      // navigator.clipboard.writeText(`${window.location.origin}${url}`).then(() => {
      navigator.clipboard.writeText(`${fullUrl}`).then(() => {
        toast.success("Link copied to clipboard!");
      });

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full bg-white p-6 rounded-lg shadow-xl">
        <DialogTitle className="text-lg font-semibold text-cente text-blue-500">Share File</DialogTitle>

        {/* Filename (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filename</label>
          <Input type="text" value={filename} readOnly className="w-full bg-gray-100 cursor-not-allowed text-gray-500" />
        </div>

        {/* Password Input */}
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700">Set Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Hexadecimal password (0-9, a-f)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Color Selection */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Select Color</label>
            <Select onValueChange={setSelectedColor} value={selectedColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a color" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(colorMap).map((colorKey) => (
                  <SelectItem key={colorKey} value={colorKey}>
                    {colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Preview */}
          {selectedColor && (
            <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center mt-5" style={{ backgroundColor: selectedColor }} />
          )}
        </div>
        
        <div className="flex items-center gap-1 ">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          />
          <label className="text-sm text-gray-700">Show Password</label>
        </div>

        {/* Share Button with Loader */}
        <DialogFooter>
          <Button onClick={handleShare} className="w-full mt-4 flex items-center justify-center bg-blue-500 hover:bg-blue-500 curor-pointer" disabled={loading}>
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Generate Link"}
          </Button>
        </DialogFooter>

        {/* Display Generated Link */}
        {/* {shareLink && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Share this link:</p>
            <p className="font-medium text-blue-600 break-words">{shareLink}</p>
          </div>
        )} */}
      </DialogContent>
    </Dialog>
  );
}
