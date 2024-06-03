import styles from "./ProductFilters.module.css";
import { ChangeEvent, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ApiDataContext } from "../../../../Context/Api_Context";
const ProductFilters = () => {
  let pickCategoryFromApi: string[] = [];

  const { getProducts, setCategoryFilter, setSearchFilter, filterDataFun, searchFilter, categoryFilter, mergeData } = useContext(ApiDataContext);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterDataFun(mergeData);
  }, [categoryFilter, searchFilter, mergeData]);

  const categoryHandel = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.currentTarget.value;
    setCategoryFilter(value);
    console.log("value", value);
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

        {/* //! -------------------------------------------------------- */}

        <div className={styles.select_container} data-placeholder="All Categories">
          <select className={styles.select} value={categoryFilter} onChange={categoryHandel}>
            <option value="">All Categories</option>

            {mergeData &&
              mergeData.map((itemCategory, index) => {
                if (!pickCategoryFromApi.includes(itemCategory.category.name)) {
                  pickCategoryFromApi.push(itemCategory.category.name);
                  return (
                    <option key={index} value={itemCategory.category.name}>
                      {itemCategory.category.name}
                    </option>
                    // <option key={index} value={itemCategory.category.id}>
                    //   {itemCategory.category.name}
                    // </option>
                  );
                }
              })}
          </select>
        </div>

        {/* //!---------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default ProductFilters;
