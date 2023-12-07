import { useContext } from "react";
import { ModalContext } from "../../context/modalContext"

export const GlobalOverlay = ({ activeModals }: { activeModals: string[] }) => {
  const context = useContext(ModalContext);

  if (!context) {
    console.error("Modal provider not found");
    return null;
  }

  const { modals } = context;

  const isRelevantModalOpen = activeModals.some((modalId) => modals[modalId]);

  return isRelevantModalOpen ? (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50"></div>
  ) : null;
};