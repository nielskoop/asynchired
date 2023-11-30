import Image from "next/image";
import type { Post } from "@prisma/client";
import { api } from "~/utils/api";
import { useUser, useClerk } from "@clerk/nextjs";
import { LoadingSpinner } from "./Loading";
import Link from "next/dist/client/link";

export const OriginalPostButton = (url: string) => {

  return (
      <Link className="h-min rounded-xl bg-[#1A78E6] px-2 py-1 text-white" href={""}>
        See source
      </Link>
  );
};

export const MarkAppliedButton = (post: Post) => {
  const { user } = useUser();
  const { navigate } = useClerk();

  const ctx = api.useUtils();

  const { mutate, isLoading } = api.user.applied.useMutation({
    onSuccess: () => {
      console.log("success!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.log("Request went into onError: ", errorMessage);
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  async function appliedPost() {
    console.log("you clicked me user: ", user);
    if (!user) {
      // fix this so it goes back to the same page
      navigate("/sign-in");
      return;
    } else {
      mutate(post.id);
    }
  }

  return (
    <button
      className="h-min rounded-xl bg-[#A500CE] px-2 py-1 text-white"
      onClick={() => appliedPost()}
    >
      Mark applied
    </button>
  );
};

export const LikeButton = (post: Post) => {
  const { user } = useUser();
  const { navigate } = useClerk();

  const ctx = api.useUtils();

  const { mutate, isLoading } = api.user.like.useMutation({
    onSuccess: () => {
      console.log("success!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.log("Request went into onError: ", errorMessage);
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  async function likePost() {
    console.log("you clicked me user: ", user);
    if (!user) {
      // fix this so it goes back to the same page
      navigate("/sign-in");
      return;
    } else {
      mutate(post.id);
    }
  }

  return (
    <button onClick={() => likePost()}>
      <Image
        src={"/Like button.svg"}
        alt="Like button"
        height={30}
        width={30}
        className="m-1 min-w-[30px]"
      />
    </button>
  );
};

export const DislikeButton = (post: Post) => {
   const { user } = useUser();
   const { navigate } = useClerk();

   const ctx = api.useUtils();

   const { mutate, isLoading } = api.user.dislike.useMutation({
     onSuccess: () => {
       console.log("success!");
     },
     onError: (e) => {
       const errorMessage = e.data?.zodError?.fieldErrors.content;
       console.log("Request went into onError: ", errorMessage);
     },
   });

   if (isLoading) {
     return <LoadingSpinner />;
   }

   async function dislikePost() {
     console.log("you clicked me user: ", user);
     if (!user) {
       // fix this so it goes back to the same page
       navigate("/sign-in");
       return;
     } else {
       mutate(post.id);
     }
   }

  return (
    <button onClick={() => dislikePost()}>
      <Image
        src={"/Dislike button.svg"}
        alt="Disike button"
        height={30}
        width={30}
        className="m-1 min-w-[30px]"
      />
    </button>
  );
};

