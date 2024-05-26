import styles from './Contact.module.css';

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Contact = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.main_box}>
      <div className={styles.body_container}>
        {user ? (
          <h1>Contact To: {user.email}</h1>
        ) : (
          <div className={styles.main_box}>
            <div className={styles.body_container}>
              {" "}
              <h1>Please Login First</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
