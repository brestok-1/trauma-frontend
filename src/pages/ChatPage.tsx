import ChatInput from "../components/Chat/ChatInput";
import ChatPanel from "../components/Chat/ChatPanel";
import Doctor from "../assets/images/Doctor.png";
import { useChat } from "../context/ChatContext";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";

const ChatPage = () => {
   const {
      isLoginButtonBlinking,
   } = useChat();
   const location = useLocation();
   const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (location.state?.showPopup) {
         setIsPopupOpen(true);
      }
   }, [location.state]);


   const handleLogout = (): void => {
      Cookies.remove("accessToken", { path: "/" });
      navigate("/auth/login");
   };

   const handleClosePopup = () => {
      setIsPopupOpen(false);
      navigate(".", { replace: true });
   };

   const isLoggedIn = !!Cookies.get("accessToken");

   return (
      <div className="h-full px-5 xl:px-0 md:max-w-[80%] lg:max-w-[70%] xl:max-w-[55%] w-full mx-auto py-10">
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
