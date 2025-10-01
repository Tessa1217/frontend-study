import { componentMeta } from "@/components/atoms";
import { type ComponentType } from "@/components/atoms";
import DraggableItem from "@/components/draggable/DraggableItem";

function DraggableArea() {
  return (
    <aside className="draggable-area">
      {Object.keys(componentMeta).map((type) => (
        <DraggableItem key={type} type={type as ComponentType} />
      ))}
    </aside>
  );
}

export default DraggableArea;
