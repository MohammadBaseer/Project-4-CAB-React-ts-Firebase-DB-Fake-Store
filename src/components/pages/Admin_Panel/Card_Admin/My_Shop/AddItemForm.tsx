import styles from "./AddItemForm.module.css";
import add from "../../../../../assets/img/addAvatar.png";
import { useContext, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../../Config/Firebase_Auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UsersActionAuthContext } from "../../../../../Context/AuthAction_Context/UsersAuthContext";

const AddItemForm = ({ setDisplayToggle }) => {
  const { user } = useContext(UsersActionAuthContext);

  // UseState to get my input data
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [file, setFile] = useState<File | null | any>(null);
  const [description, setDescription] = useState("");

  const addProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("title", title);
    console.log("price", price);
    console.log("categories", categories);
    console.log("file", file);
    console.log("description", description);

    try {
      // const randomName = Date.now().toString(36) + Math.random().toString(36).substr(2);
      const randomName = (Date.now() / Date.now()) * Date.now();

      const storageRef = ref(storage, `productsPhotos/${randomName}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      const photoURLWithExtension = `${photoURL}.jpg`;

      const docRef = await addDoc(collection(db, "products"), {
        id: randomName,
        uid: user!.uid,
        title: title,
        price: price,
        description: description,
        images: [photoURLWithExtension],
        category: {
          id: randomName,
          name: categories,
        },
      });

      console.log("Product inserted:", docRef);

      setTitle("");
      setPrice("");
      setCategories("");
      setFile(null);
      setDescription("");

      setDisplayToggle(false);
    } catch (error) {
      console.error("Error during user registration:", error);
      console.log("========>", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={addProductHandler}>
          <div className={styles.row}>
            <div className={styles.col_25}>
              <label htmlFor="title">Title</label>
            </div>
            <div className={styles.col_75}>
              <input type="text" id="title" name="title" placeholder="Your title.." value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col_25}>
              <label htmlFor="price">Price</label>
            </div>
            <div className={styles.col_75}>
              <input type="number" id="price" name="price" placeholder="Your price.." value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col_25}>
              <label htmlFor="categories">Categories</label>
            </div>
            <div className={styles.col_75}>
              <select id="categories" name="categories" value={categories} onChange={(e) => setCategories(e.target.value)}>
                <option value="">Categories</option>
                <option value="electronics">Electronics</option>
                <option value="mobile">Mobile</option>
                <option value="clothes">Clothes</option>
                <option value="furniture">Furniture</option>
                <option value="test">Test</option>
                <option value="TestME">Test-1</option>
              </select>
            </div>
          </div>

          <div className={`${styles.row} ${styles.flex}`}>
            <div className={styles.col_25}>
              <label htmlFor="file" className={styles.file}>
                Photo
              </label>
            </div>
            <div className={styles.col_75}>
              <label htmlFor="file" className={styles.file}>
                <img className={styles.avatar} src={add} alt="" />
                <span>Add an Image</span>
              </label>

              <input
                type="file"
                id="file"
                name="file"
                placeholder="Your last name.."
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col_25}>
              <label htmlFor="subject">Description</label>
            </div>
            <div className={styles.col_75}>
              <textarea id="subject" name="subject" placeholder="Write Description.." style={{ height: "200px" }} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </div>
          <div className={styles.row}>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddItemForm;
