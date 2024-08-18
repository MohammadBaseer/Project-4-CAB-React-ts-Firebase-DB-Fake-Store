import styles from "./Cart.module.css";
import "./Cart.css";
import { useContext, useEffect, useState } from "react";
import { CardItemTypes } from "../../../@Types/Type";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";

import { UsersActionAuthContext } from "../../../Context/AuthAction_Context/UsersAuthContext";
import { db } from "../../Config/Firebase_Auth";
import CartItem from "./CartItem/CartItem";

const Cart = () => {
  const { user } = useContext(UsersActionAuthContext);

  const [getProductsData, setGetCartData] = useState<CardItemTypes[] | null>(null);
  // console.log("getProductsData", getProductsData?.length);
  const deleteCart = async (docID: string) => {
    await deleteDoc(doc(db, "cart", docID));
  };

  useEffect(() => {
    const getProductsRealTime = async () => {
      if (user) {
        try {
          const q = await query(collection(db, "cart"), where("uid", "==", user?.uid));
          onSnapshot(q, (querySnapshot) => {
            const getProductsArray: CardItemTypes[] = [];
            querySnapshot.forEach((doc) => {
              const dataObject = {
                docID: doc.id,
                uid: doc.data().uid,
                id: doc.data().id,
                title: doc.data().title,
                price: doc.data().price,
                description: doc.data().description,
                image: doc.data().image,
              };
              getProductsArray.push(dataObject as unknown as CardItemTypes);
            });
            setGetCartData(getProductsArray);
          });
        } catch (error) {
          console.log("----Error----> ", error);
        }
      }
    };

    getProductsRealTime();
  }, [user]);
  useEffect(() => {
    document.title = "Wish List";
  }, []);
  return (
    <div className={styles.main_box}>
      <div className={styles.body_container}>
        {/*  */}
        <div className="shopping_cart_box">
          <h1>Shopping Cart</h1>
          <br />
          <br />
          <div className="shopping-cart">
            <div className="column-labels">
              <label className="product-image">Image</label>
              <label className="product-details">Product</label>
              <label className="product-price">Price</label>
              <label className="product-quantity">Quantity</label>
              <label className="product-removal">Remove</label>
              <label className="product-line-price">Total</label>
            </div>

            {/* ------------------------------------------------------------------------------------------------------------ */}
            {getProductsData &&
              getProductsData.map((cardItem, index) => {
                return <CartItem key={index} cardItem={cardItem} deleteCart={deleteCart} />;
              })}

            {/* ------------------------------------------------------------------------------------------------------------ */}

            {/* <div className="totals">
              <div className="totals-item">
                <label>Subtotal</label>
                <div className="totals-value" id="cart-subtotal">
                  71.97
                </div>
              </div>
              <div className="totals-item">
                <label>Tax (5%)</label>
                <div className="totals-value" id="cart-tax">
                  3.60
                </div>
              </div>
              <div className="totals-item">
                <label>Shipping</label>
                <div className="totals-value" id="cart-shipping">
                  15.00
                </div>
              </div>
              <div className="totals-item totals-item-total">
                <label>Grand Total</label>
                <div className="totals-value" id="cart-total">
                  90.57
                </div>
              </div>
            </div> */}

            <button className="checkout">Checkout</button>
          </div>
        </div>{" "}
        {/*  */}
      </div>
    </div>
  );
};

export default Cart;
