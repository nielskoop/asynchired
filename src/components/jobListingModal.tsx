import { Dialog } from "@headlessui/react";
import { ModalProps } from "~/types/modals";
import type { Post } from "@prisma/client";

export const JobListingModal: React.FC<ModalProps & Post> = ({
  isOpen,
  setIsOpen,
}, post: Post) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={
        "fixed left-1/2 top-1/2 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#1A78E6] p-4 text-white"
      }
    >
      <Dialog.Panel>
        <Dialog.Title className={"mb-4 border-b-2 text-center"}>
          <h2>{post.title}</h2>
        </Dialog.Title>
        <Dialog.Description>
          <h3> Update your account details below</h3>
        </Dialog.Description>
        {/* add logic to show placeholder if no info, else show value of state */}
        <form className="mt-4 flex flex-row flex-wrap items-center justify-center">
          <label htmlFor="Job" className="m-2 flex flex-col">
            Job
            <input
              type="text"
              id="Job"
              placeholder="Job"
              className="focus-visible: rounded-lg p-1 text-black outline-none"
            />
          </label>
          <label htmlFor="Location" className="m-2 flex flex-col">
            Location
            <input
              type="text"
              id="Location"
              placeholder="Location"
              className="focus-visible: rounded-lg p-1 text-black outline-none"
            />
          </label>
          <label htmlFor="Tech Stack" className="m-2 flex flex-col">
            Tech Stack
            <input
              type="text"
              id="Tech Stack"
              placeholder="Tech Stack"
              className="focus-visible: rounded-lg p-1 text-black outline-none"
            />
          </label>
          <label htmlFor="Education" className="m-2 flex flex-col">
            Education
            <input
              type="text"
              id="Education"
              placeholder="Education"
              className="focus-visible: rounded-lg p-1 text-black outline-none"
            />
          </label>
        </form>

        <div className="mt-2 flex flex-row justify-between">
          <button onClick={() => setIsOpen(false)}>Update</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
