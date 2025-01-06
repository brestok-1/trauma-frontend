import React, { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import Doctor from '../../assets/images/Doctor.png';
import ReactMarkdown from 'react-markdown';

const ChatMessages: React.FC = () => {
  const { messages } = useChat();

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); 

  return (
    <div className="flex flex-col gap-6 lg:text-lg text-sm leading-7  overflow-y-auto max-h-[700px] w-full pr-2">
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
            className={`p-5 text-start border border-border_color ${
              message.author === 'user'
                ? 'bg-light_gray w-fit max-w-full lg:max-w-[75%] break-words overflow-wrap overflow-hidden'
                : 'bg-white w-auto max-w-full break-words overflow-wrap overflow-hidden'
            } ${
              message.text === '...' ? 'rounded-lg' : 'rounded-none'
            }`}
          >
             {message.text === "..." ? (
              <div className="typing-indicator flex gap-1">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            ) : (
              <ReactMarkdown>{message.text}</ReactMarkdown>
            )}
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatMessages;
