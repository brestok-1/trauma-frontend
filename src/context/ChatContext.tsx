import { createContext, useContext, useState, FC } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis mi fringilla mauris ornare, in accumsan enim volutpat. Morbi vulputate libero rutrum neque dapibus suscipit. In vehicula, magna vitae ornare aliquam.',
      isUser: false,
    },
  ]);

  const sendMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${prev.length + 1}`, text, isUser: true },
    ]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
