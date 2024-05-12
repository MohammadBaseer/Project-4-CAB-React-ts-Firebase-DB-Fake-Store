import "primeicons/primeicons.css";
import ChatSMSUser from "./ChatSMSUser";
import ChatSearchInput from "./ChatSearchInput";
import ChatSMSElements from "./ChatSMSElements";

const Chat = () => {
  return (
    <div className="main-box">
      <div className="chat-container">
        <div className="chat-sms-elements col-8 sm:col-5 md:col-4 lg:col-3 xl:col-2">
          <ChatSMSElements />
            <div className="chat-list">
              <ChatSearchInput />
              <ChatSMSUser />
              <ChatSMSUser />
              <ChatSMSUser />
              <ChatSMSUser />
              <ChatSMSUser />
              <ChatSMSUser />
            </div>
        </div>

        <div className="sms-container col-8 sm:col-5 md:col-4 lg:col-9 xl:col-8">
        <div className="chat-elements">
        <div className="element">
          <img
            className="chat-image"
            src="https://i.pinimg.com/564x/76/ef/b9/76efb9495d394564fd5aa8466c397ff3.jpg"
            alt=""
            style={{ width: "32px", height: "32px" }}
          />
        </div>
        {/* <div className="element">
          <i className="pi pi-comment"></i>
        </div> */}
        {/* <div className="element">
          <i className="pi pi-phone"></i>
        </div> */}
        {/* <div className="element">
          <i className="pi pi-envelope"></i>
        </div> */}
        <div className="element chat-room-element-2">
          <i className="pi pi-phone"></i>
          <i className="pi pi-video"></i>
          <i className="pi pi-ellipsis-h"></i>
        </div>
      </div>

        </div>
        <div className="col-8 sm:col-5 md:col-4 lg:col-3 xl:col-2">
          4
          </div>
      </div>
    </div>
  );
};

export default Chat;
