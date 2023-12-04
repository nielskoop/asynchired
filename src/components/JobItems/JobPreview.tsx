import { TagIcon } from "../TagIcon";
import type { Post } from "@prisma/client";

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
