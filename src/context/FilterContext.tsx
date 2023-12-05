/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Search = {
  id: number;
  userId: string | null | undefined;
  name: String;
  title?: string | null | undefined;
  location?: string | null;
  company?: string | null;
  jobDescription?: string | null;
  salary?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

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
  dateFilter: Date | undefined;
  setDateFilter: React.Dispatch<React.SetStateAction<Date | undefined>>;
  isInputDisabled: boolean;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSearch: Search;
  setSelectedSearch: React.Dispatch<React.SetStateAction<Search>>;
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
  setDescriptionFilter: () => {},
  dateFilter: undefined,
  setDateFilter: () => {},
  isInputDisabled: false,
  setIsInputDisabled: () => {},
  selectedSearch: { id: -1, userId: null, name: "Select a saved search" },
  setSelectedSearch: () => {},
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
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState<Search>({
    id: -1,
    userId: null,
    name: "Select a saved search",
    title: "",
    location: "",
    company: "",
  });

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
    dateFilter,
    setDateFilter,
    isInputDisabled,
    setIsInputDisabled,
    selectedSearch,
    setSelectedSearch,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
