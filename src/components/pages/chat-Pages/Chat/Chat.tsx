import "primeicons/primeicons.css";
import styles from "./Chat.module.css"

import ChatBox from "../ChatBox/ChatBox";
import ChatSMSElements from "../ChatElements/ChatElements";
import ChatList from "../ChatList/ChatList";


const Chat = () => {
  return (
    <div className={styles.main_box}>
      <div className={styles.chat_container}>
        <div className="m-0 p-0 chat-sms-elements col-8 sm:col-5 md:col-4 lg:col-3 xl:col-2">
          <ChatSMSElements />
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
