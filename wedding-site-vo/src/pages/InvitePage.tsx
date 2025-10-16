import { useState } from "react";
import HeaderSection from "./sections/HeaderSection";
import DetailsSection from "./sections/DetailsSection";
import ConfirmModal from "../component/ConfirmModal";

export default function InvitePage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <HeaderSection />
      <DetailsSection />
      <ConfirmModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
