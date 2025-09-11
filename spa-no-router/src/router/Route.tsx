import {
  Children,
  cloneElement,
  isValidElement,
  useContext,
  useEffect,
} from "react";
import { OutletContext } from "@/context/OutletContext";
import { RouterContext } from "@/context/ReactContext";
import type { RouterProps } from "@/types";
import { matchRoutePath, parsePathSegments } from "@/utils/routes.utils";

function findMatchingChild(
  children: React.ReactNode,
  remainingPath: string
): React.ReactElement | null {
  const remainingSegments = parsePathSegments(remainingPath);

  const matchedChild = Children.toArray(children).find((child) => {
    if (!isValidElement(child)) return false;
    const childPath = child.props.path || "";
    const childSegments = parsePathSegments(childPath);
    const isChildIndex = !!child.props.index;

    // 세그먼트 길이가 다르면 매치되지 않음 (인덱스 라우트 제외)
    if (!isChildIndex && childSegments.length !== remainingSegments.length) {
      return false;
    }

    return (
      matchRoutePath(childSegments, remainingSegments, isChildIndex) !== null
    );
  });

  return isValidElement(matchedChild) ? matchedChild : null;
}

export default function Route({
  path = "",
  element,
  index = false,
  children,
}: RouterProps) {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("Route must be used within BrowserRouter");

  const { path: pathname, setParams } = ctx;
  const [patternSegments, pathSegments] = [
    parsePathSegments(path),
    parsePathSegments(pathname),
  ];

  const match = matchRoutePath(patternSegments, pathSegments, index);

  useEffect(() => {
    if (
      match &&
      patternSegments.length === match.consumed &&
      Object.keys(match.params).length > 0
    ) {
      setParams(match.params);
    }
  }, [pathname]);

  // 매치되지 않는 경우 렌더링 X
  if (!match) return null;

  // 부모 path 제외한 남은 path 계산
  const remainingSegments = pathSegments.slice(match.consumed);
  const remainingPath =
    remainingSegments.length > 0 ? "/".concat(remainingSegments.join("/")) : "";

  const matchedChild = children
    ? findMatchingChild(children, remainingPath)
    : null;

  const outlet = matchedChild
    ? cloneElement(matchedChild, { currentPath: remainingPath })
    : null;

  // 부모 element 안의 <Outlet />에 자식들을 주입
  return (
    <OutletContext.Provider value={outlet}>{element}</OutletContext.Provider>
  );
}
