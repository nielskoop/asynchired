import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type Location =
  | { id: number; country: "Fully Remote" }
  | { id: number; country: "Germany" }
  | { id: number; country: "The Netherlands" }
  | { id: number; country: "Spain" }
  | { id: number; country: "France" }
  | { id: number; country: "United Kingdom" };

const locations: Location[] = [
  { id: 1, country: "Fully Remote" },
  { id: 2, country: "Germany" },
  { id: 3, country: "The Netherlands" },
  { id: 4, country: "Spain" },
  { id: 5, country: "France" },
  { id: 6, country: "United Kingdom" },
];

export function LocationInputBox() {
  const [selectedLocation, setSelectedLocation] = useState();
  const [query, setQuery] = useState("");

  const filteredLocations: Location[] =
    query === ""
      ? locations
      : locations.filter((location) => {
          return location.country.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      <Combobox value={selectedLocation} onChange={setSelectedLocation}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(selectedLocation: Location) =>
                selectedLocation.country
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredLocations.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredLocations.map((location: Location) => (
                  <Combobox.Option
                    key={location.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={location}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {location.country}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
