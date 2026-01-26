import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function NavBar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const linkStyle = ({ isActive }) =>
        `
    relative px-3 py-2 text-sm font-medium transition
    ${isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"}
    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
    after:scale-x-0 after:bg-indigo-400 after:transition
    ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
    `;

    const handleLogout = () => {
        logout();        // 로그아웃 처리
        navigate("/");   // 홈으로 이동
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur bg-slate-900/80 border-b border-slate-800">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                <div className="text-lg font-bold tracking-wide text-white">
                    My<span className="text-indigo-400">Todo</span>App
                </div>

                <div className="flex items-center gap-6">
                    <ul className="flex gap-8 m-0 p-0 list-none">
                        <li>
                            <NavLink to="/" end className={linkStyle}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/todo" className={linkStyle}>Todo</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={linkStyle}>개발자 소개</NavLink>
                        </li>
                    </ul>

                    {/* 버튼 그룹 */}
                    <div className="flex items-center gap-3 ml-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm font-medium text-slate-200">
                                    {user?.nickname || user?.username || "User"}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white 
                                               hover:bg-red-500 transition shadow-md shadow-red-500/20"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition"
                                >
                                    Log in
                                </NavLink>

                                <NavLink
                                    to="/signup"
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white 
                                             hover:bg-indigo-500 transition shadow-md shadow-indigo-500/20"
                                >
                                    Sign up
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
