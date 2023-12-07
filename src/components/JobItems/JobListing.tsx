import {
  LikeButton,
  DislikeButton,
  OriginalPostButton,
  MarkAppliedButton,
} from "./jobListingButtons";
import { useModal } from "~/context/modalContext";
import useScreenSize from "~/hooks/useScreenSize";
import { useRouter } from "next/router";
import { JobListingModal } from "./jobListingModal";
import type { Post } from "@prisma/client";
import { JobPreview } from "./JobPreview";

export function JobListing(post: Post) {
  const router = useRouter();
  const currentUrl = router.asPath;
  const [isOpen, setIsOpen] = useModal(post.id);

  const screenSize = useScreenSize();

  return (
    <div className="flex justify-between border-b border-slate-300  p-3 shadow-md sm:mt-3 sm:rounded-2xl sm:border-x sm:border-t">
      <div className="flex gap-4">
        {post.logo && screenSize && screenSize > 1200 && (
          <div>
            <img
              src={post.logo}
              alt={`${post.company} logo`}
              className="h-12 w-12 rounded-full"
            />
          </div>
        )}
        <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <JobPreview {...post} />
        </div>
      </div>
      <JobListingModal post={post} />
      {currentUrl !== "/profile" && screenSize && screenSize > 767 && (
        <div className="mr-4 flex items-center gap-4">
          {screenSize && screenSize > 1200 && (
            <>
              <OriginalPostButton url={post.url} />
              <MarkAppliedButton post={post} />
            </>
          )}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 transition-all hover:bg-red-700">
            <DislikeButton post={post} />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 transition-all hover:bg-green-700">
            <LikeButton post={post} />
          </div>
        </div>
      )}
    </div>
  );
}
