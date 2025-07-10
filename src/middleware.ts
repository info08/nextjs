import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path= request.nextUrl.pathname;

   const isPublicPath = path === '/' || path === '/login' || path === '/signup';
   //const isProfilePath = path.startsWith('/profile/');
   const token = request.cookies.get('token')?.value || '';
   if(isPublicPath && token) {
     // If the user is authenticated and trying to access a public path, redirect to their profile
     const userProfilePath = `/profile/${token}`; // Assuming token contains username or user ID
     return NextResponse.redirect(new URL(userProfilePath, request.nextUrl));
   }

   if (!isPublicPath && !token) {
     // If the user is trying to access a profile page without being authenticated, redirect to login
     return NextResponse.redirect(new URL('/login', request.nextUrl));
   }

//   const isPublicPath = ['/', '/login', '/signup'].includes(path);
//   console.log("Middleware path:", path);
//   console.log("Is public path:", isPublicPath);
//   const isProfilePath = path.startsWith('/profile/');
//   const token = request.cookies.get('token')?.value || '';
//   console.log("Token from cookies:", token);
//   const isAuthenticated = !!token;
//   console.log("Is profile path:", isProfilePath);
//     console.log("Is authenticated:", isAuthenticated);
//   if (isPublicPath && isAuthenticated) {
//     // If the user is authenticated and trying to access a public path, redirect to their profile
//     const userProfilePath = `/profile/${token}`; // Assuming token contains username or user ID
//     return NextResponse.redirect(new URL(userProfilePath, request.url));
//   }
//   if (isProfilePath && !isAuthenticated) {
//     // If the user is trying to access a profile page without being authenticated, redirect to login
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/profile/:path*', // Match all profile routes
  ],
}