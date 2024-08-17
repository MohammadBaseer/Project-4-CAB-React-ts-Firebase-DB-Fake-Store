import styles from "./Register.module.css";
import add from "../../../assets/img/addAvatar.png";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UsersActionAuthContext } from "../../../Context/AuthAction_Context/UsersAuthContext";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { userRegister, user, errorHandle } = useContext(UsersActionAuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassport] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    ///ANCHOR - Error Handler Set

    if (name === "" || email === "" || password === "") {
      toast.error("The input felid should not be empty.");
    } else if (file === null) {
      toast.error("Please select a avatar");
    } else {
      userRegister(name, email, password, file);
      if (errorHandle === "auth/email-already-in-use") {
        toast.error("The entered email already exists.");
      } else if (errorHandle === "auth/weak-password") {
        toast.error("Password should be at least 6 characters.");
      } else if (errorHandle === "auth/invalid-email") {
        toast.error("Please use a valid email.");
      }
    }
  };

  if (user) {
    // navigate("/");|
    //TODO IF you have the time, it would be nice that you try that the Navigate takes you to the current location of the user (so if the user type "/login" in the url when they are in "/products", Navigate takes you to "/products")
    return <Navigate to="/" />;
  }
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
              {errorHandle === "auth/weak-password" ? "Password should be at least 6 characters" : ""}

              {errorHandle === "auth/email-already-in-use" ? "You have already an account" : ""}
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
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Register;
