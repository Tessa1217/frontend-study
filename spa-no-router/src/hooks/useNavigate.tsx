import { useContext, useCallback } from "react";
import { RouterContext } from "../context/ReactContext";
export function useNavigate() {
  const context = useContext(RouterContext);

  if (!context)
    throw new Error("useNavigate must be used inside the BrowserRouter");

  const { setPath, setSearchParams } = context;

  const navigate = useCallback(
    (to: string, { replace = false }: { replace?: boolean } = {}) => {
      if (replace) {
        window.history.replaceState(null, "", to);
      } else {
        window.history.pushState(null, "", to);
      }
      setPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    },
    []
  );

  return navigate;
}
