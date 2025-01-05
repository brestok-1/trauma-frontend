import React from "react";
import { Entity } from "../types/ChatType";

interface ChatCardProps {
   item: Entity;
}

const ChatCard: React.FC<ChatCardProps> = ({ item }) => {
   return (
      <div className="bg-light_gray border border-border_color md:w-[230px] w-[210px] rounded-3xl lg:p-4 px-2 py-4 h-full">
         <p className="text-header_color line-clamp-2 break-words overflow-hidden font-bold text-start lg:text-xl text-lg mb-2">
            {item.name}
         </p>
         <p className="lg:text-[16px] text-xs text-start font-normal text-header_color mb-2">
            Psychotherapy Clinic, <br /> Haarlem
         </p>
         <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
               {item.ageGroups.length > 0 && (
                  <span className="tags-style bg-dark_gray text-start">
                     {(() => {
                        const randomIndex = Math.floor(
                           Math.random() * item.ageGroups.length
                        );
                        return `${item.ageGroups[randomIndex].ageMin}-${item.ageGroups[randomIndex].ageMax} jaar`;
                     })()}
                  </span>
               )}

               {item.treatmentAreas.length > 0 && (
                  <span className="tags-style bg-pale_orange text-start">
                     {
                        item.treatmentAreas[
                           Math.floor(
                              Math.random() * item.treatmentAreas.length
                           )
                        ]
                     }
                  </span>
               )}
            </div>
            <div className="flex flex-wrap gap-2">
               {item.treatmentMethods.length > 0 && (
                  <span className="tags-style bg-pastel_blue text-start">
                     {
                        item.treatmentMethods[
                           Math.floor(
                              Math.random() * item.treatmentMethods.length
                           )
                        ]
                     }
                  </span>
               )}
            </div>
         </div>
      </div>
   );
};

export default ChatCard;
