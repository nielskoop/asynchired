import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/api/trpc/post.getAllPosts,post.getAllRoles,post.getAllLocations,post.getAllCompanies",
    "/api/trpc/post.getFilteredPosts",
    "/api/trpc/post.getAllPosts",
    "/api/trpc/post.getAllRoles,post.getAllLocations,post.getAllCompanies,post.getFilteredPosts",
    "/api/webhook",
    "/api/trpc/user.getUser",
  ],
});

export const config = {
  matcher: ["/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)"],
};
