import { ReactNode } from "react";

interface PopupProps {
   isOpen: boolean;
   onClose: () => void;
   children: ReactNode;
   title?: string;
}

const PopUp = ({ isOpen, onClose, children, title }: PopupProps) => {
   if (!isOpen) return null;

   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   };

   return (
      <div
         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
         onClick={handleOverlayClick}
      >
         <div className="bg-white relative p-6 rounded-2xl shadow-xl w-full max-w-[600px] mx-4 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-4">
               {title && (
                  <h2 className="text-2xl text-center font-semibold w-full">
                     {title}
                  </h2>
               )}
               <button
                  onClick={onClose}
                  className="text-gray-500 absolute right-5 top-5 hover:text-black text-2xl font-bold"
               >
                  ✖
               </button>
            </div>
            <div className="overflow-y-auto max-h-[70vh] flex justify-center w-full">
               {children}
            </div>
         </div>
      </div>
   );
};

export default PopUp;
