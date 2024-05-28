import styles from "./ProductFilters.module.css";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Product } from "../../@types/Types";
import { apiDataContext } from "../../context/ApiContext";

const ProductFilters = () => {
  let option: string[] = [];

  const { setCategoryFilter, setSearchFilter, data, getProducts } =
    useContext(apiDataContext);

  const apiUrl = `https://api.escuelajs.co/api/v1/products`; //Public Api -- It have some issue with images

  // const { setCategoryFilter, setSearchFilter } = useContext(apiDataContext)

  // const [data, setData] = useState<Product[] | null>(null);
  // // const apiUrl = "https://8c1080f56e4f4a9a.mokky.dev/products"; // My own Endpoint API
  // const getCategory = async () => {
  //   try {
  //     const response = await fetch(apiUrl);
  //     if (!response.ok) {
  //       throw new Error("...something went wrong..");
  //     }
  //     const dataFromApi = (await response.json()) as Product[];
  //     setData(dataFromApi);
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };
  // const filteredData = data?.filter((product) => {
  //   return product.category.name === "Electronics"
  // })
  // console.log('filteredData', filteredData)
  useEffect(() => {
    getProducts(apiUrl);
    // getCategory()
  }, [apiUrl]);

  const categoryHandel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const value = e.currentTarget.value;
    setCategoryFilter(value);
  };

  return (
    <div className={`${styles.p_box} col-12 sm:col-12 md:col-2`}>
      <div>
        <div className="field">
          <input
            type="text"
            className={` ${styles.search} text-base text-color surface-overlay border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full`}
            placeholder="Search"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchFilter(e.target.value)
            }
          />
        </div>
      </div>
      <div className={styles.filter_container}>
        <NavLink to="#">
          <button className={`${styles.filter_button} ${styles.filter_head}`} value="">
            <i className="pi pi-sort-amount-down">&nbsp;</i>Categories
          </button>
        </NavLink>
        <NavLink to="#">
          <button className={styles.filter_button} value="" onClick={categoryHandel}>
            All
          </button>
        </NavLink>
        {data &&
          data.map((itemCategory) => {
            if (!option.includes(itemCategory.category.name)) {
              option.push(itemCategory.category.name);
              return (
                <NavLink to="#" key={itemCategory.category.id}>
                  <button className={styles.filter_button} value={itemCategory.category.id} onClick={categoryHandel} >
                    {itemCategory.category.name}
                  </button>
                </NavLink>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default ProductFilters;
