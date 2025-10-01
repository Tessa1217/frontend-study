import { componentMap } from "@/components/atoms/index.js";
import { type Node } from "@/types";
import DraggableNode from "@/components/draggable/DraggableNode";
import DroppableArea from "@/components/draggable/DroppableArea";

function TreeNode({ node }: { node: Node }) {
  const Component = componentMap[node.type];
  return (
    <DraggableNode id={node.id}>
      <Component>
        {node.acceptsChildren ? <DroppableArea node={node} /> : undefined}
      </Component>
    </DraggableNode>
  );
}

export default TreeNode;