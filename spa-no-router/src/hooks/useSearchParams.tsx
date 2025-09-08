import { useCallback, useContext } from "react";
import { RouterContext } from "../context/ReactContext";
import type { SearchInput } from "../types";

export function useSearchParams() {
  const ctx = useContext(RouterContext);
  if (!ctx)
    throw new Error("useSearchParams should be used within BrowserRouter");
  const { searchParams, setSearchParams: setSearchParamsState } = ctx;

  // a search param string
  // setSearchParams("?tab=1");
  // a shorthand object
  // setSearchParams({ tab: "1" });
  // object keys can be arrays for multiple values on the key
  // setSearchParams({ brand: ["nike", "reebok"] });
  // an array of tuples
  // setSearchParams([["tab", "1"]]);
  // a `URLSearchParams` object
  // setSearchParams(new URLSearchParams("?tab=1"));

  const isTuple = (element: unknown) => {
    return (
      Array.isArray(element) &&
      element.length === 2 &&
      typeof element[0] === "string" &&
      (typeof element[1] === "string" ||
        typeof element[1] === "number" ||
        typeof element[2] === "boolean")
    );
  };

  const toURLSearchParams = (input: SearchInput): URLSearchParams | null => {
    if (!input) return null;
    if (input instanceof URLSearchParams) {
      return input;
    }
    if (typeof input === "string") {
      return new URLSearchParams(input);
    }

    if (Array.isArray(input) && input.every(isTuple)) {
      const usp = new URLSearchParams();
      input.forEach(([k, v]) => usp.append(k, String(v)));
      return usp;
    }

    const inputObj = input as Record<string, unknown>;
    const usp = new URLSearchParams();

    for (const [k, v] of Object.entries(inputObj)) {
      if (v === null) continue;
      if (Array.isArray(v)) {
        v.forEach((item) => usp.append(k, String(item)));
      } else {
        usp.set(k, String(v));
      }
    }

    return usp;
  };

  const setSearchParams = useCallback((input: SearchInput) => {
    const urlSearchParams = toURLSearchParams(input);
    if (!urlSearchParams) return;
    setSearchParamsState(urlSearchParams);
  }, []);

  return [searchParams, setSearchParams] as const;
}
