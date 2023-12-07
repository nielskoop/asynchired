import Head from "next/head";
import type { NextPage } from "next/types";
import { NavBar } from "~/components/NavBar";
import { useUser } from "@clerk/nextjs";
import { UserInfo } from "~/components/UserProfileAndJobs/userInfo";
import { UserJobsTracker } from "~/components/UserProfileAndJobs/userJobsTracker";
import { LoadingPage } from "~/components/LoadingAndSkeletonsAndOverlays/Loading";
import SavedSearches from "~/components/SavedSearches/savedSearches";
import { useEffect } from "react";

const ProfilePage: NextPage = () => {
  const { user } = useUser();
  const { setScroll, scroll } = useButton();

  if (!user) {
    return <LoadingPage/>;
  }
  
  useEffect(() => {
    if (scroll) {
      window.scrollTo(0, document.body.scrollHeight);
      setScroll(false);
    }
  }, [scroll]);
  
  return (
    <>
      <Head>
        <title>Async Hired Profile</title>
      </Head>
      <div className="bg-image-large">
        <NavBar />
      </div>
      <div className="w-full flex items-center justify-center">
      <div className="w-fit px-2">
      <div className="flex flex-row flex-wrap items-center justify-center pt-24">
        <UserInfo />
        <UserJobsTracker />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="p-2 text-center text-2xl font-bold">
          <h2>Your Saved Searches</h2>
        </div>
        <SavedSearches />
      </div>
      </div>
      </div>
    </>
  );
};
export default ProfilePage;
