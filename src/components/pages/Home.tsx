import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {  db } from "../firebase/Auth";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, } from "firebase/auth";

type dataType = {
  id: string;
  displayName: string;
  email: string;
  password: string;
};

const Home = () => {
  const { userSession, logOut } = useContext(AuthContext);



  console.log("setUserSession", userSession)

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




// Logout function
const signOut = () => {
  logOut();
}




// logout

// const logout = () => {
// signOut(auth).then(() => {

// console.log(" Sign-out successful.")

// }).catch((error) => {
//   // An error happened.
// });
// }




// =============== check the current users

const auth = getAuth();
const user1 = auth.currentUser;

if (user1) {

  
  console.log("user1", user1)

} 






// console.log("Display auth of user ======> ", auth)

  return (
    <div className="main-box">
      <div className="main-container">
        <h1>This is Home Page</h1>
        {userSession ? <h1>Welcome User: {userSession.name}</h1> : <h1>Login First</h1>}

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


<div>
  <button onClick={signOut}>logout</button>
</div>

      </div>
    </div>
  );
};

export default Home;
