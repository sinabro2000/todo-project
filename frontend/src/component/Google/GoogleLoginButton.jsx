import { GoogleLogin } from "@react-oauth/google";
import { googleLoginApi, meApi } from "../../api/userService";
import { useAuth } from "../../context/AuthContext";

function GoogleLoginButton() {

    const { setUser, setIsAuthenticated } = useAuth();

    const handleGoogleLogin = async (res) => {
        try {
            const idToken = res.credential;
            console.log("Google ID Token:", idToken);

            // 1) 구글 로그인 API 호출 (JWT 발급)
            const response = await googleLoginApi({ idToken });
            console.log("구글 로그인 성공:", response.data);

            // 2) JWT 저장
            const token = response.data.token;
            localStorage.setItem("token", token);

            // 3) me API 호출 (JWT 자동 포함)
            const me = await meApi();
            setUser(me.data);
            setIsAuthenticated(true);

        } catch (err) {
            console.error("구글 로그인 실패", err);
        }
    }

    return (
        <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
                console.log("구글 로그인 실패");
            }}
        />
    );
}

export default GoogleLoginButton;
