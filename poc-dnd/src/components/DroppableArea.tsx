import { useDroppable } from "@dnd-kit/core";
import { type Node } from "../types";
import TreeNode from "./TreeNode";

function DroppableArea({
  node,
  onDrop,
}: {
  node: Node;
  onDrop: (parentId: string, childId: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: node.id });

  // children 허용하지 않으면 droppable 만들지 않음
  if (!node.acceptsChildren) return null;

  const style = {
    border: isOver ? "2px dashed blue" : "2px dashed transparent",
    paddingLeft: "16px",
    marginTop: "4px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {node.children?.map((child) => (
        <TreeNode key={child.id} node={child} onDrop={onDrop} />
      ))}
    </div>
  );
}

export default DroppableArea;
