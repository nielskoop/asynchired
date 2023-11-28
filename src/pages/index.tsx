import Head from "next/head";
import Link from "next/link";
import { Nav } from "~/components/nav";

import { api } from "~/utils/api";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Async Hired - All the jobs & jobs for all!</title>
        <meta name="description" content="All developer jobs in one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="align-center flex h-full w-full flex-col">
        <div className="bg-image-mobile md: bg-image-large flex w-full flex-col justify-center">
          <Nav />
          <div className="px-8 pb-4">
            <p className="p-2 text-center text-white">
              All the dev jobs,
              <span className="font-semibold"> one place</span>
            </p>
            <div className="flex w-full justify-center">
              <form className="flex max-w-4xl flex-col items-center justify-center">
                <input
                  type="text"
                  placeholder="Role"
                  className="rounded-t-md p-1"
                />
                <input type="text" placeholder="Location" className="p-1" />
                <button
                  type="submit"
                  className="w-full rounded-b-md bg-green-700 p-1 font-semibold text-white"
                >
                  Search Jobs
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
