import { componentMap } from ".";
import { type Node } from "../types";
import DraggableNode from "./DraggableNode";
import DroppableArea from "./DroppableArea";

function TreeNode({
  node,
  onDrop,
}: {
  node: Node;
  onDrop: (parentId: string, childId: string) => void;
}) {
  const Component = componentMap[node.type];
  return (
    <div style={{ marginBottom: "8px" }}>
      <DraggableNode node={node} />
      <Component>
        {/* children 허용할 때만 drop zone 붙임 */}
        <DroppableArea node={node} onDrop={onDrop} />
      </Component>
    </div>
  );
}

export default TreeNode;
