import { JobListing } from "./JobList";
import { api } from "~/utils/api";
import { useState } from "react";

export const UserJobsTracker = () => {

  const { data: allPosts, isLoading: allPostsLoading, error: allPostsError } = api.post.getAllPosts.useQuery();
  const [changer, setChanger] = useState('Liked');
 const { data: userDetails, isLoading: userDetailsLoading, error: userDetailsError } = api.user.getUserById.useQuery();
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
  if(changer === 'Liked') {
    jobs = allPosts.filter((job) => userDetails.likedPosts.includes(job.id));
  } else if (changer === 'Applied') {
    jobs = allPosts.filter((job) => userDetails.appliedPosts.includes(job.id));
  } else {
    jobs = allPosts.filter((job) => userDetails.dislikedPosts.includes(job.id));
  }
   
  return (
    <>
     <div className="max-h-[396px] relative mb-8 flex flex-col items-center rounded-lg border-2 border-solid border-[#1A78E6] shadow-md">
  <ul className="border-b-solid flex w-full flex-row justify-evenly border-b-2 py-2 border-[#1A78E6] pt-2 text-lg">
    <li>
      <button onClick={ () => {setChanger('Applied')}}
        className="bg-blue-500 text-white px-4 py-1 font-semibold rounded-md border border-blue-700 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
      >
        <span className="mr-2">📄</span> Applied
      </button>
    </li>
    <li>
      <button onClick={ () => {setChanger('Liked')}}
        className="bg-blue-500 text-white px-4 py-1 font-semibold rounded-md border border-blue-700 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
      >
        <span className="mr-2">❤️</span> Liked
      </button>
    </li>
    <li>
      <button onClick={ () => {setChanger('Disliked')}}
        className="bg-blue-500 text-white px-4 py-1 font-semibold rounded-md border border-blue-700 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
      >
        <span className="mr-2">👎</span> Disliked
      </button>
    </li>
  </ul>
  <div className="overflow-y-scroll p-4">
    {jobs.map((post) => (
      <div className="sm:mx-auto sm:w-4/5 mb-4" key={post.id}>
        <JobListing {...post} />
      </div>
    ))}
  </div>
</div>
    </>
  );
};

