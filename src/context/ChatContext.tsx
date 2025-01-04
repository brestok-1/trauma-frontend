import { createContext, useContext, useState, FC } from "react";
import { ChatContextType, Entity, Message } from "../types/ChatType";
import { createChatRequest, sendMessageRequest } from "../api/chatApi";
import { CreateChatResponse, SendMessageResponse } from "../types/ApiChatTypes";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const defaultMessage: Message = {
   id: "1",
   chatId: "",
   author: "bot",
   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qu",
   datetimeInserted: new Date().toISOString(),
};

export const ChatProvider: FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [chatId, setChatId] = useState<string>("");
   const [messages, setMessages] = useState<Message[]>([defaultMessage]);
   const [entities, setEntities] = useState<Entity[]>([]);

   const createChat = async (): Promise<string> => {
      try {
         const chatData: CreateChatResponse = await createChatRequest();
         if (chatData.successful) {
            const newChatId = chatData.data.id;
            setChatId(newChatId);
            return newChatId;
         }
         throw new Error("Chat creation failed");
      } catch (error) {
         console.error("Failed to create chat:", error);
         throw error;
      }
   };

   const getMessageFromChat = async (chatId: string, text: string) => {
      const typingIndicatorId = `typing-${chatId}`;
      setMessages((prev) => [
         ...prev,
         {
            id: typingIndicatorId,
            chatId: chatId,
            author: "bot",
            text: "...",
            datetimeInserted: new Date().toISOString(),
         },
      ]);

      try {
         const chatMessage: SendMessageResponse = await sendMessageRequest(
            chatId,
            text
         );

         setMessages((prev) =>
            prev.filter((msg) => msg.id !== typingIndicatorId)
         );

         setMessages((prev) => [
            ...prev,
            {
               id: `${prev.length + 1}`,
               chatId: chatId,
               author: "bot",
               text: chatMessage.data.text,
               datetimeInserted: new Date().toISOString(),
            },
         ]);

         if (chatMessage.data.entities) {
            setEntities(chatMessage.data.entities);
         }
      } catch (error) {
         console.error("Failed to send message:", error);
         setMessages((prev) =>
            prev.filter((msg) => msg.id !== typingIndicatorId)
         );
      }
   };

   const sendMessage = async (text: string) => {
      let currentChatId = chatId;

      if (messages.length === 1) {
         currentChatId = await createChat();
      }

      setMessages((prev) => [
         ...prev,
         {
            id: `${prev.length + 1}`,
            chatId: currentChatId,
            author: "user",
            text,
            datetimeInserted: new Date().toISOString(),
         },
      ]);

      await getMessageFromChat(currentChatId, text);
   };

   const resetChat = () => {
      // setMessages([defaultMessage]);
      // setChatId('');
      // setEntities([]);
      console.log(entities);
   };

   return (
      <ChatContext.Provider
         value={{ messages, entities, sendMessage, resetChat }}
      >
         {children}
      </ChatContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = (): ChatContextType => {
   const context = useContext(ChatContext);
   if (!context) {
      throw new Error("useChat must be used within a ChatProvider");
   }
   return context;
};
