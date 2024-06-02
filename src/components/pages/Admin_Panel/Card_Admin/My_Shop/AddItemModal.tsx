import { useState } from "react";
import styles from "./AddItemModal.module.css";
import AddItemForm from "./AddItemForm";

const AddItemModal = () => {
  const [displayToggle, setDisplayToggle] = useState(false);

  const formToggle = () => {
    if (displayToggle) {
      setDisplayToggle(false);
    } else {
      setDisplayToggle(true);
    }
  };

  return (
    <>
      <button onClick={formToggle}> Add Product </button>
      <div id="myModal" className={styles.modal} style={displayToggle === true ? { display: "block" } : { display: "none" }}>
        <div className={styles.modal_content}>
          <span className={styles.close} onClick={formToggle}>
            {" "}
            &times;{" "}
          </span>
          <h2>Add Item</h2>
          <hr />
          <AddItemForm setDisplayToggle={setDisplayToggle} />
        </div>
      </div>
    </>
  );
};

export default AddItemModal;
