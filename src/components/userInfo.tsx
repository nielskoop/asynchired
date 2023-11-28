import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { TagIcon } from "./TagIcon";

export const UserInfo = () => {
  const { user } = useUser();

  return (
    <>
      <div className="relative mx-8 mb-8 flex min-h-[400px] min-w-[400px] flex-col items-center rounded-lg border-2 border-solid border-gray-300 px-8 ">
        <Image
          src={user!.imageUrl}
          alt={`Profile picture`}
          width={128}
          height={128}
          className="left-50% absolute top-[-16.5%] rounded-full border-2 border-solid border-gray-300"
        />
        <h1 className="mt-[30%] pb-4 text-2xl font-bold">{user?.fullName}</h1>
        <ul className="pb-4">
          <li>
            <TagIcon className="gap-2" text="Unemployed" type="company" />
          </li>
          <li>
            <TagIcon className="gap-2" text="Alicante, Spain" type="location" />
          </li>
          <li>
            <TagIcon
              className="gap-2"
              text="React, Next.js, Node.js, Angular, Figma"
              type="tech"
            />
          </li>
          <li>
            <TagIcon
              className="gap-2"
              text="Proud bootcamper"
              type="education"
            />
          </li>
        </ul>
        <div className="flex grow flex-col justify-end">
          <button className="m-4 rounded-2xl bg-black p-2 text-white">
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};
