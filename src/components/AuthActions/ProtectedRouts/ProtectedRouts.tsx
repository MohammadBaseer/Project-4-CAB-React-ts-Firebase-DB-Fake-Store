import { ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsersActionAuthContext } from "../../../Context/AuthAction_Context/UsersAuthContext";

type ProtectedRoutType = {
  children: ReactNode;
};

const ProtectedRout = ({ children }: ProtectedRoutType) => {
  const { user } = useContext(UsersActionAuthContext);
  const navigate = useNavigate();

  return <>{user === null ? children : navigate("/")}</>;
};

export default ProtectedRout;
