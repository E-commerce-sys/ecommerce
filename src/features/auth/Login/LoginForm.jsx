import { Form, Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginAPI } from "./loginAPI";
import { useState } from "react";
import { loginSchema } from "./loginSchema";
import { hasAdminPrivileges, useAuth } from "../../../context/AuthContext";
import { resendOTP } from "../VerifyOTP/resendOTP";
import VerifyOTPModal from "../VerifyOTP/VerifyOTPModal";

import shopImg from "../../../assets/img/shopImg.svg";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

function parseLoginApiError(error) {
  const data = error?.response?.data;
  const errorsField = data?.errors;
  let message =
    (typeof data?.message === "string" && data.message) ||
    errorsField?.message ||
    "Invalid email or password";
  let userId = null;
  let status = null;

  if (Array.isArray(errorsField) && errorsField[0]) {
    const first = errorsField[0];
    if (first?.message) message = String(first.message);
    status = first?.status ?? null;
    userId = first?.userId ?? first?.user_id ?? null;
  } else if (
    errorsField &&
    typeof errorsField === "object" &&
    !Array.isArray(errorsField)
  ) {
    if (errorsField.message) message = String(errorsField.message);
    status = errorsField.status ?? null;
    userId = errorsField.userId ?? errorsField.user_id ?? null;
  }

  const nStatus = status != null ? Number(status) : NaN;
  const nUserId = userId != null ? Number(userId) : NaN;

  return {
    message,
    userId: Number.isFinite(nUserId) ? nUserId : null,
    status: Number.isFinite(nStatus) ? nStatus : null,
  };
}

function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [userId, setUserId] = useState(null);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [resendLoading, setResendLoading] = useState(false);
  const [authErrorStatus, setAuthErrorStatus] = useState(null);
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
    setAuthErrorStatus(null);
    setUserId(null);

    try {
      setLoading(true);
      const res = await loginAPI(email, password);
      const token = res?.data?.token;
      const attributes = res?.data?.user?.attributes;

      if (token) {
        login(token, attributes);
        const target = hasAdminPrivileges(attributes) ? "/admin/dashboard" : from;
        navigate(target, { replace: true });
      } else {
        setFormError(t("login.no_token"));
      }
    } catch (error) {
      console.error("Login error:", error?.response?.data);

      const parsed = parseLoginApiError(error);
      setFormError(parsed.message);
      setAuthErrorStatus(parsed.status);
      if (parsed.status === 403 && parsed.userId != null) {
        setUserId(parsed.userId);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSendVerificationCode() {
    if (!email.trim()) return;

    try {
      setResendLoading(true);
      setFormError("");
      await resendOTP({ email: email.trim() });
      setOpenAuthModal(true);
      setAuthErrorStatus(null);
    } catch (err) {
      const data = err?.response?.data;
      const raw = data?.errors;
      let msg =
        (typeof data?.message === "string" && data.message) || err?.message;
      if (Array.isArray(raw) && raw[0]?.message) {
        msg = String(raw[0].message);
      } else if (
        raw &&
        typeof raw === "object" &&
        !Array.isArray(raw) &&
        raw.message
      ) {
        msg = String(raw.message);
      }
      setFormError(msg || t("verify.expired"));
    } finally {
      setResendLoading(false);
    }
  }

  const showSendCode =
    authErrorStatus === 403 && userId != null && !openAuthModal;

  return (
    <div className="mt-17 flex lg:items-center justify-center lg:justify-normal gap-32.5">
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
                setAuthErrorStatus(null);
                setUserId(null);
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
                setAuthErrorStatus(null);
                setUserId(null);
              }}
            />

            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          {/* API Error */}
          {formError && (
            <p className="flex flex-wrap items-center justify-center gap-2 text-center text-sm text-red-600">
              <span>{formError}</span>
              {showSendCode ? (
                <button
                  type="button"
                  disabled={resendLoading}
                  onClick={() => void handleSendVerificationCode()}
                  className="cursor-pointer font-medium text-black underline disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resendLoading ? t("contact.sending") : t("verify.sendCode")}
                </button>
              ) : null}
            </p>
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
      {openAuthModal && (
        <VerifyOTPModal
          email={email}
          closePath="/login"
          onClose={() => setOpenAuthModal(false)}
        />
      )}
    </div>
  );
}

export default LoginForm;
