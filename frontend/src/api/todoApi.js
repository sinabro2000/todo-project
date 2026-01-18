import apiClient from "./apiClient";

/**
 * 날짜별 todo 조회
 * @param {string} date - YYYY-MM-DD
 */
export const fetchTodos = (date) =>
    apiClient
        .get("/todos", { params: { date } })
        .then(res => res.data);

/**
 * Todo 생성
 * @param {Object} param0
 * @param {string} param0.title
 * @param {string} param0.date
 * @param {string} param0.time
 */
export const createTodo = ({ title, date, time }) =>
    apiClient
        .post("/todos", {
            title,
            date,
            time,
        })
        .then(res => res.data);

/**
 * Todo 완료 토글
 * @param {number} id
 * @param {boolean} done
 */
export const toggleTodo = (id, done) =>
    apiClient
        .patch(`/todos/${id}`, { done })
        .then(res => res.data);

/**
 * Todo 삭제
 * @param {number} id
 */
export const deleteTodo = (id) =>
    apiClient
        .delete(`/todos/${id}`)
        .then(res => res.data);
