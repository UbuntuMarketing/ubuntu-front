"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IProps {
   children: React.ReactNode;
   keyPortal: string;
   className?: string;
   isActive: boolean;
   setIsActive: React.Dispatch<boolean>;
}

const Modal = ({
   children,
   keyPortal,
   className = "",
   isActive,
   setIsActive,
}: IProps) => {
   const [isDomLoaded, setDomLoaded] = useState(false);

   useEffect(() => {
      setDomLoaded(true);
   }, []);

   return isDomLoaded
      ? createPortal(
           <div
              className={`${
                 isActive ? "fixed" : "hidden"
              } flex justify-center items-center inset-0 z-50 h-screen w-screen bg-black opacity bg-opacity-80`}
           >
              <button
                 onClick={() => setIsActive(false)}
                 className="absolute z-50 right-8 top-8 p-1 w-7 h-7 circle text-white text-2xl cursor-pointer"
              >
                 X
              </button>
              <div className={`max-w-3/4 max-h-3/4 p-4 overflow-auto bg-white ${className}`}>
                 {children}
              </div>
           </div>,
           document.getElementById("modal") as Element,
           keyPortal
        )
      : null;
};

const SvgClose = () => {
   return <div></div>;
};

export default Modal;
