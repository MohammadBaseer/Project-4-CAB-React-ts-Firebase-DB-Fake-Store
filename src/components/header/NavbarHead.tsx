import "primeicons/primeicons.css";
import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatRoomSectionToggle, UsersDataContext } from "../context/chatContext/ChatRoomSectionsContext";

const NavbarHead = () => {
  const location = useLocation();

  const { users } = useContext(UsersDataContext);
  const { logOut, user } = useContext(AuthContext);
  const { profileNavbarToggle, setProfileNavbarToggle } = useContext(ChatRoomSectionToggle);

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
      <div className="navbar-head">
        <div className="main-container">
          <div className="nav-elements">
            {user ? (
              <div className="user-tab-navbar">
                <div className="user-tab-navbar-photo">
                  <img
                    className="user-photo"
                    src={""}
                    alt=""
                    onClick={toggle}
                  />
                </div>
                <div
                  className="user-tab-navbar-element-box"
                  style={
                    profileNavbarToggle === true
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <div className="user-tab-navbar-element">
                  <img
                    className="user-photo"
                    src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    alt=""
                    onClick={toggle}
                  />
                  <p>{user.name}</p>
                </div>

                  <div className="user-tab-navbar-element">
                    <span className="pi pi-user">
                      <Link to="/register"> My Profile</Link>
                    </span>
                  </div>
                  <div className="user-tab-navbar-element">
                    <span className="pi pi-comment">
                      <Link to="/chat"> Messages</Link>
                    </span>
                  </div>
                  <div className="user-tab-navbar-element">
                    <span className="pi pi-cog">
                      <Link to="/register"> Settings</Link>
                    </span>
                  </div>
                  <div className="user-tab-navbar-element">
                    <span className="pi pi-sign-out">
                      <Link to="#" onClick={signOut}> Logout</Link>
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
