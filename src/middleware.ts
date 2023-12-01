import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/trpc/post.getAllRoles,post.getAllLocations,post.getAllCompanies,post.getFilteredPosts,post.getAllPosts",
  ],
});

export const config = {
  matcher: ["/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)"],
};
