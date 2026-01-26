import { createContext, useContext, useState, useEffect } from "react";
import { meApi } from "../api/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    // 추가: user 상태
    const [user, setUser] = useState(null);

    const login = () => setIsAuthenticated(true);
    
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        meApi()
            .then((res) => {
                // meApi는 axios response이므로 res.data로 접근
                setUser(res.data);
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
                setUser(null);
            })
            .finally(() => setAuthChecked(true));
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            authChecked,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
