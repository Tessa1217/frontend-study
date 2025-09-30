import { useDraggable } from "@dnd-kit/core";
import { type Node } from "../types";

function DraggableNode({ node }: { node: Node }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: node.id,
  });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    border: "1px solid #ccc",
    padding: "4px 8px",
    margin: "4px 0",
    background: "#f9f9f9",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {node.type}
    </div>
  );
}

export default DraggableNode;
