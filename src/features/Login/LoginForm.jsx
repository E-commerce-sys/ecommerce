import Input from "../../components/Input";
import Button from "../../components/Button";
import shopImg from "../../assets/img/shopImg.svg";
import { Form, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-32.5">
      <img
        src={shopImg}
        alt=""
        className="hidden lg:block lg:w-[45%] h-auto my-30 shrink-0"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 mb-4">
          <p className="font-medium text-4xl">{t("login.welcome")}</p>
          <p className="">{t("details")}</p>
        </div>
        <Form className="flex flex-col gap-10">
          <Input placeholder={`${t("email")}`} />
          <Input type="password" placeholder={`${t("password")}`} />
          <Button className="w-[371px] h-[56px]">{t("login.login")}</Button>
        </Form>

        <div className="flex flex-col items-center gap-4">
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
