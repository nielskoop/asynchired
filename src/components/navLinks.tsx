import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export const NavLinks = () => {
  const { isSignedIn, user } = useUser();

  return (
    <>
      <Link href={`/${user?.firstName}`} className="rounded-md bg-white p-2">
        Saved Searches
      </Link>
      <Link href={`/${user?.firstName}`} className="rounded-md bg-white p-2">
        Liked Jobs
      </Link>
      <Link href={`/${user?.firstName}`} className="rounded-md bg-white p-2">
        Applied Jobs
      </Link>
      <span className="rounded-md bg-white p-2">
        {isSignedIn ? <SignOutButton /> : <SignInButton />}
      </span>
    </>
  );
};
