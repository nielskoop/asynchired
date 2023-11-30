import Image from "next/image";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import useScreenSize from "~/hooks/useScreenSize";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export const HamburgerButton = () => {
  const [hamburgerActive, setHamburgerActive] = useState<boolean>(false);

  return (
    <Menu as={"div"} className={"relative inline-block text-left"}>
      <Menu.Button
        onClick={() => setHamburgerActive(!hamburgerActive)}
        className={"hamburgerButton flex items-center"}
      >
        {/* REPLACE FALSE WITH MENU OPEN LOGIC AND TAILWIND SYNTAX*/}
        <div className={`hamburger ${hamburgerActive ? "active" : ""}`}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2 flex w-48 origin-top-right flex-col divide-y divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="flex flex-col px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${active && "text-slate-500"}`}
                  href="/profile"
                >
                  Saved Searches
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${active && "text-slate-500"}`}
                  href="/profile"
                >
                  Liked Jobs
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${active && "text-slate-500"}`}
                  href="/profile"
                >
                  Log In
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export const NavLinks = () => {
  const { user } = useUser();

  return (
    <>
      <Link href={`/${user?.firstName}`} className="rounded-xl bg-white p-2">
        Saved Searches
      </Link>
      <Link href={`/${user?.firstName}`} className="rounded-xl bg-white p-2">
        Liked Jobs
      </Link>
      <Link href={`/${user?.firstName}`} className="rounded-xl bg-white p-2">
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
          <span className="rounded-xl bg-white p-2">
            {isSignedIn ? <SignOutButton /> : <SignInButton />}
          </span>
        )}
      </div>
    </nav>
  );
};
