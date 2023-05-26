import { Navigate } from "react-router-dom";
const Authenticate = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Authenticate;
