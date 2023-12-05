import React, { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
// Define the shape of your context data
interface ButtonContextType {
  stateButton: string;
  setStateButton: Dispatch<SetStateAction<string>>;
}

// Create the context with an initial dummy value
const ButtonContext = createContext<ButtonContextType>({
  stateButton: "",
  setStateButton: (value: SetStateAction<string>) => {
    console.log(value);
  },
});

export const useButton = () => useContext(ButtonContext);

// Type the props for FilterProvider
interface ButtonProviderProps {
  children: ReactNode;
}

export const ButtonProvider: React.FC<ButtonProviderProps> = ({ children }) => {
  const [stateButton, setStateButton] = useState('');
  const value = {
    stateButton,
    setStateButton
  };

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  );
};
