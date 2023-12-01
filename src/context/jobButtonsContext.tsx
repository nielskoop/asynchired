// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { api } from "~/utils/api";
import type { ReactNode } from "react";

interface PostContextProps {
  children: ReactNode;
}

// const UserPostInteractionContext = createContext(null);

// export const useUserPostInteraction = () =>
//   useContext(UserPostInteractionContext);

// export const UserPostInteractionProvider: React.FC<PostContextProps> = ({
//   children,
// }) => {
//   const { user } = useUser();
//   const { data: userDetails } = api.user.getUserById.useQuery();

//   const [isLiked, setIsLiked] = useState(false);
//   const [isDisliked, setIsDisliked] = useState(false);
//   const [applied, setApplied] = useState(false);

//   // useEffect(() => {
//   //   if (userDetails) {
//   //     setIsLiked(userDetails.likedPosts.includes(props.post.id));
//   //     setIsDisliked(userDetails.dislikedPosts.includes(props.post.id));
//   //     setApplied(userDetails.appliedPosts.includes(props.post.id));
//   //   }
//   // }, [userDetails]);

//   const value = {
//     isLiked,
//     setIsLiked,
//     isDisliked,
//     setIsDisliked,
//     applied,
//     setApplied,
//   };

//   return (
//     <UserPostInteractionContext.Provider value={value}>
//       {children}
//     </UserPostInteractionContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect } from "react";
import type { Post } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

interface UserPostInteractionContextProps {
  isLiked: boolean;
  setIsLiked: (liked: boolean) => void;
  isDisliked: boolean;
  setIsDisliked: (disliked: boolean) => void;
  applied: boolean;
  setApplied: (applied: boolean) => void;
}

const UserPostInteractionContext =
  createContext<UserPostInteractionContextProps | null>(null);

export const useUserPostInteraction = () =>
  useContext(UserPostInteractionContext);

export const UserPostInteractionProvider: React.FC<PostContextProps> = ({
  children,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);

  const value = {
    isLiked,
    setIsLiked,
    isDisliked,
    setIsDisliked,
    applied,
    setApplied,
  };

  return (
    <UserPostInteractionContext.Provider value={value}>
      {children}
    </UserPostInteractionContext.Provider>
  );
};