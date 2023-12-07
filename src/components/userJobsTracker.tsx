import React from "react";
import LikedJobsList from "./jobLists/LikedJobsList";
import DislikedJobsList from "./jobLists/DislikedJobsList";
import AppliedJobsList from "./jobLists/AppliedJobsList";
import { useButton } from "~/context/buttonContext";

export const UserJobsTracker: React.FC = () => {
  const { selectedList, setSelectedList } = useButton();

  const buttonClass =
    "flex transform items-center rounded-md border border-blue-700 bg-blue-500 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out";
  const activeButtonClass = "bg-blue-700 scale-105";

  return (
    <>
      <div className="relative mb-8 flex h-[400px] flex-col rounded-lg border-2 border-solid border-[#1A78E6] shadow-lg sm:w-[550px]">
        <ul className="border-b-solid flex flex-row justify-evenly border-b-2 border-[#1A78E6] py-2 pt-2 text-lg">
          <li>
            <button
              className={`${buttonClass} ${
                selectedList === "applied" && activeButtonClass
              }`}
              onClick={() => setSelectedList("applied")}
            >
              <span className="mr-2 hidden sm:inline">📄</span> Applied
            </button>
          </li>
          <li>
            <button
              className={`${buttonClass} ${
                selectedList === "liked" && activeButtonClass
              }`}
              onClick={() => setSelectedList("liked")}
            >
              <span className="mr-2 hidden sm:inline">❤️</span> Liked
            </button>
          </li>
          <li>
            <button
              className={`${buttonClass} ${
                selectedList === "disliked" && activeButtonClass
              }`}
              onClick={() => setSelectedList("disliked")}
            >
              <span className="mr-2 hidden sm:inline">👎</span> Disliked
            </button>
          </li>
        </ul>
        <div className="overflow-y-auto p-4">
          <div className="mb-4 sm:mx-auto sm:w-4/5">
            {selectedList === "applied" && <AppliedJobsList />}
            {selectedList === "liked" && <LikedJobsList />}
            {selectedList === "disliked" && <DislikedJobsList />}
          </div>
        </div>
      </div>
    </>
  );
};
