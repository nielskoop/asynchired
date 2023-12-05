import { useAuth } from "@clerk/nextjs";
import { JobListSkeleton } from "./jobListSkeleton";
import { api } from "~/utils/api";
import { CompanyInputBox } from "./Inputs/CompanyInputBox";
import { useState } from "react";
import Image from "next/image";
import { RoleInputBox } from "./Inputs/RoleInputBox";
import { LocationInputBox } from "./Inputs/LocationInputBox";
import useScreenSize from "~/hooks/useScreenSize";
import { SaveSearchSelect } from "./Inputs/SaveSearchSelect";
import { useFilter } from "~/context/FilterContext";

type Search = {
  id: number;
  userId: string | null | undefined;
  name: String;
  title?: string;
  location?: string;
  company?: string;
  jobDescription?: string;
  salary?: string;
  createdAt?: string;
  updatedAt?: string;
};

const SavedSearches: React.FC = () => {
  const { userId } = useAuth();
  const defaultSearch = { id: 0, userId, name: "Select a saved search" };
  const [searchChoice, setSearchChoice] = useState<Search>(defaultSearch);
  const screenSize = useScreenSize();

  // Conditionally fetching data only if userId is available
  const { data: searches, isLoading } = userId
    ? api.search.getSearches.useQuery()
    : { data: null, isLoading: false };

  const filters = useFilter();

  // Handle loading state
  if (isLoading) return <JobListSkeleton />;

  // Handling case where userId is null or undefined
  if (!userId) return <div>Please log in to view liked jobs.</div>;

  // Handling case where data fetching failed
  if (!searches) return <div>Something went wrong!</div>;

  function handleSelectSearch() {
    setSearchChoice;
  }

  return (
    <>
      <div className="p-4 text-center text-2xl font-bold">
        <h2>Your Saved Searches</h2>
      </div>

      <div className="bg-[#1A78E6]shadow-lg relative mx-8 mb-60 flex max-h-[400px]  min-h-[400px] max-w-fit flex-col justify-center rounded-lg border-2 border-solid border-[#1A78E6] bg-[#1A78E6] shadow-lg sm:flex-row">
          {screenSize! < 640 ? <div className="flex items-center justify-center"><SaveSearchSelect /></div> :
        <div className="max-h-[400px] min-w-fit overflow-y-auto rounded-lg bg-white p-4 sm:rounded-md">
          <ul className="mb-4 flex flex-col items-start justify-start sm:mx-auto">
            {searches.map((search) => (
              <li className="flex w-full flex-row items-center justify-between border-b border-slate-300 shadow-sm">
                <button
                  className="mr-4 cursor-pointer text-start"
                  onClick={(search) => {
                    handleSelectSearch;
                  }}
                  >
                  {search.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
          }
        <div id="filters" className="bg-[#1A78E6] p-4 font-bold text-white">
          <div
            id="searchName"
            className="flex flex-row items-center justify-between border-b text-center"
          >
            <h1 className="text-xl">{searchChoice.name}</h1>
            <div className="flex w-fit flex-col items-end justify-center">
              <button>
                <Image
                  src={"/111-write white.svg"}
                  alt="Edit"
                  height={20}
                  width={20}
                  className="m-1"
                />
              </button>
              <button>
                <Image
                  src={"/002-remove white.svg"}
                  alt="Edit"
                  height={20}
                  width={20}
                  className="m-1"
                />
              </button>
            </div>
          </div>
          <div id="filters" className="my-4 flex h-[80%] flex-col">
            <div className="flex grow flex-col">
              <span className="">I'm looking for</span>
              <RoleInputBox />
            </div>

            <div className="flex grow flex-col">
              <span className="">In</span>
              <LocationInputBox />
            </div>

            <div className="flex grow flex-col">
              <span className="">At</span>
              <CompanyInputBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SavedSearches;
