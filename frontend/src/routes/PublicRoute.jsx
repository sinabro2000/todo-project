import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function PublicRoute({ children, allowAuthenticated = false }) {
    const { isAuthenticated, authChecked } = useAuth();

    if (!authChecked) return <div>로딩중....</div>;

    // 로그인 상태 + 허용 안 된 페이지면 todo로
    if (isAuthenticated && !allowAuthenticated) {
        return <Navigate to="/todo" replace />;
    }
    return children;
}

export default PublicRoute;