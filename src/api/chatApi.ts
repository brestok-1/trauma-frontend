import {
   CreateChatRequest,
   CreateChatResponse,
   SendMessageRequest,
   SendMessageResponse,
} from "../types/ApiChatTypes";
import api from "./index";

export const createChatRequest = async (): Promise<CreateChatResponse> => {
   const requestData: CreateChatRequest = {
      model: "gpt-4o-mini",
   };
   try {
      const response = await api.post<CreateChatResponse>(
         "/api/chat",
         requestData
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
   userMessage: string
): Promise<SendMessageResponse> => {
   const requestData: SendMessageRequest = {
      text: userMessage,
   };
   try {
      const response = await api.post<SendMessageResponse>(
         `/api/message/${chatId}`,
         requestData
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
