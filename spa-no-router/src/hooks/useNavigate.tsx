import { useContext, useCallback } from "react";
import { RouterContext } from "../context/ReactContext";
import type { Primitive } from "../types";
export function useNavigate() {
  const context = useContext(RouterContext);

  if (!context)
    throw new Error("useNavigate must be used inside the BrowserRouter");

  const { setPath, setSearchParams, setParams } = context;

  const navigate = useCallback(
    (
      to: string,
      {
        replace = false,
        params = {},
      }: { replace?: boolean; params?: Record<string, Primitive> } = {}
    ) => {
      if (replace) {
        window.history.replaceState(params, "", to);
      } else {
        window.history.pushState(params, "", to);
      }
      setPath(window.location.pathname);
      setParams(params);
      setSearchParams(new URLSearchParams(window.location.search));
    },
    []
  );

  return navigate;
}
