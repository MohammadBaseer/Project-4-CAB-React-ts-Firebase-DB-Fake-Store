import styles from "./ProtectedRouts.module.css"
import { ReactNode, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

type ProtectedRoutType = {
  children: ReactNode;
};

const ProtectedRout = ({ children }: ProtectedRoutType) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        children
      ) : (
        <div className={styles.main_box}>
          <div className={styles.body_container}>
            <h1>Please Login First</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRout;
