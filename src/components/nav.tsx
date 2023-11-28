import { useState, useEffect } from "react";
import Image from "next/image";
import { NavLinks } from "./navLinks";
import Link from "next/link";

export const Nav = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

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
        // User is on a mobile phone or tablet
        isMobileOrTablet ? (
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
