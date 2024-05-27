import styles from "./ChatUser.module.css"
const ChatSMSUser = () => {
  return (
    <div className={styles.users}>
      <div className={styles.image_div}>
        <img
          className={styles.chat_image}
          src="https://i.pinimg.com/564x/76/ef/b9/76efb9495d394564fd5aa8466c397ff3.jpg"
          alt="" />
      </div>
      <div className={styles.chat_info}>
        <div>
          <p className={styles.p} >Baseer</p> 
          <p className={styles.p} >Hello Dear Baseer</p>
        </div>
        <div className={styles.chat_info_date}>
          <div>
            <span>12:00 PM</span>
          </div>
          <div>
            <span className={styles.chat_notification}>5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSMSUser;
