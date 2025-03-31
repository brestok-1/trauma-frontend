import { useEffect, useState, useRef } from "react";
import { Entity } from "../../types/ChatType";
import ChatCard from "../ChatCard";
import ChatCardList from "../ChatCardList";
import ChatDescription from "../ChatDescription";

interface Props {
   entities: Entity[];
}

const PaginatedEntities: React.FC<Props> = ({ entities }) => {
   const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
   const [showDescription, setShowDescription] = useState(false);
   const [isClosing, setIsClosing] = useState(false);
   const descriptionRef = useRef<HTMLDivElement | null>(null);

   const handleCardClick = (item: Entity) => {
      if (selectedEntity === item) {
         setShowDescription(!showDescription);
      } else {
         setSelectedEntity(item);
         setShowDescription(true);
      }

      setTimeout(() => {
         descriptionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
   };

   const handleDescriptionClick = () => {
      setIsClosing(true);
      setTimeout(() => {
         setShowDescription(false);
         setSelectedEntity(null);
         setIsClosing(false);
      }, 500);
   };

   const filteredEntities = entities.filter((item) => item !== selectedEntity);

   const [currentPage, setCurrentPage] = useState<number>(1);
   const [itemsPerPage, setItemsPerPage] = useState<number>(
      window.innerWidth > 2099 ? 5 : 6
   );

   useEffect(() => {
      const updateItemsPerPage = () => {
         setItemsPerPage(window.innerWidth > 2099 ? 5 : 6);
         setCurrentPage(1);
      };

      window.addEventListener("resize", updateItemsPerPage);
      return () => window.removeEventListener("resize", updateItemsPerPage);
   }, []);

   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const paginatedEntities = filteredEntities.slice(startIndex, endIndex);
   const totalPages = Math.ceil(filteredEntities.length / itemsPerPage);

   const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
   };

   const prevPage = () => {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
   };

   return (
      <div>
         {showDescription && selectedEntity && (
            <div
               ref={descriptionRef}
               onClick={handleDescriptionClick}
               className={isClosing ? "scroll-animation" : ""}
            >
               <ChatDescription item={selectedEntity} />
            </div>
         )}

         <ChatCardList
            items={paginatedEntities}
            renderItem={(item) => (
               <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="cursor-pointer fade-in-up"
               >
                  <ChatCard item={item} />
               </div>
            )}
         />

         {paginatedEntities.length > 0 && (
            <div className="flex justify-between items-center mt-5 gap-4">
               <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="p-2 bg-gray-200 rounded disabled:opacity-50"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="size-6"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                     />
                  </svg>
               </button>
               <span className="text-lg">
                  {currentPage} / {totalPages}
               </span>
               <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-gray-200 rounded disabled:opacity-50"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="size-6"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                     />
                  </svg>
               </button>
            </div>
         )}
      </div>
   );
};

export default PaginatedEntities;
