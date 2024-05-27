import styles from "./ChatBox.module.css"

const ChatBox = () => {
  return (
    <div className={`${styles.sms_container} col-12 sm:col-7 md:col-8 lg:col-9 xl:col-8`}>
      <div className={styles.chat_elements}>
        <div className={styles.chat_room_element_1}>
          <img
            className={styles.chat_image} src="https://i.pinimg.com/564x/76/ef/b9/76efb9495d394564fd5aa8466c397ff3.jpg"
            alt=""
          />
          <div>
            <p className={styles.p}>Baseer</p>
            <p className={styles.p}>Last seen 3 hours ago</p>
          </div>
        </div>
        <div className={styles.chat_room_element_2}>
          <i className="pi pi-phone"></i>
          <i className="pi pi-video"></i>
          <i className="pi pi-ellipsis-h"></i>
        </div>
      </div>
      <div className={styles.sms}>
        <p className={styles.income_sms}>Hi, How Are You?</p>
        <br />
        <p className={styles.going_sms}>Hi, How Are You?</p>
      </div>
      <div className={styles.sms_typing_input}>
        <div className={`${styles.sms_container_elements} col-11 md:col-11`}>
          {/* <div className="input-send-div"> */}
          <input
            type="text"
            className={`${styles.sms_input} text-base text-color surface-overlay p-2 border-1 border-solid surface-border  appearance-none outline-none focus:border-primary w-full`}
            placeholder="Aa"
          />
          <i className={`${styles.pi_send} pi pi-send`}></i>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
