import dayjs from "dayjs";
import "./PendingList.css";

function PendingList({ todos, onSelectTodo, readOnly, onRequireLogin }) {
  if (!todos || todos.length === 0) {
    return (
      <div className="pending empty">
        <p>미완료된 할 일이 없어요 🎉</p>
      </div>
    );
  }

  const handleClick = (todo) => {
    if (readOnly) {
      onRequireLogin();
      return;
    }
    onSelectTodo(todo);
  };

  return (
    <div className="pending">
      <h2>미완료 목록</h2>
      <ul className="pending-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="pending-item"
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(todo)}
          >
            <div className="pending-date">
              [{dayjs(todo.date).format("MM.DD")}]
            </div>

            <div className="pending-content">
              <span className="time">{todo.time}</span>
              <span className="text"> - {todo.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PendingList;
