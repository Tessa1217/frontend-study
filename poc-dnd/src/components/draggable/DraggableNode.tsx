import { useDraggable } from "@dnd-kit/core";
import React from "react";

function DraggableNode({
  id,
  children,
}: {
  id: string;
  children: React.ReactElement;
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });

  return React.cloneElement(children, {
    ref: setNodeRef,
    ...attributes,
    ...listeners,
    style: { ...children.props.style, cursor: "grab" },
  });
}

export default DraggableNode;
