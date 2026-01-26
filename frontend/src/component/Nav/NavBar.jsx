import { NavLink } from "react-router-dom";

function NavBar() {
    const linkStyle = ({ isActive }) =>
        `
    relative px-3 py-2 text-sm font-medium transition
    ${isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"}
    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
    after:scale-x-0 after:bg-indigo-400 after:transition
    ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
    `;

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
                        {/* Login 버튼: 테두리만 있는 스타일 (Outline) */}
                        <NavLink
                            to="/login"
                            className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition"
                        >
                            Log in
                        </NavLink>

                        {/* Signup 버튼: 채워진 스타일 (Solid) */}
                        <NavLink
                            to="/signup"
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white 
                                     hover:bg-indigo-500 transition shadow-md shadow-indigo-500/20"
                        >
                            Sign up
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;