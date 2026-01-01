import React,{ useState } from "react";
import { login } from "../service/userService";
import "./Login.css";

function Login () {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const getLogin= async ()=>{
        try {
            await login({
                username,
                password,
            });
            console.log("로그인 성공")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div id="login-div">
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
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button onClick={getLogin}>로그인</button>
                <div>
                    <span>아이디가 없으신가요? <button id="sign-btn">회원가입</button></span>
                </div>
            </div>
        </>
    )
}

export default Login 