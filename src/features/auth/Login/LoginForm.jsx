/* eslint-disable react/react-in-jsx-scope */
import { Form, Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginAPI } from "./loginAPI";
import { useState } from "react";
import { loginSchema } from "./loginSchema";
import { useAuth } from "../../../context/AuthContext";

import shopImg from "../../../assets/img/shopImg.svg";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, saveUserName } = useAuth();

  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    !errors.email &&
    !errors.password;

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = { email, password };
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setFormError("");

    try {
      setLoading(true);
      const res = await loginAPI(email, password);
      login(res.data.token);
      saveUserName(res.data.user.first_name, res.data.user.last_name);

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error?.response?.data);

      const apiErrors = error?.response?.data?.errors;
      const apiMessage =
        apiErrors?.[0]?.message ||
        error?.response?.data?.message ||
        error?.message;

      setFormError(apiMessage || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-17 md:mt-0 flex lg:items-center justify-center lg:justify-normal gap-32.5">
      <img
        src={shopImg}
        alt=""
        className="hidden lg:block lg:w-[45%] h-auto my-30 shrink-0"
      />

      <div className="flex flex-col gap-4 items-center lg:items-start w-92.5 my-10">
        <div className="flex flex-col gap-6 mb-4 items-center lg:items-start text-center lg:text-right">
          <p className="font-medium text-4xl">{t("login.welcome")}</p>
          <p>{t("details")}</p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          {/* Email */}
          <div>
            <Input
              placeholder={t("email")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
                setFormError("");
              }}
            />

            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
                setFormError("");
              }}
            />

            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          {/* API Error */}
          {formError && (
            <p className="text-red-600 text-sm text-center">{formError}</p>
          )}

          <Button
            size="lg"
            type="submit"
            loading={loading}
            disabled={!isFormValid}
          >
            {t("log_in")}
          </Button>
        </Form>

        <div className="flex flex-col items-center gap-4 w-full">
          <p className="text-[rgb(var(--color-text-main-3))]">
            {t("login.forget")}
          </p>

          <p className="text-[rgb(var(--color-text-main-3))]">
            {t("login.noAccount")}
            <Link
              to="/register"
              className="mx-1 text-[rgb(var(--color-primary-main))] underline"
            >
              {t("login.signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
