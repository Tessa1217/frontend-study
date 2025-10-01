import { useDroppable } from "@dnd-kit/core";
import TreeNode from "@/components/draggable/TreeNode";
import { type Node } from "@/types";

function RootDropZone({ nodes }: { nodes: Node[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: "ROOT" });

  return (
    <div
      className="drop-container"
      ref={setNodeRef}
      style={{
        border: isOver ? "2px dashed green" : "2px dashed #ccc",
        padding: "16px",
        minHeight: "300px", // 최소 높이를 줘야 드롭 가능
        background: "#fefefe",
      }}
    >
      {nodes.map((n) => (
        <TreeNode key={n.id} node={n} />
      ))}
    </div>
  );
}

export default RootDropZone;