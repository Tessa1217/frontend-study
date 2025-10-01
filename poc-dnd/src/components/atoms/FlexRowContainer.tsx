import { forwardRef, type ReactNode } from "react";

const FlexRowContainer = forwardRef<
  HTMLDivElement,
  { children?: ReactNode; className?: string; [key: string]: any }
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={`flex flex-row ${className || ""}`}>
      {children}
    </div>
  );
});

export default FlexRowContainer;