import React from "react";
import { Entity } from "../types/ChatType";
import Location from "../assets/images/Location.png";

interface ChatCardProps {
   item: Entity;
}

const ChatCard: React.FC<ChatCardProps> = ({ item }) => {
   return (
<div className="flex flex-col justify-between bg-light_gray border border-border_color rounded-3xl lg:p-4 px-2 py-4 h-[270px]">
         <div className="flex flex-col h-full">
            <div className="flex justify-between items-start">
               <p className="text-header_color line-clamp-2 break-words overflow-hidden font-bold text-start lg:text-xl text-lg mb-1">
                  {item.name}
               </p>
               {item.topMatch && (
                  <span>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-6 text-[#2f539b] ml-2"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m4.5 12.75 6 6 9-13.5"
                        />
                     </svg>
                  </span>
               )}
            </div>
            <div className="flex items-start">
               <p className="text-header_color line-clamp-2 break-words overflow-hidden font-bold text-start text-sm mb-2">
                  {item.contactDetails.address}
               </p>
               <img
                  src={Location}
                  className="lg:w-5 ml-1 lg:h-5 w-4 h-4 object-cover"
                  alt="Address"
               />
            </div>
            <p className="lg:text-[16px] text-xs text-start font-normal text-header_color mb-4 line-clamp-2 break-words overflow-hidden ">
               {item.description}
            </p>
         </div>
         <div className="flex flex-col gap-2 ">
            <div className="flex flex-wrap gap-2">
               {item.highlightedAgeGroup && (
                  <span className="tags-style bg-dark_gray text-start">
                     {`${item.highlightedAgeGroup.ageMin}-${item.highlightedAgeGroup.ageMax} jaar`}
                  </span>
               )}
               {item.highlightedTreatmentArea && (
                  <span className="tags-style bg-pale_orange text-start">
                     {item.highlightedTreatmentArea}
                  </span>
               )}
            </div>
            <div className="flex flex-wrap gap-2">
               {item.highlightedTreatmentMethod && (
                  <span className="tags-style bg-pastel_blue text-start">
                     {item.highlightedTreatmentMethod}
                  </span>
               )}
            </div>
         </div>
      </div>
   );
};

export default ChatCard;
