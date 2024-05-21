import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/Auth";

const Register = () => {


const [email, setEmail] = useState<string>("")
const [password, setPassword] = useState<string>("")


const handelForm = (e: React.FormEvent<HTMLFormElement> )=>{
  e.preventDefault();
  
 createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user

console.log("=========================>", user)

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);


  });



  }
  


  return (
    <>
    <div className="main-box">
      <div className="reg-contain">
        <form action="" onSubmit={handelForm}>
          <div>
            <h1 className="reg-head">SignUp</h1>
            <hr />
          </div>

          {/* <div>
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" placeholder="Enter User" name="name" />
          </div> */}

          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" placeholder="Enter email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" placeholder="Enter password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {/* <div>
              <label htmlFor="password1">Repeat Password:</label>
              <input type="password" placeholder="Repeat password"
                id="password1"
                name="password1"
              />
            </div> */}
          </div>
          <div>Do you have already an account? <Link to="/login">Login</Link></div>
          <button type="submit">Submit</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Register;
