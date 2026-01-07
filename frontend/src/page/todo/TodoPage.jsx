import { useState, useEffect } from "react";
import { logoutApi } from "../../api/userService";
import { useAuth } from "../../context/AuthContext";

import CalendarComponent from "../../component/Calendar/CalendarComponent";
import Backlog from "../../component/Backlog/Backlog";
import DailyTodoList from "../../component/DailyTodo/DailyTodoList";
import DoughnutChart from "../../component/DoughnutChart/DoughnutChart";

import dayjs from "dayjs";
import "./TodoPage.css"

function TodoPage() {

    const { logout } = useAuth();

    const [backlog, setBacklog] = useState([]); //미룬 리스트
    const [value, setValue] = useState(new Date()); // 어떤 날짜가 선택됐는지

    // todo 전체 데이터 (임시)
    const [todos, setTodos] = useState([
        {
            id: 1,
            date: "2026-01-07",
            time: "08:10",
            text: "헬스장 가기",
            done: true,
        },
        {
            id: 2,
            date: "2026-01-07",
            time: "12:00",
            text: "점심 먹기",
            done: false,
        },
        {
            id: 3,
            date: "2026-01-07",
            time: "14:30",
            text: "팀프로젝트 작업",
            done: false,
        },
    ]);

    // input 상태
    const [newTodoText, setNewTodoText] = useState("");
    const [newTodoTime, setNewTodoTime] = useState("12:00");

    // 선택된 날짜 문자열
    const selectedDate = dayjs(value).format("YYYY-MM-DD");

    // 해당 날짜의 todo만 추출
    const dailyTodos = todos.filter(
        (todo) => todo.date === selectedDate
    );

    useEffect(() => {
        setBacklog(['이거 안함', '이것도 안함', '저것도 안함']);
    }, [selectedDate]);

      const addTodo = () => {
    if (!newTodoText.trim()) return;

    const newTodo = {
      id: todos.length + 1,
      date: selectedDate,
      time: newTodoTime,
      text: newTodoText,
      done: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setNewTodoText(""); // 입력 초기화
 };

    const getLogOut = async () => {
        try {
            await logoutApi();
            logout();
        } catch (error) {
            console.error("로그아웃 실패", error)
        }
    };

    return (
        <>
            <div id="todo-container">
                {/* 캘린더 */}
                <div id="calendar">
                    <CalendarComponent value={value} setValue={setValue} />
                </div>

                {/* 새 할 일 추가 */}
                 <div id="add-todo">
                <input
                 type="time"
                 value={newTodoTime}
                 onChange={e => setNewTodoTime(e.target.value)}
              />
               <input
                type="text"
                placeholder="오늘 할 일 입력"
                value={newTodoText}
                onChange={e => setNewTodoText(e.target.value)}
                />
                <button onClick={addTodo}>추가</button>
             </div>

                {/* Daily Todo */}
                <div id="daily-todo">
                    <DailyTodoList
                        date={selectedDate}
                        todos={dailyTodos}
                        setTodos={setTodos}
                    />
                </div>

                {/* 도넛 차트 */}
                <div id="chart">
                    <DoughnutChart todos={dailyTodos}/>
                </div>

                {/* 미룬 일 */}
                <div id="backlog">
                    <Backlog backlog={backlog} />
                </div>
            </div>
        </>
    );
}


export default TodoPage;