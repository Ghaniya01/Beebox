import React, { useState } from "react";
import { useFormik } from "formik";
import { SignupSchema } from "../Schemas/validatesignup";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const SignUpForm = () => {
    
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    const onSubmit = async (values, actions) => {
        console.log("Form Submitted:", values);
        setTimeout(() => {
            actions.resetForm();
            actions.setSubmitting(false);
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
            fullname: "", 
            username: "", 
            email: "", 
            password: "", 
            confirmPassword: "" 
        },
        validationSchema: SignupSchema,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-start">
            
            {/* Full Name */}
            <div className="flex flex-col w-full">
                <label className="text-gray-300 font-semibold text-left">Full Name</label>
                <input 
                    name="fullname"
                    type="text"
                    value={values.fullname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full sm:w-[90%] bg-transparent border-b-2 border-gray-300 focus:outline-none text-white p-2" 
                />
                {errors.fullname && touched.fullname && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
                )}
            </div>

            {/* Username */}
            <div className="flex flex-col w-full">
                <label className="text-gray-300 font-semibold text-left">Username</label>
                <input 
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full sm:w-[90%] bg-transparent border-b-2 border-gray-300 focus:outline-none text-white p-2" 
                />
                {errors.username && touched.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
            </div>  

            {/* Email Address */}
            <div className="flex flex-col w-full">
                <label className="text-gray-300 font-semibold text-left">Email Address</label>
                <input 
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full sm:w-[90%] bg-transparent border-b-2 border-gray-300 focus:outline-none text-white p-2" 
                />
                {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            {/* Password Field with Eye Icon */}
            <div className="flex flex-col w-full relative">
                <label className="text-gray-300 font-semibold text-left">Password</label>
                <div className="relative w-full sm:w-[90%]">
                    <input 
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full pr-10 bg-transparent border-b-2 border-gray-300 focus:outline-none text-white p-2" 
                    />
                    {/* Eye Icon */}
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white"
                    >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                </div>
                {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
            </div>

            {/* Confirm Password Field with Eye Icon */}
            <div className="flex flex-col w-full relative">
                <label className="text-gray-300 font-semibold text-left">Confirm Password</label>
                <div className="relative w-full sm:w-[90%]">
                    <input 
                        name="confirmPassword" 
                        type={showConfirmPassword ? "text" : "password"}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full pr-10 bg-transparent border-b-2 border-gray-300 focus:outline-none text-gray-100 p-2" 
                    />
                    {/* Eye Icon */}
                    <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white"
                    >
                        {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
            </div>

            {/* Sign Up Button */}
            <button 
                type="submit"
                disabled={isSubmitting} 
                className={`w-full sm:w-[580px] h-[80px] text-[24px] font-bold rounded-lg mt-12 ${
                    isSubmitting ? "bg-gray-500" : "bg-primary"
                }`}
            >
                {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>

            {/* Already have an account? */}
            <div className="flex flex-col sm:flex-row sm:justify-between w-full sm:w-[90%] mt-8 items-center gap-4">
                <p className="text-white text-lg">Already have an account?</p>
                <button 
                    type="button" 
                    onClick={() => navigate("/login")}
                    className="bg-white text-black w-full sm:w-[127px] h-[66px] text-[20px] font-bold rounded-lg">
                    Log In
                </button>
            </div>

        </form>
    );
};
