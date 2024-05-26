import { createContext, useState, ReactNode, useEffect } from "react";
import { Product } from "../@types/Types";

// NOTE set type for "ProductDataContext"
type apiDataContextType = {
  data: Product[] | null;
  categoryFilter: string;
  setCategoryFilter: (categoryFilter: string) => void;
  searchFilter: string;
  setSearchFilter: (searchFilter: string) => void;
  errorHandle: string;
  // getProducts: () => Promise<void>;
  getProducts: (apiUrl: string) => Promise<void>;
};
// NOTE Props Type
type ApiContextComponentProviderProps = {
  children: ReactNode;
};
// NOTE First Init Value of Context
const initContext = {
  data: [] as Product[],
  setData: () => {
    throw new Error("Context Init Data Failed");
  },
  categoryFilter: "",
  setCategoryFilter: () => {
    throw new Error("context not initialed");
  },
  searchFilter: "",
  setSearchFilter: () => {
    throw new Error("context not initialed");
  },
  errorHandle: "",
  setErrorHandle: () => {
    throw new Error("context not initialed");
  },
  // getProducts: () => Promise.resolve(),
  getProducts: () => {
    throw new Error("context not initialed");
  },
};
// REVIEW 1
export const apiDataContext = createContext<apiDataContextType>(initContext);

// REVIEW 2
export const ApiContextComponentProvider = ({
  children,
}: ApiContextComponentProviderProps) => {
  const [data, setData] = useState<Product[] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [errorHandle, setErrorHandle] = useState("");
  //const apiUrl = `https://api.escuelajs.co/api/v1/products?title=${searchFilter}&categoryId=${Number(categoryFilter)}`; //Public Api -- It have some issue with images
  //const apiUrl = "https://8c1080f56e4f4a9a.mokky.dev/products"; // My own Endpoint API

  //   NOTE Function to fetch the data from API

  const getProducts = async (apiUrl: string) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("...something went wrong..");
      }
      const dataFromApi = (await response.json()) as Product[];
      setData(dataFromApi);

      // console.log("dataFromApi", dataFromApi)
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

  return (
    <apiDataContext.Provider
      value={{
        getProducts,
        data,
        searchFilter,
        categoryFilter,
        errorHandle,
        setSearchFilter,
        setCategoryFilter,
      }}
    >
      {children}
    </apiDataContext.Provider>
  );
};
