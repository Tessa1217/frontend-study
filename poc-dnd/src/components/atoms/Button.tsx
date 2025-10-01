import { forwardRef, type ReactNode } from "react";

const Button = forwardRef<
  HTMLButtonElement,
  { children?: ReactNode; className?: string; [key: string]: any }
>(({ children, className, ...props }, ref) => {
  return (
    <button {...props} ref={ref} className={`test-button ${className || ""}`}>
      {children || "테스트 버튼"}
    </button>
  );
});

export default Button;