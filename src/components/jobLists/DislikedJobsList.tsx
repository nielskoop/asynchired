import React from "react";
import { api } from "~/utils/api";
import { JobListSkeleton } from "../LoadingAndSkeletonsAndOverlays/jobListSkeleton";
import { useAuth } from "@clerk/nextjs";
import { JobListing } from "../JobItems/JobListing";

export default function DislikedJobsList() {
  const { userId } = useAuth();

  // Conditionally fetching data only if userId is available
  const { data, isLoading } = userId
    ? api.user.getDisikes.useQuery(userId)
    : { data: null, isLoading: false };

  // Handle loading state
  if (isLoading) return <JobListSkeleton />;

  // Handling case where userId is null or undefined
  if (!userId) return <div>Please log in to view liked jobs.</div>;

  // Handling case where data fetching failed
  if (!data) return <div>Something went wrong!</div>;

  return (
    <>
      {data.map((post) => (
        <div className="mx-auto mb-2 px-2 pt-4 md:px-8 md:pt-0" key={post.id}>
          <JobListing {...post} />
        </div>
      ))}
    </>
  );
}
