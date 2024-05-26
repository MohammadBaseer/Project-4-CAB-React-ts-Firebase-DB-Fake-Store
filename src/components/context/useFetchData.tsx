//!SECTION Thi is the Custom Hook to Fetch the API Data

import { useEffect, useState } from "react";

type HookReturn<T> = {
  data: T | null;
  categoryFilter: string;
  searchFilter: string;
  errorHandle: string;
  setCategoryFilter: (categoryFilter: string) => void;
  setSearchFilter: (searchFilter: string) => void;
};

function useFetchData<T>(apiUrl: string): HookReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [errorHandle, setErrorHandle] = useState<string>("");

  //   NOTE Function to fetch the data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("...something went wrong..");
        }
        const dataFromApi = (await response.json()) as T;
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
    fetchData();
  }, [apiUrl]);

  return {
    data,
    setCategoryFilter,
    setSearchFilter,
    categoryFilter,
    searchFilter,
    errorHandle,
  };
}

export default useFetchData;
