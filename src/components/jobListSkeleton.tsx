export const JobListSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="reflection-wave flex h-20 w-full justify-between rounded-md border-b border-slate-300 bg-gray-600 p-3 shadow-md sm:mx-auto sm:mt-3 sm:w-4/5 sm:rounded-2xl sm:border-x sm:border-t"></div>
      <div className="reflection-wave flex h-20 w-full justify-between rounded-md border-b border-slate-300 bg-gray-600 p-3 shadow-md sm:mx-auto sm:mt-3 sm:w-4/5 sm:rounded-2xl sm:border-x sm:border-t"></div>
      <div className="shadow-md reflection-wave flex h-20 w-full justify-between rounded-md border-b border-slate-300 bg-gray-600 p-3 sm:mx-auto sm:mt-3 sm:w-4/5 sm:rounded-2xl sm:border-x sm:border-t"></div>
    </div>
  );
};
