import React, { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
// Define the shape of your context data
interface ButtonContextType {
  selectedList: string;
  setSelectedList: Dispatch<SetStateAction<string>>;
  scroll: boolean;
  setScroll: Dispatch<SetStateAction<boolean>>;
}

// Create the context with an initial dummy value
const ButtonContext = createContext<ButtonContextType>({
  selectedList: "liked",
  setSelectedList: () => {},
  scroll: false,
  setScroll: () => {},
});

export const useButton = () => useContext(ButtonContext);

// Type the props for FilterProvider
interface ButtonProviderProps {
  children: ReactNode;
}

export const ButtonProvider: React.FC<ButtonProviderProps> = ({ children }) => {
  const [selectedList, setSelectedList] = useState("liked");
  const [scroll, setScroll] = useState(false);
  const value = {
    selectedList,
    setSelectedList,
    scroll,
    setScroll
  };

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  );
};
