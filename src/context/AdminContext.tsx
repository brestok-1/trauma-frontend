import { createContext, useContext, useState, FC } from "react";
import Cookies from "js-cookie";
import { deleteAccountByAdmin, getAllAccounts } from "../api/adminApi";
import { AccountsData, AdminContextType, GetAllAccountsResponse } from "../types/ApiAdminTypes";

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [accounts, setAccounts] = useState<AccountsData[]>([]);
   const [isLoadingAdmin, setIsLoadingAdmin] = useState<boolean>(false);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [itemsPerPage, setItemsPerPage] = useState<number>(5);
   const [totalItems, setTotalItems] = useState<number>(0);

   const getAccounts = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
         throw new Error("Token is missing.");
      }
      try {
         setIsLoadingAdmin(true);
         const response: GetAllAccountsResponse = await getAllAccounts(
            token,
            itemsPerPage,
            currentPage - 1
         );
         setAccounts(response.data.data);
         setTotalItems(response.data.paging?.totalCount);
         setIsLoadingAdmin(false);
      } catch (error) {
         console.error("Failed to get accounts:", error);
         throw error;
      }
   };

   const handleDelete = async (id: string) => {
      const token = Cookies.get("accessToken");

      if (!token) {
         console.error("No token found");
         return;
      }
      try {
         const response = await deleteAccountByAdmin(token, id);
         if (response.successful) {
            getAccounts();
         } else {
            console.error(
               response.error?.message || "Failed to delete account"
            );
         }
      } catch (error) {
         console.error("Unexpected error while deleting account", error);
      }
   };

   return (
      <AdminContext.Provider
         value={{
            getAccounts,
            accounts,
            handleDelete,
            setItemsPerPage,
            currentPage,
            setCurrentPage,
            itemsPerPage,
            totalItems,
            isLoadingAdmin,
         }}
      >
         {children}
      </AdminContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = (): AdminContextType => {
   const context = useContext(AdminContext);
   if (!context) {
      throw new Error("useAdmin must be used within a AdminProvider");
   }
   return context;
};
