import { Dialog } from "@headlessui/react";
import type { Post } from "@prisma/client";
import { JobPreview } from "./JobList";
import {
  DislikeButton,
  LikeButton,
  MarkAppliedButton,
  OriginalPostButton,
} from "./jobListingButtons";
import { useState } from "react";
import { useModal } from "~/context/modalContext";

export const JobListingModal: React.FC<{ post: Post }> = ({ post }) => {
  const [isOpen, setIsOpen] = useModal(post.id);
  const [imageError, setImageError] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={
        "fixed left-1/2 top-1/2 max-h-screen min-w-full -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-solid border-[#1A78E6] bg-white text-black md:max-h-[85%] xl:min-w-fit"
      }
    >
      <Dialog.Panel>
        <Dialog.Title
          className={
            "flex flex-wrap justify-between border-b-2 border-[#1A78E6] p-2 text-center text-lg font-semibold sm:flex-nowrap"
          }
        >
          <div className="pb-1 md:pr-2">
            <JobPreview {...post} />
          </div>

          <div className="flex w-full flex-wrap items-center justify-evenly sm:pl-2 lg:w-auto lg:flex-nowrap">
            <div className="flex flex-wrap items-center gap-1 md:pl-2 lg:flex-nowrap">
              <OriginalPostButton url={post.url} />
              <MarkAppliedButton post={post} />
            </div>
            <div className="flex flex-wrap items-center gap-1 md:pl-2 lg:flex-nowrap">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 transition-all hover:bg-red-700">
                <DislikeButton post={post} />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 transition-all hover:bg-green-700">
                <LikeButton post={post} />
              </div>
            </div>
          </div>
        </Dialog.Title>
        <div className="overflow-y-scroll">
          <Dialog.Description className={"flex flex-col items-center py-2"}>
            {post.logo && !imageError && (
              <img
                src={post.logo}
                alt={`${post.company} Logo`}
                width={50}
                height={50}
                className="mb-1"
                onLoad={() => console.log("Image loaded successfully")}
                onError={() => {
                  console.log("Error loading image");
                  setImageError(true);
                }}
              />
            )}

            <h2 className="mb-1 text-lg font-semibold">Job Description</h2>
            <div className="max-h-screen md:max-h-[400px]">
              <p className="px-3 md:px-4 pb-4">
                {post?.jobDescription}
              </p>
            </div>
          </Dialog.Description>
        </div>
        <div className="absolute bottom-0 right-0 mb-[-2px] w-full rounded-b-lg bg-[#1A78E6] px-4 py-1 text-right text-white md:static md:mb-0">
          <button className="hover:underline" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
