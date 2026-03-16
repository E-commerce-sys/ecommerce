/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axiosInstance from "../../../axios/axiosInterceptor";
import { useTranslation } from "react-i18next";

function VerifyOTPModal() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ku";
  const navigate = useNavigate();

  const [status, setStatus] = useState("idle");

  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputsRef = useRef([]);

  const code = otp.join("");
  const isComplete = code.length === 6;
  const email = sessionStorage.getItem("verifyEmail");

  function handleClose() {
    navigate("/register");
  }

  // Auto focus first input
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
    if (isComplete && status === "idle") {
      handleVerify();
    }
  }, [code]);

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

  // Paste OTP support
  function handlePaste(e) {
    const paste = e.clipboardData.getData("text");

    if (!/^\d{6}$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

    inputsRef.current[5]?.focus();
  }

  async function handleVerify() {
    if (!isComplete) return;

    try {
      setStatus("verifying");
      setError("");

      await axiosInstance.post("/api/auth/verify-otp", {
        otp: Number(code),
      });

      setStatus("success");

      setTimeout(() => {
        sessionStorage.removeItem("verifyEmail");
        navigate("/");
      }, 700);
    } catch (err) {
      const apiError = err?.response?.data?.errors?.[0]?.message;
      console.log(apiError);

      setError(apiError ? t("verify.apiError") : t("verify.invalid"));
      setStatus("error");

      // reset inputs after small delay
      setTimeout(() => {
        setOtp(["", "", "", "", "", ""]);
        setStatus("idle");
        inputsRef.current[0]?.focus();
      }, 900);
    }
  }

  async function handleResend() {
    if (!canResend) return;

    if (!email) {
      navigate("/register");
      return;
    }

    try {
      setError("");

      await axiosInstance.post("/api/auth/resend-otp", { email });

      setTimer(60);
      setCanResend(false);
    } catch (err) {
      const apiError = err?.response?.data?.errors?.[0]?.message;

      setError(apiError ? t("verify.apiError") : t("verify.expired"));
    }
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      {/* Modal box */}
      <div className="bg-white rounded-xl w-full max-w-md p-6 sm:p-8 shadow-xl relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 ${
            isRTL ? "left-4" : "right-4"
          } text-gray-400 hover:text-black`}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center sm:text-start">
          {t("verify.secure")}
        </h2>

        <p className="text-gray-500 mb-6 text-sm sm:text-base text-center sm:text-start">
          {t("verify.enter")}
        </p>

        {/* OTP inputs */}
        <div
          className="flex justify-center gap-2 sm:gap-3 mb-6"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={status === "verifying" || status === "success"}
              className={`w-10 h-10 sm:w-12 sm:h-12 border-2 rounded text-center text-lg sm:text-xl 
transition-all duration-200
focus:outline-none
${
  status === "success"
    ? "border-green-600"
    : status === "error"
      ? "border-red-500 animate-shake"
      : "border-gray-300 focus:ring-1 focus:ring-[rgb(var(--color-primary-2))]"
}`}
            />
          ))}
        </div>

        {/* Resend */}
        <div className="text-center mb-4 text-sm text-gray-500">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-black cursor-pointer font-medium underline"
            >
              {t("verify.resend")}
            </button>
          ) : (
            <p>
              {t("verify.time")} {timer}
            </p>
          )}
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center mb-3">{error}</p>
        )}
      </div>
    </div>
  );
}

export default VerifyOTPModal;
