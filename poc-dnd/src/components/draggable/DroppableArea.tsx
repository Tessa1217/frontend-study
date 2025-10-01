import { useDroppable } from "@dnd-kit/core";
import { type Node } from "@/types";
import TreeNode from "@/components/draggable/TreeNode";

function DroppableArea({ node }: { node: Node }) {
  const { setNodeRef, isOver } = useDroppable({ id: node.id });

  // children 허용하지 않으면 droppable 만들지 않음
  if (!node.acceptsChildren) return null;

  const style = {
    border: isOver ? "2px dashed blue" : "1px dashed #ccc",
    padding: "8px",
    marginTop: "4px",
    minHeight: "40px",
    borderRadius: "4px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {node.children?.map((child) => (
        <TreeNode key={child.id} node={child} />
      ))}
    </div>
  );
}

export default DroppableArea;
