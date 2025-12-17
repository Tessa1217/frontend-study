import React from "react";

const pages = import.meta.glob("./pages/**/*.tsx");

function pathToRoute(path: string) {
  return path
    .replace("./pages", "")
    .replace(/\.tsx$/, "")
    .replace(/\/index$/, "/");
}

export const routes = Object.keys(pages).map((path) => {
  const Component = React.lazy(
    pages[path] as () => Promise<{ default: React.ComponentType }>
  );
  return {
    path: pathToRoute(path),
    Component,
  };
});
