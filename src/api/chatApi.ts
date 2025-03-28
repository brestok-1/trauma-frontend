import {
   CreateChatRequest,
   CreateChatResponse,
   SendMessageRequest,
   SendMessageResponse,
} from "../types/ApiChatTypes";
import { SendFeedbackRequest } from "../types/ChatType";
import api from "./index";

export const createChatRequest = async (
   token: string
): Promise<CreateChatResponse> => {
   const requestData: CreateChatRequest = {
      model: "gpt-4o-mini",
   };
   try {
      const response = await api.post<CreateChatResponse>(
         "/api/chat",
         requestData,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error("Error creating chat:", error.message);
      } else {
         console.error("Unknown error:", error);
      }
      throw new Error("Failed to create chat");
   }
};

export const sendMessageRequest = async (
   chatId: string,
   userMessage: string,
   token: string
): Promise<SendMessageResponse> => {
   const requestData: SendMessageRequest = {
      text: userMessage,
   };
   try {
      const response = await api.post<SendMessageResponse>(
         `/api/message/${chatId}`,
         requestData,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error("Error sending message:", error.message);
      } else {
         console.error("Unknown error:", error);
      }
      throw new Error("Failed to send message");
   }
};

export const sendFeedbackRequest = async (
   messageId: string,
   isPositive: boolean,
   comment: string | null,
   token: string
): Promise<unknown> => {
   const requestData: SendFeedbackRequest = {
      isPositive: isPositive,
      comment: comment,
   };
   try {
      const response = await api.patch<unknown>(
         `/api/message/${messageId}/feedback`,
         requestData,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error("Error sending message:", error.message);
      } else {
         console.error("Unknown error:", error);
      }
      throw new Error("Failed to send message");
   }
};

