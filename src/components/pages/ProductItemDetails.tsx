import "primeicons/primeicons.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../@types/Types";

const ProductItemDetail = () => {
  let { id } = useParams();

  // console.log("ID of single page ======== >",typeof id)

// const id = Number(id)

  // const [idOfSinglePage, SetIdOfSignlePage] = useState(id);
  const [data, setData] = useState<Product[] | null>(null);
  const apiUrl = `https://api.escuelajs.co/api/v1/products/${Number(id)}`;
  const getCharacters = async () => {
    try {
      const response = await fetch(apiUrl);
      // console.log("response", response);
      if (!response.ok) {
        throw new Error("...something went wrong..");
      }
      const dataFromApi = (await response.json()) as Product[];
      setData(dataFromApi);

      // console.log("dataFromApi :>> ", dataFromApi);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  console.log("data ======>", data)

  // console.log(" Single Page Data From API ====> ", typeof data)

  return (
    <div className="main-box">
      <div className="main-container ">
        <div className="product-detail-container p-container ">
          {/* {data && data.map((element) => {
                 return(<h1>{element.id}</h1> );
              })} */}
          <div className="detail-boxes">
            <div className="product-detail-box col-12 sm:col-12 md:col-11 lg:col-11 xl:col-11">

              <div className="image-box col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4">
                <img
                  src="https://dc-mkt-prod.cloud.bosch.tech/xrm/media/global/campaigns/smart_item_picking/smart-item-picking-renningen_klein4-blurry-20x9_960x432.jpg"
                  alt=""
                />
              </div>

              <div className="image-box col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4">
                <div className="product-info" style={{ padding: "30px" }}>
                  <h1>Robotic Gadgets</h1>
                  <p> <strong>Category:</strong> Electronics </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Error cumque ipsa harum aut quos quam praesentium eos? Amet
                    ea quibusdam doloribus ullam ducimus, minus itaque
                    temporibus non cupiditate sapiente sed. Lorem ipsum dolor
                    sit amet, consectetur adipisicing elit. Vel nihil explicabo
                    dolor suscipit, incidunt dicta quos dolores laborum earum
                    laboriosam vero perspiciatis delectus sapiente cupiditate
                    voluptatum dolorum non ad neque!
                  </p>
                  <p> <strong>Price:</strong> 660 </p>
                  <button> <i className="pi pi-shopping-cart">&nbsp;</i>Add To Card </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemDetail;
