import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginApi } from "../../api/userService";
import GoogleLoginButton from "../../component/Google/GoogleLoginButton";
import "./LoginPage.css";

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    /* 로그인 */

    const getLogin = async () => {
        try {
            const response = await loginApi({
                username,
                password,
            });
            login();

        } catch (error) {
            console.log(error)
        }
    }

    const getSignUp = async () => {
        navigate("/sign");
    }

    return (
        <>
            <div id="login-div">
                <h2>로그인 페이지</h2>
                <input
                    id="login-id-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    id="login-pw-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={getLogin}>로그인</button>
                <div id="login-menu-div">
                    <span id="signup-text">
                        <span>아이디가 없으신가요?</span>
                        <button id="sign-btn" onClick={getSignUp}>회원가입</button>
                        <GoogleLoginButton />
                    </span>
                </div>
            </div>
        </>
    )
}

export default LoginPage