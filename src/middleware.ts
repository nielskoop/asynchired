import { authMiddleware } from "@clerk/nextjs";
// import { api } from "./utils/api";
// import { db } from "./server/db";

export default authMiddleware({
  publicRoutes: ["/", "/api/trpc/post.getAllPosts"],
});

export const config = {
  matcher: ["/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)"],
};



// export default authMiddleware({
//   publicRoutes: ["/", "/api/trpc/post.getAllPosts"],
//   afterAuth: async (auth, req, evt) => {
//     console.log("user log test: " , auth)
//     if (auth.user?.primaryEmailAddressId) {
//       try {
//         const existingUser = db.user.findFirst({
//           where: {
//             id: auth.user?.primaryEmailAddressId
//           }
//         })

//         if (!existingUser && auth.user.emailAddresses[0]) {
//           await db.user.create({
//             data: {
//               id: auth.user?.primaryEmailAddressId,
//           name: `${auth.user?.firstName} ${auth.user?.lastName}`,
//           email: "",
//           job: "",
//           location: "",
//           techStack: "",
//           education: "",
//           profilePicture: auth.user?.imageUrl,
//           likedPosts: [],
//           dislikedPosts: [],
//           appliedPosts: []
//             }
//           })
//         }

//       } catch (error) {

//       }
//     }
//   }
  // afterAuth: async (event) => {
  //   const { user } = event;

  //   try {
  //     // Check if the user already exists in your database based on Clerk user ID
  //     const existingUser = await api.db.user.findUnique({
  //       where: { clerkUserId: user.id },
  //     });

  //     // If the user doesn't exist, create a new user in your database
  //     if (!existingUser) {
  //       await prisma.user.create({
  //         data: {
  //           clerkUserId: user.id,
  //           email: user.email,
  //           name: user.fullName, // Adjust based on your Clerk user object properties
  //           // Add other user data fields as needed
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error during user creation:", error);
  //     // Handle error as needed
  //   }

  //   return event;
  // },
// });

// export const config = {
//   matcher: ["/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)"],
// };