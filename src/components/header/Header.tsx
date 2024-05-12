import { Link } from "react-router-dom";
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
                <Link className="active" to="/">Home</Link>
              </li>
              <li className="nav-elements">
                <Link to="List">Products</Link>
              </li>
              <li className="nav-elements">
                <Link to="Contact">Contact</Link>
              </li>
              <li className="nav-elements">
                <Link to="Chat">Chat</Link>
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
