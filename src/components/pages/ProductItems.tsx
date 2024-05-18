import "primeicons/primeicons.css";
import { Link } from "react-router-dom";

type  itemPropsType ={
  id: number,
image: string,
 title: string, 
 category: string,  
 description: string, 
 price: number}


const cleanImageUrl = (imageURL: string): string => {
  const alternativeImage =
    "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";
  // console.log("imageUrl", imageURL);
  const cleanUrl = imageURL?.replace(/^\["|"\]$/g, ""); // remote [" and "] from the url
  // return cleanUrl
  if (/\.[a-z]{3,4}$/i.test(cleanUrl)) { // if the url have no file Extension
    return cleanUrl; 
  } else {
    return alternativeImage; 
  }
};

const ProductItems = ({id, image, title, category, description, price }: itemPropsType) => {
  return (
    <div className="p-box product-elements col-11 sm:col-5 md:col-4 lg:col-4 xl:col-3">
                    {/*  */}
                    <div className="image-slider">
                      {/* Start */}

                      <img className="p-image" 
                      // src={image}
                      src={cleanImageUrl(image) ? cleanImageUrl(image): "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png" }
                      alt="" />

                      {/* End */}
                    </div>
                    {/*  */}

                    <div className="item-info">
                      <p>{title}...</p>
                      <p> <strong>Category:</strong> {category} </p>
                      <p>{description}...</p>
                      <p><strong>Price:</strong> {price} £ </p>
                    </div>
                    <div className="item-elements">
                      <div className="item-sub-elements">
                        <Link className="product-details-btn" to={`${id}`}>
                          <i className="pi pi-window-maximize"></i>
                        </Link>
                        <button> <i className="pi pi-shopping-cart" >&nbsp;</i>Add To Card </button>
                      </div>
                    </div>
                   
                  </div>
  )
}

export default ProductItems


