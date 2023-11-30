import { useUser } from "@clerk/nextjs";
import Link from "next/link";

import { JobListing } from "./JobList";
import { LoadingPage } from "./Loading";
import { api } from "~/utils/api";

export const UserJobsTracker = () => {
  const { user } = useUser();
  const userr: number[] = [1, 2, 3, 5, 6, 7, 8];

  const { data, isLoading } = api.post.getAllPosts.useQuery();

  if (isLoading) return <LoadingPage />;
  if (!data) return <div>Something went wrong!</div>;
  const jobs = data.filter((job) => userr.includes(job.id));
  //making applied liked and disliked button and that could switch the value of jobs
  return (
    <>
      <div className="max-h-[396px] flex-col relative mb-8 flex min-h-[396px] items-center rounded-lg border-2 border-solid border-[#1A78E6] shadow-md">
        <ul className="border-b-solid flex w-full flex-row justify-evenly border-b-2 border-[#1A78E6] py-2 pt-2 text-lg">
          <li>
            <Link
              href={`/${user?.firstName}/applied`}
              className="flex transform items-center rounded-md border border-blue-700 bg-blue-500 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
            >
              <span className="mr-2">📄</span> Applied
            </Link>
          </li>
          <li>
            <Link
              href={`/${user?.firstName}/linked`}
              className="flex transform items-center rounded-md border border-blue-700 bg-blue-500 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
            >
              <span className="mr-2">❤️</span> Liked
            </Link>
          </li>
          <li>
            <Link
              href={`/${user?.firstName}/disliked`}
              className="flex transform items-center rounded-md border border-blue-700 bg-blue-500 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
            >
              <span className="mr-2">👎</span> Disliked
            </Link>
          </li>
        </ul>
        <div className="overflow-y-scroll p-4">
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
