import React from 'react';
import { useChat } from '../../context/ChatContext';

const ChatMessages: React.FC = () => {
  const { messages } = useChat();

  return (
    <div className="flex flex-col gap-6 text-[16px] overflow-y-auto max-h-[400px]">
      {messages.map((message) => (
        <div
        key={message.id}
        className={`flex items-start gap-4 ${
          message.isUser ? 'justify-end' : 'justify-start'
        }`}
      >
          {!message.isUser && (
            <div className="w-12 h-12 bg-red-800 rounded-sm border border-border_color"></div>
          )}
          <div
            className={`p-4 text-start border border-border_color flex-1 ${
              message.isUser ? 'bg-light_gray max-w-[70%]' : 'bg-white'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
