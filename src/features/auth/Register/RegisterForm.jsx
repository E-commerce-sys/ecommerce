import SideImage from "../../../assets/img/Side-Image.png";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import GoogleIcon from "../../../assets/icons/Icon-Google.svg";
import { Form, Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { registerAPI } from "../../auth/Register/registerAPI";
import { registerSchema } from "./registerSchema";

function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const isFormValid =
    firstName.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    !errors.firstName &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword;

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      const res = await registerAPI(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      );

      localStorage.setItem("token", res.data.token);

      navigate(from, { replace: true });
    } catch (e) {
      const apiError = e?.response?.data;

      console.log("Error details:", apiError);

      const emailError = apiError?.errors?.["data.attributes.email"]?.[0];

      if (emailError) {
        setErrors((prev) => ({
          ...prev,
          email: ["Email already registered"],
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex lg:items-center justify-center lg:justify-normal gap-32.5">
      <img
        src={SideImage}
        className="hidden lg:block lg:w-[45%] h-auto my-30 shrink-0"
      />

      <div className="flex flex-col gap-4 items-center lg:items-start w-92.5 my-10">
        <div className="flex flex-col gap-6 mb-4 items-center lg:items-start text-center lg:text-right">
          <p className="font-medium text-4xl">{t("register.create")}</p>
          <p>{t("details")}</p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 w-92.75">
            {/* First + Last Name */}
            <div className="flex flex-row gap-15">
              <div className="w-38.75">
                <Input
                  placeholder={t("register.first_name")}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors((prev) => ({ ...prev, firstName: undefined }));
                  }}
                  className="w-full"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.firstName[0]}
                  </p>
                )}
              </div>

              <div className="w-38.75">
                <Input
                  placeholder={t("register.last_name")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.lastName[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="w-full">
              <Input
                placeholder={t("email")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className="py-2"
                type="email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div className="w-full">
              <Input
                type="password"
                placeholder={t("password")}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                className="py-2"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <Input
                type="password"
                placeholder={t("register.confirm_password")}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }));
                }}
                className="py-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword[0]}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 items-center">
            <Button
              size="lg"
              type="submit"
              loading={loading}
              disabled={!isFormValid}
            >
              {t("register.create")}
            </Button>

            <Button size="lg" variant="outline" className="gap-2">
              <img src={GoogleIcon} className="w-6 h-6 mr-1.25" />
              {t("register.google")}
            </Button>
          </div>
        </Form>

        {/* Login Link */}
        <div className="flex flex-col items-center w-full">
          <p className="flex gap-1 text-[rgb(var(--color-text-main-3))]">
            {t("register.have_account")}
            <Link
              to="/login"
              className="underline text-[rgb(var(--color-primary-main))]"
            >
              {t("log_in")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
