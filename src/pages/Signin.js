import { LogIn } from "../forms/LoginForm2";
import logo from "../assets/Images/logo.png";

export const SignIn = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      
      {/* Main Wrapper */}
      <div className="flex flex-col md:flex-row w-full md:w-[95%] h-auto md:h-[90vh] overflow-hidden rounded-3xl bg-black text-white shadow-lg">

        {/* Logo Section – Show first on mobile, second on desktop */}
        <div className="order-1 md:order-2 flex justify-center items-center w-full md:w-1/2 bg-white">
          <img
            src={logo}
            alt="Logo"
            className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] max-w-[700px]"
          />
        </div>

        {/* Login Section – Show second on mobile, first on desktop */}
        <div className="order-2 md:order-1 flex flex-col justify-center w-full md:w-1/2 px-6 sm:px-12 pt-24 md:pt-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-12">Sign In</h1>
          <LogIn />
        </div>

      </div>
    </div>
  );
};
