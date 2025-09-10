import { useContext } from "react";
import { RouterContext } from "../context/ReactContext";

export function useParams() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useParams must be used within BrowserRouter");
  return ctx.params;
}
