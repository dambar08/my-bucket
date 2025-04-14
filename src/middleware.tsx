import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { env } from "./env";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

const isProtectedAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
    // if (!isPublicRoute(req)) {
    //   await auth.protect()
    // }
  },
  { debug: env.NODE_ENV !== "production" && env.CLERK_MIDDLEWARE_DEBUG === "true" },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
