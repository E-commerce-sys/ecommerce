/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";

function AuthModal({ isOpen, onClose, title, message }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!isOpen) return null;

  function handleLogin() {
    onClose();
    navigate("/login");
  }

  function handleSignup() {
    onClose();
    navigate("/register");
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
        >
          ×
        </button>

        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-[rgb(var(--color-text-main))]">
            {title || t("products.join")}
          </h2>

          <p className="text-sm md:text-base text-[rgb(var(--color-text-main-1))] leading-6">
            {message || t("products.create")}
          </p>

          <div className="flex justify-center sm:flex-row gap-3 mt-2">
            <Button onClick={handleLogin}>{t("log_in")}</Button>

            <Button onClick={handleSignup} variant="outline">
              {t("products.signUp")}{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
