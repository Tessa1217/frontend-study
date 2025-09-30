import { type ComponentType } from "./components/index";

export interface Node {
  id: string;
  type: ComponentType;
  acceptsChildren: boolean; // ✅ 추가
  children?: Node[];
}
