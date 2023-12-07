interface SaveSearchInputDisabledProps {
  data: string | null | undefined;
}

export const SaveSearchInputDisabled: React.FC<SaveSearchInputDisabledProps> = ({ data }) => {


  return (
    <div className="flex flex-row flex-grow justify-center items-center w-full">
    <div className="grow w-full text-sm py-2 px-3 text-black lg:w-[247px] relative h-[36px] min-w-[211.69px] rounded-lg bg-white shadow-md">
        <p>{data}</p>
    </div>
    </div>

  );
};
