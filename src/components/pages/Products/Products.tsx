import styles from "./Products.module.css"
import { useContext, useEffect } from "react";
import ProductItems from "../ProductItems/ProductItems";
import ProductFilters from "../ProductFilters/ProductFilters";
import { apiDataContext } from "../../context/ApiContext";

const Products = () => {
  const { getProducts, data, searchFilter, errorHandle, categoryFilter } =
    useContext(apiDataContext);

  // console.log("data", data !== null ? data : data)

  //NOTE Testing

  const apiUrl = `https://api.escuelajs.co/api/v1/products?title=${searchFilter}&categoryId=${Number(categoryFilter)}`; //Public Api -- It have some issue with images

  // End Testing

  useEffect(() => {
    getProducts(apiUrl);
  }, [searchFilter, categoryFilter, errorHandle]);

  return (
    <div className={styles.main_box}>
      <div className={styles.body_container}>
        <div className={styles.p_container}>
          <ProductFilters />

          <div className={`${styles.p_box} col-12 sm:col-12 md:col-9`}>
            {errorHandle}
            {data &&
              data.map((element) => {
                return (
                  <ProductItems
                    key={element.id}
                    id={element.id}
                    image={element.images[0]}
                    title={element.title.slice(0, 15)}
                    category={element.category.name}
                    description={element.description.slice(0, 150)}
                    price={element.price}
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
