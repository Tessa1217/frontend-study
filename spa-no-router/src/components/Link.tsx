import type { LinkProps } from "../types";
import { useNavigate } from "../hooks/useNavigate";

export default function Link({ to, children }: LinkProps) {
  const path = typeof to === "string" ? to : to.pathname;
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(path, { replace: false });
  };
  return (
    <a href={path} onClick={onClick}>
      {children}
    </a>
  );
}
