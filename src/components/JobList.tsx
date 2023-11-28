import type { Post } from "@prisma/client";
import React from "react";
import { api } from "~/utils/api";

export function JobListing(post: Post) {
  return (
    <div className="border-b border-slate-300 p-2">
      <div>{post.title} - 6 days ago</div>
      <div>
        {post.company} - {post.location}
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
