import { Product } from "../@types/Types";
import { useEffect, useState } from "react";
import ProductItems from "./ProductItems";
import "primeicons/primeicons.css";
import ProductFilters from "./ProductFilters";

const Products = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>("");
const [searchFilter, setSearchFilter] = useState<string>("");

  const [data, setData] = useState<Product[] | null>(null);

 const apiUrl = `https://api.escuelajs.co/api/v1/products?title=${searchFilter}&categoryId=${Number(categoryFilter)}`; //Public Api -- It have some issue with images
  // const apiUrl = "https://8c1080f56e4f4a9a.mokky.dev/products"; // My own Endpoint API
  const getProducts = async () => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("...something went wrong..");
      }
      const dataFromApi = (await response.json()) as Product[];
      setData(dataFromApi);

    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [searchFilter, categoryFilter]);


  return (
    <div className="main-box ">
      <div className="main-container ">
        <div className="p-container  ">
         <ProductFilters setSearchFilter={setSearchFilter}  setCategoryFilter={setCategoryFilter}/>

          <div className="p-box p-box-item col-12 sm:col-12 md:col-9">
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
