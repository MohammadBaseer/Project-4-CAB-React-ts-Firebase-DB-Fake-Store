import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
    <div className="main-box">
      <div className="reg-contain">
        <form action="">
          <div>
            <h1 className="reg-head">Signup</h1>
            <hr />
          </div>

          <div>
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" placeholder="Enter User" name="name" />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              placeholder="Enter email"
              name="email"
            />
          </div>

          <div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Enter password"
                id="password"
                name="password"
              />
            </div>
            <div>
              <label htmlFor="password1">Repeat Password:</label>
              <input
                type="password"
                placeholder="Repeat password"
                id="password1"
                name="password1"
              />
            </div>
          </div>
          <div>Do you have already an account? <Link to="/login">Login</Link></div>
          <button type="button">Submit</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Register;
