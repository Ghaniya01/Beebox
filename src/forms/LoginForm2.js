import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export const LogIn = () => {
  const navigate = useNavigate();

  // Google Sign-In
  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/youtube.readonly",
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      localStorage.setItem("yt_access_token", accessToken);
      console.log("Google Login Success:", accessToken);
      navigate("/"); 
    },
    onError: () => {
      console.error("Google Sign-In failed");
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
      <button
        onClick={login}
        className="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-4 px-10 rounded-lg transition duration-300"
      >
        Sign In with Google
      </button>
    </div>
  );
};
