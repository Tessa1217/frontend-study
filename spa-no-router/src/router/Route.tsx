import type { Primitive, RouterProps } from "../types";
import { RouterContext } from "../context/ReactContext";
import { useContext, useEffect } from "react";

function matchPath(path: string, currentPath: string) {
  const patternPaths = path.split("/").filter(Boolean);
  const currentPatternPaths = currentPath.split("/").filter(Boolean);
  if (patternPaths.length !== currentPatternPaths.length) return null;
  const params: Record<string, Primitive> = {};
  for (let i = 0; i < patternPaths.length; i++) {
    const pp = patternPaths[i];
    const cp = currentPatternPaths[i];
    if (pp.startsWith(":")) {
      if (!cp) return null;
      params[pp.slice(1)] = cp;
    } else if (pp != cp) {
      return null;
    }
  }
  return params;
}

export default function Route({ path, element, children }: RouterProps) {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("Route must be used within BrowserRouter");
  const { setParams } = ctx;
  const currentPath = ctx.path;
  const pathMatch = matchPath(path, currentPath);

  useEffect(() => {
    setParams(pathMatch || {});
  }, [path, currentPath, setParams]);

  if (pathMatch === null) {
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
