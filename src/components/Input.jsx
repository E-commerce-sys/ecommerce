function Input({
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-b
    border-b-[rgb(var(--color-border))]
    text-[rgb(var(--color-text-main))]
    placeholder:text-gray-500
    focus:border-[rgb(var(--color-primary-main))]
  outline-none transition-colors ease-in-out duration-300 ${className}`}
      {...props}
    />
  );
}

export default Input;
