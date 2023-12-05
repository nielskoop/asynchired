import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { TagIcon } from "./TagIcon";
import { EditProfileButton } from "./editProfileButton";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { TagIcon } from "./TagIcon";
import { EditProfileButton } from "./editProfileButton";
import { useProfile } from "~/context/profileContext";

export const UserInfo = () => {
  const { user } = useUser();
  const { profileDetails } = useProfile();


  return (
    <>
      <div className="relative mx-8 mb-8 flex min-h-[400px] min-w-[400px] flex-col items-center rounded-lg border-2 border-solid border-[#1A78E6] px-8 shadow-lg">
        <Image
          src={user!.imageUrl}
          alt={`Profile picture`}
          width={128}
          height={128}
          className="left-50% absolute top-[-16.5%] rounded-full border-2 border-solid border-[#1A78E6]"
        />
        <h1 className="mt-[30%] pb-4 text-2xl font-bold">{user?.fullName}</h1>
        <ul className="pb-4">
          <li>
            <TagIcon className="gap-2" text={profileDetails.job} type="company" />
          </li>
          <li>
            <TagIcon className="gap-2" text={profileDetails.location} type="location" />
          </li>
          <li>
            <TagIcon
              className="gap-2"
              text={profileDetails.techStack}
              type="tech"
            />
          </li>
          <li>
            <TagIcon
              className="gap-2"
              text={profileDetails.education}
              type="education"
            />
          </li>
        </ul>
        <EditProfileButton />
      </div>
    </>
  );
};

