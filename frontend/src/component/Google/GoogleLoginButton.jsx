import { GoogleLogin } from "@react-oauth/google";
import { googleLoginApi, meApi } from "../../api/userService";
import { useAuth } from "../../context/AuthContext";


function GoogleLoginButton() {

    const { setUser, setIsAuthenticated } = useAuth();

    const handleGoogleLogin = async (res) => {
        try {
            const idToken = res.credential;
            console.log("Google ID Token:", idToken);
            await googleLoginApi({ idToken });
            const me = await meApi();
            setUser(me);
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