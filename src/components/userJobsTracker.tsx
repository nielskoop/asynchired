import { JobListing } from "./JobList";
import { api } from "~/utils/api";
import { useState } from "react";

export const UserJobsTracker = () => {
  const {
    data: allPosts,
    isLoading: allPostsLoading,
    error: allPostsError,
  } = api.post.getAllPosts.useQuery();
  const [changer, setChanger] = useState("Liked");
  const {
    data: userDetails,
    isLoading: userDetailsLoading,
    error: userDetailsError,
  } = api.user.getUserById.useQuery();
  if (allPostsLoading || userDetailsLoading) {
    return <p>Loading...</p>;
  }
  if (allPostsError) {
    return <p>Error loading all posts: {allPostsError.message}</p>;
  }
  if (userDetailsError) {
    return <p>Error loading user details: {userDetailsError.message}</p>;
  }
  if (!allPosts) {
    return <p>All posts not found</p>;
  }
  if (!userDetails) {
    return <p>User details not found</p>;
  }

  let jobs = allPosts.filter((job) => userDetails.likedPosts.includes(job.id));
  if (changer === "Liked") {
    jobs = allPosts.filter((job) => userDetails.likedPosts.includes(job.id));
  } else if (changer === "Applied") {
    jobs = allPosts.filter((job) => userDetails.appliedPosts.includes(job.id));
  } else {
    jobs = allPosts.filter((job) => userDetails.dislikedPosts.includes(job.id));
  }

  return (
    <>
      <div className="relative mb-8 flex max-h-[396px] min-h-[396px] flex-col items-center rounded-lg border-2 border-solid border-[#1A78E6] shadow-md">
        <ul className="border-b-solid flex w-full flex-row justify-evenly border-b-2 border-[#1A78E6] py-2 pt-2 text-lg">
          <li>
            <button
              onClick={() => {
                setChanger("Applied");
              }}
              className="flex transform items-center rounded-md border border-blue-700 bg-blue-500 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
            >
              <span className="mr-2">📄</span> Applied
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setChanger("Liked");
              }}
              className="flex transform items-center rounded-md border border-blue-700 bg-blue-500 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
            >
              <span className="mr-2">❤️</span> Liked
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setChanger("Disliked");
              }}
              className="flex transform items-center rounded-md border border-blue-700 bg-blue-500 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
            >
              <span className="mr-2">👎</span> Disliked
            </button>
          </li>
        </ul>
        <div className="overflow-y-auto p-4">
          {jobs.map((post) => (
            <div className="mb-4 sm:mx-auto sm:w-4/5" key={post.id}>
              <JobListing {...post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
