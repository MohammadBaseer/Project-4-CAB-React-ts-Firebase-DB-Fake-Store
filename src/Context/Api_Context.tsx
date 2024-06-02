import { ReactNode, createContext, useEffect, useState } from "react";
import { Product, ProductsType } from "../@Types/Type";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../Components/Config/Firebase_Auth";

type ApiDataContextType = {
  getProducts: () => Promise<void>;
  data: ProductsType[];
  mergeData: ProductsType[];
  filteredData: ProductsType[] | null;
  categoryFilter: string | null | number;
  setCategoryFilter: (categoryFilter: string) => void;
  searchFilter: string;
  setSearchFilter: (searchFilter: string) => void;
  errorHandle: string;
  filterDataFun: (data: ProductsType[]) => void;
};

const ApiDataContextInit = {
  getProducts: () => {
    throw new Error(" GetProductFun Error");
  },
  filterDataFun: () => {
    throw new Error("FilterFun Error");
  },
  data: [] as ProductsType[],
  mergeData: [] as ProductsType[],
  filteredData: [] as ProductsType[],
  categoryFilter: "",
  setCategoryFilter: () => {
    throw new Error("CategoryFun Error");
  },
  searchFilter: "",
  setSearchFilter: () => {
    throw new Error("Serach FilterFun Error");
  },
  errorHandle: "",
} as ApiDataContextType;

type childrenProps = {
  children: ReactNode;
};

export const ApiDataContext = createContext<ApiDataContextType>(ApiDataContextInit);
const ApiContextProvider = ({ children }: childrenProps) => {
  const [data, setData] = useState<ProductsType[]>([]);
  const [filteredData, setFilteredData] = useState<ProductsType[] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | number>("");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [errorHandle, setErrorHandle] = useState<string>("");

  ///REVIEW - ======================================= //! === Testing ==== Merge the API and Database data

  const [mergeData, setMergeData] = useState<ProductsType[]>([]);

  const [getProductsData, setGetProductsData] = useState<ProductsType[] | null>(null);

  const getProductsRealTime = () => {
    const q = query(collection(db, "products"));
    onSnapshot(q, (querySnapshot) => {
      const getProductsArray: ProductsType[] = [];
      querySnapshot.forEach((doc) => {
        const reStructureObject = {
          id: doc.data().id,
          title: doc.data().title,
          price: doc.data().price,
          description: doc.data().description,
          images: [doc.data().images.length > 0 ? doc.data().images[0] : ""], // Safely handle the case when images array is empty
          category: {
            name: doc.data().category.name,
          },
        };

        getProductsArray.push(reStructureObject as ProductsType);
      });
      // console.log("getProductsArray ===== >", getProductsArray);
      setGetProductsData(getProductsArray);
    });
  };

  ///REVIEW - ======================================= //! ===------------------------------------------------

  const apiUrl = `https://api.escuelajs.co/api/v1/products`; // Public API -- It has some issues with images

  const getProducts = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const dataFromApi = (await response.json()) as ProductsType[];
      setData(dataFromApi);
    } catch (error) {
      setErrorHandle("Failed to fetch products");
      console.error("Error:", error);
    }
  };
  //!======================== Filter Section
  const filterDataFun = (mergeData: ProductsType[]) => {
    let filteredData = mergeData;
    if (categoryFilter === "") {
      filteredData = mergeData;
    }
    if (categoryFilter !== "") {
      filteredData = filteredData.filter((product) => Number(product.category.id) === Number(categoryFilter));
    }
    if (searchFilter) {
      filteredData = filteredData.filter((product) => product.title.toLowerCase().includes(searchFilter.toLowerCase()));
    }

    setFilteredData(filteredData);

    if (filteredData.length === 0) {
      setErrorHandle("No Product Found");
    } else {
      setErrorHandle("");
    }
  };

  const mergeProducts = () => {
    if (data && getProductsData) {
      setMergeData([...data, ...getProductsData]);
    }
  };

  console.log("mergeData", mergeData);

  useEffect(() => {
    filterDataFun(mergeData);
  }, [mergeData]);

  useEffect(() => {
    getProductsRealTime();
  }, []);

  useEffect(() => {
    mergeProducts();
  }, [getProductsData, data]);

  return <ApiDataContext.Provider value={{ getProducts, filterDataFun, data, filteredData, setCategoryFilter, setSearchFilter, errorHandle, searchFilter, categoryFilter, mergeData }}>{children}</ApiDataContext.Provider>;
};

export default ApiContextProvider;
