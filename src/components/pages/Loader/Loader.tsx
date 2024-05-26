// Loader.js
import styles from "./Loader.module.css"
//import "../../../assets/css/Loader.css"; // You can style the loader as needed

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>{" "}
      {/* You can replace this with any loader */}
    </div>
  );
};

export default Loader;
