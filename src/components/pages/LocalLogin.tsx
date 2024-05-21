import { ChangeEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LocalLogin = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);
  const userInfo = {
    user: "Baseer",
    email: "admin@admin.com",
    password: "123",
  };

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  //
  const handelChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handelForm = (e: any) => {
    e.preventDefault();
    console.log(loginDetails);
    if (
      userInfo.email === loginDetails.email &&
      userInfo.password === loginDetails.password
    ) {
      setUser({
        user: "Baseer",
        email: "admin@admin.com",
      });

      navigate("/products");
    } else {
      console.log("Wrong Input =======>");
    }
  };

  return (
    <>
      <div className="main-box">
        <div className="login-layout">
          <div className="reg-contain">
            <form action="" onSubmit={handelForm}>
              <div>
                <h1 className="reg-head">Local Users</h1>
                <hr />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handelChanges}
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
                    onChange={handelChanges}
                  />
                </div>
              </div>
              <div>
                Not a member yet? <Link to="/register">Sign up.</Link>
                <br />
                Do you Have an<Link to="/login"> Account</Link> ?
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalLogin;
