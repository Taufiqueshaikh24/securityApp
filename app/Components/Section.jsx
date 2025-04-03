import Image from "next/image";

export const sections = [

    {
      id: 2,
      title: "SECURE FILE STORAGE",
      content:
        "Our platform ensures your files are safely stored and easily accessible whenever you need them. Whether it’s documents, images, or other important data, our system provides a structured and organized space, giving you control over your files at all times.",
      image: "/filestorage.jpg",
    },
    {
      id: 3,
      title: "MULTI-FILE PREVIEW SUPPORT",
      content:
        "No need to download every file to view its contents! Our system supports previews for various file types, including PDFs, images, and text documents. This feature enhances usability by allowing you to quickly access and review your files directly from the platform.",
      image: "/preview.svg",
    },
    {
      id: 4,
      title: "LARGE FILE UPLOAD SUPPORT",
      content:
        "Upload large files without worry! Our system supports large  file uploads, making it ideal for handling high-resolution images, videos, and other large datasets. With seamless upload functionality, you can store and manage your files efficiently.",
      image: "/multiple.svg",
    },
    // {
    //   id: 5,
    //   title: "PASSWORD-PROTECTED FILE SHARING",
    //   content:
    //     "Easily share your files while keeping them secure with password protection. Set a password before sharing a link, ensuring that only authorized users can access your files. This adds an extra layer of security to your shared content.",
    //   image: "/password-protection.jpg",
    // },
    // {
    //   id: 6,
    //   title: "ACTIVITY TRACKING & ANALYTICS",
    //   content:
    //     "Stay informed about who is accessing your files. Our system logs every download and view, giving you insights into file activity. This feature helps you monitor access and maintain better control over your shared documents.",
    //   image: "/analytics.svg",
    // },
    // {
    //   id: 8,
    //   title: "TWO-FACTOR AUTHENTICATION (2FA)",
    //   content:
    //     "Enhance your account security with two-factor authentication. By enabling 2FA, you add an additional verification step, making it harder for unauthorized users to gain access to your data.",
    //   image: "/2fa.jpg",
    // },
   
  ];
  
  

export default function Section() {
  return (
    <div className="flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 py-8">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`${
            section.image ? "flex flex-col md:flex-row w-full mb-8" : "text-center"
          }`}
        >
          {section.image && (
            <div className="w-full shadow shadow-gray-400">
              <Image
                src={section.image}
                width={0}
                height={0}
                sizes="100vw"
                // style={{ width: "100%", height: "400px" }}
                className="w-full h-[300px] md:h-[450px]"
                alt={`cover-${index}`}
              />
            </div>
          )}
          <div
            className={`${
              section.image
                ? "w-full flex flex-col justify-center items-center shadow-2xl p-6"
                : ""
            }`}
          >
            <h2 className="text-2xl font-bold text-center">{section.title}</h2>
            <p className="mb-2 mt-6 px-2 md:px-4 lg:px-8 text-center">
              {section.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}