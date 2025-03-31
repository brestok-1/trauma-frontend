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

   const [currentPage, setCurrentPage] = useState<number>(1);
   const [itemsPerPage, setItemsPerPage] = useState<number>(
      window.innerWidth > 1800 ? 5 : 6
   );

   useEffect(() => {
      const updateItemsPerPage = () => {
         setItemsPerPage(window.innerWidth > 1800 ? 5 : 6);
         setCurrentPage(1);
      };

      window.addEventListener("resize", updateItemsPerPage);
      return () => window.removeEventListener("resize", updateItemsPerPage);
   }, []);

   const startIndex: number = (currentPage - 1) * itemsPerPage;
   const endIndex: number = startIndex + itemsPerPage;

   const paginatedEntities: Entity[] = filteredEntities.slice(
      startIndex,
      endIndex
   );
   const totalPages: number = Math.ceil(filteredEntities.length / itemsPerPage);

   const nextPage = (): void => {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
   };

   const prevPage = (): void => {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
   };

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
               items={paginatedEntities}
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
            {paginatedEntities.length > 0 && (
               <>
                  <div className="flex justify-between items-center gap-4">
                     <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="p-2 bg-gray-200 rounded disabled:opacity-50"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="size-6"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5 8.25 12l7.5-7.5"
                           />
                        </svg>
                     </button>
                     <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="p-2 bg-gray-200 rounded disabled:opacity-50"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="size-6"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                           />
                        </svg>
                     </button>
                  </div>
               </>
            )}
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
