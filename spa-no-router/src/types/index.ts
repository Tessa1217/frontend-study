export type Primitive = string | number | boolean;

export type SearchInput =
  | string
  | URLSearchParams
  | Record<string, Primitive | Primitive[] | null | undefined>
  | Array<[string, Primitive]>;

export interface RouterContextProps {
  path: string;
  setPath: (to: string) => void;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
  params: Record<string, Primitive>;
  setParams: (param: Record<string, Primitive>) => void;
}

export interface BrowserRouterProps {
  children: React.ReactElement;
}

export interface RouterProps {
  path?: string;
  element: React.ReactElement;
  children?: React.ReactNode;
  index?: boolean;
}

export interface LinkPathProps {
  pathname: string;
  param?: Record<string, Primitive>;
  search?: string;
}

export interface LinkProps {
  to: LinkPathProps | string;
  children: React.ReactElement | string;
}

export interface MatchResult {
  params: Record<string, string>;
  consumed: number;
}

export interface PostProps {
  id: number;
  title: string;
  body: string;
  category: string;
  author: string;
  thumbnail_url?: string;
}
