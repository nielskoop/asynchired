//src\components\Inputs\minSalaryInputBox.tsx
import React, { useState, FormEvent } from "react";
import { useFilter } from "~/context/FilterContext";

export function MinSalaryInputBox() {
  const { setMinSalaryFilter } = useFilter();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from causing a page reload
    const salaryValue = inputValue === "" ? undefined : Number(inputValue);
    setMinSalaryFilter(salaryValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-h-8 w-full items-center justify-between rounded-lg bg-white p-2 shadow-md focus:outline-none"
    >
      <p className="sm:text-md text-sm">Min Salary:</p>
      <div className="relative flex items-center">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Insert minimum $"
          className="ml-2 max-h-6 w-full rounded-lg border border-gray-300 py-1 pl-2 text-xs text-black focus-visible:outline-none sm:text-sm"
          style={{
            paddingRight: "2rem",
          }}
        />
        <button
          type="submit"
          className="absolute right-0 text-sm text-gray-500 hover:text-blue-500"
          style={{
            paddingRight: "1rem",
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        >
          Apply
        </button>
      </div>
    </form>
  );
}
