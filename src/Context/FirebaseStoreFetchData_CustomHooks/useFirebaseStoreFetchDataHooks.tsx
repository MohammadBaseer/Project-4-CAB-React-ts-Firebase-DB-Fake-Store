import { useEffect, useState } from "react";
import { CardItemTypes } from "../../@Types/Type";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../components/Config/Firebase_Auth";

const useFirebaseStoreFetchDataHooks = () => {
  const [productsData, setProductsData] = useState<CardItemTypes[] | boolean | null | any>(null);

  useEffect(() => {
    const getProductsRealTime = async () => {
      try {
        const q = query(collection(db, "cart"));
        onSnapshot(q, (querySnapshot) => {
          const productsArray: CardItemTypes[] = [];
          querySnapshot.forEach((doc) => {
            productsArray.push(doc.data() as CardItemTypes);
          });
          setProductsData(productsArray);
        });
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    getProductsRealTime();
  }, []);

  return { productsData };
};

export default useFirebaseStoreFetchDataHooks;
