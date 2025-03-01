import React from "react";

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   handlePageChange: (page: number) => void;
   itemsPerPage: number;
   totalItems: number;
}

const PaginationControls: React.FC<PaginationProps> = ({
   currentPage,
   totalPages,
   handlePageChange,
   itemsPerPage,
   totalItems,
}) => {
   const getPageNumbers = (): (number | string)[] => {
      const maxPagesToShow = 5;
      const pages: (number | string)[] = [];

      if (totalPages <= maxPagesToShow) {
         for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
         }
      } else {
         const startPage = Math.max(1, currentPage - 2);
         const endPage = Math.min(totalPages, currentPage + 2);

         if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push("...");
         }

         for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
         }

         if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push("...");
            pages.push(totalPages);
         }
      }
      return pages;
   };

   const renderItemsInfo = () => {
      if (totalItems === 0) {
         return <span></span>;
      }
      const startItem = (currentPage - 1) * itemsPerPage + 1;
      const endItem = Math.min(currentPage * itemsPerPage, totalItems);
      return (
         <span>
            {startItem}-{endItem} of {totalItems}
         </span>
      );
   };

   if (totalItems === 0) {
      return <span></span>;
   }

   return (
      <div className="flex w-full sm:w-auto items-center mt-4">
         <div className="mr-4 ">
            {renderItemsInfo()}
         </div>
         <div className="flex items-center">
            <button
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1}
               className="px-2 mx-1"
            >
               &#9664;
            </button>

            {getPageNumbers().map((page, index) => (
               <button
                  key={index}
                  className={`${
                     page === currentPage
                        ? "active bg-orange-500 text-white rounded-md md:rounded-lg"
                        : ""
                  } md:px-3 md:py-1 px-1.5 py-0.5 text-center`}
                  onClick={() =>
                     typeof page === "number" && handlePageChange(page)
                  }
                  disabled={typeof page !== "number"}
               >
                  {page}
               </button>
            ))}

            <button
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === totalPages}
               className="px-2 mx-1"
            >
               &#9654;
            </button>
         </div>
      </div>
   );
};

export default PaginationControls;
