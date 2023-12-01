import Head from "next/head";
import Image from "next/image";
import { CompanyInputBox } from "~/components/Inputs/CompanyInputBox";
import { LocationInputBox } from "~/components/Inputs/LocationInputBox";
import { RoleInputBox } from "~/components/Inputs/RoleInputBox";
import JobList from "~/components/JobList";
import { NavBar } from "~/components/NavBar";
import useScreenSize from "~/hooks/useScreenSize";
import { api } from "~/utils/api";

// import { api } from "~/utils/api";

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
        <div className="bg-image-large flex h-96 w-full flex-col md:h-[450px]">
          <NavBar />
          <div className="relative left-1/2 top-1/3 -translate-x-2/4 -translate-y-2/4">
            <p className="mb-4 text-center text-3xl text-white md:text-4xl">
              All the dev jobs,
              <span className="font-semibold"> one place</span>
            </p>
            <div className="flex w-full justify-center px-4">
              <form className="flex flex-col items-center justify-center md:flex-row md:gap-4">
                <div className="mb-4 flex flex-col gap-2 md:mb-0 md:flex-row">
                  <RoleInputBox />
                  <LocationInputBox />
                  <CompanyInputBox />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-700 p-1 font-semibold text-white md:w-max"
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
        <div className="bg-slate-300">Tag Widget</div>
        <div>
          <JobList />
        </div>
      </main>
    </>
  );
}
