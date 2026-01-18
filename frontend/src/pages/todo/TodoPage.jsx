import { useState, useEffect } from "react";
import { logoutApi } from "../../api/userService";
import { useAuth } from "../../context/AuthContext";
import { fetchTodos } from "../../api/todoApi";

import CalendarComponent from "../../component/Calendar/CalendarComponent";
import WeeklyAchievement from "../../component/WeeklyAchievement/WeeklyAchievement";
import PendingList from "../../component/Pending/PendingList";
import DailyTodoList from "../../component/DailyTodo/DailyTodoList";
import DoughnutChart from "../../component/DoughnutChart/DoughnutChart";

import dayjs from "dayjs";
import "./TodoPage.css";


// 비회원용 demo todos
const today = dayjs();

const demoTodos = Array.from({ length: 7 }, (_, i) => {
  const date = today.subtract(i, "day").format("YYYY-MM-DD");

  return [
    {
      id: i * 3 + 1,
      date,
      time: "08:10",
      title: "헬스장 가기",
      done: true,
    },
    {
      id: i * 3 + 2,
      date,
      time: "12:00",
      title: "점심 먹기",
      done: false,
    },
    {
      id: i * 3 + 3,
      date,
      time: "14:30",
      title: "팀프로젝트 작업",
      done: false,
    },
  ];
}).flat();

function TodoPage() {
  const { isAuthenticated, logout } = useAuth();

  const [value, setValue] = useState(new Date());
  const [todos, setTodos] = useState(demoTodos);

  // 새 Todo input
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoTime, setNewTodoTime] = useState("12:00");

  // 선택된 날짜
  const selectedDate = dayjs(value).format("YYYY-MM-DD");

  // 날짜별 todo
  const dailyTodos = todos.filter((todo) => todo.date === selectedDate);

  // 미완료 todo
  const pendingTodos = todos.filter((todo) => !todo.done);

  // 로그인 여부에 따라 todos 로딩
  useEffect(() => {
    const loadTodos = async () => {
      if (!isAuthenticated) {
        setTodos(demoTodos);
        return;
      }

      try {
        const data = await fetchTodos(selectedDate);
        setTodos(data);
      } catch (error) {
        console.error("todos 불러오기 실패", error);
      }
    };

    loadTodos();
  }, [isAuthenticated, selectedDate]);

  // 비회원 가드
  const showLoginGuid = () => {
    alert("로그인하면 할 일을 추가하고 저장할 수 있어요 😁");
  };

  // Todo 추가
  const addTodo = () => {
    if (!isAuthenticated) return showLoginGuid();
    if (!newTodoTitle.trim()) return;

    const newTodo = {
      id: Date.now(), // 추후 서버 연동 시 제거
      date: selectedDate,
      time: newTodoTime,
      title: newTodoTitle,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setNewTodoTitle("");
  };

  // 미완료 클릭 시 해당 날짜로 이동
  const handleSelectPendingTodo = (todo) => {
    setValue(dayjs(todo.date).toDate());
  };

  // 로그아웃
  const getLogOut = async () => {
    try {
      await logoutApi();
      logout();
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <div id="todo-container">
      {/* 왼쪽 */}
      <div id="left-column">
        <div id="calendarSet">
          <CalendarComponent value={value} setValue={setValue} />
          <WeeklyAchievement todos={todos} value={value} />
        </div>

        <PendingList
          todos={pendingTodos}
          onSelectTodo={handleSelectPendingTodo}
          readOnly={!isAuthenticated}
          onRequireLogin={showLoginGuid}
        />
      </div>

      {/* 오른쪽 */}
      <div id="right-column">
        {/* 추가 */}
        <div id="add-todo">
          <input
            type="time"
            value={newTodoTime}
            onChange={(e) => {
              if (!isAuthenticated) return showLoginGuid();
              setNewTodoTime(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder={
              isAuthenticated ? "오늘 할 일 입력" : "로그인 후 입력 가능"
            }
            value={newTodoTitle}
            onChange={(e) => {
              if (!isAuthenticated) return showLoginGuid();
              setNewTodoTitle(e.target.value);
            }}
          />

          <button onClick={addTodo}>추가</button>
        </div>

        {/* Daily Todo */}
        <DailyTodoList
          date={selectedDate}
          todos={dailyTodos}
          setTodos={setTodos}
          readOnly={!isAuthenticated}
          onRequireLogin={showLoginGuid}
        />

        {/* 도넛 차트 */}
        <DoughnutChart todos={dailyTodos} />
      </div>
    </div>
  );
}

export default TodoPage;