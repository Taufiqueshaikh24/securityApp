import Image from "next/image";

export default function FileAccessFeature() {
  return (
    <div className="relative mx-auto my-16 w-full max-w-6xl rounded-[2rem] bg-white px-10 py-14 shadow-lg shadow-gray-400">
      {/* Grid Layout with Image on the Left and Content on the Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
        {/* Left Section - Image */}
        <div className="flex justify-center order-1 md:order-none">
          <div className="relative w-[300px] md:w-[350px] lg:w-[400px]">
            <Image
              src="/fileaccess.jpeg"
              alt="File Access Tracking"
              width={400}
              height={300}
              className="rounded-lg "
            />
          </div>
        </div>

        {/* Right Section - Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-blue-500 leading-tight">
            Monitor File Access with Ease
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Get insights on how many times your files have been accessed.
            Stay in control and ensure security for your shared documents.
          </p>

          {/* Feature Highlights */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold">
                🔒
              </span>
              <p className="text-gray-700">Secure and private analytics</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white text-lg font-bold">
                📊
              </span>
              <p className="text-gray-700">Detailed file access logs</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
