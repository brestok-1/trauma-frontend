import React from "react";
import PaginationControls from "./PaginationControls";
import Loading from "./Loading";
import { useAdmin } from "../context/AdminContext";

export interface TableColumn<T> {
   key: keyof T;
   title: string;
   render?: (value: T[keyof T], row: T) => JSX.Element | string;
}

interface TableProps<T extends { id: string }> {
   data: T[];
   columns: TableColumn<T>[];
   onDelete: (id: string) => void;
   currentPage: number;
   setCurrentPage: (page: number) => void;
   totalItems: number;
   setItemsPerPage: (itemsPerPage: number) => void;
   itemsPerPage: number;
}

const TableComponent = <T extends { id: string }>({
   data,
   columns,
   onDelete,
   currentPage,
   setCurrentPage,
   totalItems,
   setItemsPerPage,
   itemsPerPage,
}: TableProps<T>) => {
   const { isLoadingAdmin } = useAdmin();
   const totalPages = Math.ceil(totalItems / itemsPerPage);

   const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
         setCurrentPage(newPage);
      }
   };

   const handleItemsPerPageChange = (
      event: React.ChangeEvent<HTMLSelectElement>
   ) => {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1);
   };

   return (
      <div className="text-center shadow-md bg-white p-4">
         <div className="overflow-x-auto">
            <div className="min-w-max">
               <div className="grid grid-cols-4 mb-2 text-gray-700 font-semibold">
                  {columns.map((col, index) => (
                     <div key={index} className="p-4">
                        {col.title}
                     </div>
                  ))}
                  <div className="p-4"></div>
               </div>
               <div className="space-y-2">
                  {isLoadingAdmin ? (
                     <Loading />
                  ) : data.length > 0 ? (
                     data.map((row) => (
                        <div
                           key={row.id}
                           className="grid grid-cols-4 border rounded-2xl hover:bg-gray-50 transition"
                        >
                           {columns.map((col, colIndex) => {
                              const content = col.render
                                 ? col.render(row[col.key], row)
                                 : (row[col.key] as React.ReactNode ?? "-");
                              return (
                                 <div
                                    key={colIndex}
                                    className="p-3 text-gray-700"
                                 >
                                    {content}
                                 </div>
                              );
                           })}
                           <div className="flex justify-end items-center p-3 space-x-4">
                              <button
                                 onClick={() => onDelete(row.id as string)}
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="size-6 text-red-900"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                 </svg>
                              </button>
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="text-gray-500 p-4">No Data</div>
                  )}
               </div>
            </div>
         </div>
         <div className="w-full flex flex-wrap mt-6 justify-between gap-2">
            <select
               value={itemsPerPage}
               onChange={handleItemsPerPageChange}
               className="focus:outline-none border p-2"
            >
               {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                     {size} per page
                  </option>
               ))}
            </select>

            <PaginationControls
               currentPage={currentPage}
               totalPages={totalPages}
               handlePageChange={handlePageChange}
               itemsPerPage={itemsPerPage}
               totalItems={totalItems}
            />
         </div>
      </div>
   );
};

export default TableComponent;
