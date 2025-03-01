import { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";
import { TableColumn } from "../components/TableComponent";
import PopUp from "../components/PopUp";
import { createUserByAdmin } from "../api/adminApi";
import Cookies from "js-cookie";
import AddUserForm from "../components/AddUserForm";
import { useAdmin } from "../context/AdminContext";

const AdminPage = () => {
   const {
      accounts,
      getAccounts,
      handleDelete,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      setItemsPerPage,
      totalItems,
   } = useAdmin();
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [error, setError] = useState<string>("");
   const [deletePopupOpen, setDeletePopupOpen] = useState<boolean>(false);
   const [selectedId, setSelectedId] = useState<string | null>(null);

   useEffect(() => {
      getAccounts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentPage, itemsPerPage]);

   const columns: TableColumn<(typeof accounts)[number]>[] = [
      { key: "email", title: "Email" },
      {
         key: "datetimeInserted",
         title: "Time of creation",
         render: (value) =>
            new Intl.DateTimeFormat("de-DE", {
               year: "numeric",
               month: "2-digit",
               day: "2-digit",
               hour: "2-digit",
               minute: "2-digit",
               second: "2-digit",
            }).format(new Date(value as string)),
      },
   ];

   const handleCreateUser = async (email: string, password: string) => {
      setError("");
      const token = Cookies.get("accessToken");

      if (!token) {
         setError("No token found");
         return;
      }

      try {
         await createUserByAdmin(token, email, password);
         getAccounts();
         setIsOpen(false);
      } catch (err: unknown) {
         if (typeof err === "object" && err !== null && "response" in err) {
            const axiosError = err as {
               response?: { data?: { message?: string } };
            };
            setError(
               axiosError.response?.data?.message || "Something went wrong"
            );
         } else {
            setError("Something went wrong");
         }
      }
   };

   const handleDeleteByAdmin = (id: string) => {
      setSelectedId(id);
      setDeletePopupOpen(true);
   };

   const confirmDelete = () => {
      if (selectedId) {
         handleDelete(selectedId);
         setDeletePopupOpen(false);
         setSelectedId(null);
      }
   };

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
         <div className="px-5 lg:px-28 py-10">
            <div className="flex justify-end mb-5">
               <button
                  onClick={() => setIsOpen(true)}
                  className="focus:outline-none font-semibold text-white p-2 bg-orange-500 rounded-md"
               >
                  Add Person
               </button>
            </div>
            <div className="flex justify-center items-center">
               <div className="w-full">
                  <TableComponent
                     data={accounts}
                     columns={columns}
                     onDelete={handleDeleteByAdmin}
                     currentPage={currentPage}
                     setCurrentPage={setCurrentPage}
                     totalItems={totalItems}
                     setItemsPerPage={setItemsPerPage}
                     itemsPerPage={itemsPerPage}
                  />
               </div>
            </div>
         </div>
         <PopUp
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Create Account"
         >
            <AddUserForm onSubmit={handleCreateUser} error={error} />
         </PopUp>
         <PopUp
            isOpen={deletePopupOpen}
            onClose={() => setDeletePopupOpen(false)}
            title="Confirm Deletion"
         >
            <div className="text-center">
               <p className="mb-4">
                  Are you sure you want to delete this user?
               </p>
               <div className="flex justify-center gap-4">
                  <button
                     className="bg-red-500 text-white px-4 py-2 rounded-md"
                     onClick={confirmDelete}
                  >
                     Yes
                  </button>
                  <button
                     className="bg-gray-300 px-4 py-2 rounded-md"
                     onClick={() => setDeletePopupOpen(false)}
                  >
                     No
                  </button>
               </div>
            </div>
         </PopUp>
      </div>
   );
};

export default AdminPage;
