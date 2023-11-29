import { useState, useEffect } from "react";
import Image from "next/image";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import useScreenSize from "~/hooks/useScreenSize";

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
  const { isSignedIn } = useUser();

  const screenSize = useScreenSize();

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
        {screenSize! > 768 && <NavLinks />}
      </div>
      <div>
        {screenSize! < 768 ? (
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
