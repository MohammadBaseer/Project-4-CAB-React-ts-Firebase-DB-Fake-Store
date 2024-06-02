import { collection, onSnapshot, query } from "firebase/firestore";
import AddItemModal from "./AddItemModal";
import styles from "./MyShop.module.css";
import { db } from "../../../../Config/Firebase_Auth";
import { useContext, useEffect, useState } from "react";
import { UsersActionAuthContext } from "../../../../../Context/AuthAction_Context/UsersAuthContext";
import { ProductsType } from "../../../../../@Types/Type";
import { Link } from "react-router-dom";

const MyShop = () => {
  const { user } = useContext(UsersActionAuthContext);
  console.log("user ID", user?.uid);

  const [getProductsData, setGetProductsData] = useState<ProductsType[] | null>(null);

  const getProductsToTableRealTime = () => {
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
    getProductsToTableRealTime();
  }, []);

  console.log("getProductsData", getProductsData);

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
                        <td>
                          <Link to="">Del</Link>
                        </td>
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
