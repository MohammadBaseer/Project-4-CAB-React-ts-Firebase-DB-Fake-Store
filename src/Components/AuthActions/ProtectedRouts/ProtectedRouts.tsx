import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UsersActionAuthContext } from "../../../Context/AuthAction_Context/UsersAuthContext";
import Loader from "../../Pages/Loader/Loader";

type ProtectedRoutType = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoutType) => {
  const { user, isLoading } = useContext(UsersActionAuthContext);

  return <>{isLoading ? <Loader /> : user !== null && user.email ? children : <Navigate to={"/products"} />}</>;
};

export default ProtectedRoute;
