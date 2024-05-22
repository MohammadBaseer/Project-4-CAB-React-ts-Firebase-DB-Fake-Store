import { useContext } from "react";
import { ChatRoomSectionToggle } from "../../context/ChatRoomSectionsContext";

const ChatSMSElements = () => {
  const { toggleState, setToggleState } = useContext(ChatRoomSectionToggle);

  const toggle = (index: number) => {
    setToggleState(index);
  };

  return (
    <>
      <div className="chat-elements">
        <div className="element">
          <i
            className={
              toggleState === 1 ? "pi pi-comment active" : "pi pi-comment"
            }
            onClick={() => toggle(1)}
          ></i>
        </div>
        <div className="element">
          <i className="pi pi-phone"></i>
        </div>
        <div className="element">
          <i className="pi pi-envelope"></i>
        </div>
        <div className="element">
          <i
            className={toggleState === 2 ? "pi pi-users active" : "pi pi-users"}
            onClick={() => toggle(2)}
          ></i>
        </div>
        <div className="element">
          <img
            className="chat-image"
            src="https://i.pinimg.com/564x/76/ef/b9/76efb9495d394564fd5aa8466c397ff3.jpg"
            alt=""
            style={{ width: "27px", height: "27px" }}
          />
        </div>
      </div>
      <div className="sub-element">
        <div className="sub-element-1">
          <h2>{toggleState === 1 ? "Chats" : "Users"}</h2>
        </div>
        <div className="sub-element-1">
          <i className="pi pi-plus"></i>
        </div>
      </div>
    </>
  );
};

export default ChatSMSElements;
