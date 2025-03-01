import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ChatProvider } from "./context/ChatContext";
import ChatPage from "./pages/ChatPage";
import SignInPage from "./pages/SignInPage";
import AdminPage from "./pages/AdminPage";
import { AdminProvider } from "./context/AdminContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
   return (
      <Routes>
         <Route
            path="/"
            element={
               <ProtectedRoute>
                  <ChatProvider>
                     <ChatPage />
                  </ChatProvider>
               </ProtectedRoute>
            }
         />
         <Route
            path="/auth/login"
            element={
               <ChatProvider>
                  <SignInPage />
               </ChatProvider>
            }
         />
         <Route
            path="/admin"
            element={
               <ProtectedRoute>
                  <AdminProvider>
                     <AdminPage />
                  </AdminProvider>
               </ProtectedRoute>
            }
         />
      </Routes>
   );
}

export default App;
