/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface FilterContextType {
  locationFilter: string;
  setLocationFilter: React.Dispatch<React.SetStateAction<string>>;
  roleFilter: string;
  setRoleFilter: React.Dispatch<React.SetStateAction<string>>;
  companyFilter: string;
  setCompanyFilter: React.Dispatch<React.SetStateAction<string>>;
  salaryFilter: string | undefined;
  setSalaryFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  descriptionFilter: string;
  setDescriptionFilter: React.Dispatch<React.SetStateAction<string>>;
  isInputDisabled: boolean;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
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
  descriptionFilter: "",
  setDescriptionFilter: () => { },
  isInputDisabled: false,
  setIsInputDisabled: () => { },
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
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);


  const value = {
    locationFilter,
    setLocationFilter,
    roleFilter,
    setRoleFilter,
    companyFilter,
    setCompanyFilter,
    salaryFilter,
    setSalaryFilter,
    descriptionFilter,
    setDescriptionFilter,
    isInputDisabled,
    setIsInputDisabled,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
