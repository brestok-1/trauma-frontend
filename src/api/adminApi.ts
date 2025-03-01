import axios from "axios";
import api from ".";
import { createAccountByAdmin, DeleteAccountResponse, GetAllAccountsResponse } from "../types/ApiAdminTypes";


export const getAllAccounts = async (
   token: string,
   pageSize: number,
   pageIndex: number
): Promise<GetAllAccountsResponse> => {
   try {
      const response = await api.get<GetAllAccountsResponse>(
         `/api/account/all`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            params: {
               pageSize,
               pageIndex,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error("Error getting accounts:", error.message);
      } else {
         console.error("Unknown error:", error);
      }
      throw new Error("Failed to get accounts");
   }
};

export const createUserByAdmin = async (
   token: string,
   email: string,
   password: string
): Promise<createAccountByAdmin> => {
   try {
      const { data } = await api.post<createAccountByAdmin>(
         "/api/account",
         { email, password },
         {
            headers: { Authorization: `Bearer ${token}` },
         }
      );

      return data.successful
         ? { successful: true, data: data.data }
         : {
              successful: false,
              error: { message: data.error?.message || "Unknown error" },
           };
   } catch (error) {
      const message =
         axios.isAxiosError(error) && error.response?.data?.error?.message
            ? error.response.data.error.message
            : "An unexpected error occurred.";

      return { successful: false, error: { message } };
   }
};

export const deleteAccountByAdmin = async (
   token: string,
   accountId: string
): Promise<DeleteAccountResponse> => {
   try {
      const response = await api.delete<DeleteAccountResponse>(
         `/api/account/${accountId}`,
         { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
   } catch (error) {
      const message =
         axios.isAxiosError(error) && error.response?.data?.error?.message
            ? error.response.data.error.message
            : "Unexpected error";
      return { successful: false, data: null, error: { message } };
   }
};
