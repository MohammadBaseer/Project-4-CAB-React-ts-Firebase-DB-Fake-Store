import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";
import NavbarHead from "./NavbarHead";

function Navbar() {
  return (
    <>
      <NavbarHead />

      <div className={styles.body_container}>
        <nav className="navbar">
          <div className="flex-box">
            <ul>
              <div className={styles.flex}>
                <li className={styles.nav_elements}>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className={styles.nav_elements}>
                  <NavLink to="products">Products</NavLink>
                </li>
                <li className={styles.nav_elements}>
                  <NavLink to="contact">Contact</NavLink>
                </li>
                <li className={styles.nav_elements}>
                  <NavLink to="/about">About us</NavLink>
                </li>
              </div>
            </ul>
          </div>
        </nav>
      </div>
      <hr className={styles.break_line} />
    </>
  );
}

export default Navbar;
