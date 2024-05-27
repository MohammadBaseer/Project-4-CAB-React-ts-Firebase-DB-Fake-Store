import styles from "./Register.module.css";
import add from "../../../assets/img/addAvatar.png";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// import { AuthContext } from "../../assets/img/addAvatar.png";

const Register = () => {
  const { userRegister, errorHandle } = useContext(AuthContext);

  const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const displayName = e.currentTarget[0].value;
    const email = e.currentTarget[1].value;
    const password = e.currentTarget[2].value;
    const file = e.currentTarget[3].files[0];

    userRegister(displayName, email, password, file);
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
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                name="email"
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
                />
              </div>

              <div>
                <label className={styles.file} htmlFor="file">
                  <img className="avatar" src={add} alt="" />
                  <span>Add an avatar</span>
                </label>
                <input style={{ display: "none" }} type="file" id="file" />
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
    </>
  );
};

export default Register;
