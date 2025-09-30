import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { type Node } from "./types";
import RootDropZone from "./components/RootDropZone";
import { useDragAndDropNode } from "./hooks/useDragAndDropNode";

const initialTree: Node[] = [
  {
    id: "1",
    type: "Container",
    acceptsChildren: true,
    children: [{ id: "2", type: "Button", acceptsChildren: false }],
  },
  { id: "3", type: "Input", acceptsChildren: false },
];
function App() {
  const { tree, moveNode } = useDragAndDropNode(initialTree);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over) {
      moveNode(
        over.id === "ROOT" ? null : (over.id as string),
        active.id as string
      );
    }
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <RootDropZone nodes={tree} moveNode={moveNode} />
      </DndContext>
    </>
  );
}

export default App;
