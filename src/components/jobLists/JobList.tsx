import React, { Fragment, useEffect, useRef } from "react";
import { api } from "~/utils/api";
import { JobListSkeleton } from "../LoadingAndSkeletonsAndOverlays/jobListSkeleton";
import { useFilter } from "~/context/FilterContext";
import { JobListing } from "../JobItems/JobListing";
import { useIntersection } from "@mantine/hooks";

export default function JobList() {
  const {
    locationFilter,
    roleFilter,
    companyFilter,
    salaryFilter,
    descriptionFilter,
    dateFilter,
  } = useFilter();

  const queryParameters = {
    location: locationFilter,
    role: roleFilter,
    company: companyFilter,
    salary: salaryFilter,
    description: descriptionFilter,
    datePosted: dateFilter,
  };

  const postQuery = api.post.getFilteredPosts.useInfiniteQuery(
    {
      limit: 5,
      ...queryParameters,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    const nextPage = async () => {
      if (entry?.isIntersecting) await postQuery.fetchNextPage();
    };
    nextPage().catch(console.error);
  }, [entry]);

  // TODO: FIX issue where someone opening the site for the first time (maybe only in prod?) fails to load this and goes to "something went wrong"

  return (
    <>
      {postQuery.isLoading && <JobListSkeleton />}

      {postQuery.data?.pages.map((page, index) => (
        <Fragment key={page.posts[0]?.id ?? index}>
          {page.posts.map((post, index) => {
            if (index === page.posts.length - 1) {
              return (
                <div className="sm:mx-auto sm:w-4/5" key={post.id} ref={ref}>
                  <JobListing {...post} />
                </div>
              );
            } else {
              return (
                <div className="sm:mx-auto sm:w-4/5" key={post.id}>
                  <JobListing {...post} />
                </div>
              );
            }
          })}
        </Fragment>
      ))}

      {!postQuery.hasNextPage && (
        <div className="pt-6 text-center text-slate-500">
          No more jobs to load!
        </div>
      )}
    </>
  );
}
