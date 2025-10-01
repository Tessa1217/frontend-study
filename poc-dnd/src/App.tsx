import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { type Node } from "@/types";
import RootDropZone from "@/components/draggable/RootDropZone";
import { useDragAndDropNode } from "@/hooks/useDragAndDropNode";
import { componentMeta } from "@/components/atoms";
import DraggableArea from "@/components/draggable/DraggableArea";
import "./App.css";
import { nanoid } from "nanoid";

const initialTree: Node[] = [
  {
    id: "1",
    type: "FlexColumnContainer",
    acceptsChildren: true,
    children: [{ id: "2", type: "Button", acceptsChildren: false }],
  },
  { id: "3", type: "Input", acceptsChildren: false },
];
function App() {
  const { tree, moveNode, addNode } = useDragAndDropNode(initialTree);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    if (String(active.id).startsWith("palette-")) {
      const type = active.data.current?.type as Node["type"];
      if (!type) return;
      addNode(over.id === "ROOT" ? null : (over.id as string), {
        id: nanoid(),
        type,
        acceptsChildren: componentMeta[type]?.acceptsChildren,
        children: [],
      });
      return;
    }
    moveNode(
      over.id === "ROOT" ? null : (over.id as string),
      active.id as string
    );
  };

  return (
    <>
      <div className="container">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="draggable-container">
            <DraggableArea />
            <RootDropZone nodes={tree} />
          </div>
        </DndContext>
      </div>
    </>
  );
}

export default App;
