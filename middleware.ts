import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 定义公共路由
const isPublicRoute = createRouteMatcher(['/api/uploadthing']);

export default clerkMiddleware(async(auth, req) => {
  if (!isPublicRoute(req)) {
    // 保护非公共路由
    await auth.protect()
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};