import ChatCard from "../components/ChatCard";
import ChatDescription from "../components/ChatDescription";
import ChatInput from "../components/Chat/ChatInput";
import ChatPanel from "../components/Chat/ChatPanel";
import Doctor from "../assets/images/Doctor.png";
import { useChat } from "../context/ChatContext";
import ChatCardList from "../components/ChatCardList";
import { useEffect, useRef, useState } from "react";
import { Entity } from "../types/ChatType";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";

const ChatPage = () => {
   const {
      entities,
      showDescription,
      setShowDescription,
      isLoginButtonBlinking,
   } = useChat();
   const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
   const location = useLocation();
   const [isClosing, setIsClosing] = useState(false);
   const descriptionRef = useRef<HTMLDivElement | null>(null);
   const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (location.state?.showPopup) {
         setIsPopupOpen(true);
      }
   }, [location.state]);

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

   const handleClosePopup = () => {
      setIsPopupOpen(false);
      navigate(".", { replace: true });
   };

   const isLoggedIn = !!Cookies.get("accessToken");
   const filteredEntities = entities.filter((item) => item !== selectedEntity);

   return (
      <div className="h-full px-5 md:px-24 md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] w-full mx-auto py-10">
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
                  className="w-full h-full object-cover rounded-lg"
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
         <PopUp isOpen={isPopupOpen} onClose={handleClosePopup} hideHeader>
            <div className="flex flex-col gap-y-5">
               <p className="text-lg p-2 w-full text-justify">
                  Wij hechten veel waarde aan je privacy. Alle gedeelde gegevens
                  worden geanonimiseerd: locaties, namen en andere gevoelige
                  informatie worden niet zichtbaar gemaakt. <br /> <br /> Door
                  deze chat te gebruiken, ga je akkoord met het delen van
                  informatie om het model te verbeteren en te trainen. Je kunt
                  er zeker van zijn dat alle data met zorg en volgens de
                  geldende privacyregels wordt verwerkt.
               </p>
               <button
                  className="p-1.5 bg-orange-500 text-xl font-semibold text-white w-full"
                  onClick={handleClosePopup}
               >
                  Akkoord
               </button>
            </div>
         </PopUp>
      </div>
   );
};

export default ChatPage;
