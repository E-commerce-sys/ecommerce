import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { hasAdminPrivileges, useAuth } from "../../../context/AuthContext";
import { getUserAPI } from "../../account/API/userAPI";
import { verifyOTP } from "./verifyOTP";
import { resendOTP } from "./resendOTP";

function getBackendErrorMessage(err) {
  const raw = err?.response?.data?.errors;
  if (Array.isArray(raw) && raw[0]?.message) {
    return String(raw[0].message);
  }
  if (raw && typeof raw === "object" && !Array.isArray(raw) && raw.message) {
    return String(raw.message);
  }
  const msg = err?.response?.data?.message;
  if (typeof msg === "string" && msg.trim() !== "") return msg;
  return null;
}

function VerifyOTPModal({ userId, email, closePath = "/", onClose }) {
  const { login } = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ku";
  const navigate = useNavigate();

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputsRef = useRef([]);
  const lastVerifyCodeRef = useRef(null);

  const code = otp.join("");
  const isComplete = code.length === 6;
  const numericUserId = userId != null ? Number(userId) : NaN;
  const hasUserId = !Number.isNaN(numericUserId);

  function handleClose() {
    onClose?.();
    navigate(closePath);
  }

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (!isComplete || status !== "idle" || !hasUserId) return;
    if (lastVerifyCodeRef.current === code) return;

    lastVerifyCodeRef.current = code;
    setStatus("verifying");
    const otpValue = code;

    (async () => {
      try {
        setError("");

        const data = await verifyOTP({
          userId: numericUserId,
          otp: Number(otpValue),
        });

        const token =
          data?.data?.token ?? data?.token ?? null;
        let attributes =
          data?.data?.user?.attributes ?? data?.user?.attributes ?? null;

        if (token) {
          login(token, attributes);
          if (!attributes) {
            try {
              const user = await getUserAPI();
              attributes = user?.attributes ?? null;
              if (attributes) {
                login(token, attributes);
              }
            } catch {
              /* AuthContext will retry via GET /api/user effect */
            }
          }
        }

        setStatus("success");

        const dest = hasAdminPrivileges(attributes) ? "/admin" : "/";
        setTimeout(() => {
          navigate(dest, { replace: true });
        }, 700);
      } catch (err) {
        const apiError = getBackendErrorMessage(err);
        setError(apiError || t("verify.invalid"));
        setStatus("error");

        setTimeout(() => {
          lastVerifyCodeRef.current = null;
          setOtp(["", "", "", "", "", ""]);
          setStatus("idle");
          inputsRef.current[0]?.focus();
        }, 900);
      }
    })();
  }, [code, isComplete, status, hasUserId, numericUserId, login, navigate, t]);

  function handleChange(value, index) {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  }

  function handlePaste(e) {
    const paste = e.clipboardData.getData("text");

    if (!/^\d{6}$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

    inputsRef.current[5]?.focus();
  }

  async function handleResend() {
    if (!canResend || !hasUserId) return;

    try {
      setError("");
      await resendOTP({ userId: numericUserId, email });
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      const apiError = getBackendErrorMessage(err);
      setError(apiError || t("verify.expired"));
    }
  }

  if (!hasUserId) {
    return null;
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl sm:p-8">
        <button
          type="button"
          onClick={handleClose}
          className={`absolute top-4 text-gray-400 hover:text-black ${
            isRTL ? "left-4" : "right-4"
          }`}
        >
          ✕
        </button>

        <h2 className="mb-2 text-center text-xl font-semibold sm:text-start sm:text-2xl">
          {t("verify.secure")}
        </h2>

        <p className="mb-6 text-center text-sm text-gray-500 sm:text-start sm:text-base">
          {t("verify.enter")}
        </p>

        <div
          className="mb-6 flex justify-center gap-2 sm:gap-3"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              type="tel"
              maxLength="1"
              value={digit}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={status === "verifying" || status === "success"}
              className={`h-10 w-10 rounded border text-center text-lg transition-all duration-200 focus:outline-none sm:h-12 sm:w-12 sm:text-xl ${
                status === "success"
                  ? "border-green-600"
                  : status === "error"
                    ? "animate-shake border-red-500"
                    : "border-gray-300 focus:ring-1 focus:ring-[rgb(var(--color-primary-2))]"
              }`}
            />
          ))}
        </div>

        <div className="mb-4 text-center text-sm text-gray-500">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="cursor-pointer font-medium text-black underline"
            >
              {t("verify.resend")}
            </button>
          ) : (
            <p>
              {t("verify.time")} {timer}
            </p>
          )}
        </div>

        {error ? (
          <p className="mb-3 text-center text-sm text-red-600">{error}</p>
        ) : null}
      </div>
    </div>
  );
}

export default VerifyOTPModal;
