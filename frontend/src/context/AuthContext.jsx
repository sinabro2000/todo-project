import { createContext, useContext, useState, useEffect } from "react";
import { meApi } from "../service/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    
    useEffect(() => {
        meApi()
            .then((data) => {
                setIsAuthenticated(data.authenticated);
            })
            .finally(()=>setAuthChecked(true));
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, authChecked, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
} 


export function useAuth() {
    return useContext(AuthContext)
}