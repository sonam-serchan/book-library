import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, hasClientAccess }) => {
  const { userInfo } = useSelector(state => state.auth);

  if (userInfo.uid) {
    if (userInfo.role === "student") {
      if (hasClientAccess) {
        return <div>{children}</div>; 
      } else {
        return <Navigate to={"/"}></Navigate> 
      }
    } else {
      return <div>{children}</div>; 
    }
  } else  {
    return <Navigate to={"/login"}></Navigate>
  }
}

export default PrivateRoute;
