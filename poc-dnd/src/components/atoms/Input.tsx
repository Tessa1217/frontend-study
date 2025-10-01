import { forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  { className?: string; [key: string]: any }
>(({ className, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      type="text"
      className={`form-input ${className || ""}`}
    />
  );
});

export default Input;