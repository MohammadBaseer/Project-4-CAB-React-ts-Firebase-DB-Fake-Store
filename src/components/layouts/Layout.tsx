import { Outlet } from "react-router-dom";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <>
    <div className="main-layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
    </>
  );
};

export default Layout;
