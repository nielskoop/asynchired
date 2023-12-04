import React from "react";
import { api } from "~/utils/api";
import { LoadingPage } from "../Loading";
import { useAuth } from "@clerk/nextjs";
import { JobListing } from "../JobItems/JobListing";

export default function AppliedJobsList() {
  const { userId } = useAuth();

  // Conditionally fetching data only if userId is available
  const { data, isLoading } = userId
    ? api.user.getApplied.useQuery(userId)
    : { data: null, isLoading: false };

  // Handle loading state
  if (isLoading) return <LoadingPage />;

  // Handling case where userId is null or undefined
  if (!userId) return <div>Please log in to view liked jobs.</div>;

  // Handling case where data fetching failed
  if (!data) return <div>Something went wrong!</div>;

  return (
    <>
      {data.map((post) => (
        <div className="sm:mx-auto sm:w-4/5" key={post.id}>
          <JobListing {...post} />
        </div>
      ))}
    </>
  );
}
