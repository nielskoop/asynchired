import Image from "next/image";
import type { Post } from "@prisma/client";
import { api } from "~/utils/api";
import { useUser, useClerk } from "@clerk/nextjs";
import { LoadingSpinner } from "./Loading";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { useUserPostInteraction } from "~/context/jobButtonsContext";

export const OriginalPostButton = (props: { url: string }) => {
  return (
    <Link
      className="h-min rounded-xl bg-[#1A78E6] px-2 py-1 text-white"
      href={props.url}
    >
      See source
    </Link>
  );
};

export const MarkAppliedButton = (props: { post: Post }) => {
  const { user } = useUser();
  const { navigate } = useClerk();

  // const ctx = api.useUtils();
  const { data: userDetails } = api.user.getUserById.useQuery();
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setApplied(userDetails?.appliedPosts.includes(props.post.id));
    }
  }, [userDetails, props.post.id]);

  const { mutate, isLoading } = api.user.applied.useMutation({
    onSuccess: () => {
      console.log("success!");
      setApplied(!applied);
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
      await navigate("/sign-in");
      return;
    } else if (userDetails?.appliedPosts.includes(props.post.id) && applied) {
      mutate({ postId: props.post.id, action: "undo" });
    } else {
      mutate({ postId: props.post.id, action: "do" });
    }
  }

  return (
    <button
      className={`h-min rounded-xl px-2 py-1 text-white ${
        applied ? "bg-[#00A907]" : "bg-[#A500CE]"
      }`}
      onClick={() => appliedPost()}
    >
      {applied ? "Applied" : "Mark applied"}
    </button>
  );
};

export const LikeButton = (props: { post: Post }) => {
  const { user } = useUser();
  const { navigate } = useClerk();

  const { data: userDetails } = api.user.getUserById.useQuery();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setIsLiked(userDetails?.likedPosts.includes(props.post.id));
    }
  }, [userDetails, props.post.id]);

  const { mutate, isLoading } = api.user.like.useMutation({
    onSuccess: () => {
      console.log("success!");
      setIsLiked(!isLiked);
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
      await navigate("/sign-in");
      return;
    } else if (userDetails?.likedPosts.includes(props.post.id) && isLiked) {
      mutate({ postId: props.post.id, action: "undo" });
    } else {
      mutate({ postId: props.post.id, action: "do" });
    }
  }

  return (
    <button onClick={() => likePost()}>
      <Image
        src={"/like.svg"}
        alt="Like button"
        height={30}
        width={30}
        className={isLiked ? "m-1 min-w-[30px] opacity-50" : "m-1 min-w-[30px]"}
      />
    </button>
  );
};

export const DislikeButton = (props: { post: Post }) => {
  const { user } = useUser();
  const { navigate } = useClerk();

  const { data: userDetails } = api.user.getUserById.useQuery();
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setIsDisliked(userDetails?.dislikedPosts.includes(props.post.id));
    }
  }, [userDetails, props.post.id]);

  const { mutate, isLoading } = api.user.dislike.useMutation({
    onSuccess: () => {
      console.log("success!");
      setIsDisliked(!isDisliked);
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
      await navigate("/sign-in");
      return;
    } else if (
      userDetails?.dislikedPosts.includes(props.post.id) &&
      isDisliked
    ) {
      mutate({ postId: props.post.id, action: "undo" });
    } else {
      mutate({ postId: props.post.id, action: "do" });
    }
  }

  return (
    <button onClick={() => dislikePost()}>
      <Image
        src={"/dislike.svg"}
        alt="Dislike button"
        height={30}
        width={30}
        className={
          isDisliked ? "m-1 min-w-[30px] opacity-50" : "m-1 min-w-[30px]"
        }
      />
    </button>
  );
};
