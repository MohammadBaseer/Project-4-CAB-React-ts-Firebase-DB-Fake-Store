import styles from "./CartButton.module.css";
import useFirebaseStoreFetchDataHooks from "../../../../Context/FirebaseStoreFetchData_CustomHooks/useFirebaseStoreFetchDataHooks";

const CartButton = ({ id, uid, getItemDataIntoState }) => {
  //! Custom Hook To fetch data from Firebase Store DB ====
  const { productsData } = useFirebaseStoreFetchDataHooks();

  return (
    <button
      className={styles.button}
      onClick={getItemDataIntoState}
      disabled={
        productsData && productsData.some((e) => e.uid === uid && e.id === id)
      }
    >
      <i className="pi pi-shopping-cart">&nbsp;</i>Add To Cart
    </button>
  );
};

export default CartButton;
