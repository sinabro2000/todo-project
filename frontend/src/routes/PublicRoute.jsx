import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function PublicRoute({ children }) {
    const { isAuthenticated, authChecked } = useAuth();

    if (!authChecked) return null;

    if (isAuthenticated) {
        return <Navigate to="/todo" replace />;
    }
    return children;
}

export default PublicRoute;