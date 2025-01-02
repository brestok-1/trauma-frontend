import { createContext, useContext, useState, FC } from 'react';
import { ChatContextType, Message } from '../types/ChatType';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      chatId: '1',
      author: 'bot',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qu',
      datetimeInserted: new Date().toISOString(),
    },
  ]);

  const sendMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${prev.length + 1}`,
        chatId: '1',
        author: 'user',
        text,
        datetimeInserted: new Date().toISOString(),
      },
    ]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
