import React, { useState } from "react";
import ImageIconSvg from "./ImageIconSvg";
import Modal from "../Modal";

function MyInsertImage({
   onSubmit,
}: {
   onSubmit: (urlImagen: string, urlRedirect: string) => void;
}) {
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [imageUrl, setImageUrl] = useState("");
   const [redirectUrl, setRedirectUrl] = useState("");

   const handlePopup = (e: any) => {
      e.preventDefault();
      setIsPopupOpen(!isPopupOpen);
   };

   const handleAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
      onSubmit(imageUrl, redirectUrl);
      setIsPopupOpen(false);
   };

   return (
      <div className="flex items-center h-full p-1 rounded hover:bg-[#eceef0]">
         <button className="cursor-pointer" onClick={handlePopup}>
            <ImageIconSvg />
         </button>
         {isPopupOpen && (
            <Modal
               keyPortal="imagepicker"
               isActive={isPopupOpen}
               setIsActive={setIsPopupOpen}
            >
               <div className="relative flex flex-col p-4 z-50 bg-white border rounded-lg">
                  <input
                     type="text"
                     placeholder="URL imagen"
                     value={imageUrl}
                     onChange={(e) => setImageUrl(e.target.value)}
                     className="mb-2 p-2 border rounded"
                  />
                  <input
                     type="text"
                     placeholder="Link imagen"
                     value={redirectUrl}
                     onChange={(e) => setRedirectUrl(e.target.value)}
                     className="mb-2 p-2 border rounded"
                  />
                  <button
                     className="my-3 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                     onClick={handleAccept}
                  >
                     Aceptar
                  </button>
                  <button
                     className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
                     onClick={handlePopup}
                  >
                     Cancelar
                  </button>
               </div>
            </Modal>
         )}
      </div>
   );
}

export default MyInsertImage;
