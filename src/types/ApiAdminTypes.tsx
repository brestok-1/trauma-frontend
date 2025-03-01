export interface GetAllAccountsResponse {
    data: {
       paging: {
          pageSize: number;
          pageIndex: number;
          totalCount: number;
       };
       data: AccountsData[];
    };
    successful: boolean;
    error: {
       message: string;
    };
 }
 
 export interface AccountsData {
    id: string;
    email: string;
    accountType: number;
    datetimeInserted: string;
    datetimeUpdated: string;
 }
 
 export interface createAccountByAdmin {
    data?: AccountsData;
    successful?: boolean;
    error?: {
       message: string;
    };
 }
 
 export interface CreateAccountRequest {
    email: string;
    password: string;
 }
 
 export interface DeleteAccountResponse {
    data: string | null;
    successful: boolean;
    error: {
       message: string;
    };
 }
 
 export interface AdminContextType {
    getAccounts: () => void;
    accounts: AccountsData[];
    handleDelete: (id: string) => void;
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage: number;
    totalItems: number;
    isLoadingAdmin: boolean;
 }