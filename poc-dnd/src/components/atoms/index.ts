import Button from "@/components/atoms/Button";
import FlexRowContainer from "@/components/atoms/FlexRowContainer";
import FlexColumnContainer from "@/components/atoms/FlexColumnContainer";
import Input from "@/components/atoms/Input";

export const componentMap = {
  Button,
  FlexRowContainer,
  FlexColumnContainer,
  Input,
};

export type ComponentType = keyof typeof componentMap;

export const componentMeta: Record<
  ComponentType,
  { acceptsChildren: boolean }
> = {
  Button: { acceptsChildren: false },
  Input: { acceptsChildren: false },
  FlexRowContainer: { acceptsChildren: true },
  FlexColumnContainer: { acceptsChildren: true },
};
