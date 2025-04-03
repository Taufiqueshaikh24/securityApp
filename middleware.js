// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"; // Import JWT for decoding

// export async function middleware(req) {
//     const { nextUrl, cookies } = req;
//     const pathname = nextUrl.pathname;
//     const token = cookies.get("token")?.value;

//     const authRoutes = ["/login", "/register", "/verifyotp", "/forgotpassword", "/resetpassword" , "/access"];

//     // Function to check if token is expired
//     const isTokenExpired = (token) => {
//         try {
//             const decoded = jwt.decode(token); // Decode without verifying
//             return decoded?.exp * 1000 < Date.now(); // Compare expiration time
//         } catch (error) {
//             return true; // If decoding fails, treat as expired
//         }
//     };

//     // Create a response object
//     let response = NextResponse.next();

//     // If token exists but is expired, clear it and redirect to login
//     if (token && isTokenExpired(token)) {
//         response = NextResponse.redirect(new URL("/login", req.url));
//         response.headers.append(
//             "Set-Cookie",
//             "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict"
//         );
//         return response;
//     }

//     // If user has a token, prevent access to auth pages and redirect to home
//     if (token && authRoutes.includes(pathname)) {
//         return NextResponse.redirect(new URL("/", req.url));
//     }

//     // If user does NOT have a token and is trying to access a protected route, redirect to login
//     if (!token && !authRoutes.includes(pathname)) {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }

//     return response;
// }

// // Apply middleware to all pages (excluding static assets and API routes)
// // export const config = {
// //     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// // };



// export const config = {
//     matcher: [
//         "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)).*)",
//     ],
// };






import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Import JWT for decoding

export async function middleware(req) {
    const { nextUrl, cookies } = req;
    const pathname = nextUrl.pathname;
    const token = cookies.get("token")?.value;

    const authRoutes = ["/login", "/register", "/verifyotp", "/forgotpassword", "/resetpassword" , "/loginotp"
        , '/home' , "/signup"
    ];

    // Function to check if token is expired
    const isTokenExpired = (token) => {
        try {
            const decoded = jwt.decode(token); // Decode without verifying
            return decoded?.exp * 1000 < Date.now(); // Compare expiration time
        } catch (error) {
            return true; // If decoding fails, treat as expired
        }
    };

    // Create a response object
    let response = NextResponse.next();

    // If token exists but is expired, clear it and redirect to login
    if (token && isTokenExpired(token)) {
        response = NextResponse.redirect(new URL("/home", req.url));
        response.headers.append(
            "Set-Cookie",
            "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict"
        );
        return response;
    }

    // Allow "/access/[url]" dynamically without blocking it
    const isAccessRoute = pathname.startsWith("/access/");

    // If user has a token, prevent access to auth pages and redirect to home
    if (token && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // If user does NOT have a token and is trying to access a protected route, redirect to login
    if (!token && !authRoutes.includes(pathname) && !isAccessRoute) {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    return response;
}

// Apply middleware to all pages (excluding static assets, API routes, and dynamic access routes)
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|access/.*|.*\\.(?:png|jpg|jpeg|gif|svg|webp)).*)",
    ],
};
