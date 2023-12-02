import { JobListing } from "./JobList";
import { api } from "~/utils/api";
import { useButton } from "~/context/buttonContext";
import { UserJobsTrackerSkeleton } from "./userJobsTrackerSkeleton";

export const UserJobsTracker: React.FC = () => {
 const {actionButton, setActionButton } = useButton();
 const { data: allPosts, isLoading: allPostsLoading, error: allPostsError } = api.post.getAllPosts.useQuery();
 const { data: userDetails, isLoading: userDetailsLoading, error: userDetailsError } = api.user.getUserById.useQuery();
  if (allPostsLoading || userDetailsLoading) {
    return <UserJobsTrackerSkeleton/>;
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



const handleApplied = () => {
    setActionButton('applied');

  };
  const handleLiked = () => {
    setActionButton('liked');

  };
  const handleDisliked = () => {
    setActionButton('disliked');

  };


  let jobs = allPosts.filter((job) => userDetails.likedPosts.includes(job.id));
  if(actionButton === 'liked') {
    jobs = allPosts.filter((job) => userDetails.likedPosts.includes(job.id));
  } else if (actionButton === 'applied') {
    jobs = allPosts.filter((job) => userDetails.appliedPosts.includes(job.id));
  } else {
    jobs = allPosts.filter((job) => userDetails.dislikedPosts.includes(job.id));
  }

  return (
    <>
      <div className="w-[550px] h-[400px] relative mb-8 flex flex-col rounded-lg border-2 border-solid border-[#1A78E6] shadow-lg">
        <ul className="border-b-solid flex flex-row justify-evenly border-b-2 py-2 border-[#1A78E6] pt-2 text-lg">
          <li>
            <button
              onClick={handleApplied}
              style={{ backgroundColor: actionButton === 'applied' ? '#1E3A8A' : '#4299E1' }}
              className="bg-blue-500 text-white px-4 py-1 font-semibold rounded-md border border-blue-700 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
            >
              <span className="mr-2">📄</span> Applied
            </button>
          </li>
          <li>
            <button
              onClick={handleLiked}
              style={{ backgroundColor: actionButton === 'liked' ? '#1E3A8A' : '#4299E1' }}
              className="bg-blue-500 text-white px-4 py-1 font-semibold rounded-md border border-blue-700 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
            >
              <span className="mr-2">❤️</span> Liked
            </button>
          </li>
          <li>
            <button
              onClick={handleDisliked}
              style={{ backgroundColor: actionButton === 'disliked' ? '#1E3A8A' : '#4299E1' }}
              className="bg-blue-500 text-white px-4 py-1 font-semibold rounded-md border border-blue-700 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
            >
              <span className="mr-2">👎</span> Disliked
            </button>
          </li>
        </ul>
        <div className="overflow-y-auto p-4">
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


