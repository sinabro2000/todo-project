import { useState, useEffect } from "react";
import { logoutApi } from "../../api/userService";
import { useAuth } from "../../context/AuthContext";
import CalenderComponent from "../../component/CalendarComponent";
import Backlog from "../../component/Backlog";
import "./TodoPage.css"
import apiClient from "../../api/apiclient";



function TodoPage() {

    const { logout } = useAuth();
    const [backlog, setBacklog] = useState([]); //미룬 리스트
    const [value, setValue] = useState(new Date()); // 어떤 날짜가 선택됐는지





    useEffect(() => {
        console.log('선택된 날:', value);
        setBacklog(['이거 안함', '이것도 안함', '저것도 안함']);
    }, [value]);


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
            <div id="todo-container">
                <div id="calendar">
                    <CalenderComponent value={value} setValue={setValue} />
                </div>
                <div id="backlog">
                    <Backlog backlog={backlog} />
                </div>
            </div>
        </>
    )
}


export default TodoPage;