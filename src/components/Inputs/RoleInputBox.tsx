import { useState, Fragment, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { api } from "~/utils/api";
import { useFilter } from "~/context/FilterContext";
import { InputSkeleton } from "../LoadingAndSkeletonsAndOverlays/InputSkeleton";
import { XMarkIcon } from "@heroicons/react/20/solid";

type Role = {
  id: number;
  title: string;
};

export function RoleInputBox() {
  const [query, setQuery] = useState("");
  const { data: roles, isLoading } = api.post.getAllRoles.useQuery("");
  const { setRoleFilter, roleFilter, selectedSearch, roleInputValue, setRoleInputValue } = useFilter();
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();

  useEffect(() => {
    if (roleFilter !== "") {
      setSelectedRole({ id: selectedSearch.id, title: selectedSearch.title! });
      setRoleFilter(selectedSearch.title!)
      setRoleInputValue(selectedSearch.title!)
    }
  }, [selectedSearch]);

  const filteredRoles =
    query === ""
      ? roles ?? []
      : roles?.filter((role) =>
          role.title.toLowerCase().includes(query.toLowerCase()),
        ) ?? [];

  if (isLoading) {
    return <InputSkeleton />;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQuery(newValue);
    setRoleInputValue(newValue);
  };

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    setRoleFilter(role.title);
    setRoleInputValue(role.title);
  };

  const clearInput = () => {
    setQuery(""); // Also clear the query here
    setRoleInputValue(""); // Clear the roleInputValue
    setSelectedRole(undefined); // Reset the selected role
    setRoleFilter(""); // Clear the role filter
  };


  return (
    <div>
      <Combobox value={selectedRole} onChange={handleRoleChange}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-12 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={handleInputChange}
              value={roleInputValue}
              onKeyDown={(event) => {
                if (event.key === "Enter" && query === "") {
                  event.preventDefault();
                  setSelectedRole(undefined);
                  setRoleFilter("");
                }
              }}
            />

            {/* Icons container */}
            <div className="absolute inset-y-0 right-0 flex items-center">
              {/* Clear input button */}
              {roleInputValue.length > 0 && ( // Check the new state for content
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
                value={{ id: -1, title: query }}
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
              {filteredRoles.map((role) => (
                <Combobox.Option
                  key={role.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    }`
                  }
                  value={role}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {role.title}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-blue-500"
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
