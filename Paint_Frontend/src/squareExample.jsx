import React, { useRef, useState } from 'react';
import { Layer, Stage,Rect } from 'react-konva';

function Canvas() {
    const [squares, setSquares] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);

    const handleMouseDown = (e) => {
        const id = uuidv4();
        currentShapeId.current = id;
        setIsDrawing(true);
        const pos = e.target.getStage().getPointerPosition();
        setSquares([...squares, {
            id: id, 
            X: pos.x,
            Y: pos.y
        }]);
        console.log(squares)
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const point = e.target.getStage().getPointerPosition();
        const lastsquare = squares[squares.length - 1];
        lastsquare.width=point.
        squares.splice(squares.length - 1, 1, lastsquare);
        setSquares(squares.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
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
                {squares.map((square, i) => (
                    <Rect
                        key={i}
                        x={square.X}
                        y={square.Y}
                        width={100}
                        height={100}
                        stroke="black"
                        strokeWidth={2}
                        draggable
                />
                ))}
            </Layer>
        </Stage>
    );
};

export default Canvas;







