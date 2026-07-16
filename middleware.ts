import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// استثناء مسار Inngest
const isPublicRoute = createRouteMatcher(["/api/inngest(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    return; // السماح بالمرور دون فحص Clerk
  }
});

export const config = {
  matcher: [
    // استبعاد مسار Inngest من الميدل وير
    "/((?!api/inngest|_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
