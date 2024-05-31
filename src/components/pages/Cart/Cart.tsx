import styles from "./Cart.module.css";
import "./Cart.css";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { cardItemTypes } from "../../../@Types/Type";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Config/Firebase_Auth";
import { UsersActionAuthContext } from "../../../Context/AuthAction_Context/UsersAuthContext";



const Cart = () => {

  const {user} = useContext(UsersActionAuthContext)
const [delByID ,setDelByID] = useState({});

const [quantity ,setQuantity] = useState(1)

  const [getProductsData, setGetCartData] = useState<cardItemTypes[] | null>( null );

  const getProductsRealTime = () => {
    // const q = query(collection(db, "products"), where("uid", "==", user?.uid));
    const q = query(collection(db, "cart"));
    onSnapshot(q, (querySnapshot) => {
      const getProductsArray: cardItemTypes[] = [];
      querySnapshot.forEach((doc) => {


// console.log("doc ID====>", doc)


///REVIEW -  create object get the doc id with others 
const dataObject ={
  docID: doc.id,
  uid: doc.data().uid,
  id: doc.data().id,
  title: doc.data().title,
  price: doc.data().price,
  description: doc.data().description,
  image: doc.data().image

}
        // getProductsArray.push(doc.data() as cardItemTypes);
        getProductsArray.push(dataObject as cardItemTypes);

      });
      console.log("getProductsArray", getProductsArray);
      setGetCartData(getProductsArray);
    });
  };



//NOTE - Delete CartITem by ID and uid
const deleteCart = async (docID:string) => {

  console.log("Deleting item with UID:",docID);
  await deleteDoc(doc(db, "cart", docID));

}




  useEffect(() => {
    getProductsRealTime();
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



{getProductsData && getProductsData.map((cardItem, index)=>{
  return(
<div className="product" key={index}>
              <div className="product-image">
                <img src={cardItem.image} />
              </div>
              <div className="product-details">
                <div className="product-title">{cardItem.title}</div>
                <p className="product-description">{cardItem.description}</p>
              </div>
              <div className="product-price">{cardItem.price}</div>
              <div className="product-quantity">
                <input type="number" value={quantity}  min="1" onChange={(e:ChangeEvent<HTMLInputElement> | any) => {setQuantity(e.target.value)}} />
              </div>
              <div className="product-removal">
              
                <button className="remove-product" onClick={() => deleteCart(cardItem.docID)}>Remove</button>
              </div>
              <div className="product-line-price">{cardItem.price * quantity }</div>
            </div>
  )
})}
            

            {/* ------------------------------------------------------------------------------------------------------------ */}


            <div className="totals">
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
            </div>

            <button className="checkout">Checkout</button>
          </div>
        </div>{" "}
        {/*  */}
      </div>
    </div>
  );
};

export default Cart;
