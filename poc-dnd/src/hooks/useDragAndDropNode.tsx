import { useState } from "react";
import { type Node } from "@/types";

export function useDragAndDropNode(initialTree: Node[]) {
  const [tree, setTree] = useState<Node[]>(initialTree);

  const addNode = (parentId: string | null, newNode: Node) => {
    setTree((prev) => {
      if (!parentId) return [...prev, newNode];

      const insert = (nodes: Node[]): Node[] =>
        nodes.map((n) =>
          n.id === parentId && n.acceptsChildren
            ? { ...n, children: [...(n.children || []), newNode] }
            : { ...n, children: n.children ? insert(n.children) : n.children }
        );

      return insert(prev);
    });
  };

  const moveNode = (parentId: string | null, childId: string) => {
    if (parentId === childId) return; // 자기 자신인 경우
    setTree((prev) => {
      const copy: Node[] = structuredClone(prev);
      if (parentId) {
        const parentNode = findParent(copy, parentId);
        if (parentNode && !parentNode.acceptsChildren) {
          return prev; // ❌ children 불가 parent → 이동 취소 예) container 등 요소 포함 가능 노드가 아닌 일반 요소 노드
        }
      }

      const [removed, updated] = removeNode(copy, childId);

      if (!removed) return prev;

      if (!parentId) {
        return [...updated, removed];
      }

      return insertNode(updated, parentId, removed);
    });
  };

  const findParent = (nodes: Node[], id: string): Node | null => {
    for (const n of nodes) {
      // 찾을 때까지 재귀로 탐색
      if (n.id === id) return n;
      if (n.children) {
        const found = findParent(n.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // 노드 삭제
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

  // 노드 추가
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

  return {
    addNode,
    moveNode,
    tree,
  };
}
