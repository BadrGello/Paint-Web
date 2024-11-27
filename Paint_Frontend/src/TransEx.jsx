import React, { useRef, useState } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const Apps = () => {
  const [selectedId, setSelectedId] = useState(null); // State to track the selected shape
  const transformerRef = useRef(null); // Reference to the transformer

  const handleSelect = (e) => {
    setSelectedId(e.target.name());
  };

  const handleDeselect = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const shapes = [
    { id: "rect1", x: 50, y: 60, width: 100, height: 80, fill: "blue" },
    { id: "rect2", x: 200, y: 100, width: 150, height: 100, fill: "green" },
  ];

  React.useEffect(() => {
    if (transformerRef.current && selectedId) {
      const stage = transformerRef.current.getStage();
      const selectedNode = stage.findOne(`.${selectedId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleDeselect} // Deselect when clicking outside
    >
      <Layer>
        {shapes.map((shape) => (
          <Rect
            key={shape.id}
            {...shape}
            draggable
            name={shape.id} // Name is used to identify the shape
            onClick={handleSelect}
          />
        ))}
        <Transformer ref={transformerRef} />
      </Layer>
    </Stage>
  );
};

export default Apps;
