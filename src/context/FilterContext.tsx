/* eslint-disable @typescript-eslint/no-empty-function */
// src/context/FilterContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Define the shape of your context data
interface FilterContextType {
  locationFilter: string;
  setLocationFilter: React.Dispatch<React.SetStateAction<string>>;
  roleFilter: string;
  setRoleFilter: React.Dispatch<React.SetStateAction<string>>;
  companyFilter: string;
  setCompanyFilter: React.Dispatch<React.SetStateAction<string>>;
  salaryFilter: string | undefined;
  setSalaryFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// Create the context with an initial dummy value
const FilterContext = createContext<FilterContextType>({
  locationFilter: "",
  setLocationFilter: () => {},
  roleFilter: "",
  setRoleFilter: () => {},
  companyFilter: "",
  setCompanyFilter: () => {},
  salaryFilter: "",
  setSalaryFilter: () => {},
});

export const useFilter = () => useContext(FilterContext);

// Type the props for FilterProvider
interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [locationFilter, setLocationFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState<string | undefined>("");

  const value = {
    locationFilter,
    setLocationFilter,
    roleFilter,
    setRoleFilter,
    companyFilter,
    setCompanyFilter,
    salaryFilter,
    setSalaryFilter,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
