import { Dialog } from "@headlessui/react";

import { useState } from "react";
import { useModal } from "~/context/modalContext";
import { Overlay } from "../LoadingAndSkeletonsAndOverlays/overlay";

export const SaveSearcNameModal: React.FC<{
  handleSaveSearch: (e: React.MouseEvent, searchName: string) => void;
}> = ({ handleSaveSearch }) => {
  const [isOpen, setIsOpen] = useModal("saveSearchName");
  const [searchName, setSearchName] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  return (
    <>
      {isOpen && <Overlay />}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-solid border-[#1A78E6] bg-white text-black md:max-h-[85%] xl:min-w-fit"
      >
              <form className="">
        <Dialog.Panel>
          <Dialog.Title className="flex flex-wrap justify-center border-b-2 border-[#1A78E6] p-2 text-center text-lg font-semibold sm:flex-nowrap">
            <div className="pb-1 md:pr-2 text-xl">
              <h1>Save This Search</h1>
            </div>

            <div className="flex w-full flex-wrap items-center justify-evenly sm:pl-2 lg:w-auto lg:flex-nowrap"></div>
          </Dialog.Title>
          <Dialog.Description className="flex flex-col items-center py-2">
            <h2 className="mx-4 mb-1 text-lg">
              Name your search and click save!
            </h2>
            <div className="max-h-screen md:max-h-[400px]">
                <input
                  type="text"
                  id="Name"
                  required
                  placeholder="Name"
                  className="rounded-lg border-[1px] border-[#1A78E6] p-1 text-black focus-visible:outline-none mx-4"
                  onChange={handleInputChange}
                />
            </div>
          </Dialog.Description>
          <div className="flex w-full justify-between rounded-b-md bg-[#1A78E6] px-4 py-1 text-white mb-0">
            <button
                className="hover:underline"
                type="submit"
              onClick={(e) => handleSaveSearch(e, searchName)}
              >
              Save
            </button>
            <button
              className="hover:underline"
              onClick={() => setIsOpen(false)}
              >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
              </form>
      </Dialog>
    </>
  );
};
