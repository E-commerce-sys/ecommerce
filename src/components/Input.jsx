import { useState } from "react";
import Eye from "../assets/icons/eye.svg";
import EyeOff from "../assets/icons/eyeOff.svg";

function Input({
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative w-full">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pr-10 border-b
        border-b-[rgb(var(--color-border))]
        text-[rgb(var(--color-text-main))]
        placeholder:text-[rgb(var(--color-border))]
        focus:border-[rgb(var(--color-primary-main))]
        outline-none transition-colors ease-in-out duration-300
        ${className}`}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <img
            src={showPassword ? Eye : EyeOff}
            alt="toggle password"
            className="w-5 h-5"
          />
        </button>
      )}
    </div>
  );
}

export default Input;
