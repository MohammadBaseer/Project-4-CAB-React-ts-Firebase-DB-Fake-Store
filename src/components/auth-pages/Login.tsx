const Login = () => {
  return (
    <>
      <div className="reg-containt">
        <form action="">
          <div>
            <h1 className="reg-head">Login</h1>
            <hr />
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
          </div>
          <div><a href="">Forget Password</a></div>
          <button type="button">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
