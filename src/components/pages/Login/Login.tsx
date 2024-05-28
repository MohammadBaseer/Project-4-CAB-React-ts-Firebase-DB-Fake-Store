import styles from "./Login.module.css";
import { ChangeEvent, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/Auth";
import { catchError } from "../../firebase/contexts/errorCatcher";
import { FirebaseError } from "firebase/app";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {setUser} = useContext(AuthContext);


  const [userEmail, setEmail] = useState<string>('');
  const [password, setPassowrd] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

const emailSetFunc = (e: ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value);
  console.log(userEmail)
}
const passwordSetFunc = (e: ChangeEvent<HTMLInputElement>) => {
  setPassowrd(e.target.value);
}

  const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email=====", userEmail, "password=====", password)
    try {
          if (userEmail === '') {
            alert('Enter your email, please!');
          } else if (password === '') {
            alert('Enter your password, please!');
          } else {
            const loggedIn = await signInWithEmailAndPassword(auth, userEmail, password);
    
            if (loggedIn) 
              setLoggedIn(true);
            alert('Successfully logged in!');
            setEmail('');
            setPassowrd('');
            // setLoggedInUserID(auth.currentUser?.uid);
            setUser(
             { uid: auth.currentUser!.uid,
            displayName: auth.currentUser!.displayName,
            email: auth.currentUser!.email,
            photoURL: auth.currentUser!.photoURL,   
              })
            console.log("auth.currentUser?.uid------------->", auth.currentUser?.photoURL)
            navigate("/");
          }
        } catch (error) {
          if (error instanceof FirebaseError) {
            catchError(error);
          } else {
            console.log(error);
          }
        }


  };

  // if (user) {
  //   navigate("/");
  // }
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
                <input type="email" id="email" placeholder="Enter email" name="email" onChange={emailSetFunc} value={state?.email} />
              </div>

              <div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <input type="password" placeholder="Enter password" id="password" name="password" onChange={passwordSetFunc} value={password}/>
                </div>
              </div>
              {/* <div style={{ color: "red", marginBottom: "3px" }}>
                {errorHandle === "auth/too-many-requests"
                  ? "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later"
                  : ""}
                {errorHandle === "auth/invalid-credential"
                  ? "Email or password not match"
                  : ""}
              </div> */}
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
    </>
  );
};

export default Login;
