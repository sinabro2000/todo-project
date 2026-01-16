import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './page/login/LoginPage'
import TodoPage from "./page/todo/TodoPage";
import SignUpPage from "./page/sign/SignUpPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import HomePage from "./page/home/HomePage";
import { useAuth } from "./context/AuthContext";


function App() {

  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <div className="app-center">
        <Routes>



          {/* 메인 */}
          <Route
            path="/"
            element={
              <HomePage />
            }
          />

          {/* 로그인 페이지*/}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />


          {/* 회원가입 페이지*/}
          <Route
            path="/sign"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />


          {/* To do 페이지 */}
          <Route
            path="/todo"
            element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            }
          />

          {/* 없는 경로 */}
          <Route path="*" element={<Navigate to="/" replace />} />




        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
