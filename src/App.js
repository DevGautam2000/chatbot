import ChatBot from "./components/ChatBot";
import "./css/App.css";

function App() {
  return (
    <div className="app">
      <div className="app_overlay">
        <div className="app_container">
          <ChatBot />
        </div>
      </div>
    </div>
  );
}

export default App;
