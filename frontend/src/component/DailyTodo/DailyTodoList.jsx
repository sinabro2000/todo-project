import { useState } from "react";
import dayjs from "dayjs";
import "./DailyTodoList.css";

function DailyTodoList({ date, todos, setTodos, readOnly, onRequireLogin }) {
  const [isManageMode, setIsManageMode] = useState(false);
  const [editTodos, setEditTodos] = useState([]);

  // 공통 가드
  const guard = (action) => {
    if (readOnly) {
      onRequireLogin?.();
      return;
    }
    action();
  };

  // 관리 버튼 클릭
  const handleManageClick = () => {
    guard(() => {
      setIsManageMode(true);
      // todos를 그대로 복사 (draft)
      setEditTodos(todos.map((todo) => ({ ...todo })));
    });
  };

  // 수정 저장 (id 기준)
  const handleSave = () => {
    guard(() => {
      setTodos((prev) =>
        prev.map((todo) => {
          const edited = editTodos.find((e) => e.id === todo.id);
          return edited ? edited : todo;
        })
      );
      setIsManageMode(false);
    });
  };

  // 삭제 (관리모드에서만 editTodos 수정)
  const handleDelete = (id) => {
    guard(() => {
      setEditTodos((prev) => prev.filter((todo) => todo.id !== id));
    });
  };

  // input 변경 (title, time, done)
  const handleChange = (id, field, value) => {
    guard(() => {
      setEditTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, [field]: value } : todo
        )
      );
    });
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
                {/* 시간 */}
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

                {/* 할 일 (title) */}
                <td>
                  {isManageMode ? (
                    <input
                      type="text"
                      value={todo.title}
                      onChange={(e) =>
                        handleChange(todo.id, "title", e.target.value)
                      }
                    />
                  ) : (
                    <span className={`todo-title ${todo.done ? "done" : ""}`}>
                    {todo.title}
                    </span>
                  )}
                </td>

                {/* 완료 */}
                <td>
                  <input
                    type="checkbox"
                    checked={todo.done === true}
                    onChange={() =>
                      handleChange(todo.id, "done", true)
                    }
                  />
                </td>

                {/* 미완료 */}
                <td>
                  <input
                    type="checkbox"
                    checked={todo.done === false}
                    onChange={() =>
                      handleChange(todo.id, "done", false)
                    }
                  />
                </td>

                {/* 삭제 */}
                {isManageMode && (
                  <td>
                    <button onClick={() => handleDelete(todo.id)}>
                      삭제
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 관리 버튼 */}
      <div className="manage-buttons">
        {!isManageMode ? (
          <button onClick={handleManageClick}>관리</button>
        ) : (
          <>
            <button onClick={handleSave}>수정</button>
            <button onClick={() => setIsManageMode(false)}>취소</button>
          </>
        )}
      </div>
    </div>
  );
}

export default DailyTodoList;