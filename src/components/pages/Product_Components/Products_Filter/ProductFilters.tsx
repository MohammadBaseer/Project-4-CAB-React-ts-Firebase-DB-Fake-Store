import styles from "./ProductFilters.module.css";
import { ChangeEvent, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ApiDataContext } from "../../../../Context/Api_Context";

const ProductFilters = () => {
  let pickCategoryFromApi: string[] = [];

  const { getProducts, data, mergeData, setCategoryFilter, setSearchFilter, filterDataFun, searchFilter, categoryFilter } = useContext(ApiDataContext);

  console.log("data", data);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterDataFun(mergeData);
  }, [categoryFilter, searchFilter, data, mergeData]);

  const categoryHandel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const value = e.currentTarget.value;
    setCategoryFilter(value);
  };

  //!SECTION

  return (
    <div className={`${styles.p_box} col-12 sm:col-12 md:col-2`}>
      <div>
        <div className="field">
          <input
            type="text"
            className={` ${styles.search} text-base text-color surface-overlay border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full`}
            placeholder="Search"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchFilter(e.target.value);
              getProducts();
            }}
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
        {mergeData &&
          mergeData.map((itemCategory, index) => {
            // console.log("itemCategory", itemCategory);
            if (!pickCategoryFromApi.includes(itemCategory.category.name)) {
              pickCategoryFromApi.push(itemCategory.category.name);
              return (
                <NavLink to="#" key={index}>
                  <button className={styles.filter_button} value={itemCategory.category.id} onClick={categoryHandel}>
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
