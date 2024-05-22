import { useContext } from "react";
import ChatSearchInput from "./ChatSearchInput";
import ChatUser from "./ChatUser";
import UsersList from "./UsersList";
import { ChatRoomSectionToggle } from "../../context/ChatRoomSectionsContext";

const ChatList = () => {
  const { toggleState } = useContext(ChatRoomSectionToggle);
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
