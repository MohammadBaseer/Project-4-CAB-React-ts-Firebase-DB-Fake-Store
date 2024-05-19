import { useContext, useEffect } from "react";
import ProductItems from "./ProductItems";
import ProductFilters from "./ProductFilters";
import { ProductsDataContext } from "../context/ProductsContext";

const Products = () => {


const {getProducts, data, searchFilter, errorHandle, categoryFilter} = useContext(ProductsDataContext)

  useEffect(() => {
    getProducts();
  }, [searchFilter, categoryFilter, errorHandle]);

  return (
    <div className="main-box ">
      <div className="main-container ">
        <div className="p-container  ">
          <ProductFilters />

          <div className="p-box p-box-item col-12 sm:col-12 md:col-9">
            {errorHandle}
            {data &&
              data.map((element) => {
                return (
                  <ProductItems key={element.id} id={element.id} image={element.images[0]} title={element.title.slice(0, 15)} category={element.category.name} description={element.description.slice(0, 150)}  price={element.price}  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
