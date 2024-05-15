import { Product } from "../@types/Types";
import { useEffect, useState } from "react";
import ProductItems from "./ProductItems";


const Products = () => {

  const [data, setData] = useState<Product[] | null>(null);
  const apiUrl = "https://api.escuelajs.co/api/v1/products";
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
          <div className="p-box col-12 sm:col-12 md:col-2"></div>

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
