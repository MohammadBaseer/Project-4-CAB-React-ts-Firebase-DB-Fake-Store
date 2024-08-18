import { collection, onSnapshot, query } from "firebase/firestore";
import AddItemModal from "./AddItemModal";
import styles from "./MyShop.module.css";
import { db } from "../../../../Config/Firebase_Auth";
import { ProductsType } from "../../../../../@Types/Type";
import { useEffect, useState } from "react";

const MyShop = () => {
  const [getProductsData, setGetProductsData] = useState<ProductsType[] | null>(null);

  const getProductsToTableRealTime = () => {
    const q = query(collection(db, "products"));
    onSnapshot(q, (querySnapshot) => {
      const getProductsArray: ProductsType[] = [];
      querySnapshot.forEach((doc) => {
        getProductsArray.push(doc.data() as ProductsType);
      });
      setGetProductsData(getProductsArray);
    });
  };

  useEffect(() => {
    getProductsToTableRealTime();
    document.title = "My Shop";
  }, []);

  return (
    <>
      <div className={styles.main_box}>
        <div className={styles.body_container}>
          <h1>Welcome to My Shop</h1>

          <br />
          <br />
          <AddItemModal />

          <br />
          <br />

          <div className={styles.table_box}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>No#</th>
                  <th>Photos</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {getProductsData &&
                  getProductsData.map((productsData, index) => {
                    return (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>
                          <img className={styles.product_image} src={productsData.images[0]} alt="" />
                        </td>
                        <td>{productsData.title}</td>
                        <td>{productsData.category.name}</td>
                        <td>{productsData.description}</td>
                        <td>{productsData.price}-£</td>
                        <td>N/A</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyShop;
