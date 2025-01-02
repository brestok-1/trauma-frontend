import ChatCard from '../components/ChatCard';
import ChatDescription from '../components/ChatDescription';
import ChatInput from '../components/Chat/ChatInput';
import ChatPanel from '../components/Chat/ChatPanel';
import Doctor from "../assets/images/Doctor.png"

const ChatPage = () => {
  return (
    <div className="h-full md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] w-full mx-auto py-10 font-inter">
      <div className="text-start">
      <div className="w-24 h-24 bg-light_gray rounded-lg border border-border_color mb-7">
         <img 
           src={Doctor} 
           className="w-full h-full object-cover" 
           alt="Doctor" 
         />
       </div>
        <p className="lg:text-4xl text-3xl text-[#666666] font-light">Hoi, ik ben [NAAM]</p>
        <p className="lg:text-5xl text-4xl py-2 text-transparent bg-clip-text bg-text-gradient font-bold mb-10">
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
