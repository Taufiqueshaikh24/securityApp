"use client";
import Image from "next/image";
import Link from "next/link";
import Section from "../Components/Section";
import MFASection from "../Components/MFASection";
import FileAccessFeature from "../Components/TrackFileAccess";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="relative w-full h-[500px] flex items-center px-6">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="Hero Background"
            className=""
          />
        </div>

        {/* Content Over Image */}
        <div className="relative z-10 text-white max-w-2xl">
          <h2 className="text-4xl text-blue-500 font-bold mb-4">Secure Your Files with Confidence</h2>
          <p className="text-lg max-w-lg">
            Upload, share, and manage files securely using advanced authentication methods, including our unique color-wheel login system.
          </p>


        </div>
      </header>

      {/* Features Section with New Layout */}
      <div className="relative w-full py-20 px-6 lg:px-20 overflow-hidden">
  {/* Floating Shapes */}
  <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-green-300 to-green-500 opacity-30 rounded-full blur-2xl"></div>
  <div className="absolute bottom-10 right-20 w-24 h-24 bg-gradient-to-br from-purple-300 to-purple-500 opacity-30 rounded-full blur-2xl"></div>
  <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-500 opacity-30 rounded-full blur-2xl"></div>
  <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-gradient-to-br from-red-300 to-red-500 opacity-30 rounded-full blur-2xl"></div>

  {/* Section Title */}
  <h2 className="text-5xl text-blue-500 font-bold text-center mb-12">Our Unique Features</h2>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Card 1 */}
    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-3xl shadow-lg overflow-hidden group">
      <div className="absolute -top-10 -right-10 bg-gradient-to-br from-white/10 to-white/20 w-32 h-32 rounded-full transform rotate-45"></div>
      <h3 className="text-2xl font-semibold mb-2">Secure File Storage</h3>
      <p className="text-sm text-gray-200">
      Your files are stored Securely with our LockMyFile App 
      </p>
    </div>

    {/* Card 2 */}
    <div className="relative bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-3xl shadow-lg overflow-hidden group">
      <div className="absolute top-6 left-6 w-24 h-24 bg-gradient-to-br from-white/10 to-white/20 rounded-lg transform rotate-12"></div>
      <h3 className="text-2xl font-semibold mb-2">Color-Wheel Authentication</h3>
      <p className="text-sm text-gray-200">
        A unique login system using a rotating color-wheel for added security.
      </p>
    </div>

    {/* Card 3 */}
    <div className="relative bg-gradient-to-br from-pink-500 to-red-600 p-6 rounded-3xl shadow-lg overflow-hidden group">
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-br from-white/10 to-white/20 transform -skew-y-6"></div>
      <h3 className="text-2xl font-semibold mb-2">Secure File Sharing</h3>
      <p className="text-sm text-gray-200">
        Share sensitive files with encrypted password-protected links.
      </p>
    </div>
  </div>
</div>



      <Section />

      <MFASection />

      <FileAccessFeature />

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-900 text-white">
        <p>&copy; {new Date().getFullYear()} LockMyFile. All rights reserved.</p>
      </footer>














    </div>











  );
}





