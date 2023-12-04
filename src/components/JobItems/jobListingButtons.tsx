import Image from "next/image";
import type { Post } from "@prisma/client";
import { api } from "~/utils/api";
import { useAuth } from "@clerk/nextjs";
import { LoadingSpinner } from "../Loading";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const OriginalPostButton = (props: { url: string }) => {
  return (
    <Link
      className="h-min rounded-xl bg-[#1A78E6] px-2 py-1 text-white focus-visible:outline-none"
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      See source
    </Link>
  );
};

// APPLY BUTTON

export const MarkAppliedButton = (props: { post: Post }) => {
  const { userId } = useAuth();

  // const ctx = api.useUtils();
  const { data: userDetails, isLoading: applyLoading } =
    api.user.getUser.useQuery(userId);

  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setApplied(userDetails?.appliedPosts.includes(props.post.id));
    }
  }, [userDetails, props.post.id]);

  const { mutate: apply } = api.user.apply.useMutation({
    onSuccess: () => {
      console.log("success!");
      setApplied(!applied);
      api.user.getUser.useQuery(userId);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.log("Request went into onError: ", errorMessage);
    },
  });

  const { mutate: unApply, isLoading: unApplyLoading } =
    api.user.unApply.useMutation({
      onSuccess: () => {
        console.log("success!");
        setApplied(!applied);
        api.user.getUser.useQuery(userId);
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        console.log("Request went into onError: ", errorMessage);
      },
    });

  async function appliedPost() {
    console.log("you clicked me user: ", userId);
    if (!userId) {
      // fix this so it goes back to the same page
      toast.error("Log-in to use this feature", {
        icon: "🔒", // Optional: add an emoji or custom icon
        style: {
          borderRadius: "10px",
          background: "#E61A1A",
          color: "#fff",
        },
      });
      return;
    } else if (userDetails?.appliedPosts.includes(props.post.id) && applied) {
      unApply({ postId: props.post.id, userId: userId });
    } else {
      apply({ postId: props.post.id, userId: userId });
    }
  }
  if (applyLoading || unApplyLoading) {
    return <LoadingSpinner />;
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

// LIKE BUTTON
export const LikeButton = (props: { post: Post }) => {
  const { userId } = useAuth();
  const { data: userDetails, isLoading: likeLoading } =
    api.user.getUser.useQuery(userId);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setIsLiked(userDetails?.likedPosts.includes(props.post.id));
    }
  }, [userDetails, props.post.id]);

  const { mutate: like } = api.user.like.useMutation({
    onSuccess: () => {
      console.log("success!");
      setIsLiked(!isLiked);
      api.user.getUser.useQuery(userId);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.log("Request went into onError: ", errorMessage);
    },
  });

  const { mutate: unLike, isLoading: unLikeLoading } =
    api.user.unLike.useMutation({
      onSuccess: () => {
        console.log("success!");
        setIsLiked(!isLiked);
        api.user.getUser.useQuery(userId);
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        console.log("Request went into onError: ", errorMessage);
      },
    });

  async function likePost() {
    console.log("you clicked me user: ", userId);
    if (!userId) {
      toast.error("Log-in to use this feature", {
        icon: "🔒", // Optional: add an emoji or custom icon
        style: {
          borderRadius: "10px",
          background: "#E61A1A",
          color: "#fff",
        },
      });
      return;
    } else if (userDetails?.likedPosts.includes(props.post.id) && isLiked) {
      unLike({ postId: props.post.id, userId: userId });
    } else {
      like({ postId: props.post.id, userId: userId });
    }
  }
  if (likeLoading || unLikeLoading) {
    return <LoadingSpinner />;
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

// DISLIKE BUTTON
export const DislikeButton = (props: { post: Post }) => {
  const { userId } = useAuth();
  const { data: userDetails, isLoading: dislikeLoading } =
    api.user.getUser.useQuery(userId);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setIsDisliked(userDetails.dislikedPosts.includes(props.post.id));
    }
  }, [userDetails, props.post.id]);

  const { mutate: dislike } = api.user.dislike.useMutation({
    onSuccess: () => {
      console.log("success!");
      setIsDisliked(!isDisliked);
      api.user.getUser.useQuery(userId);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.log("Request went into onError: ", errorMessage);
    },
  });

  const { mutate: unDislike, isLoading: unDislikeLoading } =
    api.user.unDislike.useMutation({
      onSuccess: () => {
        console.log("success!");
        setIsDisliked(!isDisliked);
        api.user.getUser.useQuery(userId);
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        console.log("Request went into onError: ", errorMessage);
      },
    });

  async function dislikePost() {
    console.log("you clicked me user: ", userId);
    if (!userId) {
      toast.error("Log-in to use this feature", {
        icon: "🔒", // Optional: add an emoji or custom icon
        style: {
          borderRadius: "10px",
          background: "#E61A1A",
          color: "#fff",
        },
      });
      return;
    } else if (
      userDetails?.dislikedPosts.includes(props.post.id) &&
      isDisliked
    ) {
      unDislike({ postId: props.post.id, userId: userId });
    } else {
      dislike({ postId: props.post.id, userId: userId });
    }
  }
  if (dislikeLoading || unDislikeLoading) {
    return <LoadingSpinner />;
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
