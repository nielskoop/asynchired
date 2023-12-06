import { useAuth } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { CompanyInputBox } from "./Inputs/CompanyInputBox";
import Image from "next/image";
import { RoleInputBox } from "./Inputs/RoleInputBox";
import { LocationInputBox } from "./Inputs/LocationInputBox";
import useScreenSize from "~/hooks/useScreenSize";
import { SaveSearchSelect } from "./Inputs/SaveSearchSelect";
import { useFilter } from "~/context/FilterContext";
import { UserJobsTrackerSkeleton } from "./userJobsTrackerSkeleton";
import toast from "react-hot-toast";
import type { Search } from "~/context/FilterContext";
import { useEffect, useState } from "react";


const SavedSearches: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editButtonIcon, setEditButtonIcon] = useState("/111-write white.svg");
  const { userId } = useAuth();
  const defaultSearch = {
    id: -1,
    userId,
    name: "Select a saved search",
    title: "...",
    location: "...",
    company: "...",
  };

  const {
    selectedSearch,
    setSelectedSearch,
    setLocationFilter,
    setRoleFilter,
    setCompanyFilter,
    setDescriptionFilter,
    setIsInputDisabled,
    roleFilter,
    locationFilter,
    companyFilter,
  } = useFilter();

  useEffect(() => {
    setIsInputDisabled(!isEditMode); // Disable/Enable input boxes based on edit mode
    setEditButtonIcon(isEditMode ? "/save.svg" : "/111-write white.svg"); // Change button icon
  }, [isEditMode, setIsInputDisabled]);

  const screenSize = useScreenSize();

  const {
    data: userSearches,
    isLoading,
    refetch,
  } = api.search.getSearches.useQuery();

  const { mutate: deleteSearch } = api.search.deleteSearch.useMutation();
  const { mutate: updateSearch } = api.search.updateSearch.useMutation();


  useEffect(() => {
    setRoleFilter(selectedSearch.title!);
    setLocationFilter(selectedSearch.location!);
    setCompanyFilter(selectedSearch.company!);
  }, [selectedSearch]);

  // Handle loading state
  if (isLoading) return <UserJobsTrackerSkeleton />;

  // Handling case where userId is null or undefined
  if (!userId) return <div>Please log in to view saved searches.</div>;

  // Handling case where data fetching failed or list is empty
  if (!userSearches || userSearches.length === 0)
    return <div>No saved searches to show!</div>;

  function handleSelectSearch(search: Search) {
    if (isEditMode) {
      // If in edit mode and another search is selected, exit edit mode
      setIsEditMode(false);
    }
    setSelectedSearch(search);
  }
  function delSearch(selectedSearch: Search) {
    if (selectedSearch && selectedSearch.id) {
      deleteSearch(selectedSearch.id, {
        onSuccess: () => {
          // After successfully deleting the search, reset the input fields
          setRoleFilter(""); // Set to empty or initial value
          setLocationFilter(""); // Set to empty or initial value
          setCompanyFilter(""); // Set to empty or initial value

          // Optionally reset other states as needed
          setSelectedSearch(defaultSearch); // Reset selected search to default
          refetch(); // Refetch searches if needed

          // Display success message
          toast.success("Search deleted successfully", {
            style: {
              borderRadius: "10px",
              background: "#00A907",
              color: "#fff",
            },
          });
        },
        onError: () => {
          // Handle error
          toast.error("Error deleting search", {
            style: {
              borderRadius: "10px",
              background: "#E61A1A",
              color: "#fff",
            },
          });
        },
      });
    }
  }

  function editSearch(selectedSearch: Search) {
    setIsEditMode(!isEditMode); // Toggle edit mode
  }

  function saveSearch() {
    // Call your update API here
    // Use the values from your filters (roleFilter, locationFilter, companyFilter)
    // to update the selected search in the database

    updateSearch(
      {
        id: selectedSearch.id,
        name: String(selectedSearch.name),
        title: roleFilter, // Assuming roleFilter holds the updated title
        location: locationFilter, // Assuming locationFilter holds the updated location
        company: companyFilter, // Assuming companyFilter holds the updated company
      },
      {
        onSuccess: () => {
          toast.success("Search updated successfully");
          setIsEditMode(false); // Exit edit mode after successful update
          refetch(); // Refetch searches if needed
        },
        onError: (error) => {
          toast.error("Error updating search");
        },
      },
    );
  }

  return (
    <>
      <div className="bg-[#1A78E6]shadow-lg relative mx-8 mb-60 flex max-h-[400px]  min-h-[400px] max-w-fit flex-col justify-center rounded-lg border-2 border-solid border-[#1A78E6] bg-[#1A78E6] shadow-lg sm:flex-row">
        {screenSize! < 640 ? (
          <div className="flex items-center justify-center">
            <SaveSearchSelect />
          </div>
        ) : (
          <div className="max-h-[400px] min-w-fit overflow-y-auto rounded-lg bg-white p-4 sm:rounded-md">
            <ul className="mb-4 flex flex-col items-start justify-start sm:mx-auto">
              {userSearches.map((search) => (
                <li className="flex w-full flex-row items-center justify-between border-b border-slate-300 shadow-sm">
                  <button
                    className="mr-4 cursor-pointer text-start"
                    onClick={() => {
                      handleSelectSearch(search);
                    }}
                  >
                    {search.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div id="filters" className="bg-[#1A78E6] p-4 font-bold text-white">
          <div
            id="searchName"
            className="flex flex-row items-center justify-between border-b text-center"
          >
            <h1 className="text-xl">{selectedSearch.name}</h1>
            <div className="flex w-fit flex-col items-end justify-center">
              <button onClick={isEditMode ? saveSearch : editSearch}>
                <Image
                  src={editButtonIcon}
                  alt={isEditMode ? "Save" : "Edit"}
                  height={20}
                  width={20}
                  className="m-1"
                />
              </button>
              <button
                onClick={() => {
                  delSearch(selectedSearch);
                }}
              >
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
