import ChatCard from "../components/ChatCard";
import ChatDescription from "../components/ChatDescription";
import ChatInput from "../components/Chat/ChatInput";
import ChatPanel from "../components/Chat/ChatPanel";
import Doctor from "../assets/images/Doctor.png";
import { useChat } from "../context/ChatContext";
import ChatCardList from "../components/ChatCardList";
import { useRef, useState } from "react";
import { Entity } from "../types/ChatType";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
   const {
      entities,
      showDescription,
      setShowDescription,
      isLoginButtonBlinking,
   } = useChat();
   const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
   const [isClosing, setIsClosing] = useState(false);
   const descriptionRef = useRef<HTMLDivElement | null>(null);
   const navigate = useNavigate();

   const handleCardClick = (item: Entity) => {
      if (selectedEntity === item) {
         setShowDescription(!showDescription);
         if (!showDescription) {
            setTimeout(() => {
               descriptionRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 0);
         }
      } else {
         setSelectedEntity(item);
         setShowDescription(true);
         setTimeout(() => {
            descriptionRef.current?.scrollIntoView({ behavior: "smooth" });
         }, 0);
      }
   };

   const handleDescriptionClick = () => {
      setIsClosing(true);
      setTimeout(() => {
         setShowDescription(false);
         setSelectedEntity(null);
         setIsClosing(false);
      }, 500);
   };

   const handleLogout = (): void => {
      Cookies.remove("accessToken", { path: "/" });
      navigate("/auth/login");
   };

   const isLoggedIn = !!Cookies.get("accessToken");
   const filteredEntities = entities.filter((item) => item !== selectedEntity);

   return (
      <div className="h-full px-24 md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] w-full mx-auto py-10">
         <button
            onClick={isLoggedIn ? handleLogout : () => navigate("/auth/login")}
            className={`absolute top-4 right-4 bg-[#EF6F28] hover:bg-orange-600 duration-300 text-white px-4 py-2 ${
               isLoginButtonBlinking ? "animate-blink" : ""
            }`}
         >
            {isLoggedIn ? "Log Out" : "Log In"}
         </button>
         <div className="text-start">
            <div className="w-24 h-24 bg-light_gray rounded-lg border border-border_color mb-7">
               <img
                  src={Doctor}
                  className="w-full h-full object-cover"
                  alt="Doctor"
               />
            </div>
            <p className="lg:text-4xl text-3xl text-[#666666] font-thin">
               Hoi, ik ben Bennie
            </p>
            <p className="lg:text-5xl text-4xl py-2 text-transparent bg-clip-text bg-text-gradient font-extrabold mb-10">
               Hoe kan ik u vandaag helpen?
            </p>
         </div>
         <div className="flex flex-col gap-y-10">
            <ChatPanel />
            {showDescription && selectedEntity && (
               <div
                  ref={descriptionRef}
                  onClick={handleDescriptionClick}
                  className={isClosing ? "scroll-animation" : ""}
               >
                  <ChatDescription item={selectedEntity} />
               </div>
            )}
            <ChatCardList
               items={filteredEntities}
               renderItem={(item) => (
                  <div
                     key={item.id}
                     onClick={() => handleCardClick(item)}
                     className="cursor-pointer fade-in-up"
                  >
                     <ChatCard item={item} />
                  </div>
               )}
            />
            <ChatInput />
         </div>
      </div>
   );
};

export default ChatPage;
