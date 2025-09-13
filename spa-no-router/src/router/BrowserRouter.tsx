import { ReactContextProvider } from "../context/ReactContext";
import type { BrowserRouterProps } from "../types";

function BrowserRouter({ children }: BrowserRouterProps) {
  return <ReactContextProvider>{children}</ReactContextProvider>;
}

export default BrowserRouter;
