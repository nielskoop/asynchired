import React, { useEffect, useState } from "react";
import type { Post } from "@prisma/client";
import { api } from "~/utils/api";
import { LoadingPage } from "./Loading";
import { TagIcon } from "./TagIcon";

export function JobListing(post: Post) {
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
    <div className="flex justify-between border-b border-slate-300 p-3 sm:mt-3 sm:rounded-2xl sm:border-x sm:border-t">
      <div>
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
      </div>
      {screenSize && screenSize > 767 && (
        <div className="mr-4 flex gap-4">
          {screenSize && screenSize > 1200 && (
            <>
              <button />
              <button>Mark as applied</button>
            </>
          )}
          <button>Dislike</button>
          <button>Like</button>
        </div>
      )}
    </div>
  );
}

export default function JobList() {
  const { data, isLoading } = api.post.getAllPosts.useQuery();

  if (isLoading) return <LoadingPage />;
  if (!data) return <div>Something went wrong!</div>;

  return (
    <>
      {data.map((post) => {
        return (
          <div className="sm:mx-auto sm:w-4/5">
            <JobListing {...post} key={post.id} />
          </div>
        );
      })}
    </>
  );
}
