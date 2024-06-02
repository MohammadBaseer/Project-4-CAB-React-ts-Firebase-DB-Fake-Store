import "primeicons/primeicons.css";
import { signOut } from "firebase/auth";
import styles from "./NavbarHead.module.css";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { auth } from "../../Config/Firebase_Auth";
import { UsersActionAuthContext } from "../../../Context/AuthAction_Context/UsersAuthContext";
import useFirebaseStoreFetchDataHooks from "../../../Context/FirebaseStoreFetchData_CustomHooks/useFirebaseStoreFetchDataHooks";

const NavbarHead = () => {
  const { user, setUser } = useContext(UsersActionAuthContext);

  //! in every location change the toggle state
  const location = useLocation();
  //!---------------------------------------------------------------------------------

  //! Called the Custom Hook To fetch data from Firebase Store DB ==== to count the Cart Item
  const { productsData } = useFirebaseStoreFetchDataHooks();
  const matchingDataLength = productsData
    ? productsData.filter((e) => e.uid === user?.uid).length
    : 0;
  //!---------------------------------------------------------------------------------

  //! use State and Function for user Drop Down menu toggle on off
  const [profileNavbarToggle, setProfileNavbarToggle] =
    useState<boolean>(false);

  const toggle = () => {
    if (profileNavbarToggle) {
      setProfileNavbarToggle(false);
    } else {
      setProfileNavbarToggle(true);
    }
  };
  //!---------------------------------------------------------------------------------

  //! Logout Auth to Logout the Current User
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
  //!---------------------------------------------------------------------------------

  //! in every location change the toggle state
  useEffect(() => {
    setProfileNavbarToggle(false);
  }, [location]);
  //!---------------------------------------------------------------------------------

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
                      <span>
                        {" "}
                        {matchingDataLength === 0 ? "" : matchingDataLength}
                      </span>
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
