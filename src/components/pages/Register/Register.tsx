import styles from "./Register.module.css";
import add from "../../../assets/img/addAvatar.png";
import { SetStateAction, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase/Auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

// import { AuthContext } from "../../assets/img/addAvatar.png";

const Register = () => {
  const { userRegister, errorHandle } = useContext(AuthContext);
  const navigateTo = useNavigate()
  const [displayName, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassport] = useState<string>("");
  const [file, setFile] = useState<string | null | undefined | any>("");

  // const userRegister = async(displayName:string, email:string, password:string, file:any)=>{
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  //     console.log("user ========> ", user);

  // const storageRef = ref(storage, displayName);
  //       const uploadTask = uploadBytesResumable(storageRef, file);

  //             uploadTask.on((error: any) => {
  //         // setErrorHandle(error);
  //         console.log("error=1", error)
  //       },

  //       () =>  {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //           await updateProfile(userCredential.user, {
  //             displayName,
  //             photoURL: downloadURL,
  //           });
  //           await setDoc(doc(db, "users", userCredential.user.uid), {
  //             id: userCredential.user.uid,
  //             displayName,
  //             email,
  //             photoURL: downloadURL,
  //           });
  //           // End
  //           await setDoc(doc(db, "userChats", userCredential.user.uid), {});
  //         });
  //       }
  //     );
  //     console.log("User registration success");

  //   }catch (error: any) {
  //      const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log("errorCode", errorCode)
  //     console.log("errorMessage", errorMessage)

  //   }
  // }

  const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("name", name)
    // console.log("email", email)
    // console.log("password", password)
    // console.log("file", file)

    await userRegister(displayName, email, password, file);
    console.log("ypou will see this console log only when the registration of the user is completed")
    navigateTo("/login", { state: { userEmail: email } })

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

            <div className={styles.error}>
              {errorHandle === "auth/weak-password"
                ? "Password should be at least 6 characters"
                : ""}

              {errorHandle === "auth/email-already-in-use"
                ? "You have already an account"
                : ""}
            </div>
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
