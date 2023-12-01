import React, { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
// Define the shape of your context data
interface ButtonContextType {
    actionButton: string;
    setActionButton: Dispatch<SetStateAction<string>>;
}

// Create the context with an initial dummy value
const ButtonContext = createContext<ButtonContextType>({
    actionButton: '',
    setActionButton: (value: SetStateAction<string>) => {
      console.log(value);
    }
});

export const useButton = () => useContext(ButtonContext);

// Type the props for FilterProvider
interface ButtonProviderProps {
  children: ReactNode;
}

export const ButtonProvider: React.FC<ButtonProviderProps> = ({ children }) => {
  const [actionButton, setActionButton] = useState("");

  const value = {
    actionButton,
    setActionButton
  };

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  );
};
