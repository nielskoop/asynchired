import { useState, useEffect } from "react";
import Image from "next/image";
import { NavLinks } from "./navLinks";
import Link from "next/link";
import useScreenSize from "~/hooks/useScreenSize";

export const Nav = () => {
  const screenSize = useScreenSize();

  return (
    <nav className="flex w-full flex-row items-center justify-between px-8 font-semibold">
      <Link href={"/"}>
        <Image
          src={"AsyncHiredLogo.svg"}
          width={130}
          height={130}
          alt="Async Hired Logo"
          className="rounded- py-3"
        />
      </Link>
      {
        screenSize! < 768 ? (
          <button className="hamburgerButton">
            {/* REPLACE FALSE WITH MENU OPEN LOGIC AND TAILWIND SYNTAX*/}
            <div className={`hamburger ${false ? "active" : ""}`}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </button>
        ) : (
          <NavLinks />
        )
      }
    </nav>
  );
};
