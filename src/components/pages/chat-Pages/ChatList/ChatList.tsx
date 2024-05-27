import { useContext } from "react";
import { ChatRoomSectionToggle } from "../../../context/chatContext/ChatRoomSectionsContext";
import ChatSearchInput from "../ChatSearchInput/ChatSearchInput";
import ChatSMSUser from "../ChatUser/ChatUser";
import UsersList from "../UsersList/UsersList";
import styles from "./ChatList.module.css"

const ChatList = () => {
  // Toggle NavbarTab context
  const { toggleState } = useContext(ChatRoomSectionToggle);

  // Users data fetch from Database

  return (
    <div className={styles.chat_list}>
      <ChatSearchInput />
      <div className={styles.scroll}>
        <div className={styles.scroll_lis}>
          {toggleState === 1 ? <ChatSMSUser /> : ""}

          {toggleState === 2 ? <UsersList /> : ""}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
