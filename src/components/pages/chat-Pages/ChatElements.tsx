const ChatSMSElements = () => {
  return (
    <>
      <div className="chat-elements">
        <div className="element">
          <i className="pi pi-comment"></i>
        </div>
        <div className="element">
          <i className="pi pi-phone"></i>
        </div>
        <div className="element">
          <i className="pi pi-envelope"></i>
        </div>
        <div className="element">
          <i className="pi pi-users"></i>
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
      <h2>chats</h2>
        </div>
        <div className="sub-element-1">
      <i className="pi pi-plus"></i>
        </div>
      </div>
    </>
  );
};

export default ChatSMSElements;
