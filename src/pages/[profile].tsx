import Head from "next/head";
import type { NextPage } from "next/types";
import { Nav } from "~/components/nav";
import { useUser } from "@clerk/nextjs";
import { UserInfo } from "~/components/userInfo";
import { UserJobsTracker } from "~/components/userJobsTracker";

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
        <UserInfo />
        <UserJobsTracker />
      </div>
      <div className="p-4 text-2xl font-bold text-center">
        <h2>Your Saved Searches</h2>
      </div>
    </>
  );
};

export default ProfilePage;
