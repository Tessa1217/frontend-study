import { createContext, useEffect, useState } from "react";
import type { RouterContextProps } from "../types";

const RouterContext = createContext<RouterContextProps | null>(null);

const ReactContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [path, setPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(
    () => new URLSearchParams(window.location.search)
  );
  const [params, setParams] = useState({});

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      setPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
      setParams(e.state || {});
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  });

  const value: RouterContextProps = {
    path,
    setPath,
    searchParams,
    setSearchParams,
    params,
    setParams,
  };

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

export { RouterContext, ReactContextProvider };
