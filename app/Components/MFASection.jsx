// "use client";
// import Image from "next/image";

// export default function MFASection() {
//   return (
//     <div className="relative w-full py-20 px-6 lg:px-20 flex flex-col items-center text-center">
//       {/* Floating Shapes for Elegance */}
//       <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-blue-300 to-blue-500 opacity-30 rounded-full blur-2xl"></div>
//       <div className="absolute bottom-10 right-20 w-20 h-20 bg-gradient-to-br from-green-300 to-green-500 opacity-30 rounded-full blur-2xl"></div>

//       {/* Section Title */}
//       <h2 className="text-4xl font-bold text-green-600 mb-6">
//         Multi-Factor Authentication (MFA)
//       </h2>

//       {/* Description */}
//       <p className="text-lg max-w-3xl text-gray-700">
//         Secure your account with an extra layer of protection. Our MFA system
//         ensures that even if your password is compromised, your data remains
//         safe with an additional authentication step.
//       </p>

//       {/* Image */}
//       <div className="mt-10">
//         <Image
//           src="/Logo.jpeg"
//           width={400}
//           height={250}
//           alt="MFA Security"
//           className="rounded-lg shadow-lg"
//         />
//       </div>
//     </div>
//   );
// }





import Image from "next/image";

export default function SecuritySection() {
  return (
    <div className="relative mx-auto  w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start bg-white rounded-[2rem] px-10 py-14 shadow-lg shadow-gray-400">
      
      {/* Left Section - Text Content */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-extrabold text-blue-500">
          Secure Your Files with MFA
        </h2>
        <p className="text-lg text-gray-700">
          Add an extra layer of security with Multi-Factor Authentication. Protect your sensitive data 
          with one-time passcodes and secure access controls.
        </p>

        {/* Feature Highlights */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-5 bg-gray-100 rounded-xl shadow-md">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold">
              🔐
            </span>
            <p className="text-gray-800">Secure your account with extra protection</p>
          </div>
          <div className="flex items-center space-x-4 p-5 bg-gray-100 rounded-xl shadow-md">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold">
              📲
            </span>
            <p className="text-gray-800">Receive one-time authentication codes</p>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 flex justify-center">
        <div className="relative w-[320px] md:w-[400px] h-[240px] md:h-[350px]">
          <Image
            src="/mfa.jpeg"
            alt="Multi-Factor Authentication"
            layout="fill"
            objectFit="cover"
            className="rounded-lg "
          />
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300 opacity-30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-20 w-20 h-20 bg-green-300 opacity-30 rounded-full blur-2xl"></div>
    </div>
  );
}
