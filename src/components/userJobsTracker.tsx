import React, { useState } from "react";
import LikedJobsList from "./jobLists/LikedJobsList";
import DislikedJobsList from "./jobLists/DislikedJobsList";
import AppliedJobsList from "./jobLists/AppliedJobsList";

export const UserJobsTracker: React.FC = () => {
  // State to keep track of the currently selected list
  const [selectedList, setSelectedList] = useState("applied");

  return (
    <>
      <div className="relative mb-8 flex h-[400px] w-[550px] flex-col rounded-lg border-2 border-solid border-[#1A78E6] shadow-md">
        <ul className="border-b-solid flex flex-row justify-evenly border-b-2 border-[#1A78E6] py-2 pt-2 text-lg">
          <li>
            <button
              className="flex transform items-center rounded-md border border-blue-700 bg-blue-500 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
              onClick={() => setSelectedList("applied")}
            >
              <span className="mr-2">📄</span> Applied
            </button>
          </li>
          <li>
            <button
              className="flex transform items-center rounded-md border border-blue-700 bg-blue-500 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
              onClick={() => setSelectedList("liked")}
            >
              <span className="mr-2">❤️</span> Liked
            </button>
          </li>
          <li>
            <button
              className="flex transform items-center rounded-md border border-blue-700 bg-blue-500 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
              onClick={() => setSelectedList("disliked")}
            >
              <span className="mr-2">👎</span> Disliked
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
