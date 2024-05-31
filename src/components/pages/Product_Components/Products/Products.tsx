import "primeicons/primeicons.css";
import { useContext, useEffect } from "react";
import styles from "./Products.module.css";
import ProductItems from "../Product_Items/ProductItems";
import ProductFilters from "../Products_Filter/ProductFilters";
import { ApiDataContext } from "../../../../Context/Api_Context";
import { UsersActionAuthContext } from "../../../../Context/AuthAction_Context/UsersAuthContext";

const Products = () => {
  const {
    getProducts,
    filteredData,
    errorHandle,
    data,
    filterDataFun,
    categoryFilter,
    searchFilter,
  } = useContext(ApiDataContext);


const {user} = useContext(UsersActionAuthContext)





  // console.log("filteredData from Product Page", filteredData && filteredData )

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterDataFun(data);
  }, [categoryFilter, searchFilter, data]);

  // console.log("categoryFilter from p page" , categoryFilter)
  // End Testing

  return (
    <div className={styles.main_box}>
      <div className={styles.body_container}>
        <div className={styles.p_container}>
          <ProductFilters />

          <div className={`${styles.p_box} col-12 sm:col-12 md:col-9`}>
            {errorHandle}
            {filteredData &&
              filteredData.map((element) => {
                // console.log(element);
                return (
                  <ProductItems
                    key={element.id}
                    id={element.id}
                    image={element.images[0]}
                    title={element.title.slice(0, 15)}
                    category={element.category.name}
                    description={element.description.slice(0, 150)}
                    price={element.price}
                    storeArrayIntoState={element}
                    uid={user?.uid}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
