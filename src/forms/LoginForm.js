import { useFormik } from "formik";
import { SigninSchema } from "../Schemas/validatesignin";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        console.log("Form Submitted:", values);
        setTimeout(() => {
            actions.resetForm();
            actions.setSubmitting(false);
            //navigate("/dashboard") // Redirect to dashboard after successful login
        }, 1000);
    };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit
    } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: SigninSchema,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-start">
            {/* Username */}
            <div className="flex flex-col w-full">
                <label className="text-gray-300 font-semibold text-left">Username</label>
                <input 
                    name="username"
                    type="text"
                    value={values.username} // Fixed missing value
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full sm:w-[90%] bg-transparent border-b-2 border-gray-300 focus:outline-none text-white p-2" 
                />
                {errors.username && touched.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
            </div>

            {/* Password */}
            <div className="flex flex-col w-full">
                <label className="text-gray-300 font-semibold text-left">Password</label>
                <input 
                    name="password"
                    type="password"
                    value={values.password} // Fixed missing value
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full sm:w-[90%] bg-transparent border-b-2 border-gray-300 focus:outline-none text-white p-2" 
                />
                {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
            </div>

            {/* Sign In Button */}
            <button 
                type="submit"
                disabled={isSubmitting} 
                className={`w-full sm:w-[580px] h-[80px] text-[24px] font-bold rounded-lg mt-12 ${
                    isSubmitting ? "bg-gray-500" : "bg-primary"
                }`}
            >
                {isSubmitting ? "Submitting..." : "Sign In"}
            </button>

            {/* Sign Up Redirect */}
            <div className="mt-12 flex flex-col sm:flex-row sm:justify-between w-full sm:w-[90%] items-center gap-6">
                <p className="text-white text-lg">Don't have an account yet?</p>
                <button 
                    type="button"
                    onClick={() => navigate("/signup")} // Fixed navigation
                    className="bg-white text-black h-[66px] w-[127px] rounded-2xl font-bold"
                >
                    Sign Up
                </button>
            </div>
        </form>
    );
};
