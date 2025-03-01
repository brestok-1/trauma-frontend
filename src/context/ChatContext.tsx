import { createContext, useContext, useState, FC } from "react";
import { ChatContextType, Entity, Message } from "../types/ChatType";
import { createChatRequest, sendMessageRequest } from "../api/chatApi";
import {
   CreateChatResponse,
   SendMessageResponse,
} from "../types/ApiChatTypes";
import Cookies from "js-cookie";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const defaultMessage: Message = {
   id: "1",
   chatId: "",
   author: "bot",
   text: "Hoi! Wat fijn dat je hier bent. Ik ben je assistent en help je graag met het vinden van de juiste zorg of behandeling. Of het nu gaat om EMDR, de slapende honden-methode, of zorg voor een specifieke situatie, ik heb alle kennis in huis om je verder te helpen. Je kunt me alles vragen over behandelingen, doelgroepen en locaties. Hoe kan ik je vandaag helpen?",
   datetimeInserted: new Date().toISOString(),
};

export const ChatProvider: FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [chatId, setChatId] = useState<string>("");
   const [messages, setMessages] = useState<Message[]>([defaultMessage]);
   const [entities, setEntities] = useState<Entity[]>([]);
   const [showDescription, setShowDescription] = useState<boolean>(false);
   const [isLoginButtonBlinking, setLoginButtonBlinking] =
      useState<boolean>(false);

   const createChat = async (): Promise<string> => {
      const token = Cookies.get("accessToken");
      if (!token) {
         window.scrollTo({ top: 0, behavior: "smooth" });
         setLoginButtonBlinking(true);
         setTimeout(() => setLoginButtonBlinking(false), 2000);
         throw new Error("Token is missing.");
      }
      try {
         const chatData: CreateChatResponse = await createChatRequest(token);
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
      const token = Cookies.get("accessToken");
      if (!token) {
         throw new Error("Token is missing.");
      }
      try {
         const chatMessage: SendMessageResponse = await sendMessageRequest(
            chatId,
            text,
            token
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

      if (entities.length > 0) {
         setEntities([]);
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
      setMessages([defaultMessage]);
      setChatId("");
      setEntities([]);
      setShowDescription(false);
   };

   

   return (
      <ChatContext.Provider
         value={{
            messages,
            entities,
            sendMessage,
            resetChat,
            showDescription,
            setShowDescription,
            isLoginButtonBlinking,
         }}
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
