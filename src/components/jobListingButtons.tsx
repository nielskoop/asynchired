import Image from "next/image";
import type { Post } from "@prisma/client";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

export const OriginalPostButton = (props: {url: string}) => {
  return (
      <button className="h-min rounded-xl bg-[#1A78E6] px-2 py-1 text-white">
        See source
      </button>
  );
};

export const MarkAppliedButton = () => {
  return (

      <button className="h-min rounded-xl bg-[#A500CE] px-2 py-1 text-white">
        Mark applied
    </button>
  )
};

export const LikeButton = (post: Post) => {
  const {user} = useUser();
  // const likeMutation = api.user.like.useMutation; I think we can delete?

  console.log("user log: ", user)

  // if (!user) {

  // }
  const ctx = api.useUtils()

  const {mutate, isLoading} = api.user.like.useMutation({
    onSuccess: () => {
      console.log("success!")
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.log("went into onError: ", errorMessage)
    },
  });

  if (isLoading) {
    return <div>Loading...</div>
  }

  async function likePost() {
    console.log("you clicked me");
    // Now use the hook here if needed
    mutate(post.id)
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
  return (
    <button>
      <Image
        src={"/Dislike button.svg"}
        alt="Disike button"
        height={30}
        width={30}
        className="min-w-[30px] m-1"
      />
    </button>
  );
};

