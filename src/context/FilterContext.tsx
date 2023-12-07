/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Search } from "@prisma/client";

interface FilterContextType {
  locationFilter: string;
  setLocationFilter: React.Dispatch<React.SetStateAction<string>>;
  roleFilter: string;
  setRoleFilter: React.Dispatch<React.SetStateAction<string>>;
  companyFilter: string;
  setCompanyFilter: React.Dispatch<React.SetStateAction<string>>;
  salaryFilter: string | undefined;
  setSalaryFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  minSalaryFilter: number | undefined;
  setMinSalaryFilter: React.Dispatch<React.SetStateAction<number | undefined>>;
  descriptionFilter: string;
  setDescriptionFilter: React.Dispatch<React.SetStateAction<string>>;
  dateFilter: Date | undefined;
  setDateFilter: React.Dispatch<React.SetStateAction<Date | undefined>>;
  isInputDisabled: boolean;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSearch: Search;
  setSelectedSearch: React.Dispatch<React.SetStateAction<Search>>;
  roleInputValue: string;
  setRoleInputValue: React.Dispatch<React.SetStateAction<string>>;
  locationInputValue: string;
  setLocationInputValue: React.Dispatch<React.SetStateAction<string>>;
  companyInputValue: string;
  setCompanyInputValue: React.Dispatch<React.SetStateAction<string>>;
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
  minSalaryFilter: undefined,
  setMinSalaryFilter: () => {},
  descriptionFilter: "",
  setDescriptionFilter: () => {},
  dateFilter: undefined,
  setDateFilter: () => {},
  isInputDisabled: false,
  setIsInputDisabled: () => {},
  selectedSearch: {
    id: -1,
    userId: "0",
    name: "Select a saved search",
    title: "",
    location: "",
    company: "",
    jobDescription: "",
    salary: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  setSelectedSearch: () => {},
  roleInputValue: "",
  setRoleInputValue: () => {},
  locationInputValue: "",
  setLocationInputValue: () => {},
  companyInputValue: "",
  setCompanyInputValue: () => {},
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
  const [minSalaryFilter, setMinSalaryFilter] = useState<number | undefined>(
    undefined,
  );
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState<Search>({
    id: -1,
    userId: "0",
    name: "Select a saved search",
    title: "",
    location: "",
    company: "",
    jobDescription: "",
    salary: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [roleInputValue, setRoleInputValue] = useState("");
  const [locationInputValue, setLocationInputValue] = useState("");
  const [companyInputValue, setCompanyInputValue] = useState("");

  const value = {
    locationFilter,
    setLocationFilter,
    roleFilter,
    setRoleFilter,
    companyFilter,
    setCompanyFilter,
    salaryFilter,
    setSalaryFilter,
    minSalaryFilter,
    setMinSalaryFilter,
    descriptionFilter,
    setDescriptionFilter,
    dateFilter,
    setDateFilter,
    isInputDisabled,
    setIsInputDisabled,
    selectedSearch,
    setSelectedSearch,
    roleInputValue,
    setRoleInputValue,
    locationInputValue,
    setLocationInputValue,
    companyInputValue,
    setCompanyInputValue,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
