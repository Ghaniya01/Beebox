import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export const LogIn = () => {
  const navigate = useNavigate();

const login = useGoogleLogin({
  scope: "https://www.googleapis.com/auth/youtube.readonly",
  onSuccess: (tokenResponse) => {
    const accessToken = tokenResponse.access_token;
    localStorage.setItem("yt_access_token", accessToken);
    console.log("Google Login Success:", accessToken);
    navigate("/dashboard");
  },
  onError: () => {
    console.error("Google Sign-In failed");
  },
});


  return (
    <div className="h-[400px] w-full bg-black flex items-left items-center px-4">
      <div className="text-center max-w-md w-full">
        <p className="text-gray-300 text-left sm:text-lg mb-28 leading-relaxed">
          Sign in with your Google account to access your personalized dashboard and start exploring your YouTube data.
        </p>

        <button
          onClick={login}
          className="bg-purple-600 hover:bg-purple-700 text-white text-base sm:text-lg font-semibold py-3 px-8 rounded-lg transition duration-300 w-full"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};
