import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Contact = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className="main-box">
    <div className="main-container">
      {user ? <h1>Contact To: {user.email}</h1> : <div className="main-box">
    <div className="main-container"> <h1>Please Login First</h1></div></div>}
    </div>
    </div>
  )
}

export default Contact
