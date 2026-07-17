import { useState } from "react";

import ConfirmModal from "../../component/modal/ConfirmModal";

import CandleLights from "../../component/details/CandleLights";
import CoupleFrame from "../../component/details/CoupleFrame";
import CouplePlate from "../../component/details/CouplePlate";
import CountdownSection from "../../component/details/CountdownSection";
import StorySection from "../../component/details/StorySection";
import WeddingCalendar from "../../component/details/WeddingCalendar";
import ConfirmPresenceButton from "../../component/details/ConfirmPresenceButton";

export default function DetailsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const paperBackground = {
    backgroundColor: "#30190541",
    backgroundImage: `
      url('https://www.transparenttextures.com/patterns/snow.png'),
      radial-gradient(
        circle,
        rgba(255,217,182,0.7) 0%,
        rgba(102,89,65,0.83) 100%,
        rgba(66,58,42,0.83) 100%
      )
    `,
    backgroundBlendMode: "multiply" as const,
    backgroundSize: "cover, cover",
    position: "relative" as const,
  };

  return (
    <>
      <section
        className="
          min-h-dvh
          w-full
          overflow-hidden
          relative
          px-4
          sm:px-6
          lg:px-8
          py-10
          md:py-14
        "
        style={paperBackground}
      >
        <CandleLights />

        <div
          className="
            relative
            z-20
            w-full
            max-w-5xl
            mx-auto

            flex
            flex-col
            items-center

            gap-8
            md:gap-10
          "
        >
          {/* FOTO */}
          <div
            className="
              w-full
              max-w-4xl
              flex
              justify-center
            "
          >
            <CoupleFrame />
          </div>

          {/* PLAQUINHA */}
          <div
            className="
              w-full
              max-w-xl
              flex
              justify-center
            "
          >
            <CouplePlate />
          </div>

          {/* CONTADOR */}
          <div
            className="
              w-full
              flex
              justify-center
              items-center
            "
          >
            <CountdownSection />
          </div>

          {/* HISTÓRIA */}
          <div
            className="
              w-full
              max-w-4xl
            "
          >
            <StorySection />
          </div>


          {/* CALENDÁRIO */}
          <div
            className="
              w-full
              flex
              justify-center
              items-center
            "
          >
            <WeddingCalendar />
          </div>

          {/* BOTÃO */}
          <div
            className="
              w-full
              flex
              justify-center
              pt-2
            "
          >
            <ConfirmPresenceButton
              onClick={() =>
                setIsModalOpen(true)
              }
            />
          </div>
        </div>

        <style>{`
          @keyframes flicker {
            0%,100%{
              opacity:0.3;
              transform:scale(1);
            }

            25%{
              opacity:0.4;
              transform:scale(1.05);
            }

            50%{
              opacity:0.25;
              transform:scale(0.95);
            }

            75%{
              opacity:0.35;
              transform:scale(1.02);
            }
          }
        `}</style>
      </section>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
      />
    </>
  );
}