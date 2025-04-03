// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// const colorOptions = ["yellow", "orange", "red", "pink", "purple", "green", "blue", "black"];

// export default function FileUpload({ userId }) {
//   const [file, setFile] = useState(null);
//   const [password, setPassword] = useState("");
//   const [passwordColor, setPasswordColor] = useState("black");
//   const [message, setMessage] = useState("");
//   const [open, setOpen] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file || !password) {
//       setMessage("File and password are required!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("password", password);
//     formData.append("color", passwordColor);
//     formData.append("userId", userId);

//     const res = await fetch("/api/files/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     setMessage(data.message);
//     setOpen(false); // Close modal after upload
//   };

//   return (
//     <div className="flex justify-center">
//       {/* Upload File Button (Opens Modal) */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button>Upload File</Button>
//         </DialogTrigger>

//         {/* Modal Content */}
//         <DialogContent className="p-6 space-y-6 w-full max-w-md">
//           {/* Modal Title */}
//           <DialogTitle className="text-lg font-semibold text-center">Upload Your File</DialogTitle>

//           {/* File Input */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Select File</label>
//             <Input type="file" onChange={handleFileChange} className="w-full" />
//           </div>

//           {/* Password Input */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Set Password</label>
//             <Input
//               type="text"
//               placeholder="Use hexadecimal values (0-9, A-F)"
//               value={password}
//               onChange={(e) => {
//                 const hexRegex = /^[0-9A-Fa-f]*$/;
//                 if (hexRegex.test(e.target.value)) {
//                   setPassword(e.target.value);
//                 }
//               }}
//               className="w-full"
//             />
//           </div>

//           {/* Color Selection */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Select Color</label>
//             <div className="flex items-center gap-3">
//               <Select onValueChange={setPasswordColor} defaultValue={passwordColor}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select a color" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {colorOptions.map((color) => (
//                     <SelectItem key={color} value={color}>
//                       {color.charAt(0).toUpperCase() + color.slice(1)}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               {/* Color Preview */}
//               <div
//                 className="w-10 aspect-square rounded-full border border-gray-400"
//                 style={{ backgroundColor: passwordColor === "green" ? "#affc41" : passwordColor === "purple" ? "#c77dff" : passwordColor }}
//               />
//             </div>
//           </div>

//           {/* Upload Button */}
//           <DialogFooter>
//             <Button onClick={handleUpload} className="w-full">
//               Upload
//             </Button>
//           </DialogFooter>
          
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }






"use client";
import { useState } from "react";
import { toast } from "sonner"; // Import toast
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react"; // Importing loader icon

export default function FileUpload({ userId }) {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 🔄 Loader state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("❌ Please select a file!", {
        position: "top-right",
        style: { background: "#F87171", color: "white" }, // Red color for error
      });
      return;
    }

    setIsLoading(true); // Start loader

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("contentType", file.type); // ✅ Ensures correct MIME type

    try {
      const res = await fetch("/api/v1/upload", {
        method: "POST",
        credentials: "include", // Important for cookies!
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ File uploaded successfully!", {
          position: "top-right",
          style: { background: "#4ADE80", color: "white" }, // Green color for success
        });

        setTimeout(() => {
          setOpen(false); // Close modal only on success
          window.location.reload();
        }, 1000);
      } else {
        toast.error(`❌ Error: ${data.message || "Upload failed"}`, {
          position: "top-right",
          style: { background: "#F87171", color: "white" }, // Red color for error
        });
      }
    } catch (error) {
      toast.error("❌ Something went wrong. Please try again.", {
        position: "top-right",
        style: { background: "#F87171", color: "white" }, // Red color for error
      });
    } finally {
      setIsLoading(false); // Stop loader in all cases
    }
  };

  return (
    <div className="flex justify-center">
      {/* Upload File Button (Opens Modal) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={'bg-blue-500 text-white hover:bg-blue-500 cursor-pointer'}>Upload File</Button>
        </DialogTrigger>

        {/* Modal Content */}
        <DialogContent className="p-6 space-y-6 w-full max-w-md">
          {/* Modal Title */}
          <DialogTitle className="text-lg font-semibold text-center text-blue-500 ">Upload Your File</DialogTitle>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Select File</label>
            <Input type="file" onChange={handleFileChange} className="w-full" />
          </div>

          {/* Upload Button with Loader */}
          <DialogFooter>
            <Button onClick={handleUpload} className="w-full bg-blue-500 hover:bg-blue-500 cursor-pointer" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
