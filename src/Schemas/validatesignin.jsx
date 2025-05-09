import * as Yup from "yup";

// Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const SigninSchema = Yup.object().shape({
  username: Yup.string().min(8, "username must contain 8 characters").required("Username is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Password is required"),
});
