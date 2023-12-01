import Head from "next/head";
import type { NextPage } from "next/types";
import { NavBar } from "~/components/NavBar";
import { useUser } from "@clerk/nextjs";
import { UserInfo } from "~/components/userInfo";
import { UserJobsTracker } from "~/components/userJobsTracker";
import { LoadingPage } from "~/components/Loading";
import { useState } from "react";

const ProfilePage: NextPage = () => {
  const { user } = useUser();
  const [childState, setChildState] = useState('');
  
  if (!user) {
    return <LoadingPage/>;
  }
 const handleAction = (data: string) => {
  setChildState(data)
 }
  return (
    <>
      <Head>
        <title>Async Hired Profile</title>
      </Head>
      <div className="bg-image-large">
        <NavBar setChildState={handleAction}/>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center pt-24">
        <UserInfo />
        <UserJobsTracker childState={childState} setChildState={handleAction}/>
      </div>
      <div className="p-4 text-center text-2xl font-bold">
        <h2>Your Saved Searches</h2>
      </div>
    </>
  );
};

export default ProfilePage;
