import Image from "next/image";

export const OriginalPostButton = (props: {url: string}) => {
  return (
      <button className="h-min rounded-xl bg-[#1A78E6] px-2 py-1 text-white">
        See original post
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

export const LikeButton = () => {
  return (
    <button>
      <Image
        src={"/Like button.svg"}
        alt="Like button"
        height={30}
        width={30}
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
      />
    </button>
  );
};

