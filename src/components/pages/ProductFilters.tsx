import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Product } from "../@types/Types";
type  categoryPropsType ={
  setCategoryFilter: Dispatch<React.SetStateAction<string>>
 setSearchFilter: Dispatch<React.SetStateAction<string>>
}

const ProductFilters = ({setSearchFilter, setCategoryFilter}: categoryPropsType) => {

  let option:string[] = [];
 

  const [data, setData] = useState<Product[] | null>(null);
const apiUrl = `https://api.escuelajs.co/api/v1/products`; //Public Api -- It have some issue with images
  // const apiUrl = "https://8c1080f56e4f4a9a.mokky.dev/products"; // My own Endpoint API
  const getCategory = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("...something went wrong..");
      }
      const dataFromApi = (await response.json()) as Product[];
      setData(dataFromApi);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);



const categoryHandel = (e: React.MouseEvent<HTMLButtonElement>): void => {
  const value = e.currentTarget.value;
  setCategoryFilter(value);
}


  return (
    <div className="p-box col-12 sm:col-12 md:col-2">
    <div className="search">
      <div className="field">
        <input
          type="text"
          className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          placeholder="Search"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchFilter(e.target.value)
          }
        />
      </div>
    </div>
    <div className="filter-container">
      <NavLink to="#">
        <button className="filter-button filter-head" value="">
          <i className="pi pi-sort-amount-down" >&nbsp;</i>Categories
        </button>
      </NavLink>
      <NavLink to="#"><button className="filter-button" value="" onClick={categoryHandel}>All</button></NavLink>
      {data &&
        data.map((itemCategory) => {
          if (!option.includes(itemCategory.category.name)) {
            option.push(itemCategory.category.name);
            return (
              <NavLink to="#" key={itemCategory.category.id}>
                <button className="filter-button" value={itemCategory.category.id} onClick={categoryHandel} >
                  {itemCategory.category.name}
                </button>
              </NavLink>
            );
          }
          return null;
        })}
    </div>
  </div>
  )
}

export default ProductFilters
