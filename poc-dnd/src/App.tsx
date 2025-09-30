import { useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { type Node } from "./types";
import RootDropZone from "./components/RootDropZone";

const initialTree: Node[] = [
  {
    id: "1",
    type: "Container",
    acceptsChildren: true,
    children: [{ id: "2", type: "Button", acceptsChildren: false }],
  },
  { id: "3", type: "Input", acceptsChildren: false },
];
function App() {
  const [tree, setTree] = useState<Node[]>(initialTree);

  const moveNode = (parentId: string | null, childId: string) => {
    if (parentId === childId) return;

    setTree((prev) => {
      const copy: Node[] = structuredClone(prev);

      // parent가 children 허용하지 않으면 무시
      if (parentId) {
        const findParent = (nodes: Node[], id: string): Node | null => {
          for (const n of nodes) {
            if (n.id === id) return n;
            if (n.children) {
              const found = findParent(n.children, id);
              if (found) return found;
            }
          }
          return null;
        };
        const parentNode = findParent(copy, parentId);
        if (parentNode && !parentNode.acceptsChildren) {
          return prev; // ❌ children 불가 parent → 이동 취소
        }
      }

      // 제거
      const removeNode = (nodes: Node[], id: string): [Node | null, Node[]] => {
        const next: Node[] = [];
        let removed: Node | null = null;

        for (const n of nodes) {
          if (n.id === id) {
            removed = n;
            continue;
          }
          if (n.children) {
            const [r, newChildren] = removeNode(n.children, id);
            if (r) {
              removed = r;
              next.push({ ...n, children: newChildren });
            } else {
              next.push(n);
            }
          } else {
            next.push(n);
          }
        }
        return [removed, next];
      };

      const insertNode = (
        nodes: Node[],
        parentId: string,
        newNode: Node
      ): Node[] => {
        return nodes.map((n) => {
          if (n.id === parentId) {
            return { ...n, children: [...(n.children || []), newNode] };
          }
          if (n.children) {
            return {
              ...n,
              children: insertNode(n.children, parentId, newNode),
            };
          }
          return n;
        });
      };

      const [removed, updated] = removeNode(copy, childId);
      if (!removed) return prev;

      // 루트로 이동 → 그냥 최상위 배열로 append
      if (!parentId) {
        return [...updated, removed];
      }

      return insertNode(updated, parentId, removed);
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over) {
      moveNode(
        over.id === "ROOT" ? null : (over.id as string),
        active.id as string
      );
    }
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <RootDropZone nodes={tree} moveNode={moveNode} />
      </DndContext>
    </>
  );
}

export default App;
