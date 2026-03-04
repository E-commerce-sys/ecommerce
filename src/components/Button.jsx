function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...props
}) {
  const baseStyle =
    "rounded-sm font-medium transition-all duration-200 flex items-center justify-center";

  const variants = {
    primary:
      "bg-[rgb(var(--color-primary-main))] text-white hover:bg-[rgb(var(--color-primary-dark))]",
    outline:
      "border border-[rgb(var(--color-primary-main))] text-[rgb(var(--color-text-main))] hover:bg-[rgb(var(--color-primary-light))]",
    ghost:
      "text-[rgb(var(--color-primary-main))] hover:bg-[rgb(var(--color-primary-light))]",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "text-sm w-[100px] h-[40px]",
    md: "text-base w-[159px] h-[56px]",
    lg: "text-lg w-[371px] h-[56px] ",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`cursor-pointer
        ${baseStyle}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;
