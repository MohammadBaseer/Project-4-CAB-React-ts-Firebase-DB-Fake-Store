import { useContext, useEffect, useState } from "react";
import styles from "./ProductItems.module.css";
import { Link } from "react-router-dom";
import { CardItemTypes, IncomingStoreArrayIntoStateType, ProductsMergeType } from "../../../../@Types/Type";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Config/Firebase_Auth";

import CartButton from "./CartButton";
import { UsersActionAuthContext } from "../../../../Context/AuthAction_Context/UsersAuthContext";
import toast, { Toaster } from "react-hot-toast";

type itemPropsType = {
  uid: string | number | any;
  id: string | number;
  image: Array<string>;
  title: string;
  category: string;
  description: string;
  price: number;
  element: CardItemTypes | ProductsMergeType;
};

const cleanImageUrl = (imageURL: string): string => {
  const alternativeImage = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";
  const cleanUrl = imageURL?.replace(/^\["|"\]$/g, ""); // remote [" and "] from the url
  if (/\.[a-z]{3,4}$/i.test(cleanUrl)) {
    return cleanUrl;
  } else {
    return alternativeImage;
  }
};

const ProductItems = ({ id, image, title, category, description, price, element, uid }: itemPropsType) => {
  const [incomingStoreArrayIntoState, setIncomingStoreArrayIntoState] = useState<IncomingStoreArrayIntoStateType | null>(null);

  const { user } = useContext(UsersActionAuthContext);

  const getItemDataIntoState = () => {
    setIncomingStoreArrayIntoState({
      uid: uid,
      id: element.id,
      title: element.title,
      price: element.price,
      description: element.description,
      image: element.images,
    });
  };

  useEffect(() => {
    if (incomingStoreArrayIntoState) {
      const insertDataToDB = async () => {
        if (user === null) {
          toast.error("Please login first.");
        } else {
          try {
            if (incomingStoreArrayIntoState) {
              await addDoc(collection(db, "cart"), {
                uid: incomingStoreArrayIntoState.uid,
                id: incomingStoreArrayIntoState.id,
                title: incomingStoreArrayIntoState.title,
                price: incomingStoreArrayIntoState.price,
                description: incomingStoreArrayIntoState.description,
                image: incomingStoreArrayIntoState.image[0],
              });
            } else {
            }

            toast.success("Successfully added to cart!");
          } catch (error) {
            console.error("Error during user registration:", error);
            console.log("========>", error);
          }
        }
      };

      insertDataToDB();
    }
  }, [incomingStoreArrayIntoState]);

  return (
    <>
      <div className={`${styles.product_elements} col-11 sm:col-5 md:col-4 lg:col-4 xl:col-3`}>
        <div className="image-slider">
          <img className={styles.p_image} src={cleanImageUrl(image[0]) ? cleanImageUrl(image[0]) : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"} alt="" />
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
        </div>
        <div className={styles.item_elements}>
          <div className={styles.item_sub_elements}>
            <Link className={styles.product_details_btn} to={`${id}`}>
              <i className="pi pi-window-maximize"></i>
            </Link>

            <CartButton id={id} uid={uid!} getItemDataIntoState={getItemDataIntoState} />
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default ProductItems;
