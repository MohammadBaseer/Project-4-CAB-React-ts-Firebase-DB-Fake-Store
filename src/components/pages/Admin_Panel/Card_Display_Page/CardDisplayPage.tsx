import { Link } from "react-router-dom";
import styles from "./CardDisplayPage.module.css";
import ProductFilters from "../../Product_Components/Products_Filter/ProductFilters";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../Config/Firebase_Auth";
import { useContext, useEffect, useState } from "react";
import { ProductsType } from "../../../../@Types/Type";
import { UsersActionAuthContext } from "../../../../Context/AuthAction_Context/UsersAuthContext";

const CardDisplayPage = () => {
  // const { user } = useContext(UsersActionAuthContext);
  // console.log("user ID", user.uid)

  const [getProductsData, setGetProductsData] = useState<ProductsType[] | null>(null);

  const getProductsRealTime = () => {
    // const q = query(collection(db, "products"), where("uid", "==", user?.uid));
    const q = query(collection(db, "products"));
    onSnapshot(q, (querySnapshot) => {
      const getProductsArray: ProductsType[] = [];
      querySnapshot.forEach((doc) => {
        getProductsArray.push(doc.data() as ProductsType);
      });
      console.log("getProductsArray", getProductsArray);
      setGetProductsData(getProductsArray);
    });
  };

  useEffect(() => {
    getProductsRealTime();
  }, []);

  return (
    <div className={styles.main_box}>
      <div className={styles.body_container}>
        <div className={styles.p_container}>
          {/* <ProductFilters /> */}

          <div className={`${styles.p_box} col-12 sm:col-12 md:col-9`}>
            {getProductsData &&
              getProductsData.map((productsData, index) => {
                return (
                  <div className={`${styles.product_elements} col-11 sm:col-5 md:col-4 lg:col-4 xl:col-3`} key={index}>
                    <div className="image-slider">
                      <img className={styles.p_image} src={productsData.imageURL} alt="" />
                    </div>
                    <div className={styles.item_info}>
                      <p>{productsData.title}</p>
                      <p>
                        {" "}
                        <strong>Category:</strong> {productsData.category}{" "}
                      </p>
                      <p> {productsData.description} </p>
                      <p>
                        <strong>Price:</strong> {productsData.price} £{" "}
                      </p>
                    </div>
                    <div className={styles.item_elements}>
                      <div className={styles.item_sub_elements}>
                        <Link className={styles.product_details_btn} to={``}>
                          <i className="pi pi-window-maximize"></i>
                        </Link>
                        <button disabled>
                          {" "}
                          <i className="pi pi-shopping-cart">&nbsp;</i>Add To Card{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDisplayPage;
