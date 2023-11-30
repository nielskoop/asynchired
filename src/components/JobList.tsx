import React from "react";
import type { Post } from "@prisma/client";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { JobListingModal } from "./jobListingModal";
import { LoadingPage } from "./Loading";
import { TagIcon } from "./TagIcon";
import { useModal } from "~/context/modalStore";
import { useFilter } from "~/context/FilterContext";
import {
  LikeButton,
  DislikeButton,
  OriginalPostButton,
  MarkAppliedButton,
} from "./jobListingButtons";

export function JobPreview(post: Post) {
  return (
    <>
      <div className="mb-2">
        <span className="font-bold">{post.title}</span>
        <span className="ml-2 text-xs font-light text-slate-500">
          6 days ago
        </span>
      </div>
      <div className="flex flex-wrap">
        {post.company && (
          <TagIcon
            className="mr-2 gap-[1px] text-sm"
            text={post.company}
            type={"company"}
          />
        )}
        {post.location && (
          <TagIcon
            className="mr-2 gap-[1px] text-sm"
            text={post.location}
            type={"location"}
          />
        )}
        {post.salary && (
          <TagIcon
            className="mr-2 gap-[1px] text-sm"
            text={post.salary}
            type={"salary"}
          />
        )}
      </div>
    </>
  );
}

import useScreenSize from "~/hooks/useScreenSize";

export function JobListing(post: Post) {
  const router = useRouter();
  const currentUrl = router.asPath;
  const [isOpen, setIsOpen] = useModal(post.id);

  const screenSize = useScreenSize();

  return (
    <div className="flex justify-between border-b border-slate-300 p-3 sm:mt-3 sm:rounded-2xl sm:border-x sm:border-t">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <JobPreview {...post} />
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
          <DislikeButton post={post} />
          <LikeButton post={post} />
        </div>
      )}
    </div>
  );
}

export default function JobList() {
  const { locationFilter, roleFilter } = useFilter();

  const queryParameters = {
    location: locationFilter,
    role: roleFilter,
  };

  const { data, isLoading } =
    api.post.getFilteredPosts.useQuery(queryParameters);

  if (isLoading) return <LoadingPage />;
  if (!data) return <div>Something went wrong!</div>;

  return (
    <>
      {data.map((post) => {
        return (
          <div className="sm:mx-auto sm:w-4/5" key={post.id}>
            <JobListing {...post} />
          </div>
        );
      })}
    </>
  );
}
