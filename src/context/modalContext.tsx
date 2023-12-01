import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ModalContextProps {
  children: ReactNode;
}

interface ModalContextValue {
  modals: Record<string, boolean>;
  setModal: (
    modalId: string | number,
    isOpen: React.SetStateAction<boolean>,
  ) => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider: React.FC<ModalContextProps> = ({ children }) => {
  const [modals, setModals] = useState<Record<string, boolean>>({});

  const setModal = (
    modalId: string | number,
    isOpen: React.SetStateAction<boolean>,
  ) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalId]:
        typeof isOpen === "function"
          ? isOpen(prevModals[modalId] ?? false)
          : isOpen,
    }));
  };

  const value: ModalContextValue = {
    modals,
    setModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = (
  modalId: string | number,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const { modals, setModal } = context;

  const isOpen = modals[modalId] ?? false;
  const setIsOpen: React.Dispatch<React.SetStateAction<boolean>> = (newState) =>
    setModal(modalId, newState);

  return [isOpen, setIsOpen];
};
