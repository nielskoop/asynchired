import Head from "next/head";
import type { NextPage } from "next/types";
import Image from "next/image";
import { Nav } from "~/components/nav";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const ProfilePage: NextPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <>
      <Head>
        <title>Async Hired Profile</title>
      </Head>
      <div className="bg-image-mobile md: bg-image-large">
        <Nav />
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center pt-24">
        <div className="relative mx-8 mb-8 flex min-h-[400px] min-w-[400px] flex-col items-center rounded-lg border-2 border-solid border-gray-300 px-8 ">
          <Image
            src={user!.imageUrl}
            alt={`Profile picture`}
            width={128}
            height={128}
            className="left-50% absolute top-[-16.5%] rounded-full border-2 border-solid border-gray-300"
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

        <div className="relative mb-8 flex min-h-[400px] min-w-[400px] flex-col items-center rounded-lg border-2 border-solid border-gray-300">
          <ul className="border-b-solid flex w-full flex-row justify-center border-b-2 border-gray-300 pt-2">
            <li>
              <Link
                href={`/${user?.firstName}/applied`}
                className="active: px-2 font-semibold"
              >
                Applied
              </Link>
            </li>
            <li className="text-sm">●</li>
            <li>
              <Link
                href={`/${user?.firstName}/applied`}
                className="active: px-2 font-semibold"
              >
                Liked
              </Link>
            </li>
            <li className="text-sm">●</li>
            <li>
              <Link
                href={`/${user?.firstName}/applied`}
                className="active: px-2 font-semibold"
              >
                Disliked
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4 text-2xl font-bold text-center">
        <h2>Your Saved Searches</h2>
      </div>
    </>
  );
};

export default ProfilePage;
