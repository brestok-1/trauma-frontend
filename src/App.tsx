import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ChatProvider } from "./context/ChatContext";
import ChatPage from "./pages/ChatPage";
import SignInPage from "./pages/SignInPage";

function App() {
   return (
      <ChatProvider>
         <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/auth/login" element={<SignInPage />} />
         </Routes>
      </ChatProvider>
   );
}

export default App;
