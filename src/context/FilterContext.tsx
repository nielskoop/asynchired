// src/context/FilterContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context data
interface FilterContextType {
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
}

// Create the context with an initial dummy value
const FilterContext = createContext<FilterContextType>({
  locationFilter: "",
  setLocationFilter: () => {},
  roleFilter: "",
  setRoleFilter: () => {},
});

export const useFilter = () => useContext(FilterContext);

// Type the props for FilterProvider
interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [locationFilter, setLocationFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const value = {
    locationFilter,
    setLocationFilter,
    roleFilter,
    setRoleFilter,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
