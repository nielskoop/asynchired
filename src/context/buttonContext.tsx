/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
// Define the shape of your context data
interface ButtonContextType {
  selectedList: string;
  setSelectedList: Dispatch<SetStateAction<string>>;
}

// Create the context with an initial dummy value
const ButtonContext = createContext<ButtonContextType>({
  selectedList: "",
  setSelectedList: () => {},
});

export const useButton = () => useContext(ButtonContext);

// Type the props for FilterProvider
interface ButtonProviderProps {
  children: ReactNode;
}

export const ButtonProvider: React.FC<ButtonProviderProps> = ({ children }) => {
  const [selectedList, setSelectedList] = useState("");

  const value = {
    selectedList,
    setSelectedList,
  };

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  );
};
