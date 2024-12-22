import './App.css';
import { ChatProvider } from './context/ChatContext';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <ChatProvider>
      <div>
        <ChatPage />
      </div>
    </ChatProvider>
  );
}

export default App;
