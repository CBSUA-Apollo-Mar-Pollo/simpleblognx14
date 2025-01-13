"use client";

import React, { useState } from "react";

const Resizable = ({ children }) => {
  const [size, setSize] = useState({ x: 400, y: 300 });

  const handler = (mouseDownEvent) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    const onMouseMove = (mouseMoveEvent) => {
      setSize((currentSize) => ({
        x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
        y: startSize.y - startPosition.y + mouseMoveEvent.pageY,
      }));
    };

    const onMouseUp = () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    };

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return (
    <div
      id="container"
      style={{ width: size.x, height: size.y }}
      className="relative border-2 border-gray-500"
    >
      {children}
      <button
        id="draghandle"
        type="button"
        onMouseDown={handler}
        className="absolute bottom-0 right-0 p-2 bg-gray-600 text-white"
      >
        Resize
      </button>
    </div>
  );
};

export default Resizable;
