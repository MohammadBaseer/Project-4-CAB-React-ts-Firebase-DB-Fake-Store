import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/Auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();

  const [errorHandle, setErrorHandle] = useState<string>("");

  const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // const userImage = e.target[3].value;

    // Auth user registration
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Auth user registration
        const user = userCredential.user;
        //  End

        // Add a new document in collection "users" to the firestore
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          displayName,
          email,
          password,
        });
        //  End

        console.log("stored");
        // Redirect To --->
        // navigate("/login");
        // End
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
        <div className="reg-contain">
          <form action="" onSubmit={handelForm}>
            <div>
              <h1 className="reg-head">SignUp</h1>
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
              {/* <div>
              <label htmlFor="password1">Repeat Password:</label>
              <input type="password" placeholder="Repeat password"
                id="password1"
                name="password1"
              />
            </div> */}
            </div>
            <div style={{ color: "red", marginBottom: "3px" }}>
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
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
