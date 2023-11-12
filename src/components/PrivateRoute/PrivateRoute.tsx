import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element | JSX.Element[] | string;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const loggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );
  //   useSelector((state: IRootState) =>
  //     console.log(state.auth.authData.accessToken)
  //   );
  console.log(loggedIn);
  return <>{loggedIn ? children : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
