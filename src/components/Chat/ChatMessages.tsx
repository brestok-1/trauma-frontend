import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useChat } from "../../context/ChatContext";
import Doctor from "../../assets/images/Doctor.png";
import ReactMarkdown from "react-markdown";
import { sendFeedbackRequest } from "../../api/chatApi";
import Cookies from "js-cookie";

const PopupFeedback: React.FC<{
   onClose: () => void;
   position: { top: number; left: number };
   onSendFeedback: (comment: string) => void;
}> = ({ onClose, position, onSendFeedback }) => {
   const [comment, setComment] = useState<string>("");
   return createPortal(
      <div
      className="absolute z-50 bg-white p-4 rounded-md shadow-lg border md:w-80 w-44"
         style={{ top: position.top, left: position.left }}
      >
         <button
            className="p-1 text-xs self-end absolute top-0 md:right-0 right-2"
            onClick={onClose}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="size-5"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
               />
            </svg>
         </button>
         <div className="flex gap-1 mt-4">
            <input
               type="text"
               placeholder="Wat vond je er niet goed aan?"
               className="w-full px-2 py-2 text-sm border rounded outline-none"
               value={comment}
               onChange={(e) => setComment(e.target.value)}
            />
            <button
               className="px-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
               onClick={() => {
                  onSendFeedback(comment);
                  onClose();
               }}
            >
               Deel
            </button>
         </div>
      </div>,
      document.body
   );
};

const ChatMessages: React.FC = () => {
   const { messages } = useChat();
   const [showPopup, setShowPopup] = useState<boolean>(false);
   const [popupPosition, setPopupPosition] = useState<{
      top: number;
      left: number;
   }>({ top: 0, left: 0 });
   const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
   const [dislikes, setDislikes] = useState<{ [key: string]: boolean }>({});

   const chatEndRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (chatEndRef.current) {
         chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [messages]);

   const handleDislikeClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      messageId: string
   ) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setPopupPosition({
         top: rect.bottom + window.scrollY + 5,
         left: rect.left + window.scrollX,
      });
      setShowPopup(true);
      setDislikes((prev) => ({ ...prev, [messageId]: true }));
      setLikes((prev) => ({ ...prev, [messageId]: false }));
   };

   const handleLikeClick = async (messageId: string) => {
      try {
         const token = Cookies.get("accessToken");
         if (!token) {
            throw new Error("Token is missing.");
         }
         await sendFeedbackRequest(messageId, true, null, token);
         setLikes((prev) => ({ ...prev, [messageId]: true }));
         setDislikes((prev) => ({ ...prev, [messageId]: false }));
         console.log("Feedback sent successfully");
      } catch (error) {
         console.error("Failed to send feedback:", error);
      }
   };

   const handleSendDislikeFeedback = async (
      messageId: string,
      comment: string
   ) => {
      try {
         const token = Cookies.get("accessToken");
         if (!token) {
            throw new Error("Token is missing.");
         }
         await sendFeedbackRequest(messageId, false, comment, token);
         console.log("Feedback sent successfully");
      } catch (error) {
         console.error("Failed to send feedback:", error);
      }
   };


   return (
      <div className="flex flex-col gap-6 lg:text-lg text-sm leading-7 overflow-y-auto max-h-[700px] w-full pr-2">
         {messages.map((message) => (
            <div
               key={message.id}
               className={`flex items-start gap-4 w-full ${
                  message.author === "user" ? "justify-end" : "justify-start"
               }`}
            >
               {!(message.author === "user") && (
                  <div className="w-12 h-12 bg-light_gray rounded-md border border-border_color flex-shrink-0">
                     <img
                        src={Doctor}
                        className="w-full h-full object-cover rounded-md"
                        alt="Doctor"
                     />
                  </div>
               )}
               <div
                  className={`p-5 text-start border border-border_color ${
                     message.author === "user"
                        ? "bg-light_gray w-fit max-w-full lg:max-w-[75%] break-words overflow-wrap overflow-hidden"
                        : "bg-white w-auto max-w-full break-words overflow-wrap overflow-hidden"
                  } ${message.text === "..." ? "rounded-lg" : "rounded-none"}`}
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
                  {message.author !== "user" &&
                     message.text !== "..." &&
                     message.id !== "1" && (
                        <div className="flex gap-4 justify-end mt-4">
                           <button
                              className={`border border-border_color ${
                                 likes[message.id]
                                    ? "text-green-700"
                                    : "text-gray-700"
                              } duration-300 hover:text-green-700 p-2 rounded text-sm`}
                              onClick={() => handleLikeClick(message.id)}
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
                                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                                 />
                              </svg>
                           </button>
                           <div className="relative">
                              <button
                                 className={`border border-border_color ${
                                    dislikes[message.id]
                                       ? "text-red-700"
                                       : "text-gray-700"
                                 }
                                  duration-300 hover:text-red-700 p-2 rounded text-sm`}
                                 onClick={(e) =>
                                    handleDislikeClick(e, message.id)
                                 }
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
                                       d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                                    />
                                 </svg>
                              </button>
                              {showPopup && (
                                 <PopupFeedback
                                    onClose={() => setShowPopup(false)}
                                    position={popupPosition}
                                    onSendFeedback={(comment) =>
                                       handleSendDislikeFeedback(
                                          message.id,
                                          comment
                                       )
                                    }
                                 />
                              )}
                           </div>
                        </div>
                     )}
               </div>
            </div>
         ))}
         <div ref={chatEndRef} />
      </div>
   );
};

export default ChatMessages;
