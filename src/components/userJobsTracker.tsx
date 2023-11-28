import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import JobList from "~/components/JobList";

export const UserJobsTracker = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <>
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
  <JobList />
</div>
  </>
  )
};