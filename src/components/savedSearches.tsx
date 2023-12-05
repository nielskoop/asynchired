import { useAuth } from "@clerk/nextjs";
import { JobListSkeleton } from "./jobListSkeleton";
import { api } from "~/utils/api";
import { CompanyInputBox } from "./Inputs/CompanyInputBox";
import { TagWidget } from "~/pages";
import { useState } from "react";

const SavedSearches: React.FC = () => {
  const [searchChoice, setSearchChoice] = useState()
  const { userId } = useAuth();

  // Conditionally fetching data only if userId is available
  const { data: searches, isLoading } = userId
    ? api.search.getSearches.useQuery()
    : { data: null, isLoading: false };

  // Handle loading state
  if (isLoading) return <JobListSkeleton />;

  // Handling case where userId is null or undefined
  if (!userId) return <div>Please log in to view liked jobs.</div>;

  // Handling case where data fetching failed
  if (!searches) return <div>Something went wrong!</div>;

  function handleSelectSearch() {
    setSearchChoice
  }

  return (
    <>
      <div className="p-4 text-center text-2xl font-bold">
        <h2>Your Saved Searches</h2>
      </div>

<div className="relative mx-8 mb-8 flex max-h-[400px] min-h-[400px] flex-col rounded-lg border-2 border-solid border-[#1A78E6] shadow-lg">
  <div id="container" className="flex max-h-full flex-row">
    <div className="overflow-y-auto max-h-[390px] min-w-fit p-4">
      <ul className="mb-4 flex flex-col items-start justify-start sm:mx-auto">
        {searches.map((search) => (
          <li className="flex w-full flex-row items-center justify-between border-b border-slate-300 shadow-sm">
            <button className="mr-4 cursor-pointer text-start"
            onClick={(search) => {handleSelectSearch}}
            >
              {search.name}
            </button>
            <div className="mr-4 flex flex-col">
                  <button>E</button>
                  <button>D</button>
                </div>
              </li>)

              )}
            </ul>
          </div>
          <div id="filtersAndTags" className="w-full">
            <div id="searchName" className="text-center">
              <h1 className="font-bold text-xl">Title of Search</h1>
            </div>
            <div id="filters">
              <h2 className="font-bold text-lg">Filters</h2>
              <CompanyInputBox />
              <CompanyInputBox />
              <CompanyInputBox />
            </div>
            <div id="tags">
              <h2 className="font-bold text-lg">Tags</h2>
              <TagWidget />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SavedSearches;
