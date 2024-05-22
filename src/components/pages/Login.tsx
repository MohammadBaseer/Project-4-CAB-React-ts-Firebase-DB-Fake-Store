import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/Auth";

const Login = () => {
  const [errorHandle, setErrorHandle] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const navigate = useNavigate();

  const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log("=========================>", user);
        navigate("/chat");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorHandle(errorCode);
      });
  };

  return (
    <>
      <div className="main-box">
        <div className="login-layout">
          <div className="reg-contain">
            <form action="" onSubmit={handelForm}>
              <div>
                <h1 className="reg-head">Login</h1>
                <hr />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserEmail(e.target.value);
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div style={{color: "red", marginBottom: "3px"}}>
            {errorHandle === "auth/too-many-requests" ? "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later" : "" }
            {errorHandle === "auth/invalid-credential" ? "Email or password not match" : "" }
            </div>
              <div>
                Do you have a Local <Link to="/local-Login">Account</Link>?
              </div>
              <div>
                Not a member yet? <Link to="/register">Sign up.</Link>
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
