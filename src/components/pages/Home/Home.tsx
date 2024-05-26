import styles from "./Home.module.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase/Auth";
import { collection, getDocs } from "firebase/firestore";

type dataType = {
  map: any;
  id: string;
  displayName: string;
  email: string;
  password: string;
};

const Home = () => {
  const { user } = useContext(AuthContext);

  // console.log("user", user);

  const [users, setUsers] = useState<dataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      let dataArray: any = [];
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
        // console.log("dataArray", dataArray);
        setUsers(dataArray);
      });
    };

    fetchData();
  }, []);

  // =============== check the current users
  // console.log("auth=>>>>>>>>>>>>>>>>>>>>>>>>>>>", auth);
  // const user1 = auth.currentUser;

  // if (user1) {

  //   console.log("user1", user1)

  // }

  // console.log("Display auth of user ======> ", auth)

  return (
    <div className={styles.main_box}>
      <div className={styles.body_container}>
        <h1>This is Home Page</h1>
        {user ? <h1>Welcome User: {user.name}</h1> : <h1>Login First</h1>}

        <hr />
        <hr />
        <br />
        <br />

        {users &&
          users.map((user: dataType) => (
            <div key={user.id}>
              <h2>User ID: {user.displayName}</h2>
              <p>{user.email}</p>
              <p>{user.password}</p>
              <p>{user.id}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
