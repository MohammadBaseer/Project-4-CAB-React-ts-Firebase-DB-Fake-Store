import "primeicons/primeicons.css";
import styles from './NavbarHead.module.css';

import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatRoomSectionToggle,} from "../../context/chatContext/ChatRoomSectionsContext";



const NavbarHead = () => {
const location = useLocation();


//ANCHOR -
const { logOut, user } = useContext(AuthContext);


// console.log("photo URL ======", user.photoURL !== undefined ? user.photoURL : "")


const { profileNavbarToggle, setProfileNavbarToggle } = useContext(
ChatRoomSectionToggle
);

const toggle = () => {
if (profileNavbarToggle) {
setProfileNavbarToggle(false);
} else {
setProfileNavbarToggle(true);
}
};

const signOut = () => {
logOut();
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
      <p>{user.name}</p>
    </div>

    <div className={styles.user_tab_navbar_element}>
      <span className="pi pi-user">
        <Link to="/register"> My Profile</Link>
      </span>
    </div>
    <div className={styles.user_tab_navbar_element}>
      <span className="pi pi-comment">
        <Link to="/chat"> Messages</Link>
      </span>
    </div>
    <div className={styles.user_tab_navbar_element}>
      <span className="pi pi-cog">
        <Link to="/register"> Settings</Link>
      </span>
    </div>
    <div className={styles.user_tab_navbar_element}>
      <span className="pi pi-sign-out">
        <Link to="#" onClick={signOut}>
          {" "}
          Logout
        </Link>
      </span>
    </div>
  </div>
</div>
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
