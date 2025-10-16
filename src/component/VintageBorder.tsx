// src/components/VintageBorder.tsx
import React from "react";
import cornerImage from "../assets/img/cornerImage.png";
export default function VintageBorder({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen w-full flex justify-center items-center overflow-hidden"
      style={{
        backgroundColor: "#4d6648ff",
        backgroundImage: "url('https://www.transparenttextures.com/patterns/xv.png')",
      }}
    >
      {/* ===== Outer Border ===== */}
      <div className="absolute inset-0 border-2 border-[#DE9B72] p-[6px] pointer-events-none">
        {/* ===== Mid Border ===== */}
        <div className="w-full h-full border-[6px] border-[#DE9B72] p-[6px]">
          {/* ===== Inner Border ===== */}
          <div className="relative w-full h-full border-2 border-[#DE9B72']">
            {/* ===== Corner Decorations ===== */}
            <div className="relative w-full h-full">
              <img
                src={cornerImage}
                className="absolute top-0 left-0 w-32 h-32"
                alt="corner"
              />
              <img
                src={cornerImage}
                className="absolute top-0 right-0 w-32 h-32 scale-x-[-1]"
                alt="corner"
              />
              <img
                src={cornerImage}
                className="absolute bottom-0 right-0 w-32 h-32 scale-[-1]"
                alt="corner"
              />
              <img
                src={cornerImage}
                className="absolute bottom-0 left-0 w-32 h-32 scale-y-[-1]"
                alt="corner"
              />
            </div>
            {/* ===== Vertical Decorations ===== */}
            <img
              src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 md:w-52 lg:w-64"
              alt="top decoration"
            />
            <img
              src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 md:w-52 lg:w-64 scale-y-[-1]"
              alt="bottom decoration"
            />
          </div>
        </div>
      </div>

      {/* ===== Conteúdo central ===== */}
      <div className="relative z-10 w-full flex justify-center items-center px-4">
        {children}
      </div>
    </div>
    
  );
}
