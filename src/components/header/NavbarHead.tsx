import "primeicons/primeicons.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/Auth";

const NavbarHead = () => {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    // Local Logout/Set null
    setUser(null);

    // Firebase User Auth LogOut
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="navbar-head">
        <div className="main-container">
          <div className="nav-elements">
            <span className="">
              {user ? (
                <Link to="#" onClick={logout}>
                  Logout
                </Link>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  &nbsp;/&nbsp;
                  <Link to="/register">Register</Link>
                </>
              )}
              &nbsp;
              <span
                className="pi pi-sign-in"
                style={{ fontSize: "0.8rem" }}
              ></span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarHead;
