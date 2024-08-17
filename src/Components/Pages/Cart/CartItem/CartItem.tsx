import { ChangeEvent, useState } from "react";
import styles from "./CartItem.module.css";

type CartItemProps = {
  cardItem: {
    id: string;
    uid: string;
    docID: string;
    title: string;
    price: number;
    image: string | string[];
    // image: string;
    description: string;
  };
  deleteCart: (parameter: string) => void;
};
const CartItem = ({ cardItem, deleteCart }: CartItemProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  let image = cardItem.image as string;

  const cleanImageUrl = (imageURL: string): string => {
    const alternativeImage = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";
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

  return (
    <>
      <div className={styles.product}>
        <div className={styles.product_image}>
          <img
            // src={cleanImageUrl(cardItem.image) ? cleanImageUrl(cardItem.image) : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"}
            src={cleanImageUrl(image) ? cleanImageUrl(image) : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"}

            // src={cardItem.image}
          />
        </div>
        <div className={styles.product_details}>
          <div className={styles.product_title}>{cardItem.title}</div>
          <p className={styles.product_description}>{cardItem.description}</p>
        </div>
        <div className={styles.product_price}>{cardItem.price}</div>
        <div className={styles.product_quantity}>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e: ChangeEvent<HTMLInputElement> | any) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div className={styles.product_removal}>
          <button className={styles.remove_product} onClick={() => deleteCart(cardItem.docID)}>
            Remove
          </button>
        </div>
        <div className={styles.product_line_price}>{cardItem.price * quantity}</div>
      </div>
    </>
  );
};

export default CartItem;
