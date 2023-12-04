import React, { useState } from "react";
import { api } from "~/utils/api";
import { JobListSkeleton } from "../jobListSkeleton";
import { useFilter } from "~/context/FilterContext";
import { JobListing } from "../JobItems/JobListing";

export default function JobList() {
  const {
    locationFilter,
    roleFilter,
    companyFilter,
    salaryFilter,
    descriptionFilter,
  } = useFilter();

  const queryParameters = {
    location: locationFilter,
    role: roleFilter,
    company: companyFilter,
    salary: salaryFilter,
    description: descriptionFilter,
  };

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    api.post.getFilteredPosts.useInfiniteQuery(
      {
        limit: 5,
        ...queryParameters,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  // TODO: FIX issue where someone opening the site for the first time (maybe only in prod?) fails to load this and goes to "something went wrong"
  if (isLoading) return <JobListSkeleton />;
  if (!data) return <div>Something went wrong!</div>;

  return (
    <>
      {data?.pages.map((page, i) => {
        <div key={i}>
          {page.posts.map((post) => (
            <div className="sm:mx-auto sm:w-4/5" key={post.id}>
              <JobListing {...post} />
            </div>
          ))}
        </div>;
      })}
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage
          ? "Loading more ..."
          : (data?.pages.length ?? 0) < 3
            ? "Load more"
            : "Nothing more to load"}
      </button>
    </>
  );
}
