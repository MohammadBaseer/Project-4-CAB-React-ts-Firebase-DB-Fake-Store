import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginDetails, setLoginDetails]= useState({
    email: "",
    password: ""
  })

const handelChanges =(e: ChangeEvent<HTMLInputElement>)=>{
  const {name, value} = e.target

setLoginDetails((prev) =>{
  return {...prev, [name]: value}
})
}

const handelForm = (e: any)=>{
e.preventDefault();

console.log(loginDetails)

}
  return (
    <>
    <div className="main-box">
    <div className="login-layout">
      <div className="reg-contain">
        <form action="" onSubmit={handelForm}>
          <div>
            <h1 className="reg-head">Login</h1>
            <hr />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter email" name="email" 
            onChange={handelChanges} />
          </div>

          <div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" placeholder="Enter password" id="password" name="password" onChange={handelChanges} />
            </div>
          </div>
          <div>Not a member yet? <Link to="/register" >Sign up.</Link></div>
          <button type="submit" >Login</button>
        </form>
      </div>
      </div>
      </div>
    </>
  );
};

export default Login;
