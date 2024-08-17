import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductsMergeType } from "../@Types/Type";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../components/Config/Firebase_Auth";

type ApiDataContextType = {
  getProducts: () => Promise<void>;
  // data: ProductsMergeType[];
  data: ProductsMergeType[];
  mergeData: ProductsMergeType[];
  filteredData: ProductsMergeType[] | null;
  categoryFilter: string | number;
  setCategoryFilter: (categoryFilter: string) => void;
  searchFilter: string;
  setSearchFilter: (searchFilter: string) => void;
  errorHandle: string;
  filterDataFun: (data: ProductsMergeType[]) => void;
};

const ApiDataContextInit = {
  getProducts: () => {
    throw new Error(" GetProductFun Error");
  },
  filterDataFun: () => {
    throw new Error("FilterFun Error");
  },
  data: [] as ProductsMergeType[],
  mergeData: [] as ProductsMergeType[],
  filteredData: [] as ProductsMergeType[],
  categoryFilter: "",
  setCategoryFilter: () => {
    throw new Error("CategoryFun Error");
  },
  searchFilter: "",
  setSearchFilter: () => {
    throw new Error("Search FilterFun Error");
  },
  errorHandle: "",
} as ApiDataContextType;

type childrenProps = {
  children: ReactNode;
};

export const ApiDataContext = createContext<ApiDataContextType>(ApiDataContextInit);

const ApiContextProvider = ({ children }: childrenProps) => {
  const [data, setData] = useState<ProductsMergeType[]>([]);
  const [filteredData, setFilteredData] = useState<ProductsMergeType[] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | number>("");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [errorHandle, setErrorHandle] = useState<string>("");
  const [mergeData, setMergeData] = useState<ProductsMergeType[]>([]);
  const [getProductsData, setGetProductsData] = useState<ProductsMergeType[] | null>(null);

  //! This si the Fetch Function to get the data from Firebase Store Database
  const getProductsRealTime = () => {
    const q = query(collection(db, "products"));
    onSnapshot(q, (querySnapshot) => {
      const getProductsArray: ProductsMergeType[] = [];
      querySnapshot.forEach((doc) => {
        getProductsArray.push(doc.data() as ProductsMergeType);
      });
      setGetProductsData(getProductsArray);
    });
  };
  //! -------------------------------------------------------------------------

  //! Api Fetch function
  const apiUrl = `https://8c1080f56e4f4a9a.mokky.dev/products`; // My own EndPoint
  // const apiUrl = `https://api.escuelajs.co/api/v1/products`; // Public API -- It has some issues with images
  const getProducts = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const dataFromApi = (await response.json()) as ProductsMergeType[];
      // const reStructuredProductAPI: ProductsMergeType[] = [];
      setData(dataFromApi);
    } catch (error) {
      setErrorHandle("Failed to fetch products");
      console.error("Error:", error);
    }
  };
  //! -------------------------------------------------------------------------

  //! This is the Filter Function
  const filterDataFun = (mergeData: ProductsMergeType[]) => {
    let filteredData = mergeData;
    if (categoryFilter === "") {
      filteredData = mergeData;
    }
    if (categoryFilter !== "") {
      // filteredData = filteredData.filter((product) => Number(product.category.id) === Number(categoryFilter));
      filteredData = filteredData.filter((product) => product.category.name === categoryFilter);
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
  //! -------------------------------------------------------------------------

  //! Function to Merge the API and Firebase Store Database data into Single State
  const mergeProducts = () => {
    if (data && getProductsData) {
      const dataArray = [...data, ...getProductsData];
      const mergedData1 = dataArray.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        images: item.images,
        category: {
          id: item.category.id,
          name: item.category.name,
        },
      }));
      setMergeData(mergedData1);
    }
  };
  //! -------------------------------------------------------------------------

  useEffect(() => {
    filterDataFun(mergeData);
  }, [mergeData, categoryFilter]);

  useEffect(() => {
    getProductsRealTime();
  }, []);

  useEffect(() => {
    mergeProducts();
  }, [getProductsData, data]);

  return <ApiDataContext.Provider value={{ getProducts, filterDataFun, data, filteredData, setCategoryFilter, setSearchFilter, errorHandle, searchFilter, categoryFilter, mergeData }}>{children}</ApiDataContext.Provider>;
};

export default ApiContextProvider;
