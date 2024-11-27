import React, { useState } from "react";
import { Stage, Layer, Rect, RegularPolygon } from "react-konva";

const SeparateArraysExample = () => {
  const [squares, setSquares] = useState([
    { id: 1, x: 50, y: 50, width: 100, height: 100, fill: "red", zIndex: 3},
    { id: 2, x: 200, y: 200, width: 100, height: 100, fill: "green", zIndex: 2 },
  ]);

  const [triangles, setTriangles] = useState([
    { id: 3, x: 100, y: 100, radius: 50, fill: "blue", zIndex: 1 },
    { id: 4, x: 300, y: 300, radius: 50, fill: "yellow", zIndex: 4 },
  ]);

  const [zIndexTracker, setZIndexTracker] = useState(5); // Keeps track of the latest z-index

  const handleSelectSquare = (id) => {
    setSquares((prevSquares) =>
      prevSquares.map((square) =>
        square.id === id
          ? { ...square, zIndex: zIndexTracker }
          : square
      )
    );
    setZIndexTracker(zIndexTracker + 1);
  };

  const handleSelectTriangle = (id) => {
    setTriangles((prevTriangles) =>
      prevTriangles.map((triangle) =>
        triangle.id === id
          ? { ...triangle, zIndex: zIndexTracker }
          : triangle
      )
    );
    setZIndexTracker(zIndexTracker + 1);
  };

  const handleDragEndSquare = (e, id) => {
    const updatedX = e.target.x();
    const updatedY = e.target.y();

    setSquares((prevSquares) =>
      prevSquares.map((square) =>
        square.id === id ? { ...square, x: updatedX, y: updatedY } : square
      )
    );
  };

  const handleDragEndTriangle = (e, id) => {
    const updatedX = e.target.x();
    const updatedY = e.target.y();

    setTriangles((prevTriangles) =>
      prevTriangles.map((triangle) =>
        triangle.id === id ? { ...triangle, x: updatedX, y: updatedY } : triangle
      )
    );
  };

  // Combine squares and triangles only for rendering, sorted by zIndex
  const renderShapes = [...squares, ...triangles].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {renderShapes.map((shape) =>
          shape.width ? ( // Render Rect if the shape has `width`
            <Rect
              key={shape.id}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.fill}
              draggable
              onDragEnd={(e) => handleDragEndSquare(e, shape.id)}
              onClick={() => handleSelectSquare(shape.id)}
            />
          ) : ( // Otherwise, render RegularPolygon
            <RegularPolygon
              key={shape.id}
              x={shape.x}
              y={shape.y}
              sides={3}
              radius={shape.radius}
              fill={shape.fill}
              draggable
              onDragEnd={(e) => handleDragEndTriangle(e, shape.id)}
              onClick={() => handleSelectTriangle(shape.id)}
            />
          )
        )}
      </Layer>
    </Stage>
  );
};

export default SeparateArraysExample;
