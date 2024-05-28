import { ReactNode, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type ProtectedRoutType = {
  children: ReactNode;
};

const ProtectedRout = ({ children }: ProtectedRoutType) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return <>{user === null ? children : navigate("/")}</>;
};

export default ProtectedRout;
