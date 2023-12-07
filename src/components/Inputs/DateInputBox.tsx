import { RadioGroup } from "@headlessui/react";
import { useFilter } from "~/context/FilterContext";
import { useState } from "react";

// Define the type for each date option
type DateOptionKey = "yesterday" | "lastWeek" | "lastMonth";

// Update dateOptions to include the type for `value`
const dateOptions: { label: string; value: DateOptionKey }[] = [
  { label: "Yesterday", value: "yesterday" },
  { label: "Last Week", value: "lastWeek" },
  { label: "Last Month", value: "lastMonth" },
  // { label: "Last Year", value: "lastYear" },
];

const dates = {
  yesterday: new Date(new Date().setDate(new Date().getDate() - 1)),
  lastWeek: new Date(new Date().setDate(new Date().getDate() - 7)),
  lastMonth: new Date(new Date().setDate(new Date().getDate() - 30)),
  // lastYear: new Date(new Date().setDate(new Date().getDate() - 365)),
};
export function DateInputBox() {
  const { setDateFilter } = useFilter();
  const [selectedDate, setSelectedDate] = useState<DateOptionKey | undefined>(
    undefined,
  );
  const [key, setKey] = useState(0); // Additional state to force re-render

  const handleDateChange = (value: DateOptionKey) => {
    if (selectedDate === value) {
      setSelectedDate(undefined);
      setDateFilter(undefined);
      setKey((prevKey) => prevKey + 1); // Increment key to force re-render
    } else {
      setSelectedDate(value);
      setDateFilter(dates[value]);
    }
  };
  const handleOptionClick = (value: DateOptionKey) => () => {
    handleDateChange(value);
  };

  return (
    <div className="flex flex-col" key={key}>
      {" "}
      {/* Use key here */}
      <RadioGroup value={selectedDate} onChange={handleDateChange}>
        <div className="flex gap-4 space-y-4">
          <RadioGroup.Label className="sr-only">Date Filter</RadioGroup.Label>
          {dateOptions.map((option) => (
            <RadioGroup.Option
              key={option.value}
              value={option.value}
              className={({ active, checked }) =>
                `max-h-6 whitespace-nowrap p-2 py-6 sm:py-4 ${
                  active ? "ring-2 ring-blue-300 ring-offset-2" : ""
                }
                ${checked ? "bg-blue-500 text-white" : "bg-white"}
                relative flex cursor-pointer rounded-lg shadow-md focus:outline-none`
              }
              onClick={handleOptionClick(option.value)}
            >
              {({ checked }) => (
                <div className="flex w-full items-center justify-between">
                  <RadioGroup.Label
                    as="p"
                    className={`sm:text-md py-2 text-sm ${
                      checked ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {option.label}
                  </RadioGroup.Label>
                  {checked && (
                    <div className="shrink-0 text-white">
                      <CheckIcon className="ml-2 h-6 w-6" />
                    </div>
                  )}
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
