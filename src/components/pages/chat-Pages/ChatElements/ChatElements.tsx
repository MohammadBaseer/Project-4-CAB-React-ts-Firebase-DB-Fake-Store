

import { ChatRoomSectionToggle } from "../../../context/chatContext/ChatRoomSectionsContext";
import styles from "./ChatElements.module.css"
import { useContext } from "react";

const ChatSMSElements = () => {

  const {toggleState, setToggleState} = useContext(ChatRoomSectionToggle)



  const toggle = (index: number) => {
    setToggleState(index);
  };

  return (
    <>
      <div className={styles.chat_elements}>
        <div className={styles.element}>
          <i
            className={
              toggleState === 1 ? `pi pi-comment ${styles.active}` : "pi pi-comment"
            }
            onClick={() => toggle(1)}
          ></i>
        </div>
        <div className={styles.element}>
          <i className="pi pi-phone"></i>
        </div>
        <div className={styles.element}>
          <i className="pi pi-envelope"></i>
        </div>
        <div className={styles.element}>
          <i
            className={toggleState === 2 ? `pi pi-users ${styles.active}` : "pi pi-users"}
            onClick={() => toggle(2)}
          ></i>
        </div>
        <div className={styles.element}>
          <img className={styles.chat_image} src="https://i.pinimg.com/564x/76/ef/b9/76efb9495d394564fd5aa8466c397ff3.jpg" alt="" />
        </div>
      </div>
      <div className={styles.element}>
        <div className={styles.room_title}>
          <h2>{toggleState === 1 ? "Chats" : "Users"}</h2>
        </div>
        <div className={styles.add_user_plus}>
          <i className={`${styles.pi_plus} pi pi-plus`}></i>
        </div>
      </div>
    </>
  );
};

export default ChatSMSElements;
