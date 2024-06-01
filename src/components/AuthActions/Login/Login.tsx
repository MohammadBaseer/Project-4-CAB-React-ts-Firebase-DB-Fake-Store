import styles from "./Login.module.css";
import { ChangeEvent, useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/Firebase_Auth";

import { UsersActionAuthContext } from "../../../Context/AuthAction_Context/UsersAuthContext";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { user, setUser } = useContext(UsersActionAuthContext);

  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const emailSetFunc = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(userEmail);
  };
  const passwordSetFunc = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userEmail === "" || password === "") {
      toast.error("The input felid should not be empty.");
    } else {
      try {
        if (userEmail === "") {
          alert("Enter your email, please!");
        } else if (password === "") {
          alert("Enter your password, please!");
        } else {
          const loggedIn = await signInWithEmailAndPassword(
            auth,
            userEmail,
            password
          );
          if (loggedIn) setLoggedIn(true);
          setEmail("");
          setPassword("");
          setUser({
            uid: auth.currentUser!.uid,
            displayName: auth.currentUser!.displayName,
            email: auth.currentUser!.email,
            photoURL: auth.currentUser!.photoURL,
          });
          console.log(
            "auth.currentUser?.uid------------->",
            auth.currentUser?.photoURL
          );
          navigate("/");
        }
      } catch (error) {
        if (error?.code === "auth/invalid-credential") {
          toast.error(
            "Either email or password is incorrect. Please try again."
          );
          setUser(null);
        } else {
          console.log(error);
        }
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
        <div>
          <div className={styles.reg_contain}>
            <form action="" onSubmit={handelForm}>
              <div>
                <h1 className={styles.reg_head}>Login</h1>
                <hr />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={emailSetFunc}
                  value={state?.email}
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
                    onChange={passwordSetFunc}
                    value={password}
                  />
                </div>
              </div>
              <div>
                Not a member yet? <Link to="/register">Sign up.</Link>
              </div>
              <button className={styles.form_btn} type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Login;
