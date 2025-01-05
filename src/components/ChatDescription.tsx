import React, { useState } from "react";
import Globe from "../assets/images/Globe.png";
import Call from "../assets/images/Call.png";
import Location from "../assets/images/Location.png";
import Message from "../assets/images/Message.png";
import { Entity } from "../types/ChatType";

interface ChatDescriptionProps {
   item: Entity;
}

const ChatDescription: React.FC<ChatDescriptionProps> = ({ item }) => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

   const openModal = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsModalOpen(true);
   };

   const closeModal = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsModalOpen(false);
   };

   const handleModalClose = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
         closeModal(e);
      }
   };

   const handleClick = () => {
      if (item.contactDetails?.website) {
         window.open(item.contactDetails.website, "_blank");
      }
   };

   return (
      <div className="bg-light_gray rounded-t-3xl border border-border_color pt-5 cursor-pointer">
         <p className="font-bold lg:text-[32px] text-xl lg:px-4 px-2 text-header_color text-start leading-10">
            {item.name}
         </p>
         <div className="flex flex-col lg:gap-4 gap-2 rounded-lg lg:p-4 p-2">
            <div className="flex flex-wrap gap-2">
               {item.treatmentAreas.map((area, index) => (
                  <span key={index} className="tags-style bg-pale_orange">
                     {area}
                  </span>
               ))}
               {item.treatmentMethods.map((method, index) => (
                  <span key={index} className="tags-style bg-pastel_blue">
                     {method}
                  </span>
               ))}
               {item.ageGroups.map((ageGroup, index) => (
                  <span key={index} className="tags-style bg-dark_gray">
                     {ageGroup.ageMin}-{ageGroup.ageMax} jaar
                  </span>
               ))}
            </div>
         </div>
         <div className="bg-white pt-4 pl-4 pr-2 rounded-t-3xl border-t text-start border-border_color flex flex-col">
            <p className="font-bold lg:text-xl text-lg text-header_color mb-2">
               Description
            </p>
            <p className="text-[#555555] lg:text-[16px] text-sm font-normal lg:mb-10 mb-3 leading-7">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
               iaculis mi fringilla mauris <br /> ornare, in accumsan enim
               volutpat. Morbi vulputate libero rutrum neque dapibus suscipit.{" "}
               <br /> In vehicula, magna vitae ornare aliquam, nulla quam
               suscipit lectus, non consectetur ligula <br /> enim at sem.
               Maecenas sit amet nisl non tortor lacinia lobortis a at risus.
            </p>
            <button
               className="bg-[#0155A6] text-white lg:text-[16px] text-sm font-medium p-3 mt-auto mb-2 self-end"
               onClick={openModal}
            >
               Lees meer
            </button>
         </div>

         {/* Modal */}
         {isModalOpen && (
            <div
               className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center"
               onClick={handleModalClose}
            >
               <div
                  className="bg-light_gray rounded-lg border border-border_color w-[95%] sm:w-3/4 lg:w-[70%] max-w-4xl max-h-screen overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
               >
                  <div className="flex justify-end p-3">
                     <button onClick={closeModal} className="md:hidden">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="size-6 text-gray-600"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                           />
                        </svg>
                     </button>
                  </div>
                  <p className="font-bold lg:text-[32px] text-2xl lg:px-5 px-4 text-header_color text-start leading-10">
                     {item.name}
                  </p>
                  <div className="flex flex-col lg:gap-4 gap-2 rounded-lg lg:p-5 p-4">
                     <div className="flex flex-wrap gap-2">
                        <div className="flex flex-wrap gap-2">
                           {item.treatmentAreas.map((area, index) => (
                              <span
                                 key={index}
                                 className="tags-style bg-pale_orange"
                              >
                                 {area}
                              </span>
                           ))}
                           {item.treatmentMethods.map((method, index) => (
                              <span
                                 key={index}
                                 className="tags-style bg-pastel_blue"
                              >
                                 {method}
                              </span>
                           ))}
                           {item.ageGroups.map((ageGroup, index) => (
                              <span
                                 key={index}
                                 className="tags-style bg-dark_gray"
                              >
                                 {ageGroup.ageMin}-{ageGroup.ageMax} jaar
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="bg-white pt-4 pl-4 pr-2 rounded-t-3xl border-t text-start border-border_color">
                     {/* Contact details */}
                     <div className="flex flex-col-reverse lg:grid grid-cols-[1fr_1px_2fr] gap-4">
                        <div className="pr-10">
                           <p className="font-bold lg:text-xl text-lg text-header_color mb-8">
                              Contact details
                           </p>
                           <div className="flex flex-col gap-y-5 md:text-sm lg:text-base text-xs mb-8 lg:mb-0">
                              {item.contactDetails.phone && (
                                 <div className="flex items-center gap-2">
                                    <img
                                       src={Call}
                                       className="lg:w-6 lg:h-6 w-5 h-5 object-cover"
                                       alt="Phone"
                                    />
                                    <span>{item.contactDetails.phone}</span>
                                 </div>
                              )}
                              {item.contactDetails.email && (
                                 <div className="flex items-center gap-2">
                                    <img
                                       src={Message}
                                       className="lg:w-6 lg:h-6 w-5 h-5 object-cover"
                                       alt="Email"
                                    />
                                    <span>{item.contactDetails.email}</span>
                                 </div>
                              )}
                              {item.contactDetails.website && (
                                 <div className="flex items-center gap-2">
                                    <img
                                       src={Globe}
                                       className="lg:w-6 lg:h-6 w-5 h-5 object-cover"
                                       alt="Website"
                                    />
                                    <a
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       href={item.contactDetails.website}
                                       className="hover:text-blue-900"
                                    >
                                       {item.contactDetails.website}
                                    </a>
                                 </div>
                              )}
                              {item.contactDetails.address && (
                                 <div className="flex items-center gap-2">
                                    <img
                                       src={Location}
                                       className="lg:w-6 lg:h-6 w-5 h-5 object-cover"
                                       alt="Address"
                                    />
                                    <span>{item.contactDetails.address}</span>
                                 </div>
                              )}
                           </div>
                        </div>

                        {/* Divider */}
                        <div className="bg-gray-300 lg:w-[1px] lg:h-[85%] w-full h-[1px]"></div>

                        {/* Description */}
                        <div className="flex flex-col">
                           <p className="font-bold lg:text-xl text-lg text-header_color mb-5 lg:px-5">
                              Description
                           </p>
                           <p className="text-[#555555] lg:text-base text-sm font-normal lg:mb-10 mb-3 leading-7 lg:px-5">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Quisque iaculis mi fringilla mauris ornare,
                              in accumsan enim volutpat. Morbi vulputate libero
                              rutrum neque dapibus suscipit. In vehicula, magna
                              vitae ornare aliquam, nulla quam suscipit lectus,
                              non consectetur ligula enim at sem. Maecenas sit
                              amet nisl non tortor lacinia lobortis a at risus.
                           </p>
                        </div>
                     </div>
                     <div className="flex justify-end">
                        <button
                           className="bg-[#0155A6] text-white lg:text-[16px] text-sm font-medium p-3 mt-auto mb-2 self-end"
                           onClick={handleClick}
                        >
                           Bezoek website
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ChatDescription;
