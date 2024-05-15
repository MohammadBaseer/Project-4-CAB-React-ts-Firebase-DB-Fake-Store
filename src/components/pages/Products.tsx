import { Product } from "../@types/Types";
import { useEffect, useState } from "react";
import ProductItems from "./ProductItems";
import { Link, NavLink } from "react-router-dom";
import "primeicons/primeicons.css";

const Products = () => {

  const [data, setData] = useState<Product[] | null>(null);
  // const apiUrl = "https://api.escuelajs.co/api/v1/products"; //Public Api -- It have some issue with images
  const apiUrl = "https://8c1080f56e4f4a9a.mokky.dev/products"; // My own Endpoint API
  const getCharacters = async () => {
    try {
      const response = await fetch(apiUrl);
      // console.log("response", response);
      if (!response.ok) {
        throw new Error("...something went wrong..");
      }
      const dataFromApi = (await response.json()) as Product[];
      setData(dataFromApi);

      // console.log("dataFromApi :>> ", dataFromApi[0].images[0]);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

console.log(" All Data From API ====> ",typeof data)

  return (



    
    <div className="main-box ">
      <div className="main-container ">
        <div className="p-container  ">
          <div className="p-box col-12 sm:col-12 md:col-2">
            <div className="search">
            <div className="field">
            <input  type="text" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" placeholder="Search"/>
            </div>
            </div>
            <div className="filter-container">
              <NavLink to="#"><button className="filter-button filter-head"><i className="pi pi-sort-amount-down">&nbsp;</i>Categories</button></NavLink>
              <NavLink to="#"><button className="filter-button">All Categories</button></NavLink>
              <NavLink to="#"><button className="filter-button">All Categories</button></NavLink>
              <NavLink to="#"><button className="filter-button">All Categories</button></NavLink>
              <NavLink to="#"><button className="filter-button">All Categories</button></NavLink>
            </div>
          </div>

          <div className="p-box p-box-item col-12 sm:col-12 md:col-9">

            {data && data.map((element) => {
                return (
                  <ProductItems key={element.id} id={element.id} image={element.images[0]} title={element.title.slice(0, 15)}  category={element.category.name} description={element.description.slice(0, 150)} price={element.price} />
                );
              })}
          </div>
        </div>
      </div>
    </div>




  );
};

export default Products;
