import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {


const {user} = useContext(AuthContext)


  return (
    <div className="main-box">
      <div className="main-container">
      <h1>This is Home Page</h1>
       {user ?<h1>Welcome User: {user.user}</h1> :<h1>Login First</h1> }
      </div>
    </div>
  )
}

export default Home;
