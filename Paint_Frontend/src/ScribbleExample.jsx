import React from "react";
import { Stage, Layer, Line } from "react-konva";

const ScribbleExample = () => {
  const scribblePoints = [0, 0, 50, 50, 100, 0, 150, 50]; // Points for the scribble
  const offsetX = 200; // Offset for the second scribble (x position)
  const offsetY = 100; // Offset for the second scribble (y position)

  return (
    <div>
      <h1>Scribble Example</h1>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {/* Scribble at (0, 0) */}
          <Line
            points={scribblePoints}
            stroke="blue"
            strokeWidth={4}
            lineCap="round"
            lineJoin="round"
            draggable // Make the shape draggable
            x={null}
            y={null}
          />

          {/* Scribble with offset */}
          <Line
            points={scribblePoints}
            stroke="red"
            strokeWidth={4}
            lineCap="round"
            lineJoin="round"
            draggable // Make the shape draggable
            x={offsetX}
            y={offsetY}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default ScribbleExample;
