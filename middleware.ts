import { clerkMiddleware } from "@clerk/nextjs/server";

// كود بسيط يمنع أي عمليات إعادة توجيه تلقائية معقدة في البداية
export default clerkMiddleware();

export const config = {
  matcher: [
    // تشغيل الميدل وير فقط على صفحات الـ API وصفحات محددة، وتجاهل الصفحة الرئيسية تماماً حالياً للاختبار
    "/(api|trpc)(.*)",
  ],
};
