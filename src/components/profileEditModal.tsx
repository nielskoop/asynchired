import { useUser } from "@clerk/nextjs";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useModal } from "~/context/modalStore";

export const ProfileEditModal: React.FC = () => {
  const [isOpen, setIsOpen] = useModal("editProfile");

  const { user } = useUser();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={
        "fixed left-1/2 top-1/2 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-solid border-[#1A78E6] bg-white text-black"
      }
    >
      <Dialog.Panel>
        <Dialog.Title
          className={
            "mb-4 border-b-2 border-[#1A78E6] text-center text-lg font-semibold"
          }
        >
          <h2>Edit Profile</h2>
        </Dialog.Title>
        <Dialog.Description
          className={"flex flex-row items-center justify-evenly"}
        >
          <h3 className="w-1/2 pl-1"> Update your account details below</h3>
          <div className="flex flex-col pr-1">
            <Image
              src={user!.imageUrl}
              alt={`Profile picture`}
              width={128}
              height={128}
              className="rounded-full border-2 border-solid border-[#1A78E6]"
            />
            <button className="hover:underline">Edit</button>
          </div>
        </Dialog.Description>
        {/* add logic to show placeholder if no info, else show value of state */}
        <form className="mt-4 flex flex-row flex-wrap items-center justify-center px-2">
          <label htmlFor="Job" className="m-2 flex flex-col">
            Job
            <input
              type="text"
              id="Job"
              placeholder="Job"
              className="rounded-lg border-[1px] border-[#1A78E6] p-1 text-black focus-visible:outline-none "
            />
          </label>
          <label htmlFor="Location" className="m-2 flex flex-col">
            Location
            <input
              type="text"
              id="Location"
              placeholder="Location"
              className="rounded-lg border-[1px] border-[#1A78E6] p-1 text-black focus-visible:outline-none "
            />
          </label>
          <label htmlFor="Tech Stack" className="m-2 flex flex-col">
            Tech Stack
            <input
              type="text"
              id="Tech Stack"
              placeholder="Tech Stack"
              className="rounded-lg border-[1px] border-[#1A78E6] p-1 text-black focus-visible:outline-none "
            />
          </label>
          <label htmlFor="Education" className="m-2 flex flex-col">
            Education
            <input
              type="text"
              id="Education"
              placeholder="Education"
              className="rounded-lg border-[1px] border-[#1A78E6] p-1 text-black focus-visible:outline-none "
            />
          </label>
        </form>

        <div className="mt-2 flex flex-row justify-between bg-[#1A78E6] px-4 py-1 text-white">
          <button className="hover:underline" onClick={() => setIsOpen(false)}>
            Update
          </button>
          <button className="hover:underline" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
