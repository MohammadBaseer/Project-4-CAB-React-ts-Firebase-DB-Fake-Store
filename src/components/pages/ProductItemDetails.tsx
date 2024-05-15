import "primeicons/primeicons.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../@types/Types";

const ProductItemDetail = () => {
  let { id } = useParams();
  console.log('id', id)

  // console.log("ID of single page ======== >",typeof id)

// const id = Number(id)

  // const [idOfSinglePage, SetIdOfSignlePage] = useState(id);
  const [product, setProduct] = useState<Product | null>(null);
  const apiUrl = `https://api.escuelajs.co/api/v1/products/${id}`;
  const getSingleProduct = async () => {
    try {
      const response = await fetch(apiUrl);
      // console.log("response", response);
      if (!response.ok) {
        throw new Error("...something went wrong..");
      }
      const dataFromApi = (await response.json()) as Product;
      console.log('dataFromApi', dataFromApi)
      setProduct(dataFromApi);

      // console.log("dataFromApi :>> ", dataFromApi);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  console.log("product ======>", product)

  const cleanImageUrl = (imageURL:string):string => {
    console.log('imageUrl', imageURL)
    //use regex to cleant the url from the initial and final "" and []
const cleanUrl = imageURL?.replace(/[[\]]/g,'')


    return cleanUrl
  }

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
                  // src={product?.images[0] ? product?.images[0]:"https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"}
                  src={cleanImageUrl(product?.images[0]!) ? cleanImageUrl(product?.images[0]!): "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png" }
                  alt=""
                />
              </div>

              <div className="image-box col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4">
                <div className="product-info" style={{ padding: "30px" }}>
                  <h1>{product?.title}</h1>
                  <p> <strong>Category:</strong> {product?.category.name} </p>
                  <p>
                   {product?.description}
                  </p>
                  <p> <strong>Price:</strong> {product?.price} </p>
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
