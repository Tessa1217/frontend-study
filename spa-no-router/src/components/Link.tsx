import type { LinkProps } from "../types";
import { useNavigate } from "../hooks/useNavigate";

interface LinkComponentProps extends LinkProps {
  className?: string;
}

function Link({ to, children, className }: LinkComponentProps) {
  const path = typeof to === "string" ? to : to.pathname;
  const param = typeof to === "string" ? {} : to.param;
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(path, { replace: false, ...param });
  };
  return (
    <a href={path} onClick={onClick} className={className}>
      {children}
    </a>
  );
}

export default Link;
