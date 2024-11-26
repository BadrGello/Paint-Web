import React, { useRef, useState } from 'react';
import { Layer, Line, Stage, Rect   ,RegularPolygon , Circle, Ellipse } from 'react-konva';
// for generating unique id's for shapes
import { v4 as uuidv4 } from 'uuid';

const Tool = {
    Select: "select",
    Rectangle: "rectangle",
    Square: "square",
    Circle: "circle",
    Ellipse: "ellipse",
    Scribble: "scribble",
    Line: "line",
    Triangle: "triangle",
    fillColor: "fillColor",
    //more to be added//
};

const Properties = {
    ID: null,
    type: null,
    x: null,
    y: null,
    fill_Colour: null,
    stroke_Colour: null,
    strokeWidth: null,
    scaleX: null,
    scaleY: null,
    width: null,
    height: null,
    radius: null,
    radiusX: null,
    radiusY: null,
    points: null,
    rotation: null,

}

const EndPoints = {
    Draw: "http://localhost:8080/api/draw",
    Edit: "http://localhost:8080/api/edit",
    Delete: "http://localhost:8080/api/delete",

}
const Paint = () => {

    //////////Connection to Spring////////////
    // const [response, setResponse] = useState("");
    // const [receivedMessage, setReceivedMessage] = useState("");

    // GET request (Receive)
    // useEffect(() => {
        
    // }, []);

    // POST request (Send)
    const sendShape = async (object, endpoint ="draw") => {
        try {

            let endpointURL = "";
            if (endpoint === "draw") endpointURL = EndPoints.Draw;
            else if (endpoint === "edit") endpointURL = EndPoints.Edit;
            else if (endpoint === "delete") endpointURL = EndPoints.Delete;

            const response = await fetch(endpointURL , {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(object),
            }).then(() => {console.log("Sent Data Successfully: ", object)})

            // const responseData = await response.text();
            // setReceivedMessage(responseData); // Update received message state
            // return data; // Return the response for further processing
        } 
        catch (error) {
            console.error("Error: ", error);
        }
    };
    //////////Connection to Spring////////////



    const stageRef = useRef()
    const [tool, setTool] = useState(Tool.Select)
    const isDrawing = useRef(false);
    const [strokeColor, setStrokeColor] = useState("black")
    const [strokeWidth, setStrokeWidth] = useState(5)
    const [fillColor, setFillColor] = useState() //I think it will need to a property in every shape
    const currentShapeId = useRef()

    //Shapes
    const [scribbles, setScribbles] = useState([]);
    const [lines, setLines] = useState([]);
    const [rectangles, setRectangles] = useState([]);
    const [squares, setSquares] = useState([]);
    const [triangles, setTriangles] = useState([]);
    const [circles, setCircle] = useState([]);
    const [ellipses, setEllipse] = useState([]);
    ////
    ////
    ////    
    // We can only drag shapes if we select them
    const isDraggable = (tool === Tool.Select);
    const transformerRef = useRef();

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
                        ...Properties,
                        type: Tool.Scribble,
                        ID: id,
                        points: [x, y],
                        stroke_Colour: strokeColor,
                        strokeWidth: strokeWidth,
                        
                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                    }
                ])
                
                break;
            }
           
            case Tool.Line:{
                
                setLines((prevLines) => [
                    ...prevLines,
                    {
                        ...Properties,
                        type: Tool.Line,
                        ID: id,
                        points: [x, y, x+5, y+5],
                        stroke_Colour: strokeColor,
                        strokeWidth: strokeWidth,

                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                    }
                ])
                // console.log(lines[lines.length-1]);
                break;
            }

            case Tool.Rectangle:{
                console.log("Start Rectangle")
                setRectangles((prevRectangles) => [
                    ...prevRectangles,
                    {
                        ...Properties,
                        type: Tool.Rectangle,
                        ID: id,
                        X: x, 
                        Y: y,
                        stroke_Colour: strokeColor,
                        strokeWidth: strokeWidth,
                        width:0,
                        height:0,

                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                        fill_Colour:"rgba(0, 0, 0, 0)",
                    }
                ])

                break;
            }
            case Tool.Square:{
                console.log("Start Square")
                setSquares((prevSquares) => [
                    ...prevSquares,
                    {
                        ...Properties,
                        type: Tool.Square,
                        ID: id,
                        X: x, 
                        Y: y,
                        stroke_Colour: strokeColor,
                        strokeWidth: strokeWidth,
                        width:0,
                        height:0,

                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                        fill_Colour:"rgba(0, 0, 0, 0)",
                    }
                ])
                // console.log(squares[squares.length-1])
                break;
            }

            case Tool.Triangle:{
                console.log("Start triangle")
                setTriangles((prevTriangles) => [
                    ...prevTriangles,
                    {
                        ...Properties,
                        type: Tool.Triangle,
                        ID: id,
                        X: x, 
                        Y: y,
                        stroke_Colour: strokeColor,
                        strokeWidth: strokeWidth,
                        radius:0,
                        rotate:0,

                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                        fill_Colour:"rgba(0, 0, 0, 0)",
                        
                    }
                ])

                break;
            }
            case Tool.Circle:{
                console.log("Start Circle")
                setCircle((prevCircles) => [
                    ...prevCircles,
                    {
                        ...Properties,
                        type: Tool.Circle,
                        ID: id,
                        stroke_Colour: strokeColor,
                        strokeWidth: strokeWidth,
                        radius: 0,

                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                        fill_Colour:"rgba(0, 0, 0, 0)",

                    }
                ])

                break;
            }


            case Tool.Ellipse:{
                console.log("Start Ellipse")
                setEllipse((prevEllipses) => [
                    ...prevEllipses,
                    {
                        ...Properties,
                        type: Tool.Ellipse,
                        ID: id,
                        X: x, 
                        Y: y,
                        stroke_Colour: strokeColor,
                        strokeWidth: strokeWidth,
                        radiusX: 0,
                        radiusY: 0,

                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                        fill_Colour:"rgba(0, 0, 0, 0)",
                    }
                ])

                break;
            }
            
        }
    }
    const handleFill = (id,type) =>{
        
        if(tool==Tool.fillColor)
        {
            switch(type){
                case Tool.Circle:{
                    setCircle((prevCircles) =>
                        prevCircles.map((circle) =>
                          circle.ID === id ? { ...circle, fill_Colour: strokeColor } : circle
                        )
                      );
                    break;
                }
                case Tool.Ellipse:{
                    setEllipse((prevEllipses) =>
                        prevEllipses.map((Ellipse) =>
                          Ellipse.ID === id ? { ...Ellipse, fill_Colour: strokeColor } : Ellipse
                        )
                      );
                    break;
                }
                case Tool.Rectangle:{
                    setRectangles((prevRectangles) =>
                        prevRectangles.map((rectangle) =>
                          rectangle.ID === id ? { ...rectangle, fill_Colour: strokeColor } : rectangle
                        )
                      );
                    break;
                }
                case Tool.Square:{
                    setSquares((prevSquares) =>
                        prevSquares.map((square) =>
                          square.ID === id ? { ...square, fill_Colour: strokeColor } : square
                        )
                      );
                    break;
                }
                case Tool.Triangle:{
                    setTriangles((prevTriangles) =>
                        prevTriangles.map((triangle) =>
                          triangle.ID === id ? { ...triangle, fill_Colour: strokeColor } : triangle
                        )
                      );
                    break;
                }
            }
        }
    }
    const handleDragEnd = (e, id,type) => {
        const { x, y } = e.target.position();
        switch(type){
            case Tool.Scribble:{
                setScribbles((prevScribbles) =>
                    prevScribbles.map((scribble) =>{
                        if(scribble.id === id) {
                            return { ...scribble,
                                X:x,Y:y
                    }
                } return scribble;
            }
                        
                )
            );
        break;     
        }
            case Tool.Line:{
                setLines((prevLines) =>
                    prevLines.map((line) =>{
                        if(line.id === id) {
                            const dx=x-line.points[0];
                            const dy=y-line.points[1];
                            return { ...line,
                                 point:[line.points[0]+dx,line.points[1]+dy,line.points[2]+dx,line.points[3]+dy] 
                    } 
                } return line;
            }
                        
                )
            );
        break;     
        }
            case Tool.Circle:{
                setCircle((prevCircles) =>
                    prevCircles.map((circle) =>
                    circle.id === id ?  { ...circle, X:x, Y:y } : circle
                )
                );
                break;
            }
            case Tool.Ellipse:{
                setEllipse((prevEllipses) =>
                    prevEllipses.map((Ellipse) =>
                    Ellipse.id === id ? { ...Ellipse, X:x, Y:y } : Ellipse
                )
                );
                break;
            }
            case Tool.Rectangle:{
                setRectangles((prevRectangles) =>
                    prevRectangles.map((rectangle) =>
                    rectangle.id === id ? { ...rectangle, X:x, Y:y } : rectangle
                )
                );
                break;
            }
            case Tool.Square:{
                setSquares((prevSquares) =>
                    prevSquares.map((square) =>
                    square.id === id ? { ...square,X:x, Y:y } : square
                )
                );
                break;
            }
            case Tool.Triangle:{
                setTriangles((prevTriangles) =>
                    prevTriangles.map((triangle) =>
                    triangle.id === id ? { ...triangle, X:x, Y:y } : triangle
                    )
                );
                break;
            }
        }
        
      };

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
                    if (scribble.ID === currentShapeId.current){
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
                    if (line.ID === currentShapeId.current){
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

                    if (rectangle.ID === currentShapeId.current){
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

                    if (square.ID === currentShapeId.current){
                       const D = (y - square.Y<0) ? -1 : 1
                       return {
                       ...square,
                           width:x-square.X,
                           height:D*((x-square.X>0)*(x-square.X)+(x-square.X<0)*-1*(x-square.X)),
                       }
                   }

                   return square;
               }))

               break;
            }
            case Tool.Triangle:{
                //Debugging//
                console.log("triangling...")
                //         //
                setTriangles((prevTriangles) => prevTriangles.map((triangle) => {

                    if (triangle.ID === currentShapeId.current){
                    const r = Math.sqrt(Math.pow(x-triangle.X,2)+Math.pow(y-triangle.Y,2))
                    const d= Math.atan2((x-triangle.X),(triangle.Y-y))*(180/Math.PI)
                    return {
                    ...triangle,
                        radius:r,
                        rotate:d,
                    }
                }

                return triangle;
                }))

                break;
            }

            case Tool.Circle: {
                console.log("Drawing Circle...");
                setCircle((prevCircles) =>
                    prevCircles.map((circle) => {
                        if (circle.ID === currentShapeId.current) {
                            const radius = Math.sqrt(
                                Math.pow(x - circle.X, 2) + Math.pow(y - circle.Y, 2)
                            ); 
                            return {
                                ...circle,
                                radius: radius,
                            };
                        }
                        return circle;
                    })
                );
                break;
            }

            case Tool.Ellipse: {
                console.log("Drawing Ellipse...");
                setEllipse((prevEllipses) =>
                    prevEllipses.map((ellipse) => {
                        if (ellipse.ID === currentShapeId.current) {
                            const radiusX = Math.abs(x - ellipse.X);
                            const radiusY = Math.abs(y - ellipse.Y); 
            
                            return {
                                ...ellipse,
                                radiusX: radiusX,
                                radiusY: radiusY,
                            };
                        }
                        return ellipse;
                    })
                );
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

                <button className="toolbar-button" title="Fill Drip" onClick={() => setTool(Tool.fillColor)}>
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

                {/* <button className="toolbar-button" title="Move">
                    <img src="../icons/move.svg" alt="Move" />
                </button> */}

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
                                    key = {scribble.ID}
                                    id = {scribble.ID}
                                    points = {scribble.points}
                                    x={scribble.X}
                                    y={scribble.Y}
                                    stroke = {scribble.stroke_Colour}
                                    strokeWidth = {scribble.strokeWidth}
                                    lineCap="round"
                                    lineJoin="round"

                                    //For transformation
                                    scaleX = {scribble.scaleX}
                                    scaleY = {scribble.scaleY}
                                    rotation = {scribble.rotation}

                                    //Drag and Transform (Resize/Rotate)
                                    draggable = {isDraggable}
                                    onDragEnd={(e) => handleDragEnd(e, scribble.id,scribble.type)}
                                    // Idk yet which of the following we don't need
                                    // onClick = {}
                                    // onDragStart = {}
                                    // onDragEnd = {}
                                    // onTransformEnd = {}

                                >

                                </Line>
                            )
                        })}

                        {lines.map((line) => {
                            console.log("Update Lines")
                            return (
                                <Line
                                    key = {line.ID}
                                    id = {line.ID}
                                    points = {line.points}
                                    stroke = {line.stroke_Colour}
                                    strokeWidth = {line.strokeWidth}
                                    lineCap="round"
                                    lineJoin="round"
                                    draggable = {isDraggable}
                                    onDragEnd={(e) => handleDragEnd(e, line.id,line.type)}
                                >

                                </Line>
                            )
                        })}

                        {rectangles.map((rectangle) => {
                            return (
                                <Rect
                                    key = {rectangle.ID}
                                    id = {rectangle.ID}
                                    x={rectangle.X}
                                    y={rectangle.Y}
                                    width={rectangle.width}
                                    height={rectangle.height}
                                    stroke = {rectangle.stroke_Colour}
                                    strokeWidth = {rectangle.strokeWidth}
                                    fill={rectangle.fill_Colour}
                                    onClick={() => handleFill(rectangle.ID,rectangle.type)}
                                    draggable = {isDraggable}
                                    onDragEnd={(e) => handleDragEnd(e, rectangle.id,rectangle.type)}
                                >
                                    
                                </Rect>
                            )
                        })}

                        {squares.map((square) => {
                            return (
                                <Rect
                                    key = {square.ID}
                                    id = {square.ID}
                                    x={square.X}
                                    y={square.Y}
                                    width={square.width}
                                    height={square.height}
                                    stroke = {square.stroke_Colour}
                                    strokeWidth = {square.strokeWidth}
                                    fill={square.fill_Colour}
                                    onClick={() => handleFill(square.ID,square.type)}
                                    draggable = {isDraggable}
                                    onDragEnd={(e) => handleDragEnd(e, square.id,square.type)}
                                >
                                    
                                </Rect>
                            )
                        })}
                        {triangles.map((triangle) => {
                            return(
                                <RegularPolygon
                                    key={triangle.ID}
                                    id={triangle.ID}
                                    x={triangle.X}
                                    y={triangle.Y} 
                                    sides={3} 
                                    radius={triangle.radius} 
                                    stroke = {triangle.stroke_Colour}
                                    strokeWidth = {triangle.strokeWidth}
                                    rotation={triangle.rotate}
                                    fill={triangle.fill_Colour}
                                    onClick={() => handleFill(triangle.ID,triangle.type)} 
                                    draggable = {isDraggable}
                                    onDragEnd={(e) => handleDragEnd(e, triangle.id,triangle.type)}
                                />
                            )
                        })}
                        {circles.map((circle) => {
                            return (
                                <Circle
                                    key={circle.ID}
                                    id={circle.ID}
                                    x={circle.X}
                                    y={circle.Y}
                                    radius={circle.radius}
                                    stroke={circle.stroke_Colour}
                                    strokeWidth={circle.strokeWidth}
                                    fill={circle.fill_Colour}
                                    onClick={() => handleFill(circle.ID,circle.type)}
                                    draggable = {isDraggable}
                                    onDragEnd={(e) => handleDragEnd(e, circle.id,circle.type)}
                                />
                            );
                        })}

                        {ellipses.map((ellipse) => {
                            return (
                                <Ellipse
                                    key={ellipse.ID}
                                    id={ellipse.ID}
                                    x={ellipse.X}
                                    y={ellipse.Y}
                                    radiusX={ellipse.radiusX}
                                    radiusY={ellipse.radiusY}
                                    stroke={ellipse.stroke_Colour}
                                    strokeWidth={ellipse.strokeWidth}
                                    fill={ellipse.fill_Colour}
                                    onClick={() => handleFill(ellipse.ID,ellipse.type)}
                                    draggable = {isDraggable}
                                    onDragEnd={(e) => handleDragEnd(e, ellipse.id,ellipse.type)}
                                />
                            );
                        })}

                        {/* <Transformer ref={transformerRef} /> */}
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