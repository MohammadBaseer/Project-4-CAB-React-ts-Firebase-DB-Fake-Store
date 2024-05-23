import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type ProtectedRoutType = {
  children: ReactNode;
};

const ProtectedRout = ({ children }: ProtectedRoutType) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        children
      ) : (
        <div className="main-box">
          <div className="main-container">
            <h1>Please Login First</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRout;
