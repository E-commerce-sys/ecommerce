/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import SideImage from "../../../assets/img/Side-Image.png";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import GoogleIcon from "../../../assets/icons/Icon-Google.svg";
import { Form, Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { registerAPI } from "../../auth/Register/registerAPI";
import { registerSchema } from "./registerSchema";
import { useAuth } from "../../../context/AuthContext";

function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  function validateForm(data) {
    const result = registerSchema.safeParse(data);

    if (!result.success) {
      return result.error.flatten().fieldErrors;
    }

    return {};
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);

    if (submitted) {
      const newErrors = validateForm(updatedForm);
      setErrors(newErrors);
    }
  }

  const isFormValid =
    Object.keys(errors).length === 0 &&
    form.firstName &&
    form.lastName &&
    form.email &&
    form.password &&
    form.confirmPassword;

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);

    const result = registerSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      const res = await registerAPI(
        form.firstName,
        form.lastName,
        form.email,
        form.password,
        form.confirmPassword,
      );

      login(res.token);

      navigate(from, { replace: true });
    } catch (e) {
      const apiErrors = e?.response?.data?.errors;

      if (apiErrors?.length) {
        const emailError = apiErrors.find(
          (err) => err.source === "data.attributes.email",
        );

        if (emailError) {
          setErrors((prev) => ({
            ...prev,
            email: ["Email already registered"],
          }));
        }
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
                  name="firstName"
                  placeholder={t("register.first_name")}
                  value={form.firstName}
                  onChange={handleChange}
                />
                {submitted && errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.firstName[0]}
                  </p>
                )}
              </div>

              <div className="w-38.75">
                <Input
                  name="lastName"
                  placeholder={t("register.last_name")}
                  value={form.lastName}
                  onChange={handleChange}
                />
                {submitted && errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.lastName[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <Input
                name="email"
                type="email"
                placeholder={t("email")}
                value={form.email}
                onChange={handleChange}
              />
              {submitted && errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Input
                name="password"
                type="password"
                placeholder={t("password")}
                value={form.password}
                onChange={handleChange}
              />
              {submitted && errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Input
                name="confirmPassword"
                type="password"
                placeholder={t("register.confirm_password")}
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {submitted && errors.confirmPassword && (
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
