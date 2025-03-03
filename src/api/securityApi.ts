import axios from "axios";
import api from "./index";

interface LoginResponse {
   successful: boolean;
   data?: {
      accessToken: {
         type: string;
         value: string;
      };
      account: {
         id: string;
         email: string;
         accountType: number;
         datetimeInserted: string;
         datetimeUpdated: string;
      };
   };
   error?: {
      message: string;
   };
}

export const loginUser = async (
   email: string,
   password: string
): Promise<LoginResponse> => {
   try {
      const response = await api.post("/api/security/login", {
         email,
         password,
      });
      if (response.data.successful) {
         return {
            successful: true,
            data: response.data.data,
         };
      } else {
         return {
            successful: false,
            error: {
               message: response.data.error?.message || "Unknown error during authentication.",
            },
         };
      }
   } catch (error) {
      if (axios.isAxiosError(error)) {
         const message = error.response?.data?.error?.message || "Request failed with status code " + error.response?.status;
         return {
            successful: false,
            error: {
               message,
            },
         };
      } else {
         return {
            successful: false,
            error: {
               message: "An unexpected error occurred.",
            },
         };
      }
   }
};