import { useAuth, useUser } from "@clerk/nextjs";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useModal } from "~/context/modalContext";
import { Overlay } from "./overlay";
import { api } from "~/utils/api";
import { LoadingPage } from "./Loading";
import { useProfile } from "~/context/profileContext";
import React, { useState } from "react";
import newIcon from '../../public/111-write.svg';


export const ProfileEditModal: React.FC = () => {
  const { profileDetails, setProfileDetails } = useProfile();
  const [isOpen, setIsOpen] = useModal("editProfile");
  const { user } = useUser();
  const { userId } = useAuth();
  const { data:profileData } = api.user.getProfile.useQuery(userId!);
  const { mutate: updateProfile, isLoading} = api.user.updateProfile.useMutation();
  const [editMode, setEditMode] = useState({
    job: false,
    location: false,
    techStack: false,
    education: false,
  });
  if (!userId) return <> please log in</>
  if (isLoading) return <LoadingPage />;
  if (!profileData) return <>No data</> ;
  if(profileDetails.job === '' && profileData.job !== '') {
    setProfileDetails({job: profileData.job,
      location: profileData.location,
      education: profileData.education,
      techStack: profileData.techStack,
      userId});
  }
  const handleClick = async() => {
    console.log(profileData)
    console.log(profileDetails)
    updateProfile(profileDetails);
    setEditMode({
      job: false,
      location: false,
      techStack: false,
      education: false,
    });
    setIsOpen(false)
  }
  const handleClose = () => {
    setProfileDetails({job: profileData.job,
      location: profileData.location,
      education: profileData.education,
      techStack: profileData.techStack,
      userId});
      setEditMode({
        job: false,
        location: false,
        techStack: false,
        education: false,
      });
      setIsOpen(false)
  }
  interface EditIconProps {
    onClick: () => void;
  }
  const EditIcon: React.FC<EditIconProps> = React.memo(({ onClick }) => (
    <button className="ml-2 text-[#1A78E6] hover:text-blue-500" onClick={onClick}>
      <Image src={newIcon} alt={'Editing'} width={20}
                height={20}/>
    </button>
  ));
  
  return (
    <>
      {isOpen && <Overlay />}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className={
          "z-30 fixed left-1/2 top-1/2 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-solid border-[#1A78E6] bg-white text-black"
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
                value={profileDetails.job}
                readOnly={!editMode.job}
                className={`rounded-lg border-[1px] border-[#1A78E6] p-1 text-black focus-visible:outline-none ${
                  editMode.job ? "bg-gray-100" : ""
                }`}
                onChange={(e) => setProfileDetails({...profileDetails, job:e.target.value})}
                />
                <EditIcon onClick={() => setEditMode({...editMode, job: !editMode.job})} />
            </label>
            <label htmlFor="Location" className="m-2 flex flex-col">
              Location
                <input
                type="text"
                id="Location"
                value={profileDetails.location}
                readOnly={!editMode.location}
                className={`rounded-lg border-[1px] border-[#1A78E6] p-1 text-black focus-visible:outline-none ${
                  editMode.location ? "bg-gray-100" : ""
                }`}
                onChange={(e) => setProfileDetails({...profileDetails, location:e.target.value})}
                />
                <EditIcon onClick={() => setEditMode({...editMode, location: !editMode.location})} />
              
            </label>
            <label htmlFor="Tech Stack" className="m-2 flex flex-col">
              Tech Stack
              <input
                type="text"
                id="Tech Stack"
                value={profileDetails.techStack}
                readOnly={!editMode.techStack}
                className={`rounded-lg border-[1px] border-[#1A78E6] p-1 text-black focus-visible:outline-none ${
                  editMode.techStack ? "bg-gray-100" : ""
                }`}
                onChange={(e) => setProfileDetails({...profileDetails, techStack:e.target.value})}
                />
                <EditIcon onClick={() => setEditMode({...editMode, techStack: !editMode.techStack})} />
              
            </label>
            <label htmlFor="Education" className="m-2 flex flex-col">
              Education
              <input
                type="text"
                id="Education"
                value={profileDetails.education}
                readOnly={!editMode.education}
                className={`rounded-lg border-[1px] border-[#1A78E6] p-1 text-black focus-visible:outline-none ${
                  editMode.education ? "bg-gray-100" : ""
                }`}
                onChange={(e) => setProfileDetails({...profileDetails, education:e.target.value})}
                />
                <EditIcon onClick={() => setEditMode({...editMode, education: !editMode.education})} />
              
            </label>
          </form>

          <div className="mt-2 flex flex-row justify-between bg-[#1A78E6] px-4 py-1 text-white">
            <button
              className="hover:underline"
              onClick={handleClick}
            >
              Update
            </button>
            <button
              className="hover:underline"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
