import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    return (
        <nav className="navbar">
            <div className="nav-logo">MyTodoApp</div>

            <ul className="nav-menu">
                <li>
                    <NavLink to="/" end>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/todo">todo</NavLink>
                </li>
                <li>
                    <NavLink to="/about">개발자 소개</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;