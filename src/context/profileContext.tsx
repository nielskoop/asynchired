import React, { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
// Define the shape of your context data
interface ProfileDetails {
    job: string;
    education: string;
    techStack: string;
    location: string;
    userId: string;
  }

  interface ProfileContextType {
    profileDetails: ProfileDetails;
    setProfileDetails: Dispatch<SetStateAction<ProfileDetails>>;
  }

  // Create the context with an initial dummy value
  const ProfileContext = createContext<ProfileContextType>({
    profileDetails: { job: '', education: '', techStack: '', location: '', userId: '' },
    setProfileDetails: (value: SetStateAction<ProfileDetails>) => {
    },
  });

  export const useProfile = () => {
    const context = useContext(ProfileContext);

    if (!context) {
      throw new Error('useProfile must be used within a ProfileProvider');
    }

    return context;
  };

// Type the props for FilterProvider
interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profileDetails, setProfileDetails] = useState({job: '', education: '', techStack: '', location: '', userId: ''});

  const value = {
    profileDetails,
    setProfileDetails,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};