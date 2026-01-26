import "./SignUpPage.css";
import { signupApi } from "../../api/userService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    nickname: "",
    email: "",
  });

  const [errors, setErrors] = useState({
  username: "",
  password: "",
  nickname: "",
  email: "",
});

  const [error, setError] = useState("");


  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm({
    ...form,
    [name]: value,
  });

  // 즉시 유효성 검사
  let msg = "";

  if (name === "username") {
    if (value.trim() === "") msg = "아이디는 필수입니다.";
  }

  if (name === "password" && value !== "") {
     if (value.length < 8) msg = "비밀번호는 8자 이상이어야 합니다.";
}


  if (name === "nickname") {
    if (value.trim() === "") msg = "닉네임은 필수입니다.";
  }

  if (name === "email") {
    if (!value.includes("@")) msg = "이메일 형식이 아닙니다.";
  }

  setErrors((prev) => ({
    ...prev,
    [name]: msg,
  }));
};


  const handleSignup = async (e) => {
  e.preventDefault();

  if (Object.values(errors).some((v) => v !== "")) {
    setError("입력값을 확인하세요.");
    return;
  }

  try {
    await signupApi(form);
    navigate("/");
  } catch (err) {
    setError("회원가입 중 오류가 발생했습니다.");
  }
};


  return (
    <div className="signup-wrapper">
      <form className="signup-card" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <p className="subtitle">새 계정을 만들어보세요</p>

        <input
          name="username"
          type="text"
          placeholder="아이디"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          name="nickname"
          type="text"
          placeholder="닉네임"
          value={form.nickname}
          onChange={handleChange}
        />
        {errors.nickname && <p className="error">{errors.nickname}</p>}

        <input
          name="email"
          type="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {error && <p className="error">{error}</p>}

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignUpPage;
