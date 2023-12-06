import { useEffect } from "react";
import { useFilter } from "~/context/FilterContext";

interface SaveSearchInputDisabledProps {
  data: string | null | undefined;
}

export const SaveSearchInputDisabled: React.FC<SaveSearchInputDisabledProps> = ({ data }) => {


  return (
    <div className="flex flex-col flex-grow">
    <div className="text-sm py-2 px-3 text-black lg:w-[247px] relative h-[36px] min-w-[211.69px] max-w-[247px] rounded-lg bg-white shadow-md">
        <p>{data}</p>
    </div>
    </div>

  );
};
