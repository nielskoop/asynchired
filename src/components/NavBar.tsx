import { useState, useEffect } from "react";
import Image from "next/image";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export const HamburgerButton = () => {
  return (
    <button className="hamburgerButton">
      {/* REPLACE FALSE WITH MENU OPEN LOGIC AND TAILWIND SYNTAX*/}
      <div className={`hamburger ${false ? "active" : ""}`}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </button>
  );
};

export const NavLinks = () => {
  const { user } = useUser();

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
    </>
  );
};

export const NavBar = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 font-semibold">
      <div className="flex items-center gap-3">
        <Link href={"/"}>
          <Image
            src={"AsyncHiredLogo.svg"}
            width={130}
            height={130}
            alt="Async Hired Logo"
            className="rounded- py-3"
          />
        </Link>
        {!isMobileOrTablet && <NavLinks />}
      </div>
      <div>
        {isMobileOrTablet ? (
          <HamburgerButton />
        ) : (
          <span className="rounded-md bg-white p-2">
            {isSignedIn ? <SignOutButton /> : <SignInButton />}
          </span>
        )}
      </div>
    </nav>
  );
};
