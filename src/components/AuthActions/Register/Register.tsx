import styles from "./Register.module.css";
import add from "../../../assets/img/addAvatar.png";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { errorHandler } from "../../../Context/Error_Handler/errorCatcher";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../../Config/Firebase_Auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UsersActionAuthContext } from "../../../Context/AuthAction_Context/UsersAuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { userRegister, test } = useContext(UsersActionAuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassport] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   try {
    //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //     const user = userCredential.user;

    //     const storageRef = ref(storage, `profilePhotos/${user.uid}`);
    //     await uploadBytes(storageRef, file);
    //     const photoURL = await getDownloadURL(storageRef);

    //     await updateProfile(user, {
    //       displayName: name,
    //       photoURL: photoURL,
    //     });
    //     console.log('User registered successfully with profile photo:', user);
    //     navigate("/")
    //  await setUser(null);

    //   } catch (error) {
    //     console.error('Error during user registration:', error);
    //     errorHandler(error)
    //   }

    userRegister(name, email, password, file);
    // test("testing context");
  };

  return (
    <>
      <div className={styles.main_box}>
        <div className={styles.reg_contain}>
          <form action="" onSubmit={handelForm}>
            <div>
              <h1 className={styles.reg_head}>SignUp</h1>
              <hr />
            </div>

            <div>
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter User"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    setPassport(e.target.value);
                  }}
                />
              </div>

              <div>
                <label className={styles.file} htmlFor="file">
                  <img className="avatar" src={add} alt="" />
                  <span>Add an avatar</span>
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            {/* <div className={styles.error}>
              {errorHandle === "auth/weak-password"
                ? "Password should be at least 6 characters"
                : ""}

              {errorHandle === "auth/email-already-in-use"
                ? "You have already an account"
                : ""}
            </div> */}
            <div>
              Do you have already an account? <Link to="/login">Login</Link>
            </div>
            <button className={styles.form_btn} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
