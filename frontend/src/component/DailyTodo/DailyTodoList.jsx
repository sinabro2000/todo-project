import { useState } from "react";
import dayjs from "dayjs";
import "./DailyTodoList.css";

function DailyTodoList({ date, todos, setTodos }) {
  const [isManageMode, setIsManageMode] = useState(false);
  const [editTodos, setEditTodos] = useState([]);

  // 관리 버튼 클릭
  const handleManageClick = () => {
    setIsManageMode(true);
    setEditTodos(todos.map((todo) => ({ ...todo })));
  };

  // 수정 저장
  const handleSave = () => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.date === date
          ? editTodos.find((e) => e.id === todo.id) || todo
          : todo
      )
    );
    setIsManageMode(false);
  };

  // 삭제
  const handleDelete = (id) => {
    setEditTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // input 변경
  const handleChange = (id, field, value) => {
    setEditTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, [field]: value } : todo))
    );
  };

  const list = isManageMode ? editTodos : todos;

  return (
    <div className="daily-todo">
      <h2>📅Daily Todo List</h2>
      <h3 className="todo-date">{dayjs(date).format("YYYY.MM.DD")}</h3>

      {list.length === 0 ? (
        <p>등록된 할 일이 없습니다.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>시간</th>
              <th>할 일</th>
              <th>O</th>
              <th>X</th>
              {isManageMode && <th>삭제</th>}
            </tr>
          </thead>

          <tbody>
            {list.map((todo) => (
              <tr key={todo.id}>
                <td>
                  {isManageMode ? (
                    <input
                      type="time"
                      value={todo.time}
                      onChange={(e) =>
                        handleChange(todo.id, "time", e.target.value)
                      }
                    />
                  ) : (
                    todo.time
                  )}
                </td>

                <td>
                  {isManageMode ? (
                    <input
                      type="text"
                      value={todo.text}
                      onChange={(e) =>
                        handleChange(todo.id, "text", e.target.value)
                      }
                    />
                  ) : (
                    todo.text
                  )}
                </td>

                <td>
                  <input
                    type="checkbox"
                    checked={todo.done === true}
                    onChange={() => handleChange(todo.id, "done", true)}
                  />
                </td>

                <td>
                  <input
                    type="checkbox"
                    checked={todo.done === false}
                    onChange={() => handleChange(todo.id, "done", false)}
                  />
                </td>

                {isManageMode && (
                  <td>
                    <button onClick={() => handleDelete(todo.id)}>삭제</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 관리 버튼 */}
      {!isManageMode ? (
        <button onClick={handleManageClick}>관리</button>
      ) : (
        <>
          <button onClick={handleSave}>수정</button>
          <button onClick={() => setIsManageMode(false)}>취소</button>
        </>
      )}
    </div>
  );
}

export default DailyTodoList;