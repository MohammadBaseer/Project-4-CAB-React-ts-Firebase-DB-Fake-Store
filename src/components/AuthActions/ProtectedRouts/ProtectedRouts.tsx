import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UsersActionAuthContext } from "../../../Context/AuthAction_Context/UsersAuthContext";

type ProtectedRoutType = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoutType) => {
  const { user } = useContext(UsersActionAuthContext);

  return <>{user !== null ? children : <Navigate to={"/products"} />}</>;
};

export default ProtectedRoute;
