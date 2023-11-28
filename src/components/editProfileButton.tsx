import { useState } from "react";
import { ProfileEditModal } from "./profileEditModal";

export const EditProfileButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex grow flex-col justify-end">
        <button
          className="m-4 rounded-2xl bg-[#1A78E6] p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          Edit Profile
        </button>
      </div>
      <ProfileEditModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
