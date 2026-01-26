import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/login/LoginPage'
import TodoPage from "./pages/todo/TodoPage";
import SignUpPage from "./pages/sign/SignUpPage";
import AboutPage from "./pages/about/AboutPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import HomePage from "./pages/home/HomePage";
import { useAuth } from "./context/AuthContext";
import NavBar from "./component/Nav/NavBar";


function App() {

  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      {/*고정 네비게이션*/}
      <NavBar />

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
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />


          {/* To do 페이지 */}
          <Route path="/todo" element={<TodoPage />} />

          {/* 개발자 소개 페이지 */}
          <Route
            path="/about"
            element={
              <PublicRoute allowAuthenticated>
                <AboutPage />
              </PublicRoute>
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
