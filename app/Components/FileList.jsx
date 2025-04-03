// "use client";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Eye, Download, Trash2, Share2 } from "lucide-react"; // Icons

// export default function FileTable() {
//   const [files, setFiles] = useState([]);

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

//   const handleDelete = async (fileId) => {
//     try {
//       const res = await fetch(`/api/v1/files/${fileId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to delete file");

//       toast.success("✅ File deleted successfully");
//       setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
//     } catch (error) {
//       toast.error("❌ Error deleting file");
//     }
//   };

//   const handleShare = async (fileId) => {
//     const shareLink = `${window.location.origin}/files/${fileId}`;
//     try {
//       await navigator.clipboard.writeText(shareLink);
//       toast.success("🔗 Link copied to clipboard!");
//     } catch (error) {
//       toast.error("❌ Failed to copy link");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center w-full  px-4">
//       <div className="w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700 text-left text-sm">
//               <th className="p-3">Filename</th>
//               <th className="p-3">Size</th>
//               <th className="p-3">Uploaded On</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {files.length > 0 ? (
//               files.map((file) => (
//                 <tr key={file._id} className="border-b hover:bg-gray-100">
//                   <td className="p-3">{file.filename}</td>
//                   <td className="p-3">{(file.length / 1024).toFixed(2)} KB</td>
//                   <td className="p-3">{new Date(file.uploadDate).toLocaleString()}</td>
//                   <td className="p-3 flex justify-center space-x-2">
//                     {/* View */}
//                     <a href={`/api/v1/preview/${file._id}`} target="_blank" rel="noopener noreferrer">
//                       <Button variant="ghost" size="icon">
//                         <Eye className="w-5 h-5 text-blue-600" />
//                       </Button>
//                     </a>

//                     {/* Download */}
//                     <a href={`/api/v1/files/${file._id}?download=true`} download>
//                       <Button variant="ghost" size="icon">
//                         <Download className="w-5 h-5 text-green-600" />
//                       </Button>
//                     </a>

//                     {/* Share */}
//                     <Button variant="ghost" size="icon" onClick={() => handleShare(file._id)}>
//                       <Share2 className="w-5 h-5 text-gray-600" />
//                     </Button>

//                     {/* Delete */}
//                     <Button variant="ghost" size="icon" onClick={() => handleDelete(file._id)}>
//                       <Trash2 className="w-5 h-5 text-red-600" />
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-5 text-center text-gray-500">
//                   No files uploaded yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }






// "use client";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Eye, Download, Trash2, Share2 } from "lucide-react"; // Icons

// export default function FileTable() {
//   const [files, setFiles] = useState([]);
//   const [previewUrl, setPreviewUrl] = useState(null);  // For previewing files in the same page

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

//   const handleDelete = async (fileId) => {
//     try {
//       const res = await fetch(`/api/v1/files/${fileId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to delete file");

//       toast.success("✅ File deleted successfully");
//       setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
//     } catch (error) {
//       toast.error("❌ Error deleting file");
//     }
//   };

//   const handleShare = async (fileId) => {
//     const shareLink = `${window.location.origin}/files/${fileId}`;
//     try {
//       await navigator.clipboard.writeText(shareLink);
//       toast.success("🔗 Link copied to clipboard!");
//     } catch (error) {
//       toast.error("❌ Failed to copy link");
//     }
//   };

//   // Handle file preview in the modal or inline
//   const handlePreview = async (fileId) => {
//     try {
//       const res = await fetch(`/api/v1/preview/${fileId}`, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to fetch preview");

//       const fileBlob = await res.blob();
//       const fileUrl = URL.createObjectURL(fileBlob);
//       setPreviewUrl(fileUrl);
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
//                       <Button variant="ghost" size="icon" onClick={() => handlePreview(file._id)}>
//                         <Eye className="w-5 h-5 text-blue-600" />
//                       </Button>

//                       {/* Download */}
//                       <a href={`/api/v1/files/${file._id}?download=true`} download>
//                         <Button variant="ghost" size="icon">
//                           <Download className="w-5 h-5 text-green-600" />
//                         </Button>
//                       </a>

//                       {/* Share */}
//                       <Button variant="ghost" size="icon" onClick={() => handleShare(file._id)}>
//                         <Share2 className="w-5 h-5 text-gray-600" />
//                       </Button>

//                       {/* Delete */}
//                       <Button variant="ghost" size="icon" onClick={() => handleDelete(file._id)}>
//                         <Trash2 className="w-5 h-5 text-red-600" />
//                       </Button>
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

//       {previewUrl && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded-lg">
//             <button onClick={() => setPreviewUrl(null)} className="text-red-600">
//               Close Preview
//             </button>
//             <div className="mt-4">
//               {previewUrl.endsWith(".pdf") ? (
//                 <embed src={previewUrl} width="600" height="400" type="application/pdf" />
//               ) : (
//                 <img src={previewUrl} alt="File Preview" className="max-w-full max-h-96" />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// this one is working perfectly fine just to preview doc file we have to 

"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Eye, Download, Trash2, Share2 , X, ScanSearch } from "lucide-react"; // Icons
import { Dialog, DialogContent, DialogClose , DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ShareModal from "../Components/ShareModel"
import { FaEye, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



export default function FileTable() {
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState("");
  const [previewContent, setPreviewContent] = useState(""); // For text file content
  const [selectedFile, setSelectedFile] = useState(null);
  const [open , setOpen ] = useState(false);
  const [shareLink, setShareLink] = useState(null);
  const [accessCounts, setAccessCounts] = useState({});








  useEffect(() => {
    const fetchAccessCounts = async () => {
      try {
        const res = await fetch("/api/v1/getcount");
        const data = await res.json();
  
        if (res.ok) {
          // Convert array to object { fileId: accessCount }
          const accessData = {};
          data.links.forEach((link) => {
            accessData[link.fileId] = link.accessCount;
          });
  
          setAccessCounts(accessData);
        } else {
          toast.error("❌ Failed to fetch access counts.");
        }
      } catch (error) {
        console.error("🚨 Error fetching access counts:", error);
        toast.error("❌ Error loading access counts.");
      }
    };
  
    fetchAccessCounts();
  }, []);
  




  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/v1/files", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch files");

      const data = await res.json();
      setFiles(data.files);
    } catch (error) {
      toast.error("❌ Error loading files");
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const res = await fetch(`/api/v1/files/${fileId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete file");

      toast.success("✅ File deleted successfully");
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
    } catch (error) {
      toast.error("❌ Error deleting file");
    }
  };

  // const handleOpenShare = async (fileId , filename  , password , Link) => {
  //   // const shareLink = `${window.location.origin}/files/${fileId}`;
  //   // try {
  //   //   await navigator.clipboard.writeText(shareLink);
  //   //   toast.success("🔗 Link copied to clipboard!");
  //   // } catch (error) {
  //   //   toast.error("❌ Failed to copy link");
  //   // }
  //   // const shareLink = `${window.location.origin}/access/${fileId}`
  //   console.log()
  //   if(password){
  //      await navigator.clipboard.writeText(shareLink)
  //          toast.success("🔗 Link copied to clipboard!");
  //   }else{
  //     setSelectedFile({ _id: fileId, filename });
  //     setOpen(true);
  //   }
  // };




  const handleOpenShare = async (fileId, filename , password , color) => {
    try {
      // Step 1: Check if a shareable link already exists
      const res = await fetch(`/api/v1/get?fileId=${fileId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
  
      if (res.ok && data.success) {
        // Step 2: If link exists, copy it to clipboard
        // const shareLink = `${window.location.origin}${data.url}`;
        const shareLink = `
        url : ${window.location.origin}${data.url}
        password : ${password}
        color : ${color}
        `;
        await navigator.clipboard.writeText(shareLink);
        toast.success("🔗 Link copied to clipboard!");
      } else {
        // Step 3: If no link exists, open the modal to create one
        setSelectedFile({ _id: fileId, filename });
        setOpen(true);
      }
    } catch (error) {
      console.error("🚨 Error handling share operation:", error);
      toast.error("❌ Failed to check share link");
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
      const res = await fetch(`/api/v1/preview/${fileId}`, {
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
    } catch (error) {
      toast.error("❌ Error fetching file preview");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full px-4">
        <div className="w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left text-sm">
                <th className="p-3">Filename</th>
                <th className="p-3">Size</th>
                <th className="p-3">Uploaded On</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ? (
                files.map((file) => (
                  <tr key={file._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{file.filename}</td>
                    <td className="p-3">{(file.length / 1024).toFixed(2)} KB</td>
                    <td className="p-3">{new Date(file.uploadDate).toLocaleString()}</td>
                    <td className="p-3 flex justify-center space-x-2 ">
                      {/* View (Preview) */}
                      <Button variant="ghost" className="cursor-pointer" size="icon" onClick={() => handlePreview(file._id, file.filename)}>
                        <ScanSearch className="w-5 h-5 text-blue-600" />
                      </Button>

                      {/* Download */}
                      <a href={`/api/v1/files/${file._id}?download=true`} download>
                        <Button variant="ghost" size="icon" className="cursor-pointer">
                          <Download className="w-5 h-5 text-green-600" />
                        </Button>
                      </a>

                      {/* Share */}
                        <Button variant="ghost" className="cursor-pointer" size="icon" onClick={() => handleOpenShare(file._id , file.filename ,  file.metadata.password , file.metadata.color )}>
                          <Share2 className="w-5 h-5 text-gray-600" />
                        </Button>
                        
                

                      {/* Delete */}
                      <Button variant="ghost" className="cursor-pointer" size="icon" onClick={() => handleDelete(file._id)}>
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </Button>



                      <Button variant="ghost" className="cursor-pointer flex items-center gap-1" size="icon">
                        <FaRegEye className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm font-medium">{accessCounts[file._id] || 0}</span>
                      </Button>




                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-5 text-center text-gray-500">
                    No files uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* Render Share Modal */}
      {selectedFile && (
        <ShareModal
          fileId={selectedFile._id}
          filename={selectedFile.filename}
          open={open}
          onClose={() => setOpen(false)}
          
        />
      )}


      <Dialog 
  open={!!previewUrl || fileType === "text"} 
  onOpenChange={() => { 
    setPreviewUrl(null);
    setPreviewContent("");
    setFileType("");
  }}
>
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
}










