import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { ProductsMergeType } from "../../../@Types/Type";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../Config/Firebase_Auth";

export default function Home() {
  const [mergeData, setMergeData] = useState<ProductsMergeType[]>([]);

  const apiUrl = `https://8c1080f56e4f4a9a.mokky.dev/products`; // Your API Endpoint

  const fetchAndMergeProducts = async () => {
    try {
      // Fetch data from the API
      const apiResponse = await fetch(apiUrl);
      if (!apiResponse.ok) {
        throw new Error("Failed to fetch from API");
      }
      const apiData = (await apiResponse.json()) as ProductsMergeType[];

      // Fetch data from Firebase Firestore (real-time data)
      const firebaseData = await new Promise<ProductsMergeType[]>(
        (resolve, reject) => {
          const q = query(collection(db, "products"));
          onSnapshot(
            q,
            (querySnapshot) => {
              const firebaseArray: ProductsMergeType[] = [];
              querySnapshot.forEach((doc) => {
                firebaseArray.push(doc.data() as ProductsMergeType);
              });
              resolve(firebaseArray);
            },
            reject
          );
        }
      );

      // Merge the data
      const mergedData = [...apiData, ...firebaseData].map((item) => ({
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

      // Set the merged data
      setMergeData(mergedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAndMergeProducts();
  }, []); // Call on mount

  // Step 1: Filter out unique categories
  const uniqueItemsByCategory = mergeData?.filter(
    (item, index, self) =>
      self.findIndex((t) => t.category.name === item.category.name) === index
  );

  // Step 2: Slice the first four unique items
  const CategoryItemSlice = uniqueItemsByCategory?.slice(0, 4);
  const itemSlice = mergeData?.slice(0, 4);
  const NewArrivalItemSlice = mergeData?.slice(5, 9);
  console.log("CategoryItemSlice", CategoryItemSlice);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Spring Collection 2025</h1>
            <p className={styles.subtitle}>
              Discover our latest products with amazing deals
            </p>
            <Link to="/products" className={styles.button}>
              Shop Now
            </Link>
          </div>
        </section>

        <section className={styles.categories}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categoryGrid}>
            {CategoryItemSlice &&
              CategoryItemSlice.map((item: any, i) => {
                return (
                  <div className={styles.category} key={i}>
                    <img
                      src={item.images}
                      className={styles.categoryImage}
                    ></img>
                    <h3>{item.category.name}</h3>
                  </div>
                );
              })}
          </div>
        </section>

        <section className={styles.featuredProducts}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <div className={styles.productGrid}>
            {itemSlice &&
              itemSlice.map((item: any, i) => {
                return (
                  <div className={styles.product} key={i}>
                    {/* <div className={styles.productImage}> */}
                    <img
                      src={item.images}
                      alt=""
                      className={styles.productImage}
                    />
                    {/* </div> */}
                    <div className={styles.productInfo}>
                      <h3>{item.title}</h3>
                      <p className={styles.productPrice}>${item.price}</p>
                      <div className={styles.productRating}>★★★★☆</div>
                      <Link to={`/products/${item.id}`}>
                        <button className={styles.addToCartButton}>
                          <i className="pi pi-window-maximize"> View Details</i>
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        <section className={styles.promoSection}>
          <div className={styles.promoContent}>
            <h2>Special Offer</h2>
            <p>
              Get 20% off on all products with code: <strong>SPRING25</strong>
            </p>
            <Link to="/shop" className={styles.button}>
              Shop Now
            </Link>
          </div>
        </section>

        <section className={styles.featuredProducts}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <div className={styles.productGrid}>
            {NewArrivalItemSlice &&
              NewArrivalItemSlice.map((item: any, i) => {
                return (
                  <div className={styles.product} key={i}>
                    {/* <div className={styles.productImage}> */}
                    <img
                      src={item.images}
                      alt=""
                      className={styles.productImage}
                    />
                    {/* </div> */}
                    <div className={styles.productInfo}>
                      <h3>{item.title}</h3>
                      <p className={styles.productPrice}>${item.price}</p>
                      <div className={styles.productRating}>★★★★☆</div>
                      <Link to={`/products/${item.id}`}>
                        <button className={styles.addToCartButton}>
                          <i className="pi pi-window-maximize"> View Details</i>
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </main>
    </div>
  );
}
