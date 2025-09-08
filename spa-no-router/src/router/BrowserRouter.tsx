import { ReactContextProvider } from "../context/ReactContext";
import type { BrowserRouterProps } from "../types";

export default function BrowserRouter({ children }: BrowserRouterProps) {
  return <ReactContextProvider>{children}</ReactContextProvider>;
}
