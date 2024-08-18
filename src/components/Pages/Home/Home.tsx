import { useEffect } from "react";
import styles from "./Home.module.css";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className={styles.main_box}>
      <div className={styles.body_container}>
        <h1>Welcome To Firebase Fake Store</h1>
        <hr />
        <hr />
        <br />
        <h2>Technology of usage: </h2>
        {"---"} React 18.3.1
        <br />
        {"---"} TypeScript
        <br />
        {"---"} Firebase authentication
        <br />
        {"---"} Firestore Database
        <br />
        {"---"} Firebase Storage
        <br />
        {"---"} Fake API
        <br />
        <br />
        <h2>Features: </h2>
        {"---"} User Registration & Login
        <br />
        {"---"} Get Product From Fake API
        <br />
        {"---"} Add You Own Product and Join with API Product List
        <br />
        {"---"} Filter Category Base and Search by Item Name
        <br />
        {"---"} Product Submit Form
        <br />
        {"---"} Add Item to Wish List
        <br />
        {"---"} Inputs Validations and Notification ect...
        <br />
      </div>
    </div>
  );
};

export default Home;
