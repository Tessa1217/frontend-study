import type { RouterProps } from "../types";
import { RouterContext } from "../context/ReactContext";
import { useContext } from "react";

function matchPath(path: string, currentPath: string) {
  return currentPath === path;
}

export default function Route({ path, element, children }: RouterProps) {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("Route must be used within BrowserRouter");
  const currentPath = ctx.path;
  if (!matchPath(path, currentPath)) {
    return null;
  }
  if (children) {
    return (
      <>
        {element}
        {children}
      </>
    );
  }
  return element;
}
