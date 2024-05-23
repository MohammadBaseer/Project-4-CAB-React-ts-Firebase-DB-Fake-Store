import { useContext } from "react";
import ChatSearchInput from "./ChatSearchInput";
import ChatUser from "./ChatUser";
import UsersList from "./UsersList";
import { ChatRoomSectionToggle } from "../../context/chatContext/ChatRoomSectionsContext";

const ChatList = () => {
  // Toggle NavbarTab context
  const { toggleState } = useContext(ChatRoomSectionToggle);

// Users data fetch from Database



  return (
    <div className="chat-list">
      <ChatSearchInput />
      <div className="scroll">
        <div className="scroll-list">
          {toggleState === 1 ? <ChatUser /> : ""}

          {toggleState === 2 ? <UsersList /> : ""}
        </div>
      </div>
    </div>
  );
};

export default ChatList; 
