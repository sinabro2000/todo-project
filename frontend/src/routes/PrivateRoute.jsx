import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


function PrivateRoute({ children}) {
    // const {isAuthenticated , authChecked} = useAuth();

    //  if (!authChecked) return null;

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace/>;
    // }

    return children;
}

export default PrivateRoute;