import type { Post } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";
import { LikeButton, DislikeButton, OriginalPostButton, MarkAppliedButton } from "./jobListingButtons";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { JobListingModal } from "./jobListingModal";

export function JobTag(props: { tag: string; type: string }) {
  return (
    <div className="mr-2 flex items-center">
      <Image
        src={`/JobTags/${props.type}.svg`}
        height={20}
        width={20}
        alt={`${props.tag} ${props.type} tag`}
      />
      <span className="text-sm">{props.tag}</span>
    </div>
  );
}

export function JobListing(post: Post) {
  const router = useRouter();
  const currentUrl = router.asPath;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<number>();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-row justify-between border-b border-slate-300 p-4">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="mb-2">
          <span className="font-bold">{post.title}</span>
          <span className="ml-2 text-xs font-light text-slate-500">
            6 days ago
          </span>
        </div>
        <div className="flex flex-wrap">
          {post.company && <JobTag tag={post.company} type={"company"} />}
          {post.location && <JobTag tag={post.location} type={"location"} />}
          {post.salary && <JobTag tag={post.salary} type={"salary"} />}
        </div>
      </div>
      <JobListingModal isOpen={isOpen} setIsOpen={setIsOpen} {...post} />
      {currentUrl === "/" && screenSize && screenSize > 767 && (
        <div className="mr-4 flex items-center gap-4">
          {screenSize && screenSize > 1200 && (
            <>
              <OriginalPostButton url={post.url} />
              <MarkAppliedButton />
            </>
          )}
          <DislikeButton />
          <LikeButton />
        </div>
      )}
    </div>
  );
}

export default function JobList() {
  const { data, isLoading } = api.post.getAllPosts.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Something went wrong!</div>;

  return (
    <>
      {data.map((post) => {
        return <JobListing {...post} key={post.id} />;
      })}
    </>
  );
}
