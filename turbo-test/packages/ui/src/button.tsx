"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

const onClick = (appName: string) => alert(`hello ${appName}`);

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button className={className} onClick={() => onClick(appName)}>
      {children}
    </button>
  );
};
