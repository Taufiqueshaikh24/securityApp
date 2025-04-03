// import Header from "./Components/Header";
// import FileUpload from "./Components/FileUpload";
// import FileList from "./Components/FileList";

// export default function Home() {
//   return (
//     <div className="min-h-screen w-full flex flex-col items-center">
//       <Header />
//       <main className="mt-20 w-full mt-10">
//         <div className="flex justify-between items-center w-full px-4">
//         <h1 className="text-2xl font-bold text-center mb-4"> Your Files</h1>
//         <FileUpload />
//         </div>
//         <div className="flex justify-cener items-center w-full h-full">
//         <FileList />
//         </div>
        
//       </main>
//     </div>
//   );
// }






import Header from "./Components/Header";
import FileUpload from "./Components/FileUpload";
import FileList from "./Components/FileList";
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-r from-blue-400 to-blue-600">
    <Header />
    <main className="w-full flex flex-col items-center">
      {/* Upload Section */}
      <div className="flex justify-between items-center w-full px-4 mt-4">
        <h1 className="text-2xl font-bold text-center text-white">Your Files</h1>
        <FileUpload />
      </div>
  
      {/* File List Section (Centered on both axes) */}
      <div className="flex justify-center items-center w-full mt-4 mb-10">
        <FileList />
      </div>
    </main>
  </div>
  
  
  );
}
