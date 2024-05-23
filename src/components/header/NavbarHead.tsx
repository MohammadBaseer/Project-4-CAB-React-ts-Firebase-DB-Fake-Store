import "primeicons/primeicons.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const NavbarHead = () => {
  const { logOut, userSession } = useContext(AuthContext);

  const signOut = () => {
    logOut();
  }

  return (
    <>
      <div className="navbar-head">
        <div className="main-container">
          <div className="nav-elements">
            <span className="">
              {userSession ? (
                <Link to="#" onClick={signOut}>
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
