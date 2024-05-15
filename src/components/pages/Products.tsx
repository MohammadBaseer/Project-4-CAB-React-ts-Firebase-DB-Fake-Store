import "primeicons/primeicons.css";
import { Product } from "../@types/Types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const apiUrl = "https://api.escuelajs.co/api/v1/products";
  const getCharacters = async () => {
    try {
      const response = await fetch(apiUrl);
      console.log("response", response);
      if (!response.ok) {
        throw new Error("...something went wrong..");
      }
      const dataFromApi = (await response.json()) as Product[];
      setData(dataFromApi);

      console.log("dataFromApi :>> ", dataFromApi[0].images[0]);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="main-box ">
      <div className="main-container ">
        <div className="p-container  ">
          <div className="p-box col-12 sm:col-12 md:col-2"></div>

          <div className="p-box p-box-item col-12 sm:col-12 md:col-9">

            {data &&
              data.map((element) => {
                return (
                  <div className="p-box product-elements col-11 sm:col-5 md:col-4 lg:col-4 xl:col-3">
                    <div className="image-slider">
                      <img className="p-image" src={element.images[0]} alt="" />
                    </div>
                    <div className="item-info">
                      <p>{element.title.slice(0, 15)}...</p>
                      <p><strong>Category:</strong> {element.category.name}</p>
                      <p>{element.description.slice(0, 150)}...</p>
                      <p><strong>Price:</strong> {element.price} £</p>
                    </div>
                    <div className="item-elements">
                      
                      <div className="item-sub-elements">
                        <Link className="product-details-btn" to="/"><i className="pi pi-window-maximize"></i></Link>
                        <button><i className="pi pi-shopping-cart">&nbsp;</i>Add To Card</button>
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

export default Products;
