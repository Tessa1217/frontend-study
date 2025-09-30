import Button from "./Button";
import Container from "./Container";
import Input from "./Input";

export const componentMap = {
  Button,
  Container,
  Input,
};

export type ComponentType = keyof typeof componentMap;

export const componentMeta: Record<
  ComponentType,
  { acceptsChildren: boolean }
> = {
  Button: { acceptsChildren: false },
  Input: { acceptsChildren: false },
  Container: { acceptsChildren: true },
};
