import styles from "./ProductItemDetails.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../../@Types/Type";
import CartButton from "../Product_Items/CartButton";

const ProductItemDetail = () => {
  let { id } = useParams();
  console.log("id", id);

  const [product, setProduct] = useState<Product | null>(null);
  const apiUrl = `https://api.escuelajs.co/api/v1/products/${id}`;
  const getSingleProduct = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("...something went wrong..");
      }
      const dataFromApi = (await response.json()) as Product;
      console.log("dataFromApi", dataFromApi);
      setProduct(dataFromApi);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  console.log("product ======>", product);
  //

  const cleanImageUrl = (imageURL: string): string => {
    const alternativeImage =
      "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";
    console.log("imageUrl", imageURL);
    const cleanUrl = imageURL?.replace(/^\["|"\]$/g, "");
    // return cleanUrl
    if (/\.[a-z]{3,4}$/i.test(cleanUrl)) {
      return cleanUrl; // Return original URL if it has a file extension
    } else {
      return alternativeImage; // Return alternative image URL if no file extension
    }
  };

  return (
    <div className={styles.main_box}>
      <div className={styles.body_container}>
        <div className={styles.product_detail_container}>
          <div className={styles.detail_boxes}>
            <div
              className={`${styles.product_detail_box} col-12 sm:col-12 md:col-11 lg:col-11 xl:col-11`}
            >
              <div
                className={`${styles.image_box} col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4`}
              >
                <img
                  className={styles.item_image}
                  src={
                    cleanImageUrl(product?.images[0]!)
                      ? cleanImageUrl(product?.images[0]!)
                      : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                  }
                  alt=""
                />
              </div>

              <div
                className={`${styles.image_box} col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4`}
              >
                <div className={styles.product_info}>
                  <h1>{product?.title}</h1>
                  <p>
                    {" "}
                    <strong>Category:</strong> {product?.category.name}{" "}
                  </p>
                  <p>{product?.description}</p>
                  <p>
                    {" "}
                    <strong>Price:</strong> {product?.price}{" "}
                  </p>

                  <CartButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemDetail;
