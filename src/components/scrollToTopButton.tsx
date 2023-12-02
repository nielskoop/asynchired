import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/20/solid";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // if the user scrolls down, show the button
    window.scrollY >= 450 ? setIsVisible(true) : setIsVisible(false);
  };

  useEffect(() => {
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };

  return (
    <button
      className={` fixed bottom-6 right-6 h-12 w-12 rounded-full bg-blue-500 p-2 outline-none transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpIcon color="white" />
    </button>
  );
};

export default ScrollToTopButton;
