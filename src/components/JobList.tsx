import type { Post } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

export function JobTag(props: { tag: string; type: string }) {
  return (
    <div className="mr-2 flex items-center gap-[1px]">
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
  return (
    <div className="border-b border-slate-300 p-3">
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
