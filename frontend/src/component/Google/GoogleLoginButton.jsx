import { GoogleLogin } from "@react-oauth/google";

function GoogleLoginButton() {
    return (
        <GoogleLogin
            onSuccess={(res) => {
                console.log("구글 로그인 성공", res);
            }}
            onError={() => {
                console.log("구글 로그인 실패");
            }}
        />
    );
}

export default GoogleLoginButton;   