const ChatSMSUser = () => {
  return (
    <div className="users">
      <div className="image-div">
        <img
          className="chat-image"
          src="https://i.pinimg.com/564x/76/ef/b9/76efb9495d394564fd5aa8466c397ff3.jpg"
          alt=""
          style={{ width: "40px", height: "40px" }}
        />
      </div>
      <div className="chat-info">
        <div className="chat-info-title">
          <p className="chat-name">Baseer</p>
          <p className="chat-msg">Hello Dear Baseer</p>
        </div>
        <div className="chat-info-date">
          <div>
            <span>12:00 PM</span>
          </div>
          <div>
            <span className="chat-notification">5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSMSUser;
