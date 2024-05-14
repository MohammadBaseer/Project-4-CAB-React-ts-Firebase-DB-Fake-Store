import { NavLink  } from "react-router-dom";
import HeadTop from "./HeadTop";


function Header() {
  return (
<>
<HeadTop/>
    
    <div className="main-container navbar-box">
      <nav className="navbar">
        <div className="flex-box">
          <ul>
            <div className="flex">
              <li className="nav-elements">
                <NavLink to="/">Home</NavLink >
              </li>
              <li className="nav-elements">
                <NavLink to="products">Products</NavLink >
              </li>
              <li className="nav-elements">
                <NavLink to="contact">Contact</NavLink >
              </li>
              <li className="nav-elements">
                <NavLink to="chat">Chat</NavLink >
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>
      <hr className="break-line"/>
    </>
  )
}

export default Header
