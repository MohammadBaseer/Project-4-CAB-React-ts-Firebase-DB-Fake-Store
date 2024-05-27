import styles from "./UsersList.module.css"
import { useContext } from "react";
import { UsersDataContext } from "../../../context/chatContext/ChatRoomSectionsContext";

const UsersList = () => {
  const { users } = useContext(UsersDataContext);
  console.log("user.displayName", users !== null ? users : "");

  return (
    <>
      {users &&
        users.map((user) => (
          <div className={styles.users} key={user.id}>
            <div className={styles.image_div}>
              <img
                className={styles.chat_image}
                src={user.photoURL}
                alt=""   />
            </div>
            <div className={styles.chat_info}>
              <div>
                <p className={styles.p}>{user.displayName}</p>
                <p className={styles.p}>Joined on 02-04-2024</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default UsersList;
