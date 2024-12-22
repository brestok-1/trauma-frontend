import ChatCard from '../components/ChatCard';
import ChatDescription from '../components/ChatDescription';
import ChatInput from '../components/Chat/ChatInput';
import ChatPanel from '../components/Chat/ChatPanel';

const ChatPage = () => {
  return (
    <div className="h-full lg:w-[70%] w-full mx-auto py-10 font-inter">
      <div className="text-start">
        <p className="text-4xl text-[#666666] font-light">Hoi, ik ben [NAAM]</p>
        <p className="text-5xl py-2 text-transparent bg-clip-text bg-text-gradient font-bold mb-10">
          Hoe kan ik u vandaag helpen?
        </p>
      </div>
      <div className="flex flex-col gap-y-10">
        <ChatPanel />
        <ChatCard />
        <ChatDescription />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPage;
