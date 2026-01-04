import { useState } from "react";
import { logoutApi } from "../../service/userService";
import { useAuth } from "../../context/AuthContext";


function TodoPage() {

    const { logout } = useAuth();

    const getLogOut = async () => {
        try {
            await logoutApi();
            logout();
        } catch (error) {
            console.error("로그아웃 실패", error)
        }

    }



    return (
        <>
            <h2>todo page로 쓸거</h2>
            <button onClick={getLogOut}></button>
        </>
    )
}


export default TodoPage;