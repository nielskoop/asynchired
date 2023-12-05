import React from "react";
import LikedJobsList from "./jobLists/LikedJobsList";
import DislikedJobsList from "./jobLists/DislikedJobsList";
import AppliedJobsList from "./jobLists/AppliedJobsList";
import { useButton } from "~/context/buttonContext";

export const UserJobsTracker: React.FC = () => {
  // State to keep track of the currently selected list
 const { stateButton, setStateButton } = useButton();

  return (
    <>
      <div className="relative mb-8 flex h-[400px] w-[550px] flex-col rounded-lg border-2 border-solid border-[#1A78E6] shadow-lg">
        <ul className="border-b-solid flex flex-row justify-evenly border-b-2 border-[#1A78E6] py-2 pt-2 text-lg">
          <li>
            <button
              className={`flex transform items-center rounded-md border border-blue-700 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 ${
                stateButton === "applied" ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-700"
              }`}
              onClick={() => setStateButton("applied")}
            >
              <span className="mr-2">📄</span> Applied
            </button>
          </li>
          <li>
            <button
              className={`flex transform items-center rounded-md border border-blue-700 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 ${
                stateButton === "liked" ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-700"
              }`}
              onClick={() => setStateButton("liked")}
            >
              <span className="mr-2">❤️</span> Liked
            </button>
          </li>
          <li>
            <button
              className={`flex transform items-center rounded-md border border-blue-700 px-4 py-1 font-semibold text-white transition duration-300 ease-in-out hover:scale-105 ${
                stateButton === "disliked" ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-700"
              }`}
              onClick={() => setStateButton("disliked")}
            >
              <span className="mr-2">👎</span> Disliked
            </button>
          </li>
        </ul>
        <div className="overflow-y-auto p-4">
          <div className="mb-4 sm:mx-auto sm:w-4/5">
            {stateButton === "applied" && <AppliedJobsList />}
            {stateButton === "liked" && <LikedJobsList />}
            {stateButton === "disliked" && <DislikedJobsList />}
          </div>
        </div>
      </div>
    </>
  );
};
