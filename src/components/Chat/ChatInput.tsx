import { useState } from 'react';
import { useChat } from '../../context/ChatContext';

const ChatInput: React.FC = () => {
    const { sendMessage } = useChat();
    const [inputValue, setInputValue] = useState('');
  
    const handleSendMessage = () => {
      if (inputValue.trim()) {
        sendMessage(inputValue);
        setInputValue(''); 
      }
    };

  return (
    <div className="bg-[#F9F9F9] flex flex-col border border-[#E9E9E9]">
      <textarea
        className="p-4 bg-[#F9F9F9] resize-none outline-none text-[#444444] h-36"
        placeholder="Your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex justify-end gap-x-2 p-2">
        <button className="bg-[#009EE3] text-white p-4">Wis chat</button>
        <button
          className="bg-[#EF6F28] text-white p-4"
          onClick={handleSendMessage}
        >
          Verstuur{' '}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
