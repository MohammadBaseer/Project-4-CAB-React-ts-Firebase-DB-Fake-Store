import styles from "./CartButton.module.css";
import useFirebaseStoreFetchDataHooks from "../../../../Context/FirebaseStoreFetchData_CustomHooks/useFirebaseStoreFetchDataHooks";
import { CardItemTypes } from "../../../../@Types/Type";

type CartButtonType = {
  id: string | number;
  uid: string | number;
  getItemDataIntoState: () => void;
};

const CartButton = ({ id, uid, getItemDataIntoState }: CartButtonType) => {
  //! Custom Hook To fetch data from Firebase Store DB ====
  const { productsData } = useFirebaseStoreFetchDataHooks();
  //! ------------------------------------------------------------

  return (
    <button className={styles.button} onClick={getItemDataIntoState} disabled={productsData && productsData.some((e: CardItemTypes) => e.uid === uid && e.id === id)}>
      <i className="pi pi-shopping-cart">&nbsp;</i>Add To Cart
    </button>
  );
};

export default CartButton;
