import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Nexuslogo from "@/assets/logo/Background.svg";

import { useLogin } from "../../hooks/useAuth";

import styles from "./Login.module.scss";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const {
    mutate,
    isPending,
    error,
  } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  };

  return (
    <div className={styles.login}>
      {/* LEFT SIDE */}
      <div className={styles.brandingSection}>
        <div className={styles.brandingContent}>
          <div className={styles.logo}>
            <img src={Nexuslogo} alt="Nexus Logo" className={styles.logoImage} />
            <span>NexusCRM</span>
          </div>

          <h1 className={styles.heading}>
            Streamline your customer relationships.
          </h1>

          <p className={styles.subtext}>
            The intelligent platform for managing contacts, tracking tasks, and driving your business growth forward with ease.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.formSection}>
        <div className={styles.loginCard}>
          <div className={styles.top}>
            <h2>Welcome Back!</h2>

            <p>
              Please enter your details to sign in.
            </p>
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* EMAIL */}
            <div className={styles.formGroup}>
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required:
                    "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address"
                  }
                })}
              />

              {errors.email && (
                <span className={styles.error}>
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div className={styles.formGroup}>
              <div
                className={
                  styles.passwordHeader
                }
              >
                <label>Password</label>

                <button
                  type="button"
                  className={
                    styles.forgotPassword
                  }
                >
                  Forgot Password?
                </button>
              </div>

              <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required:
                    "Password is required",

                  minLength: {
                    value: 6,
                    message:
                      "Minimum 6 characters",
                  },
                })}
              />

              {errors.password && (
                <span className={styles.error}>
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* API ERROR */}
            {error && (
              <div className={styles.apiError}>
                {error.message}
              </div>
            )}

            {/* ACTIONS */}
            <div className={styles.actions}>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isPending}
              >
                {isPending
                  ? "Logging in..."
                  : "Login"}
              </button>
            </div>
          </form>

          <div className={styles.footer}>
            Don’t have an account?{" "}
            <span>Sign up</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;