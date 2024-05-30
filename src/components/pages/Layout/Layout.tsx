import { UsersActionAuthContextProvider } from "../../../Context/AuthAction_Context/UsersAuthContext";
import Navbar from "../Navbar/Navbar";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className={styles.main_layout}>
        <UsersActionAuthContextProvider>
          <Navbar />
          <Outlet />
          {/* <Footer /> */}
        </UsersActionAuthContextProvider>
      </div>
    </>
  );
};

export default Layout;
