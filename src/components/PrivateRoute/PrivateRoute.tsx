import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element | JSX.Element[] | string;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  if(localStorage.getItem('token')) return children;

  const loggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  return <>{loggedIn ? children : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
