import Head from "next/head";
import type { NextPage } from "next/types";
import Image from "next/image";
import { Nav } from "~/components/nav";
import { useUser } from "@clerk/nextjs";

const ProfilePage: NextPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <>
      <Head>
        <title>Async Hired Profile</title>
      </Head>
      <div className="bg-image-mobile md: bg-image-large flex w-full flex-col justify-center">
        <Nav />
      </div>
      <div className="flex flex-row items-center justify-center pt-24">
        <div className="relative flex min-h-[400px] flex-col items-center rounded-lg border-2 border-solid border-gray-300 px-8">
          <Image
            src={user!.imageUrl}
            alt={`Profile picture`}
            width={128}
            height={128}
            className="left-50% absolute top-[-16.5%] rounded-full border-2 border-solid border-gray-300"
            // className="left-50% absolute top-[-15%] rounded-full bg-gray-300 p-0.5"
          />
          <h1 className="mt-[30%] pb-4 text-2xl font-bold">{user?.fullName}</h1>
          <ul className="pb-4">
            <li>
              <Image
                src={"/046-business 1.svg"}
                alt={`suitcase icon`}
                width={20}
                height={20}
                className="mr-1 inline"
              />
              Unemployed
            </li>
            <li>
              <Image
                src={"/071-location pin 1.svg"}
                alt={`suitcase icon`}
                width={20}
                height={20}
                className="mr-1 inline"
              />
              Alicante, Spain
            </li>
            <li>
              <Image
                src={"/148-education 1.svg"}
                alt={`suitcase icon`}
                width={20}
                height={20}
                className="mr-1 inline"
              />
              React, Next.js, Node.js, Angular, Figma
            </li>
            <li>
              <Image
                src={"/149-education 1.svg"}
                alt={`suitcase icon`}
                width={20}
                height={20}
                className="mr-1 inline"
              />
              Proud bootcamper
            </li>
          </ul>
          <div className="flex grow flex-col justify-end">
            <button className="m-4 rounded-2xl bg-black p-2 text-white">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="flex flex-col bg-blue-300"></div>
      </div>
      <div className="h-[64px]"></div>
      <div className="p-4 text-2xl font-bold">
        <h2>Your Saved Searches</h2>
      </div>
      <div className="w-full border-b border-slate-400"></div>
    </>
  );
};

export default ProfilePage;
