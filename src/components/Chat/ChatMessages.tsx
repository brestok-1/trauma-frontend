import React from 'react';
import { useChat } from '../../context/ChatContext';
import Doctor from '../../assets/images/Doctor.png';

const ChatMessages: React.FC = () => {
  const { messages } = useChat();

  return (
    <div className="flex flex-col gap-6 lg:text-[16px] text-sm leading-7 overflow-y-auto max-h-[700px] w-full ">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-4 w-full  ${
            message.author === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {!(message.author === 'user') && (
            <div className="w-12 h-12 bg-light_gray rounded-md border border-border_color flex-shrink-0">
              <img
                src={Doctor}
                className="w-full h-full object-cover"
                alt="Doctor"
              />
            </div>
          )}
          <div
            className={`p-4 text-start border border-border_color ${
              message.author === 'user'
                ? 'bg-light_gray w-fit max-w-full lg:max-w-[75%] break-words overflow-wrap overflow-hidden'
                : 'bg-white flex-1 max-w-full break-words overflow-wrap overflow-hidden'
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
