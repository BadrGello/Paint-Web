import { Stage, Layer, Line } from 'react-konva';
import { useState } from 'react';

function Canvas() {
    const [lines, setLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { points: [pos.x, pos.y] }]);
        console.log(lines)
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const point = e.target.getStage().getPointerPosition();
        const lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <Layer>
                {lines.map((line, i) => (
                    <Line
                        key={i}
                        points={line.points}
                        stroke="yellow"
                        strokeWidth={5}
                        lineCap="round"
                        lineJoin="round"
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default Canvas;
