import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CardItemTypes } from "../../../../@Types/Type";
import { db } from "../../../Config/Firebase_Auth";
import styles from "./CartButton.module.css";

const CartButton = ({ id, uid, getItemDataIntoState }) => {
  const [productsData, setProductsData] = useState<CardItemTypes[] | null>(
    null
  );

  useEffect(() => {
    const getProductsRealTime = async () => {
      try {
        const q = query(collection(db, "cart"));
        onSnapshot(q, (querySnapshot) => {
          const productsArray: CardItemTypes[] = [];
          querySnapshot.forEach((doc) => {
            productsArray.push(doc.data() as CardItemTypes);
          });
          setProductsData(productsArray);
        });
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    getProductsRealTime();
  }, []);

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
