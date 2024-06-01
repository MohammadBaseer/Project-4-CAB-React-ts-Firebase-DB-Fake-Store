import "primeicons/primeicons.css";
import { signOut } from "firebase/auth";
import styles from "./NavbarHead.module.css";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { auth } from "../../Config/Firebase_Auth";
import { UsersActionAuthContext } from "../../../Context/AuthAction_Context/UsersAuthContext";

const NavbarHead = () => {
  const location = useLocation();
  const { user, setUser } = useContext(UsersActionAuthContext);

  const [profileNavbarToggle, setProfileNavbarToggle] =
    useState<boolean>(false);
  const toggle = () => {
    if (profileNavbarToggle) {
      setProfileNavbarToggle(false);
    } else {
      setProfileNavbarToggle(true);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log(" Sign-out successful.");
      })
      .catch((error) => {
        console.log("Logout", error);
      });
  };

  useEffect(() => {
    setProfileNavbarToggle(false);
  }, [location]);

  return (
    <>
      <div className={styles.navbar_head}>
        <div className={styles.body_container}>
          <div className={styles.nav_elements}>
            {user ? (
              <>
                <p>
                  <Link to="/cart">
                    <i className="pi pi-shopping-cart">
                      <span> 3</span>
                    </i>
                  </Link>
                </p>

                <div className={styles.user_tab_navbar}>
                  <div className={styles.user_tab_navbar_photo}>
                    <img
                      className={styles.user_photo}
                      src={user.photoURL !== undefined ? user.photoURL : ""}
                      alt=""
                      onClick={toggle}
                    />
                  </div>
                  <div
                    className={styles.user_tab_navbar_element_box}
                    style={
                      profileNavbarToggle === true
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <div className={styles.user_tab_navbar_element}>
                      <img
                        className={styles.user_photo}
                        src={user.photoURL !== undefined ? user.photoURL : ""}
                        alt=""
                        onClick={toggle}
                      />
                      <p>{user.displayName}</p>
                    </div>

                    <div className={styles.user_tab_navbar_element}>
                      <span className="pi pi-user">
                        <Link to="/register"> My Profile</Link>
                      </span>
                    </div>
                    <div className={styles.user_tab_navbar_element}>
                      <Link to="/chat">
                        {" "}
                        <span className="pi pi-comment"> Messages</span>{" "}
                      </Link>
                    </div>
                    <div className={styles.user_tab_navbar_element}>
                      <span className="pi pi-cog">
                        <Link to="/register"> Settings</Link>
                      </span>
                    </div>
                    <div className={styles.user_tab_navbar_element}>
                      <Link to="#" onClick={logOut}>
                        <span className="pi pi-sign-out"> Logout</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="">
                  <Link to="/login">Login</Link>
                  &nbsp;/&nbsp;
                  <Link to="/register">Register</Link>
                  &nbsp;
                  <span
                    className="pi pi-sign-in"
                    style={{ fontSize: "0.8rem" }}
                  ></span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarHead;
