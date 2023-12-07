//src\components\Inputs\minSalaryInputBox.tsx
export function MinSalaryInputBox() {
  return (
    <div className="flex max-h-8 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 shadow-md focus:outline-none">
      <p className="sm:text-md text-sm">Min Salary:</p>
      <div className="relative flex items-center">
        <input
          type="number"
          placeholder="Insert minimum salary"
          className="ml-2 max-h-6 w-full rounded-lg border border-gray-300 py-1 pl-2 text-center text-xs text-black focus-visible:outline-none sm:text-sm"
          style={{ paddingRight: "2rem" }} // Adjust padding to prevent overlap with the dollar sign
        />
        <span className="absolute right-2 text-sm text-gray-500">$</span>
      </div>
    </div>
  );
}
