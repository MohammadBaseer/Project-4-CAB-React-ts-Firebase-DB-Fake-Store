import  {createContext, useState, ReactNode, Dispatch } from "react";
import { Product } from "../@types/Types";


// NOTE set type for "ProductDataContext"
type productDataContextType ={
    data: Product[] | null;
    categoryFilter: string;
    setCategoryFilter: Dispatch<React.SetStateAction<string>>;
    searchFilter: string;
    setSearchFilter: Dispatch<React.SetStateAction<string>>;
    errorHandle: string;
    getProducts: () => Promise<void>;


}
// NOTE Props Type
type ProductsContextComponentType = {
    children: ReactNode;
}
// NOTE First Init Value of Context
const initContext = {
    data: [] as Product[],
    setData: () =>{throw new Error ("Context Init Data Failed")},
    categoryFilter: "",
    setCategoryFilter: () => {throw new Error("context not initialed");},
    searchFilter: "",
    setSearchFilter: () => {throw new Error("context not initialed");},
    errorHandle: "",
    setErrorHandle: () => {throw new Error("context not initialed");},
    getProducts: () => Promise.resolve(),
}
// REVIEW 1
export const ProductsDataContext = createContext<productDataContextType>(initContext);

// REVIEW 2
export const ProductsContextComponent = ({children}:ProductsContextComponentType) => {
    const [data, setData] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [errorHandle, setErrorHandle] = useState("");
  const apiUrl = `https://api.escuelajs.co/api/v1/products?title=${searchFilter}&categoryId=${Number(categoryFilter)}`; //Public Api -- It have some issue with images
  // const apiUrl = "https://8c1080f56e4f4a9a.mokky.dev/products"; // My own Endpoint API

//   NOTE Function to fetch the data from API
  const getProducts = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("...something went wrong..");
      }
      const dataFromApi = (await response.json()) as Product[];
      setData(dataFromApi);
      if (dataFromApi.length === 0) {
        setErrorHandle("No Product Found");
      } else {
        setErrorHandle("");
      }
    } catch (error) {
      console.log("error :>> ", error);
      // console.log("===========>==========>",typeof error)
    }
  };

return(
<ProductsDataContext.Provider value={{getProducts, data, searchFilter, categoryFilter, errorHandle, setSearchFilter, setCategoryFilter  }}>
{children}
</ProductsDataContext.Provider>
)

}