import styles from "./Login.module.css"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { userLogin, errorHandle } = useContext(AuthContext);

  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    userLogin(userEmail, userPassword);

    navigate("/");
  };

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
              <div style={{ color: "red", marginBottom: "3px" }}>
                {errorHandle === "auth/too-many-requests"
                  ? "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later"
                  : ""}
                {errorHandle === "auth/invalid-credential"
                  ? "Email or password not match"
                  : ""}
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
    </>
  );
};

export default Login;
