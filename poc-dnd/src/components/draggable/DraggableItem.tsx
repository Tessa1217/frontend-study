import { useDraggable } from "@dnd-kit/core";
import { componentMap, type ComponentType } from "@/components/atoms";

const previewProps: Record<ComponentType, any> = {
  Button: { children: "버튼" },
  Input: { placeholder: "입력" },
  FlexRowContainer: { children: <div className="p-1 bg-gray-100">Row</div> },
  FlexColumnContainer: {
    children: <div className="p-1 bg-gray-100">Column</div>,
  },
};

function DraggableItem({ type }: { type: ComponentType }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `palette-${type}`, // unique ID for palette item
    data: { type }, // 👈 드래그 데이터로 type 전달
  });

  const Component = componentMap[type];

  return (
    <>
      <div>{type}</div>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="draggable-item"
      >
        <Component {...previewProps[type]} />
      </div>
    </>
  );
}

export default DraggableItem;
