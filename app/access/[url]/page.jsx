
// "use client";
// import { useState, useEffect } from "react";
// import { Eye, Download } from "lucide-react";
// import { toast } from "sonner";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// export default function FileTable() {
//   const [files, setFiles] = useState([]);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [fileType, setFileType] = useState("");
//   const [previewContent, setPreviewContent] = useState(""); // For text file content
//   const [errorMessage, setErrorMessage] = useState(""); // For error messages

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const fetchFiles = async () => {
//     try {
//       const res = await fetch("/api/v1/files", {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to fetch files");

//       const data = await res.json();
//       setFiles(data.files);
//     } catch (error) {
//       toast.error("❌ Error loading files");
//     }
//   };

//   // Supported file types
//   const supportedFileTypes = [
//     ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg",
//     ".mp4", ".webm", ".ogg", ".mp3", ".wav", ".pdf",
//     ".txt", ".csv", ".log"
//   ];

//   const handlePreview = async (fileId, fileName) => {
//     const fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

//     if (!supportedFileTypes.includes(fileExtension)) {
//       toast.error("❌ This file type is not supported for preview.");
//       return;
//     }

//     try {
//       const res = await fetch(`/api/v1/preview/${fileId}`, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to fetch preview");

//       const fileBlob = await res.blob();

//       if ([".txt", ".csv", ".log"].includes(fileExtension)) {
//         const text = await fileBlob.text();
//         setPreviewContent(text);
//         setFileType("text");
//         setPreviewUrl(null);
//       } else {
//         setPreviewUrl(URL.createObjectURL(fileBlob));
//         setFileType(fileExtension);
//       }
//     } catch (error) {
//       toast.error("❌ Error fetching file preview");
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center items-center w-full px-4">
//         <div className="w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700 text-left text-sm">
//                 <th className="p-3">Filename</th>
//                 <th className="p-3">Size</th>
//                 <th className="p-3">Uploaded On</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {files.length > 0 ? (
//                 files.map((file) => (
//                   <tr key={file._id} className="border-b hover:bg-gray-100">
//                     <td className="p-3">{file.filename}</td>
//                     <td className="p-3">{(file.length / 1024).toFixed(2)} KB</td>
//                     <td className="p-3">{new Date(file.uploadDate).toLocaleString()}</td>
//                     <td className="p-3 flex justify-center space-x-2">
                      
//                       {/* View (Preview) */}
//                       <Button variant="ghost" size="icon" onClick={() => handlePreview(file._id, file.filename)}>
//                         <Eye className="w-5 h-5 text-blue-600" />
//                       </Button>

//                       {/* Download */}
//                       <a href={`/api/v1/files/${file._id}?download=true`} download>
//                         <Button variant="ghost" size="icon">
//                           <Download className="w-5 h-5 text-green-600" />
//                         </Button>
//                       </a>

//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="p-5 text-center text-gray-500">
//                     No files uploaded yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Preview Modal */}
//       <Dialog 
//         open={!!previewUrl || fileType === "text"} 
//         onOpenChange={() => { 
//           setPreviewUrl(null);
//           setPreviewContent("");
//           setFileType("");
//         }}
//       >
//         <DialogContent className="flex flex-col items-center justify-center bg-black bg-opacity-50 p-6">
//           <DialogTitle>File Preview</DialogTitle>

//           <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl flex flex-col items-center">
            
//             {/* File Preview */}
//             <div className="flex justify-center items-center w-full">
//               {fileType === "text" ? (
//                 <div className="p-4 max-w-full max-h-[500px] overflow-auto bg-gray-100 rounded-md shadow-inner border border-gray-300">
//                   <pre className="whitespace-pre-wrap text-gray-800">{previewContent}</pre>
//                 </div>
//               ) : fileType === ".pdf" ? (
//                 <embed src={previewUrl} width="100%" height="500px" type="application/pdf" className="rounded-md border border-gray-300 shadow-md" />
//               ) : [".mp4", ".webm", ".ogg"].includes(fileType) ? (
//                 <video controls className="w-full max-h-[500px] rounded-md shadow-md">
//                   <source src={previewUrl} type="video/mp4" />
//                   Your browser does not support video playback.
//                 </video>
//               ) : [".mp3", ".wav", ".ogg"].includes(fileType) ? (
//                 <audio controls className="w-full">
//                   <source src={previewUrl} type="audio/mp3" />
//                   Your browser does not support audio playback.
//                 </audio>
//               ) : (
//                 <img src={previewUrl} alt="File Preview" className="max-w-full max-h-[500px] rounded-md shadow-md border border-gray-300" />
//               )}
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }







// "use client";
// import { useState } from "react";
// import { useRouter , useParams } from "next/navigation";


// export default function AccessPage({ params }) {
//   const router = useRouter();
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [fileData, setFileData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { url } = useParams(); // Extract the param properly
//   const handleAccessFile = async () => {
//     setLoading(true);
//     setMessage("");
//     try {
//       const res = await fetch(`/api/v1/share/${url}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Error accessing file");

//       setFileData(data);
//       setMessage(`File found: ${data.filename}`);
//     } catch (error) {
//       setMessage(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log(fileData);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h1 className="text-2xl font-bold mb-4">Access File</h1>
//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded mb-3"
//         />
//         <button
//           onClick={handleAccessFile}
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Checking..." : "Access"}
//         </button>
//         {message && <p className="mt-3 text-red-500">{message}</p>}

//         {fileData && (
//           <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
//             <p className="font-semibold">File Name: {fileData.filename}</p>
//             <a
//               href={`/api/v1/files/download/${fileData.fileId}`}
//               download={fileData.filename}
//               className="text-blue-500 hover:underline"
//             >
//               Download File
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState , useEffect} from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Eye, Download, X } from "lucide-react";
import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ColorWheelLogin from "../../Components/Wheel";

const Access = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Preview Modal State
  const [passwordColor , setPasswordColor] = useState("");
  const { url } = useParams(); // Ensure URL param is properly fetched
  const fileId = url


  

  useEffect(() => {
    if (!fileId) return;

    const fetchFileInfo = async () => {
      try {
        const response = await fetch(`/api/v1/publicfile/${fileId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: fileId }), // Send file ID extracted from URL
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch file info");
        }

        setPasswordColor(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFileInfo();
  }, [fileId]); // Run when fileId changes
  
//   console.log(passwordColor)

  const handlePasswordUpdate = (newPassword) => {
    setPassword(newPassword);
  };

  const handleAccess = async () => {
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`/api/v1/share/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Access granted!");
        setFileData(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while accessing.");
    } finally {
      setLoading(false);
    }
  };

  const supportedFileTypes = [
    ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg",
    ".mp4", ".webm", ".ogg", ".mp3", ".wav", ".pdf",
    ".txt", ".csv", ".log"
  ];

  const handlePreview = async (fileId, fileName) => {
    const fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

    if (!supportedFileTypes.includes(fileExtension)) {
      toast.error("❌ This file type is not supported for preview.");
      return;
    }

    try {
      const res = await fetch(`/api/v1/files/preview/${fileId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch preview");

      const fileBlob = await res.blob();

      if ([".txt", ".csv", ".log"].includes(fileExtension)) {
        const text = await fileBlob.text();
        setPreviewContent(text);
        setFileType("text");
        setPreviewUrl(null);
      } else {
        setPreviewUrl(URL.createObjectURL(fileBlob));
        setFileType(fileExtension);
      }

      setIsPreviewOpen(true); // Open the preview modal
    } catch (error) {
      toast.error("❌ Error fetching file preview");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-gradient-to-r from-blue-400 to-blue-600 justify-center min-h-screen h-full p-6">
  <h2 className="text-4xl text-center text-white">Shared File Access</h2>
  
  {!fileData ? (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <div className="mb-6">
        <ColorWheelLogin passwordColor={passwordColor.color} onPasswordUpdate={handlePasswordUpdate} />
      </div>

      <Button onClick={handleAccess} className="w-full bg-black text-white bg-blue-500 hover:bg-blue-600 cursor-pointer">
        {loading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : "Access"}
      </Button>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center w-full px-4 mt-10">
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left text-sm">
                <th className="p-3">Filename</th>
                <th className="p-3">Size</th>
                <th className="p-3">Uploaded On</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fileData ? (
                <tr className="border-b hover:bg-gray-100">
                  <td className="p-3">{fileData.filename || "N/A"}</td>
                  <td className="p-3">{fileData.length ? (fileData.length / 1024).toFixed(2) + " KB" : "Unknown"}</td>
                  <td className="p-3">{fileData.uploadDate ? new Date(fileData.uploadDate).toLocaleString() : "N/A"}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    {/* View (Preview) */}
                    <Button variant="ghost" size="icon" onClick={() => handlePreview(fileData.fileId, fileData.filename)}>
                      <Eye className="w-5 h-5 text-blue-600" />
                    </Button>

                    {/* Download */}
                    <a href={`/api/v1/files/download/${fileData.fileId}?download=true`} download>
                      <Button variant="ghost" size="icon">
                        <Download className="w-5 h-5 text-green-600" />
                      </Button>
                    </a>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4" className="p-5 text-center text-gray-500">
                    No files available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}
</div>


      {/* File Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
      <DialogContent 
    className="flex flex-col items-center justify-center bg-black bg-opacity-50 p-6"
  >
    {/* Hidden Title for Accessibility */}
    <DialogTitle>
      <VisuallyHidden>File Preview</VisuallyHidden>
    </DialogTitle>

    {/* Modal Box */}
    <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl flex flex-col items-center">
      
      {/* Close Button (Properly Positioned & Visible) */}
      {/* <DialogClose 
  className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-gray-300 transition shadow-md"
>
  <X size={20} className="text-white" />
</DialogClose> */}


      {/* File Preview (Centered) */}
      <div className="flex justify-center items-center w-full">
        {fileType === "text" ? (
          <div className="p-4 max-w-full max-h-[500px] overflow-auto bg-gray-100 rounded-md shadow-inner border border-gray-300">
            <pre className="whitespace-pre-wrap text-gray-800">{previewContent}</pre>
          </div>
        ) : fileType === ".pdf" ? (
          <embed src={previewUrl} width="100%" height="500px" type="application/pdf" className="rounded-md border border-gray-300 shadow-md" />
        ) : [".mp4", ".webm", ".ogg"].includes(fileType) ? (
          <video controls className="w-full max-h-[500px] rounded-md shadow-md">
            <source src={previewUrl} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        ) : [".mp3", ".wav", ".ogg"].includes(fileType) ? (
          <audio controls className="w-full">
            <source src={previewUrl} type="audio/mp3" />
            Your browser does not support audio playback.
          </audio>
        ) : (
          <img src={previewUrl} alt="File Preview" className="max-w-full max-h-[500px] rounded-md shadow-md border border-gray-300" />
        )}
      </div>

    </div>
  </DialogContent>
      </Dialog>
    </>
  );
};

export default Access;














