export interface RouterContextProps {
  path: string;
  setPath: (to: string) => void;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
}

export interface BrowserRouterProps {
  children: React.ReactElement;
}

export interface RouterProps {
  path: string;
  element: React.ReactElement;
  children?: React.ReactElement[];
}

export type Primitive = string | number | boolean;
export type SearchInput =
  | string
  | URLSearchParams
  | Record<string, Primitive | Primitive[] | null | undefined>
  | Array<[string, Primitive]>;

export interface LinkPathProps {
  pathname: string;
  search?: string;
}

export interface LinkProps {
  to: LinkPathProps | string;
  children: React.ReactElement | string;
}

export interface PostProps {
  id: number;
  userId: number;
  title: string;
  body: string;
}
