import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { api } from "~/utils/api";
import { useFilter } from "~/context/FilterContext";
import { InputSkeleton } from "../InputSkeleton";
import { XMarkIcon } from "@heroicons/react/20/solid";

type Location = {
  id: number;
  location: string;
};

export function LocationInputBox() {
  const [query, setQuery] = useState("");
  const { data: locations, isLoading } = api.post.getAllLocations.useQuery("");
  const { setLocationFilter, locationFilter, selectedSearch, locationInputValue, setLocationInputValue } = useFilter();
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
    >();

    useEffect(() => {
      if (locationFilter !== "") {
        setSelectedLocation({
          id: selectedSearch.id,
          location: selectedSearch.location!,
        });
        setLocationFilter(selectedSearch.location!);
        setLocationInputValue(selectedSearch.location!);
      }
    }, [selectedSearch]);

  const filteredLocations =
    query === ""
      ? locations ?? []
      : locations?.filter((location) =>
          location.location.toLowerCase().includes(query.toLowerCase()),
        ) ?? [];

  if (isLoading) {
    return <InputSkeleton />;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQuery(newValue);
    setLocationInputValue(newValue);
  };

  const handleLocationChange = (location: Location) => {
    setSelectedLocation(location);
    setLocationFilter(location.location);
    setLocationInputValue(location.location);
  };

  const clearInput = () => {
    setQuery("");
    setLocationInputValue(""); // Clear the new state
    setSelectedLocation(undefined);
    setLocationFilter("");
  };

  return (
    <div>
      <Combobox value={selectedLocation} onChange={handleLocationChange}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-12 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={handleInputChange}
              value={locationInputValue}
              onKeyDown={(event) => {
                if (event.key === "Enter" && query === "") {
                  event.preventDefault();
                  setSelectedLocation(undefined);
                  setLocationFilter("");
                }
              }}
            />

            {/* Icons container */}
            <div className="absolute inset-y-0 right-0 flex items-center">
              {/* Clear input button */}
              {locationInputValue.length > 0 && ( // Check the new state for content
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
                value={{ id: -1, location: query }}
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
              {filteredLocations.map((location) => (
                <Combobox.Option
                  key={location.id}
                  value={location}
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
                        {location.location}
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
