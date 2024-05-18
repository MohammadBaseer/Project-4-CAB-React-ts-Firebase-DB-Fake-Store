import 'primeicons/primeicons.css';


import { Link } from "react-router-dom";

const NavbarHead = () => {
  return (
<>
    <div className="navbar-head">
        <div className="main-container">  
            <div className="nav-elements">
            <span className="">
            <Link to="Login" >Login</Link>&nbsp;/&nbsp;<Link to="Register" >Register</Link>
            &nbsp;
            <span className="pi pi-sign-in" style={{ fontSize: '0.8rem' }}></span>
            </span>
            </div>
        </div>
    </div>
</>

  )
}

export default NavbarHead
