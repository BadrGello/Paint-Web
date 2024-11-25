import React, { useRef, useState } from 'react';
import { Layer, Line, Stage, Rect } from 'react-konva';
// for generating unique id's for shapes
import { v4 as uuidv4 } from 'uuid';

const Tool = {
    Select: "select",
    Rectangle: "rectangle",
    Square: "square",
    Circle: "circle",
    Ellipse: "ellipse",
    Scribble: "freedraw",
    Line: "line",
    Triangle: "triangle",
    //more to be added//
};

const Paint = () => {

    const stageRef = useRef()
    const [tool, setTool] = useState(Tool.Select)
    const isDrawing = useRef(false);
    const [strokeColor, setStrokeColor] = useState("black")
    const [strokeWidth, setStrokeWidth] = useState(5)
    const [fillColor, setFillColor] = useState()
    const currentShapeId = useRef()

    //Shapes
    const [scribbles, setScribbles] = useState([]);
    const [lines, setLines] = useState([]);
    const [rectangles, setRectangles] = useState([]);
    const [squares, setSquares] = useState([]);
    ////
    ////
    ////    
  

    
    function handleMouseDown(){
        if (tool === Tool.Select) return;
        
        //Debugging//
        console.log(tool)

        // User is clicking
        isDrawing.current = true;

        //Get position of cursor from stageRef
        const stage = stageRef.current;
        const {x, y} = stage.getPointerPosition();
        //Generate unique id for the shape and stores the current shape id in ref for usage in handleMouseMove()
        const id = uuidv4();
        currentShapeId.current = id;

        switch(tool){
            // We add a new scribble object with the following properties to the old scribbles
            case Tool.Scribble:{
                //Debugging//
                console.log("Start Scribble")
                //         //

                setScribbles((prevScribbles) => [
                    ...prevScribbles,
                    {
                        id: id,
                        points: [x, y],
                        color: strokeColor,
                        strokeWidth: strokeWidth,

                    }
                ])

                break;
            }
           
            case Tool.Line:{
                
                setLines((prevLines) => [
                    ...prevLines,
                    {
                        id: id,
                        points: [x, y, x+5, y+5],
                        color: strokeColor,
                        strokeWidth: strokeWidth,
                    }
                ])

                break;
            }

            case Tool.Rectangle:{
                console.log("Start Rectangle")
                setRectangles((prevRectangles) => [
                    ...prevRectangles,
                    {
                        id: id,
                        X: x, 
                        Y: y,
                        color: strokeColor,
                        strokeWidth: strokeWidth,
                        width:0,
                        height:0
                    }
                ])

            break;
            }
            case Tool.Square:{
                console.log("Start Square")
                setSquares((prevSquares) => [
                    ...prevSquares,
                    {
                        id: id,
                        X: x, 
                        Y: y,
                        color: strokeColor,
                        strokeWidth: strokeWidth,
                        width:0,
                        D:1
                    }
                ])

            break;
            }
        }
    }

    function handleMouseMove(){
        // If user is not drawing (clicking) and moving the cursor, nothing should happen
        if (!isDrawing.current || tool === Tool.Select) return;
        
        //Get position from stageRef
        const stage = stageRef.current;
        const {x, y} = stage.getPointerPosition();

        switch(tool){
            // Append new x, y to points[] array, to the object that has same id as currentShapeId ref
            case Tool.Scribble:{
                //Debugging//
                console.log("Scribbling...")
                //         //

                setScribbles((prevScribbles) => prevScribbles.map((scribble) => {
                    // We search for the current scribble that was initialized in handleMouseDown and append new (x, y) to its points[] array
                    if (scribble.id === currentShapeId.current){
                        return {
                            ...scribble,
                            points: [...scribble.points, x, y]
                        }
                    }

                    return scribble;
                })
                )

                break;
            }

            case Tool.Line:{
                //Debugging//
                console.log("Line...")
                //         //

                setLines((prevLines) => prevLines.map((line) => {
                    if (line.id === currentShapeId.current){
                        return {
                            ...line,
                            points: [line.points[0], line.points[1], x, y]
                        }
                    }

                    return line;
                }))

                break;
            }

            case Tool.Rectangle:{
                 //Debugging//
                 console.log("Rectangling...")
                 //         //
                 setRectangles((prevRectangles) => prevRectangles.map((rectangle) => {

                    if (rectangle.id === currentShapeId.current){
                        return {
                        ...rectangle,
                            width:x-rectangle.X,
                            height:y-rectangle.Y
                        }
                    }

                    return rectangle;
                }))

                break;
            }

            case Tool.Square:{
                //Debugging//
                console.log("Squaring...")
                //         //
                setSquares((prevSquares) => prevSquares.map((square) => {

                    if (square.id === currentShapeId.current){
                       return {
                       ...square,
                           width:x-square.X,
                           D: (y - square.Y<0) ? -1 : 1
                       }
                   }

                   return square;
               }))

               break;
           }

        }

    }

    function handleMouseUp(){
        // User is not clicking anymore
        isDrawing.current = false;
    }


    return (
        <div className="container">

            {/*-------------------------------------------------------------------------------Start Toolbar-------------------------------------------------------------------------------*/}

            <div className="toolbar">
                
                <button className="toolbar-button" title="Pen" onClick={() => setTool(Tool.Scribble)}>
                    <img src="../icons/pen.svg" alt="Pen" />
                </button>

                <button className="toolbar-button" title="Fill Drip">
                    <img src="../icons/fill-drip.svg" alt="Fill Drip" />
                </button>

                <input type="color" title="Color Selector" onChange={(e) => {setStrokeColor(e.target.value); setFillColor(e.target.value)}}/>
                
                <input type="range" class="slider" min="1" max="100" value={strokeWidth} title="Size Adjustor" onChange={(e) => setStrokeWidth(Number(e.target.value))}/>

                <button className="toolbar-button" title="Line" onClick={() => setTool(Tool.Line)}>
                    <img src="../icons/line.svg" alt="Line" />
                </button>

                <button className="toolbar-button" title="Square" onClick={() => setTool(Tool.Square)}>
                    <img src="../icons/square.svg" alt="Square" />
                </button>

                <button className="toolbar-button" title="Rectangle" onClick={() => setTool(Tool.Rectangle)}>
                    <img src="../icons/rectangle.svg" alt="Rectangle" />  
                </button>

                <button className="toolbar-button" title="Circle" onClick={() => setTool(Tool.Circle)}>
                    <img src="../icons/circle.svg" alt="Circle" />
                </button>

                <button className="toolbar-button" title="Ellipse" onClick={() => setTool(Tool.Ellipse)}>
                    <img src="../icons/ellipse.ico" alt="Ellipse" />  
                </button>

                <button className="toolbar-button" title="Triangle" onClick={() => setTool(Tool.Triangle)}>
                    <img src="../icons/triangle.svg" alt="Triangle" />  
                </button>

                <button className="toolbar-button" title="Undo">
                    <img src="../icons/arrow-rotate-left-undo.svg" alt="Undo" />
                </button>

                <button className="toolbar-button" title="Redo">
                    <img src="../icons/arrow-rotate-right-redo.svg" alt="Redo" />
                </button>

                <button className="toolbar-button" title="Select" onClick={() => setTool(Tool.Select)}>
                    <img src="../icons/select.svg" alt="Select" />
                </button>

                <button className="toolbar-button" title="Move">
                    <img src="../icons/move.svg" alt="Move" />
                </button>

                <button className="toolbar-button" title="Delete">
                    <img src="../icons/delete.svg" alt="Delete" />
                </button>
            </div>

            {/*-------------------------------------------------------------------------------End Toolbar-------------------------------------------------------------------------------*/}


            {/*-------------------------------------------------------------------------------Start Canvas-------------------------------------------------------------------------------*/}

            <div className="canvas">
                {/* <p>CANVAS</p> */}
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    ref={stageRef} //For getting positions (cursor)
                >
                    <Layer>

                        {/* Show each scribble in scribbles */}
                        {scribbles.map((scribble) => {
                            return (
                                <Line
                                    key = {scribble.id}
                                    id = {scribble.id}
                                    points = {scribble.points}
                                    stroke = {scribble.color}
                                    strokeWidth = {scribble.strokeWidth}
                                    lineCap="round"
                                    lineJoin="round"
                                >

                                </Line>
                            )
                        })}

                        {lines.map((line) => {
                            console.log("Update Lines")
                            return (
                                <Line
                                    key = {line.id}
                                    id = {line.id}
                                    points = {line.points}
                                    stroke = {line.color}
                                    strokeWidth = {line.strokeWidth}
                                    lineCap="round"
                                    lineJoin="round"
                                >

                                </Line>
                            )
                        })}

                        {rectangles.map((rectangle) => {
                            return (
                                <Rect
                                key = {rectangle.id}
                                id = {rectangle.id}
                                x={rectangle.X}
                                y={rectangle.Y}
                                width={rectangle.width}
                                height={rectangle.height}
                                stroke = {rectangle.color}
                                strokeWidth = {rectangle.strokeWidth}
                                >

                                </Rect>
                            )
                        })}

                        {squares.map((square) => {
                            return (
                                <Rect
                                key = {square.id}
                                id = {square.id}
                                x={square.X}
                                y={square.Y}
                                width={square.width}
                                height={square.D*((square.width>0)*square.width+(square.width<0)*-1*square.width)}
                                stroke = {square.color}
                                strokeWidth = {square.strokeWidth}
                                >

                                </Rect>
                            )
                        })}

                    </Layer>
                </Stage>
            </div>

            {/*-------------------------------------------------------------------------------End Canvas-------------------------------------------------------------------------------*/}


            {/*---------------------------------------------------------------Start Toolbar buttons for non-artistic tools--------------------------------------------------------------------------*/}

        <div className="toolbar">
            <button className="toolbar-button" title="Copy">
                <img src="../icons/copy.svg" alt="Copy" />
            </button>
            <button className="toolbar-button" title="Paste">
                <img src="../icons/paste.svg" alt="Paste" />
            </button>
            <button className="toolbar-button" title="Save">
                <img src="../icons/save.svg" alt="Save" />
            </button>
            <button className="toolbar-button" title="Load">
                <img src="../icons/load.svg" alt="Load" />
            </button>
        </div>

        {/*--------------------------------------------------------------------End Toolbar buttons for non-artistic tools-------------------------------------------------------------------------------*/}


        </div>

        
    );
};

export default Paint;