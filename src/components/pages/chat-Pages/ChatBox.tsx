const ChatBox = () => {
  return (
    <div className="m-0 sms-container col-12 sm:col-7 md:col-8 lg:col-9 xl:col-8">
      <div className="chat-elements">
        <div className="element chat-room-element-1">
          <img
            className="chat-image"
            src="https://i.pinimg.com/564x/76/ef/b9/76efb9495d394564fd5aa8466c397ff3.jpg"
            alt=""
            style={{ width: "32px", height: "32px" }}
          />
          <div>
            <p>Baseer</p>
            <p>Last seen 3 hours ago</p>
          </div>
        </div>
        <div className="element chat-room-element-2">
          <i className="pi pi-phone"></i>
          <i className="pi pi-video"></i>
          <i className="pi pi-ellipsis-h"></i>
        </div>
      </div>
      <div className="sms">
        <p className="income-sms">Hi, How Are You?</p>
        <br />
        <p className="going-sms">Hi, How Are You?</p>
      </div>
      <div className="sms-typing-input">
        <div className="sms-container-elements col-11 md:col-11">
          {/* <div className="input-send-div"> */}
          <input
            type="text"
            className="sms-input text-base text-color surface-overlay p-2 border-1 border-solid surface-border  appearance-none outline-none focus:border-primary w-full"
            placeholder="Aa"
          />
          <i className="pi pi-send"></i>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
