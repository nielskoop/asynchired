import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type Role =
  | { id: number; title: "Software Engineer" }
  | { id: number; title: "Backend Developer" }
  | { id: number; title: "Frontend Developer" }
  | { id: number; title: "DevOps" }
  | { id: number; title: "UI/UX Designer" }
  | { id: number; title: "Product Manager" };

const roles: Role[] = [
  { id: 1, title: "Software Engineer" },
  { id: 2, title: "Backend Developer" },
  { id: 3, title: "Frontend Developer" },
  { id: 4, title: "DevOps" },
  { id: 5, title: "UI/UX Designer" },
  { id: 6, title: "Product Manager" },
];

export function RoleInputBox() {
  const [selectedRole, setSelectedRole] = useState();
  const [query, setQuery] = useState("");

  const filteredRoles: Role[] =
    query === ""
      ? roles
      : roles.filter((role) => {
          return role.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      <Combobox value={selectedRole} onChange={setSelectedRole}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(selectedRole: Role) => selectedRole.title}
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
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredRoles.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredRoles.map((role: Role) => (
                  <Combobox.Option
                    key={role.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
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
