import { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import Send from '../../assets/images/Send.png';

const ChatInput: React.FC = () => {
  const { sendMessage, resetChat, entities } = useChat();
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (): void => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleResetChat = (): void => {
    resetChat();
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      handleSendMessage(); 
    }
  };

  const isDisabled = entities.length > 0;

  return (
    <div className="bg-[#F9F9F9] flex flex-col border border-[#E9E9E9]">
      <textarea
        className="p-4 bg-[#F9F9F9] resize-none text-[17px] outline-none text-[#444444] h-36"
        placeholder="Your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
      />
      <div className="flex justify-end lg:text-[16px] text-sm gap-x-2 p-2">
        <button className="bg-[#009EE3] text-white p-4" onClick={handleResetChat}>Wis chat</button>
        <button
          className={`text-white py-4 px-6 flex items-center gap-0.5 ${isDisabled ? 'bg-[#f88648e2] cursor-not-allowed' : 'bg-[#EF6F28]'}`}
          onClick={handleSendMessage}
          disabled={isDisabled}
        >
          Verstuur <img src={Send} className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
