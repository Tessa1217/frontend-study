import { forwardRef, type ReactNode } from "react";

const FlexColumnContainer = forwardRef<
  HTMLDivElement,
  { children?: ReactNode; className?: string; [key: string]: any }
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={`flex flex-col ${className || ""}`}>
      {children}
    </div>
  );
});

export default FlexColumnContainer;