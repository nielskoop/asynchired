import Head from "next/head";
import Image from "next/image";
import { CompanyInputBox } from "~/components/Inputs/CompanyInputBox";
import { LocationInputBox } from "~/components/Inputs/LocationInputBox";
import { RoleInputBox } from "~/components/Inputs/RoleInputBox";
import JobList from "~/components/JobList";
import { NavBar } from "~/components/NavBar";
import useScreenSize from "~/hooks/useScreenSize";
import { api } from "~/utils/api";
import { useFilter } from "~/context/FilterContext";
import ScrollToTopButton from "~/components/scrollToTopButton";

// import { api } from "~/utils/api";

// const tags = [
//   "Salary Available",
//   "Liked Jobs",
//   "Applied Jobs",
//   "Fully Remote",
//   "Backend Developer",
//   "Frontend Developer",
//   "UI/UX Design",
// ];

const tags = [
  "Remote",
  "Product",
  "Frontend",
  "Backend",
  "Software",
  "Senior",
  "Staff",
];

const hasSalaryTag = ["Has Salary"];
// const noSalaryTag = ["No Salary"];

export function TagWidget() {
  const { setRoleFilter, setSalaryFilter } = useFilter();

  return (
    <div className="bg-slate-200 px-2 py-4">
      <div className="text-xl font-semibold sm:mx-auto sm:w-4/5">
        Search With Tags:
      </div>
      <div className="scrollbar-hide flex overflow-x-scroll sm:px-0">
        <div className="sm:mx-auto sm:w-4/5">
          <div className="mt-2 flex flex-row gap-4">
            {tags.map((tag) => {
              return (
                <button
                  className="whitespace-nowrap rounded-full bg-white px-3 py-1"
                  onClick={() => setRoleFilter(tag)}
                >
                  {tag}
                </button>
              );
            })}

            <button
              className="whitespace-nowrap rounded-full bg-white px-3 py-1"
              onClick={() => setSalaryFilter("$")}
            >
              {hasSalaryTag}
            </button>
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
  api.post.getAllPosts.useQuery();

  const screenSize = useScreenSize();

  return (
    <>
      <Head>
        <title>Async Hired - All the jobs & jobs for all!</title>
        <meta name="description" content="All developer jobs in one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-image-large flex h-[30rem] w-full flex-col md:h-[450px]">
          <NavBar />
          <div className="relative left-1/2 top-[40%] max-w-fit -translate-x-2/4 -translate-y-2/4 rounded-lg bg-gray-600 bg-opacity-70 px-2 pb-4 pt-1 md:top-1/3 md:px-4">
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
                  <div>
                    <span className="mr-2 font-bold text-white">In</span>
                    <LocationInputBox />
                  </div>
                  <div>
                    <span className="mr-2 font-bold text-white">At</span>
                    <CompanyInputBox />
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
              </form>
            </div>
          </div>
        </div>
        <TagWidget />
        <div>
          <JobList />
        </div>
        <ScrollToTopButton />
      </main>
    </>
  );
}
