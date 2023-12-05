import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { CompanyInputBox } from "~/components/Inputs/CompanyInputBox";
import { LocationInputBox } from "~/components/Inputs/LocationInputBox";
import { RoleInputBox } from "~/components/Inputs/RoleInputBox";
import JobList from "~/components/jobLists/JobList";
import { NavBar } from "~/components/NavBar";
import useScreenSize from "~/hooks/useScreenSize";
import { useFilter } from "~/context/FilterContext";
import ScrollToTopButton from "~/components/scrollToTopButton";
import { useAuth } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { DateInputBox } from "~/components/Inputs/DateInputBox";

const roleTags = [
  "Product",
  "Frontend",
  "Backend",
  "Software",
  "Senior",
  "Staff",
  "Lead",
  "Remote",
];
const locationTags = ["Remote", "Germany", "EU", "United States"];
const salaryTags = ["$"];
const descriptionTags = [
  "Javascript",
  "Typescript",
  "React",
  "Node",
  "GraphQL",
  "AWS",
  "Cybersecurity",
];

// const noSalaryTag = ["No Salary"];

export function TagWidget() {
  const {
    setRoleFilter,
    setSalaryFilter,
    setLocationFilter,
    setDescriptionFilter,
  } = useFilter();
  const [selectedTags, setSelectedTags] = useState({
    role: "",
    location: "",
    salary: "",
    description: "",
  });

  type TagCategory = "role" | "location" | "salary" | "description";

  const toggleTagSelection = (tag: string, category: TagCategory) => {
    const newSelectedTags = { ...selectedTags };

    if (newSelectedTags[category] === tag) {
      newSelectedTags[category] = ""; // Deselect the tag
    } else {
      newSelectedTags[category] = tag; // Select the tag
    }

    setSelectedTags(newSelectedTags);

    // Update the appropriate filter
    switch (category) {
      case "role":
        setRoleFilter(newSelectedTags.role);
        break;
      case "location":
        setLocationFilter(newSelectedTags.location);
        break;
      case "salary":
        setSalaryFilter(newSelectedTags.salary);
        break;
      case "description":
        setDescriptionFilter(newSelectedTags.description);
      default:
        break;
    }
  };

  const isTagSelected = (tag: string, category: TagCategory) =>
    selectedTags[category] === tag;

  return (
    <div className="min-w-screen flex flex-col overflow-auto bg-slate-200 px-2 py-4">
      <div className="text-xl font-semibold sm:mx-auto sm:w-4/5">
        Search With Tags:
      </div>
      <div className="mt-2 max-h-[150px] overflow-y-auto">
        <div className="sm:mx-auto sm:w-4/5">
          <div className="mt-2 flex flex-col gap-2">
            <div>
              <p>Role:</p>
              {roleTags.map((tag) => (
                <button
                  key={tag}
                  className={`mx-1 my-1 whitespace-nowrap rounded-full px-3 py-1 ${
                    isTagSelected(tag, "role")
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => toggleTagSelection(tag, "role")}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div>
              <p>Salary:</p>
              {salaryTags.map((tag) => (
                <button
                  key={tag}
                  className={`mx-1 my-1 whitespace-nowrap rounded-full px-3 py-1 shadow-md ${
                    isTagSelected(tag, "salary")
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => toggleTagSelection(tag, "salary")}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="">
              <p>Location:</p>

              {locationTags.map((tag) => (
                <button
                  key={tag}
                  className={`mx-1 my-1 whitespace-nowrap rounded-full px-3 py-1 ${
                    isTagSelected(tag, "location")
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => toggleTagSelection(tag, "location")}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div>
              <div>Description:</div>
              {descriptionTags.map((tag) => (
                <button
                  key={tag}
                  className={`mx-1 my-1 whitespace-nowrap rounded-full px-3 py-1 shadow-md ${
                    isTagSelected(tag, "description")
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => toggleTagSelection(tag, "description")}
                >
                  {tag}
                </button>
              ))}
            </div>
            {/* //TODO: Add no salary filter */}
            {/* <button
              className="whitespace-nowrap rounded-full bg-white px-3 py-1"
              onClick={() => setSalaryFilter("NO_SALARY")}
            >
              {noSalaryTag}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const screenSize = useScreenSize();
  const { roleFilter, locationFilter, companyFilter } = useFilter();
  const [isWidgetOpen, setIsWidgetOpen] = useState(true);
  const { userId } = useAuth();
  const mutation = api.user.saveSearch.useMutation();

  const handlePostSearch = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!userId) return;

    mutation.mutate({
      searchName: "Test Search Name",
      userId,
      title: roleFilter,
      location: locationFilter,
      company: companyFilter,
    });
  };

  return (
    <>
      <Head>
        <title>Async Hired - All the jobs & jobs for all!</title>
        <meta name="description" content="All developer jobs in one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pb-6">
        <div className="flex h-[30rem] w-full flex-col md:h-[450px]">
          <div className="absolute -z-10 h-[30rem] w-full md:h-[450px]">
            <Image
              src={"/hero-bg-2.png"}
              layout="fill"
              alt="Hero Section Background"
              priority={true}
              style={{ objectFit: "cover", objectPosition: "50% 10%" }}
            />
          </div>
          <NavBar />
          <div className="relative left-1/2 top-[40%] mr-2 max-w-fit -translate-x-2/4 -translate-y-2/4 rounded-lg bg-gray-600 bg-opacity-70 px-2 pb-4 pt-1 md:top-1/3 md:px-4">
            <p className="mb-4 text-center text-2xl text-white md:text-4xl">
              All the dev jobs,
              <span className="font-semibold"> one place</span>
            </p>
            <div className="flex w-full justify-center px-4">
              <form className="flex flex-col items-center justify-center md:flex-row md:gap-4">
                <div className="mb-4 flex flex-col gap-2 md:mb-0 md:flex-row">
                  <div className="flex flex-col">
                    <span className="mr-2 font-bold text-white">
                      I'm looking for
                    </span>
                    <RoleInputBox />
                  </div>
                  <div className="flex grow flex-col">
                    <span className="mr-2 font-bold text-white">In</span>
                    <LocationInputBox />
                  </div>
                  <div>
                    <span className="mr-2 font-bold text-white">At</span>
                    <div className="flex grow">
                      <CompanyInputBox />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full self-end justify-self-end rounded-md bg-green-700 p-1 font-semibold text-white md:w-max"
                >
                  {screenSize && screenSize < 768 ? (
                    "Search Jobs"
                  ) : (
                    <Image
                      src={"find.svg"}
                      height={36}
                      width={36}
                      alt="search button"
                    />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    handlePostSearch(e);
                  }}
                >
                  Save
                </button>
              </form>
            </div>

            <div>
              <div className="flex justify-center">
                <DateInputBox />
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div className=" flex justify-center bg-slate-200  p-2">
          <button
            className="flex max-w-lg self-center justify-self-end rounded bg-blue-500 p-2 text-white"
            onClick={() => setIsWidgetOpen(!isWidgetOpen)}
          >
            {isWidgetOpen ? "Minimize Tags" : "Open Tags"}
          </button>
        </div>
        <div className="flex">
          <div
            className={`transition-all duration-500 ease-in-out ${
              isWidgetOpen ? "min-w-full opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <TagWidget />
          </div>
        </div>

        <div>
          <JobList />
        </div>
        <ScrollToTopButton />
      </main>
    </>
  );
}
