import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { api } from "~/utils/api";
import { useFilter } from "~/context/FilterContext";
import { InputSkeleton } from "../InputSkeleton";
import { XMarkIcon } from "@heroicons/react/20/solid";

type Company = {
  id: number;
  company: string;
};

export function CompanyInputBox() {
  const [query, setQuery] = useState("");
  const { data: companies, isLoading } = api.post.getAllCompanies.useQuery("");
  const {
    setCompanyFilter,
    selectedSearch,
    companyFilter,
    companyInputValue,
    setCompanyInputValue,
  } = useFilter();
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>();

  useEffect(() => {
    if (companyFilter !== "") {
      setSelectedCompany({ id: selectedSearch.id, company: selectedSearch.company! });
      setCompanyFilter(selectedSearch.company!);
      setCompanyInputValue(selectedSearch.company!);
    }
  }, [selectedSearch]);

  const filteredcompanies =
    query === ""
      ? companies ?? []
      : companies?.filter((company) =>
          company.company.toLowerCase().includes(query.toLowerCase()),
        ) ?? [];

  if (isLoading) {
    return <InputSkeleton />;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQuery(newValue);
    setCompanyInputValue(newValue);
  };

  const handleCompanyChange = (company: Company) => {
    setSelectedCompany(company);
    setCompanyFilter(company.company);
    setCompanyInputValue(company.company);
  };

  const clearInput = () => {
    setQuery("");
    setCompanyInputValue("");
    setSelectedCompany(undefined);
    setCompanyFilter("");
  };

  return (
    <div>
      <Combobox value={selectedCompany} onChange={handleCompanyChange}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-12 text-sm leading-5 text-gray-900 focus:ring-0"
              value={companyInputValue}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === "Enter" && query === "") {
                  event.preventDefault();
                  setSelectedCompany(undefined);
                  setCompanyFilter("");
                }
              }}
            />

            {/* Icons container */}
            <div className="absolute inset-y-0 right-0 flex items-center">
              {/* Clear input button */}
              {companyInputValue && (
                <button
                  onClick={clearInput}
                  className="inline-flex items-center justify-center"
                >
                  <XMarkIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
              )}

              {/* Combobox toggle button */}
              <Combobox.Button className="inline-flex items-center justify-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <Combobox.Option
                key="dynamic-option"
                value={{ id: -1, company: query }}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {"Use filter: " + (query || "None")}
                    </span>
                  </>
                )}
              </Combobox.Option>
              {filteredcompanies.map((company) => (
                <Combobox.Option
                  key={company.id}
                  value={company}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {company.company}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "bg-blue-500"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
