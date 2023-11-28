import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { EditProfileButton } from "./editProfileButton";

export const UserInfo = () => {
  const { isSignedIn, user, isLoaded } = useUser();

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
            <Image
              src={"/046-business 1.svg"}
              alt={`suitcase icon`}
              width={20}
              height={20}
              className="mr-1 inline"
            />
            Unemployed
          </li>
          <li>
            <Image
              src={"/071-location pin 1.svg"}
              alt={`suitcase icon`}
              width={20}
              height={20}
              className="mr-1 inline"
            />
            Alicante, Spain
          </li>
          <li>
            <Image
              src={"/148-education 1.svg"}
              alt={`suitcase icon`}
              width={20}
              height={20}
              className="mr-1 inline"
            />
            React, Next.js, Node.js, Angular, Figma
          </li>
          <li>
            <Image
              src={"/149-education 1.svg"}
              alt={`suitcase icon`}
              width={20}
              height={20}
              className="mr-1 inline"
            />
            Proud bootcamper
          </li>
        </ul>
        <EditProfileButton />
      </div>
    </>
  );
};
