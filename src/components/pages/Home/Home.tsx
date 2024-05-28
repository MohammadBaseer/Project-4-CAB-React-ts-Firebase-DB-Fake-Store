import styles from "./Home.module.css"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";




const Home = () => {
  const { user } = useContext(AuthContext);



  return (
    <div className={styles.main_box}>
      <div className={styles.body_container}>
        <h1>This is Home Page</h1>
        {user ? <h1>Welcome User: {user.displayName}</h1> : <h1>Login First</h1>}

        <hr />
        <hr />
        <br />
        <br />


      </div>
    </div>
  );
};

export default Home;
