import { useContext } from "react";
import { UsersDataContext } from "../../context/chatContext/ChatRoomSectionsContext";

const UsersList = () => {
  const { users } = useContext(UsersDataContext);
  console.log("user.displayName", users !== null ? users : "");

  return (
    <>
      {users &&
        users.map((user) => (
          <div className="users" key={user.id}>
            <div className="image-div">
              <img
                className="chat-image"
                src={user.photoURL}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </div>
            <div className="chat-info">
              <div className="chat-info-title">
                <p className="chat-name">{user.displayName}</p>
                <p>Joined on 02-04-2024</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default UsersList;
