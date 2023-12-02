import { JobListSkeleton } from "./jobListSkeleton";

export const UserJobsTrackerSkeleton = () => {
  return (
    <>
      <div className="relative mb-8 flex h-[400px] w-[550px] flex-col rounded-lg border-2 border-solid border-[#1A78E6] shadow-lg">
        <div className="border-b-solid flex min-h-[56px] flex-row justify-evenly border-b-2 border-[#1A78E6] py-2 pt-2 text-lg">
          <div className="reflection-wave w-full border-slate-300 bg-gray-600 mx-4 sm:w-4/5 rounded-md"></div>
        </div>
        <div className="overflow-y-hidden p-4">
          <JobListSkeleton />
        </div>
      </div>
    </>
  );
};
