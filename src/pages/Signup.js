import { SignUpForm } from "../Forms/SignupForm";
import logo from "../Assets/Images/logo.png";

export const Signup = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">

      {/* Parent Container: Full Width & Height */}
      <div className="flex flex-col md:flex-row w-full md:w-[95%] min-h-screen md:h-auto overflow-hidden rounded-3xl ">

        {/* Left Side: Signup Form (Takes Full Width on Small Screens) */}
        <div className="flex flex-col md:items-start w-full md:w-1/2 bg-[00000] text-white p-8 pt-24">
          <h1 className="text-white text-3xl font-bold mb-12 md:mb-24">Sign Up</h1>
          <SignUpForm />
        </div>

        {/* Right Side: Logo (Takes Full Width on Small Screens) */}
        <div className="flex justify-center items-center w-full  md:w-1/2 bg-white">
          <img src={logo} alt="Logo" className="w-[250px] md:w-[400px] max-w-[700px]" />
        </div>

      </div>
    </div>
  );
};
