import { useContext } from "react";
import { UsersActionAuthContext } from "../../../Context/AuthAction_Context/UsersAuthContext";
import { auth } from "../../Config/Firebase_Auth";

const Test = () => {
  const { user } = useContext(UsersActionAuthContext);

  //   console.log("Test PAge ", auth);
  //   console.log("Test PAge  current User", auth.currentUser);

  return (
    <div>
      <h1>Welcome Test</h1>
    </div>
  );
};

export default Test;
