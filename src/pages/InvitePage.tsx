import { useState } from "react";
import HeaderSection from "./InviteSections/HeaderSection";
import DetailsSection from "./InviteSections/DetailsSection";
import ConfirmModal from "../component/ConfirmModal";
import Footer from "../component/Footer";

export default function InvitePage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <HeaderSection />
      <DetailsSection />
      <ConfirmModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <Footer />
    </>
  );
}
