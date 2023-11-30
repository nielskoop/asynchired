import Image from "next/image";
import type { Post } from "@prisma/client";
import { api } from "~/utils/api";
import { useUser, useClerk } from "@clerk/nextjs";
import { LoadingSpinner } from "./Loading";

export const OriginalPostButton = (props: {url: string}) => {
  return (
      <button className="h-min rounded-xl bg-[#1A78E6] px-2 py-1 text-white">
        See source
      </button>
  );
};

export const MarkAppliedButton = () => {
  async function appliedPost() {}

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
  const currentUrl = window.location.href;

  const ctx = api.useUtils();

  const { mutate, isLoading } = api.user.like.useMutation({
    onSuccess: () => {
      console.log("success!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.log("went into onError: ", errorMessage);
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

export const DislikeButton = () => {
  async function dislikePost() { }

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

