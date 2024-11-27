import React, { useRef, useState, useEffect  } from 'react';
import { Layer, Line, Stage, Rect   ,RegularPolygon , Circle, Ellipse, Transformer } from 'react-konva';
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
    Delete: "delete",
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
    deleted: null,
    zIndex:null,

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

    //zIndexTracker
    const [zIndexTracker, setZIndexTracker] = useState(0); 
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
                //increment zIndexTracker 
                setZIndexTracker(zIndexTracker + 1);

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
                        zIndex:zIndexTracker,
                    }
                ])
                
                break;
            }
           
            case Tool.Line:{
                //increment zIndexTracker 
                setZIndexTracker(zIndexTracker + 1);
                
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
                        zIndex:zIndexTracker,
                        deleted: false,
                    }
                ])
                // console.log(lines[lines.length-1]);
                break;
            }

            case Tool.Rectangle:{
                //increment zIndexTracker 
                setZIndexTracker(zIndexTracker + 1);
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
                        zIndex:zIndexTracker,
                        deleted: false,
                    }
                ])

                break;
            }
            case Tool.Square:{
                //increment zIndexTracker 
                setZIndexTracker(zIndexTracker + 1);
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
                        zIndex:zIndexTracker,
                        deleted: false,
                    }
                ])
                // console.log(squares[squares.length-1])
                break;
            }

            case Tool.Triangle:{
                //increment zIndexTracker 
                setZIndexTracker(zIndexTracker + 1);
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

                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                        fill_Colour:"rgba(0, 0, 0, 0)",
                        zIndex:zIndexTracker,
                        deleted: false,
                        
                    }
                ])

                break;
            }
            case Tool.Circle:{
                //increment zIndexTracker 
                setZIndexTracker(zIndexTracker + 1);
                console.log("Start Circle")
                setCircle((prevCircles) => [
                    ...prevCircles,
                    {
                        ...Properties,
                        type: Tool.Circle,
                        ID: id,
                        X: x, 
                        Y: y,
                        stroke_Colour: strokeColor,
                        strokeWidth: strokeWidth,
                        radius: 0,

                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                        fill_Colour:"rgba(0, 0, 0, 0)",
                        zIndex:zIndexTracker,
                        deleted: false,

                    }
                ])

                break;
            }


            case Tool.Ellipse:{
                //increment zIndexTracker 
                setZIndexTracker(zIndexTracker + 1);
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
                        zIndex:zIndexTracker,
                        deleted: false,
                    }
                ])

                break;
            }
            
        }
    }

    const handleDelete = (id,type) =>{
        if(tool === Tool.Delete)
            {
                console.log("will delete");
                switch(type){
                    case Tool.Scribble:{
                        setScribbles((prevScribbles) =>
                            prevScribbles.map((scribble) =>
                              scribble.ID === id ? { ...scribble, deleted:true } : scribble
                            )
                          );
                        break;
                    }
                    case Tool.Line:{
                        setLines((prevLines) =>
                            prevLines.map((line) =>
                              line.ID === id ? { ...line, deleted:true } : line
                            )
                          );
                        break;
                    }
                    case Tool.Rectangle:{
                        setRectangles((prevRectangles) =>
                            prevRectangles.map((rectangle) =>
                              rectangle.ID === id ? { ...rectangle, deleted:true } : rectangle
                            )
                          );
                        break;
                    }
                    case Tool.Square:{
                        setSquares((prevSquares) =>
                            prevSquares.map((square) =>
                              square.ID === id ? { ...square, deleted:true } : square
                            )
                          );
                        break;
                    }
                    case Tool.Triangle:{
                        setTriangles((prevTriangles) =>
                            prevTriangles.map((triangle) =>
                              triangle.ID === id ? { ...triangle, deleted:true } : triangle
                            )
                          );
                        break;
                    }
                    case Tool.Circle:{
                        setCircle((prevCircles) =>
                            prevCircles.map((circle) =>
                              circle.ID === id ? { ...circle, deleted:true } : circle
                            )
                          );
                        break;
                    }
                    case Tool.Ellipse:{
                        setEllipse((prevEllipses) =>
                            prevEllipses.map((Ellipse) =>
                              Ellipse.ID === id ? { ...Ellipse, deleted:true } : Ellipse
                            )
                          );
                        break;
                    }
                }
                setSelectedId(null);
                transformerRef.current.nodes([]);
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
    const handleDragStart = (id,type) => {
        setZIndexTracker(zIndexTracker + 1);
        switch(type){
            case Tool.Scribble:{
                setScribbles((prevScribbles) =>
                    prevScribbles.map((scribble) =>{
                        if(scribble.id === id) {
                            return { ...scribble,
                                zIndex:zIndexTracker
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
                            return { ...line,
                                zIndex:zIndexTracker
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
                    circle.id === id ?  { ...circle, zIndex:zIndexTracker } : circle
                )
                );
                break;
            }
            case Tool.Ellipse:{
                setEllipse((prevEllipses) =>
                    prevEllipses.map((Ellipse) =>
                    Ellipse.id === id ? { ...Ellipse, zIndex:zIndexTracker } : Ellipse
                )
                );
                break;
            }
            case Tool.Rectangle:{
                setRectangles((prevRectangles) =>
                    prevRectangles.map((rectangle) =>
                    rectangle.id === id ? { ...rectangle, zIndex:zIndexTracker } : rectangle
                )
                );
                break;
            }
            case Tool.Square:{
                setSquares((prevSquares) =>
                    prevSquares.map((square) =>
                    square.id === id ? { ...square,zIndex:zIndexTracker } : square
                )
                );
                break;
            }
            case Tool.Triangle:{
                setTriangles((prevTriangles) =>
                    prevTriangles.map((triangle) =>
                    triangle.id === id ? { ...triangle,zIndex:zIndexTracker } : triangle
                    )
                );
                break;
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
                        rotation:d,
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

    // We can only drag shapes if we select them
    const isDraggable = (tool === Tool.Select);
    const transformerRef = useRef();
    const shapeRef = useRef();
    const [selectedId, setSelectedId] = useState(null); // State to track the selected shapeID

    const handleSelect = (e) => {
        if (tool === Tool.Select) setSelectedId(e.target.id());
    };

    const handleDeselect = (e) => {
        if (e.target === e.target.getStage()) {
            setSelectedId(null);
            transformerRef.current.nodes([]);
        }
    };

    useEffect(() => {
        if (transformerRef.current && selectedId) {
          const stage = transformerRef.current.getStage();
          const selectedNode = stage.findOne(`#${selectedId}`);
          if (selectedNode) {
            transformerRef.current.nodes([selectedNode]);
            transformerRef.current.getLayer().batchDraw();
          }
        }
      }, [selectedId]);

    const handleTransformerEnd = (e, id, type) => {
        console.log("Transform End", e.target);
        const node = e.target; // Get the transformed node (Shape)
    
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const rotation = node.rotation();

        console.log("ScaleX:", scaleX, "ScaleY:", scaleY, "Rotation:", rotation, node.type);

        // Reset scale to 1 after transformation, idk wether this is really correct
        node.scaleX(1);
        node.scaleY(1);

        switch(type){
            case Tool.Scribble:{
                setScribbles((prevScribbles) => prevScribbles.map((scribble) => {
                    if (scribble.ID === id){
                        
                        return {
                            ...scribble,
                            x: node.x(),
                            y: node.y(),
                            rotation: rotation,
                            scaleX: scaleX,
                            scaleY: scaleY,
                        }
                    }
                    
                    return scribble;
                })
                )
                break;
            }

            case Tool.Line:{
                setLines((prevLines) => prevLines.map((line) => {
                    if (line.ID === id){
                        return {
                            ...line,
                            x: node.x(),
                            y: node.y(),
                            rotation: rotation,
                            scaleX: scaleX,
                            scaleY: scaleY,
                        }
                    }

                    return line;
                }))

                break;
            }

            case Tool.Rectangle:{
                 setRectangles((prevRectangles) => prevRectangles.map((rectangle) => {
                    if (rectangle.ID === id){
                        return {
                            ...rectangle,
                            x: node.x(),
                            y: node.y(),
                            rotation: rotation,
                            scaleX: scaleX,
                            scaleY: scaleY,
                        }
                    }

                    return rectangle;
                }))

                break;
            }

            case Tool.Square:{
                setSquares((prevSquares) => prevSquares.map((square) => {
                    if (square.ID === id){
                       return {
                        ...square,
                        x: node.x(),
                        y: node.y(),
                        rotation: rotation,
                        scaleX: scaleX,
                        scaleY: scaleY,
                       }
                   }

                   return square;
               }))

               break;
            }
            case Tool.Triangle:{
                setTriangles((prevTriangles) => prevTriangles.map((triangle) => {

                    if (triangle.ID === id){
                    
                    return {
                        ...triangle,
                        x: node.x(),
                        y: node.y(),
                        rotation: rotation,
                        scaleX: scaleX,
                        scaleY: scaleY,
                    }
                }

                return triangle;
                }))

                break;
            }

            case Tool.Circle: {
                setCircle((prevCircles) =>
                    prevCircles.map((circle) => {
                        if (circle.ID === id) {
                            return {
                                ...circle,
                                x: node.x(),
                                y: node.y(),
                                rotation: rotation,
                                scaleX: scaleX,
                                scaleY: scaleY,
                            };
                        }
                        return circle;
                    })
                );
                break;
            }

            case Tool.Ellipse: {
                setEllipse((prevEllipses) =>
                    prevEllipses.map((ellipse) => {
                        if (ellipse.ID === id) {
                            return {
                                ...ellipse,
                                x: node.x(),
                                y: node.y(),
                                rotation: rotation,
                                scaleX: scaleX,
                                scaleY: scaleY,
                            };
                        }
                        return ellipse;
                    })
                );
                break;
            }
        }
        
    };

    const renderShapes = [...squares, ...triangles,...rectangles, ...circles,...ellipses, ...lines,...scribbles].sort((a, b) => a.zIndex - b.zIndex);
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

                <button className="toolbar-button" title="Delete" onClick={() => setTool(Tool.Delete)}>
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
                    onMouseDown={(e) => {
                        if (tool===Tool.Select){
                            console.log("handleDeselect")
                            handleDeselect(e);
                        }
                        else {
                            handleMouseDown(e);
                        }
                        
                        
                    }}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    ref={stageRef} //For getting positions (cursor)
                >
                    <Layer>

                        {/* Show each scribble in scribbles */}
                        {renderShapes.map((shape) => {
                            if(shape.deleted) return;
                            switch(shape.type){
                            case Tool.Scribble:  
                            return (
                                <Line
                                    key = {shape.ID}
                                    id = {shape.ID}
                                    points = {shape.points}
                                    x={shape.X}
                                    y={shape.Y}
                                    stroke = {shape.stroke_Colour}
                                    strokeWidth = {shape.strokeWidth}
                                    lineCap="round"
                                    lineJoin="round"

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleSelect(e); handleDelete(shape.ID,shape.type)}}
                                    ref={shapeRef}
                                    scaleX = {shape.scaleX}
                                    scaleY = {shape.scaleY}
                                    rotation = {shape.rotation}    
                                    onTransformEnd={(e) => handleTransformerEnd(e, shape.ID, shape.type)}

                                >

                                </Line>
                            )
                        
                        
                        case Tool.Line :
                            console.log("Update Lines")
                            return (
                                <Line
                                    key = {shape.ID}
                                    id = {shape.ID}
                                    points = {shape.points}
                                    stroke = {shape.stroke_Colour}
                                    strokeWidth = {shape.strokeWidth}
                                    lineCap="round"
                                    lineJoin="round"

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleSelect(e); handleDelete(shape.ID,shape.type)}}
                                    ref={shapeRef}
                                    scaleX = {shape.scaleX}
                                    scaleY = {shape.scaleY}
                                    rotation = {shape.rotation}    
                                    onTransformEnd={(e) => handleTransformerEnd(e, shape.ID, shape.type)}
                                >

                                </Line>
                            );
                        
                        case Tool.Rectangle : 
                            return (
                                <Rect
                                    key = {shape.ID}
                                    id = {shape.ID}
                                    x={shape.X}
                                    y={shape.Y}
                                    width={shape.width}
                                    height={shape.height}
                                    stroke = {shape.stroke_Colour}
                                    strokeWidth = {shape.strokeWidth}
                                    fill={shape.fill_Colour}

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleFill(shape.ID,shape.type); handleSelect(e); handleDelete(shape.ID,shape.type)}}
                                    ref={shapeRef}
                                    scaleX = {shape.scaleX}
                                    scaleY = {shape.scaleY}
                                    rotation = {shape.rotation}    
                                    onTransformEnd={(e) => handleTransformerEnd(e, shape.ID, shape.type)}
                                >
                                    
                                </Rect>
                            );
                        

                        case Tool.Square: 
                            return (
                                <Rect
                                    key = {shape.ID}
                                    id = {shape.ID}
                                    x={shape.X}
                                    y={shape.Y}
                                    width={shape.width}
                                    height={shape.height}
                                    stroke = {shape.stroke_Colour}
                                    strokeWidth = {shape.strokeWidth}
                                    fill={shape.fill_Colour}

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleFill(shape.ID,shape.type); handleSelect(e); handleDelete(shape.ID,shape.type)}}
                                    ref={shapeRef}
                                    scaleX = {shape.scaleX}
                                    scaleY = {shape.scaleY}
                                    rotation = {shape.rotation}    
                                    onTransformEnd={(e) => handleTransformerEnd(e, shape.ID, shape.type)}
                                >
                                    
                                </Rect>
                            );
                        

                        case Tool.Triangle: 
                            return(
                                <RegularPolygon
                                    key={shape.ID}
                                    id={shape.ID}
                                    x={shape.X}
                                    y={shape.Y} 
                                    sides={3} 
                                    radius={shape.radius} 
                                    stroke = {shape.stroke_Colour}
                                    strokeWidth = {shape.strokeWidth}
                                    // rotation={triangle.rotate}
                                    fill={shape.fill_Colour}

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleFill(shape.ID,shape.type); handleSelect(e); handleDelete(shape.ID,shape.type)}}
                                    ref={shapeRef}
                                    scaleX = {shape.scaleX}
                                    scaleY = {shape.scaleY}
                                    rotation = {shape.rotation}    
                                    onTransformEnd={(e) => handleTransformerEnd(e, shape.ID, shape.type)}

                                />
                            );
                        
                        case Tool.Circle: 
                            return (
                                <Circle
                                    key={shape.ID}
                                    id={shape.ID}
                                    x={shape.X}
                                    y={shape.Y}
                                    radius={shape.radius}
                                    stroke={shape.stroke_Colour}
                                    strokeWidth={shape.strokeWidth}
                                    fill={shape.fill_Colour}

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleFill(shape.ID,shape.type); handleSelect(e); handleDelete(shape.ID,shape.type)}}
                                    ref={shapeRef}
                                    scaleX = {shape.scaleX}
                                    scaleY = {shape.scaleY}
                                    rotation = {shape.rotation}    
                                    onTransformEnd={(e) => handleTransformerEnd(e, shape.ID, shape.type)}
                                />
                            );
                        

                        case Tool.Ellipse: 
                            return (
                                <Ellipse
                                    key={shape.ID}
                                    id={shape.ID}
                                    x={shape.X}
                                    y={shape.Y}
                                    radiusX={shape.radiusX}
                                    radiusY={shape.radiusY}
                                    stroke={shape.stroke_Colour}
                                    strokeWidth={shape.strokeWidth}
                                    fill={shape.fill_Colour}

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleFill(shape.ID,shape.type); handleSelect(e); handleDelete(shape.ID,shape.type)}}
                                    ref={shapeRef}
                                    scaleX = {shape.scaleX}
                                    scaleY = {shape.scaleY}
                                    rotation = {shape.rotation}    
                                    onTransformEnd={(e) => handleTransformerEnd(e, shape.ID, shape.type)}
                                />
                            );
                        
                        }
                        })}

                        {/* <Transformer ref={transformerRef} /> */}
                        <Transformer ref={transformerRef} />
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