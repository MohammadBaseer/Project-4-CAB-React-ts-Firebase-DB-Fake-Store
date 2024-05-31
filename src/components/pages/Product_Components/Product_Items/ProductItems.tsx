import { useContext, useEffect, useState } from "react";
import styles from "./ProductItems.module.css";
import { Link } from "react-router-dom";
import {IncomingStoreArrayIntoStateType,} from "../../../../@Types/Type";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Config/Firebase_Auth";
import { UsersActionAuthContext } from "../../../../Context/AuthAction_Context/UsersAuthContext";
import { User } from "firebase/auth";

type itemPropsType = {
  uid: User | null | undefined
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
  storeArrayIntoState: object;
};

const cleanImageUrl = (imageURL: string): string => {
  const alternativeImage =
    "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";
  // console.log("imageUrl", imageURL);
  const cleanUrl = imageURL?.replace(/^\["|"\]$/g, ""); // remote [" and "] from the url
  // return cleanUrl
  if (/\.[a-z]{3,4}$/i.test(cleanUrl)) {
    // if the url have no file Extension
    return cleanUrl;
  } else {
    return alternativeImage;
  }
};

const ProductItems = ({ id, image, title, category, description, price, storeArrayIntoState, uid }: itemPropsType) => {



  const [objectTest, setObjectTest] = useState();
  const objectJSON = JSON.stringify(storeArrayIntoState, null, 2);

  const [incomingStoreArrayIntoState, setIncomingStoreArrayIntoState] = useState<IncomingStoreArrayIntoStateType | null>(null);

  const getItemDataIntoState = () => {
    setIncomingStoreArrayIntoState({
      uid: uid,
      id: storeArrayIntoState.id,
      title: storeArrayIntoState.title,
      price: storeArrayIntoState.price,
      description: storeArrayIntoState.description,
      image: storeArrayIntoState.images[0],
    });

  }

  useEffect(() => {
    setObjectTest(objectJSON);

    if (incomingStoreArrayIntoState) {
      console.log("incomingStoreArrayIntoState", "=======OnClickFun=======",);

    
 const insertDataToDB = async () => {
  try {
    if (incomingStoreArrayIntoState) {
      const docRef = await addDoc(collection(db, "cart"), {
        uid: incomingStoreArrayIntoState.uid,
        id: incomingStoreArrayIntoState.id,
        title: incomingStoreArrayIntoState.title,
        price: incomingStoreArrayIntoState.price,
        description: incomingStoreArrayIntoState.description,
        image: incomingStoreArrayIntoState.image,
      });
      console.log("Product inserted:", docRef);
    } else {
      console.log(
        "something went wrong with incomingStoreArrayIntoState"
      );
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    console.log("========>", error);
  }
};

insertDataToDB()


    }


  }, [incomingStoreArrayIntoState]);










  return (
    <div
      className={`${styles.product_elements} col-11 sm:col-5 md:col-4 lg:col-4 xl:col-3`}
    >
      <div className="image-slider">
        <img
          className={styles.p_image}
          src={
            cleanImageUrl(image)
              ? cleanImageUrl(image)
              : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
          alt=""
        />
      </div>
      <div className={styles.item_info}>
        <p>{title}...</p>
        <p>
          {" "}
          <strong>Category:</strong> {category}{" "}
        </p>
        <p>{description}...</p>
        <p>
          <strong>Price:</strong> {price} £{" "}
        </p>

        {/* ======================================= */}

        <pre>{objectTest}</pre>

        {/* ======================================= */}
      </div>
      <div className={styles.item_elements}>
        <div className={styles.item_sub_elements}>
          <Link className={styles.product_details_btn} to={`${id}`}>
            <i className="pi pi-window-maximize"></i>
          </Link>
          <button onClick={getItemDataIntoState}>
            {" "}
            <i className="pi pi-shopping-cart">&nbsp;</i>Add To Card{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
