import { ProfileEditModal } from "./profileEditModal";
import { useModal } from "~/context/modalStore";

export const EditProfileButton = () => {
  const [isOpen, setIsOpen] = useModal('editProfile');

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
      <ProfileEditModal/>
    </>
  );
};
