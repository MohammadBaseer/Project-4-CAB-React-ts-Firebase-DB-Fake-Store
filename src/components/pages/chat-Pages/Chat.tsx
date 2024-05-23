import "primeicons/primeicons.css";
import ChatElements from "./ChatElements";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";

const Chat = () => {
  return (
    <div className="main-box">
      <div className="chat-container">
        <div className="m-0 chat-sms-elements col-8 sm:col-5 md:col-4 lg:col-3 xl:col-2">
          <ChatElements />
          <ChatList />
        </div>

        <ChatBox />

        <div className="m-0 col-8 sm:col-5 md:col-4 lg:col-3 xl:col-2">
          <h1>Profile Not Found</h1>
        </div>
      </div>
    </div>
  );
};

export default Chat;
