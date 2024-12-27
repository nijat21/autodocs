import { useForm } from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contexts/auth.context";
import { LoginType } from "../types/AuthTypes";
import { Eye, EyeClosed } from "lucide-react";
import { Link } from "react-router-dom";

const validation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{7,20}$/,
      "Password should have at least 1 uppercase letter, 1 number and 1 special character"
    ),
});

function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginType) => {
    login({ email: form.email, password: form.password });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6">Log in</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  className="grow"
                  placeholder="email@example.com"
                  {...register("email")}
                />
              </label>
              {errors.email && (
                <p className="mt-1 text-sm text-info">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type={isVisible ? "text" : "password"}
                  className="grow"
                  placeholder="Enter password"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Eye className="w-4 " />
                  ) : (
                    <EyeClosed className="w-4" />
                  )}
                </button>
              </label>
              {errors.password && (
                <p className="mt-1 text-sm text-info">
                  {errors.password.message}
                </p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Log in</button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <p>Don't have an account?</p>
            <Link to="/signup" className="link link-primary">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
