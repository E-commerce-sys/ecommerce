import Input from "../../../components/Input";
import Button from "../../../components/Button";
import shopImg from "../../../assets/img/shopImg.svg";
import { Form, Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginAPI } from "./loginAPI";
import { useState } from "react";

function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await loginAPI(email, password);
      // save token if backend returns it
      localStorage.setItem("token", res.data.token);

      // redirect to home
      navigate(from, { replace: true });
      console.log(from);
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div className="flex lg:items-center justify-center lg:justify-normal gap-32.5">
      <img
        src={shopImg}
        alt=""
        className="hidden lg:block lg:w-[45%] h-auto my-30 shrink-0"
      />

      <div className="flex flex-col gap-4  items-center lg:items-start w-92.5 my-10">
        <div className="flex flex-col gap-6 mb-4 items-center lg:items-start text-center lg:text-right">
          <p className="font-medium text-4xl">{t("login.welcome")}</p>
          <p>{t("details")}</p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-10 ">
          <Input
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button size="lg" type="submit">
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
