import { clerkMiddleware } from "@clerk/nextjs/server";
//console.log("middle ware file ");
export default clerkMiddleware(async (auth, req) => {
  // نقوم بحماية المسارات التي تحتاج توثيق فقط
  // بدلاً من استخدام createRouteMatcher
  const url = req.nextUrl.pathname;

  // مثال: استثناء مسار inngest والصفحات العامة
  if (url.startsWith("/api/inngest") || url === "/") {
    //console.log("Excluding path from auth protection:", url);
    return;
  }

  // في الإصدارات الجديدة، يمكنك حماية أي مسار هنا
  // await auth.protect();
});

export const config = {
  matcher: [
    // استبعاد الملفات الثابتة والـ Inngest
    "/((?!api/inngest|_next|.*\\..*).*)",
  ],
};
