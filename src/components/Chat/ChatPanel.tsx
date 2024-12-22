 import ChatMessages from './ChatMessages';

const ChatPanel: React.FC = () => {

  return (
    <div className="flex flex-col w-full">
      <ChatMessages />
    </div>
  );
};

export default ChatPanel;
