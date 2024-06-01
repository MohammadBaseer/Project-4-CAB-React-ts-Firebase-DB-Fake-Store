import { ReactNode, createContext, useState } from "react";
import { Product } from "../@Types/Type";

type ApiDataContextType = {
  getProducts: () => Promise<void>;
  data: Product[];
  filteredData: Product[] | null;
  categoryFilter: string | null | number;
  setCategoryFilter: (categoryFilter: string) => void;
  searchFilter: string;
  setSearchFilter: (searchFilter: string) => void;
  errorHandle: string;
  filterDataFun: (data: Product[]) => void;
};

const ApiDataContextInit = {
  getProducts: () => {
    throw new Error("context not initialed");
  },
  filterDataFun: () => {
    throw new Error("context not initialed");
  },
  data: [] as Product[],
  filteredData: [] as Product[],
  // setData: () => {
  //   throw new Error("Context Init Data Failed");
  // },
  categoryFilter: "",
  setCategoryFilter: () => {
    throw new Error("context not initialed");
  },
  searchFilter: "",
  setSearchFilter: () => {
    throw new Error("context not initialed");
  },
  errorHandle: "",
  // setErrorHandle: () => {
  //   throw new Error("context not initialed");
  // },
} as ApiDataContextType;

type childrenProps = {
  children: ReactNode;
};

export const ApiDataContext =
  createContext<ApiDataContextType>(ApiDataContextInit);

const ApiContextProvider = ({ children }: childrenProps) => {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | number>("");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [errorHandle, setErrorHandle] = useState<string>("");

  const apiUrl = `https://api.escuelajs.co/api/v1/products`; // Public API -- It has some issues with images

  const getProducts = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const dataFromApi = (await response.json()) as Product[];
      setData(dataFromApi);
    } catch (error) {
      setErrorHandle("Failed to fetch products");
      console.error("Error:", error);
    }
  };

  const filterDataFun = (data: Product[]) => {
    let filteredData = data;

    if (categoryFilter === "") {
      filteredData = data;
    }

    if (categoryFilter !== "") {
      filteredData = filteredData.filter(
        (product) => Number(product.category.id) === Number(categoryFilter)
      );
    }

    if (searchFilter) {
      filteredData = filteredData.filter((product) =>
        product.title.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    setFilteredData(filteredData);

    if (filteredData.length === 0) {
      setErrorHandle("No Product Found");
    } else {
      setErrorHandle("");
    }
  };

  return (
    <ApiDataContext.Provider
      value={{
        getProducts,
        filterDataFun,
        data,
        filteredData,
        setCategoryFilter,
        setSearchFilter,
        errorHandle,
        searchFilter,
        categoryFilter,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};

export default ApiContextProvider;
