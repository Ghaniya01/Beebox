import * as Yup from "yup";

// Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const SignupSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Your full name is required"),
  
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .matches(passwordRules, { message: "Password must be at least 8 characters, contain 1 uppercase, 1 lowercase, 1 number, and 1 special character" })
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
