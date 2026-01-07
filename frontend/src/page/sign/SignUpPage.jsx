import "./SignUpPage.css";
import { signupApi } from "../../api/userService";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


function SignUpPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("모든 항목을 입력하세요.");
            return;
        }

        try {
            const response = await signupApi({
                username,
                password,
            });
            setError("");
            navigate("/")
        } catch (err) {
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError("회원가입 중 오류가 발생했습니다.");
            }
        }

    }


    return (
        <>
            <div id="signup-div">
                <h2>회원가입 페이지</h2>
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="error">{error}</p>}

                    <button type="submit">회원가입</button>
                </form>
            </div>
        </>
    )
}

export default SignUpPage; 