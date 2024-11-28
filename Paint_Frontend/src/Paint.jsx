import React, { useRef, useState, useEffect  } from 'react';
import { Layer, Line, Stage, Rect, RegularPolygon , Circle, Ellipse, Transformer } from 'react-konva';
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
    Copy: "copy",
    Paste: "paste",
    Undo: "undo",
    Redo: "redo",
    SaveXML: "savexml",
    LoadXML: "loadxml",
    SaveJSON: "savejson",
    LoadJSON: "loadjson",
    //more may be added//
};

const shapeTools = [
    Tool.Rectangle,
    Tool.Square,
    Tool.Circle,
    Tool.Ellipse,
    Tool.Scribble,
    Tool.Line,
    Tool.Triangle,
];

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

    Copy: "http://localhost:8080/api/copy",
    Paste: "http://localhost:8080/api/paste",


    Savexml: "http://localhost:8080/api/savexml",
    Loadxml: "http://localhost:8080/api/loadxml",
    Savejson: "http://localhost:8080/api/savejson",
    Loadjson: "http://localhost:8080/api/loadjson",

    Undo: "http://localhost:8080/api/undo",
    Redo: "http://localhost:8080/api/redo",

}
const Paint = () => {

    //////////Connection to Spring////////////
    // const [response, setResponse] = useState("");
    const [responseData, setResponseMessage] = useState("");

    const sendShape = async (object, endpointURL) => {
        try {

            const response = await fetch(endpointURL , {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(object),
            })
            console.log("Sent Data Successfully: ", object)
            const responseData = await response.json();
            setResponseMessage(responseData); // Update response message state
            return responseData; // Return the response for further processing
        } 
        catch (error) {
            console.error("Error Communicating: ", error);
        }
    };
    

    //Send upon Saving: tool, strokeColor, strokeWidth, fillColor, zIndexTracker
    //Upon Loading: recieve the 5 states i saved and all the shapes
    
    //LOAD//
    // const [receivedShapes, setReceivedShapes] = useState([]);
    //Load 5 states as well//
   
    //SAVE//
    const handleSave = async () => {

        const fileName = prompt("Enter file name");
        if (!fileName || fileName === "") {
            alert("Unsuitable file name!");
            return;
        }
    
        const path = prompt("Enter path:\n(As: C:\\Users\\User\\Desktop\\)");
        if (!path || path === "") {
            alert("Unsuitable file path!");
            return;
        }
    
        try {

            // data to be sent
            let data = {
                Path: path, //String
                FileName: fileName, //String
    
                zIndexTracker: zIndexTracker, //Int
            };

            // response is json
            let response;
            
            if (tool === Tool.SaveJSON){
                response = await sendShape(data, EndPoints.Savejson)
            }

            else if (tool === Tool.SaveXML){
                response = await sendShape(data, EndPoints.Savexml)
            }

            //DEBUG//
            console.log(response)
            /////////
            
            if (!response || response === 'null' || response === '') {
                alert("Path doesn't exist!");
                return;
            }

            alert("Your file is saved successfully");
        } 
        catch (error) {
            alert("Error saving the file");
        }
    }

    const handleLoad = async () => {

        const path = prompt("Enter path:\n(As: C:\\Users\\User\\Desktop\\file)");
        if (!path || path === "") {
            alert("Unsuitable file path!");
            return;
        }
    
        try {

            // data to be sent
            let data = {
                Path: path, //String
                // FileName: fileName, //String
            };

            // response is json
            let response;
            
            if (tool === Tool.LoadJSON){
                response = await sendShape(data, EndPoints.Loadjson)
            }

            else if (tool === Tool.LoadXML){
                response = await sendShape(data, EndPoints.Loadxml)
            }

            //DEBUG//
            console.log(response)
            /////////

            if (!response || response === 'null' || response === '') {
                alert("Path or file doesn't exist!");
                return;
            }

            alert("Your file is being loaded");
    
            

        } 

        catch (error) {
            alert("Error loading the file");
        }

        
        // Reset all shapes to empty
        setScribbles([]);
        setLines([]);
        setRectangles([]);
        setSquares([]);
        setCircle([]);
        setEllipse([]);
        setTriangles([]);
        
        let receivedShapes = response.Shapes;
        setZIndexTracker(response.zIndexTracker);

        const addShape = (shape, setShape) => {
            setShape((prevShapes) => [
                ...prevShapes,
                {
                    ...Properties,
                    ID: shape.ID,
                    type: shape.type,
                    x: shape.x,
                    y: shape.y,
                    fill_Colour: shape.fill_Colour,
                    stroke_Colour: shape.stroke_Colour,
                    strokeWidth: shape.strokeWidth,
                    scaleX: shape.scaleX,
                    scaleY: shape.scaleY,
                    width: shape.width,
                    height: shape.height,
                    radius: shape.radius,
                    radiusX: shape.radiusX,
                    radiusY: shape.radiusY,
                    points: shape.points,
                    rotation: shape.rotation,
                    deleted: shape.deleted,
                    zIndex: shape.zIndex,
                }
            ]);
        };

        receivedShapes.forEach((shape) => {
            switch (shape.type) {
                case Tool.Scribble:
                    addShape(shape, setScribbles);
                    break;
                case Tool.Line:
                    addShape(shape, setLines);
                    break;
                case Tool.Rectangle:
                    addShape(shape, setRectangles);
                    break;
                case Tool.Square:
                    addShape(shape, setSquares);
                    break;
                case Tool.Triangle:
                    addShape(shape, setTriangles);
                    break;
                case Tool.Circle:
                    addShape(shape, setCircle);
                    break;
                case Tool.Ellipse:
                    addShape(shape, setEllipse);
                    break;
                default:
                    console.warn(`Unhandled shape type: ${shape.type}`);
            }
        });
    
    };


    
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const saveToHistory = () => {
        const currentState = {
            scribbles,
            lines,
            rectangles,
            squares,
            triangles,
            circles,
            ellipses,
            zIndexTracker,
        };
        setUndoStack((prev) => [...prev, currentState]);
        setRedoStack([]);
    };
    const handleUndo = () => {
        if (undoStack.length === 0) return;
    
        const lastState = undoStack.pop();
        setRedoStack((prev) => [...prev, {
            scribbles, lines, rectangles, squares, triangles, circles, ellipses, zIndexTracker
        }]);
        restoreState(lastState);
    };
    
    const handleRedo = () => {
        if (redoStack.length === 0) return;
    
        const nextState = redoStack.pop();
        setUndoStack((prev) => [...prev, {
            scribbles, lines, rectangles, squares, triangles, circles, ellipses, zIndexTracker
        }]);
        restoreState(nextState);
    };
    
    const restoreState = (state) => {
        setScribbles(state.scribbles);
        setLines(state.lines);
        setRectangles(state.rectangles);
        setSquares(state.squares);
        setTriangles(state.triangles);
        setCircle(state.circles);
        setEllipse(state.ellipses);
        setZIndexTracker(state.zIndexTracker);
        setSelectedId(null);
        transformerRef.current.nodes([]);
    };


    //////////Connection to Spring////////////

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
    const [triangles, setTriangles] = useState([]);
    const [circles, setCircle] = useState([]);
    const [ellipses, setEllipse] = useState([]);

    //zIndexTracker for showing correct render of shapes (layering of them)
    const [zIndexTracker, setZIndexTracker] = useState(0); 
    
    //Tracking last shapeModified/Created to send to backend
    const lastModifiedShapeRef = useRef(null);

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


        // Save the current state to undo stack before making changes
        saveToHistory({
            scribbles,
            lines,
            rectangles,
            squares,
            triangles,
            circles,
            ellipses,
            zIndexTracker
        });

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
                        x: x, 
                        y: y,
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
                        x: x, 
                        y: y,
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
                        x: x, 
                        y: y,
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
                        x: x, 
                        y: y,
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
                        x: x, 
                        y: y,
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

    // Helper function for handleDelete
    const deleteShape = (type, id, setState) => {
        let lastModified = null;
    
        setState((prevShapes) =>
            prevShapes.map((shape) => {
                if (shape.ID === id) {
                    const updatedShape = { ...shape, deleted: true };
                    lastModified = updatedShape;
                    return updatedShape;
                }
                return shape;
            })
        );
        saveToHistory();
    
        // Send the last modified shape to the backend
        if (lastModified) {
            sendShape(lastModified, EndPoints.Delete);
        }
    };

    
    const handleDelete = (id,type) =>{
        if(tool === Tool.Delete)
            {
                console.log("will delete");
                switch (type) {
                    case Tool.Scribble: {
                        deleteShape(type, id, setScribbles);
                        break;
                    }
                    case Tool.Line: {
                        deleteShape(type, id, setLines);
                        break;
                    }
                    case Tool.Rectangle: {
                        deleteShape(type, id, setRectangles);
                        break;
                    }
                    case Tool.Square: {
                        deleteShape(type, id, setSquares);
                        break;
                    }
                    case Tool.Triangle: {
                        deleteShape(type, id, setTriangles);
                        break;
                    }
                    case Tool.Circle: {
                        deleteShape(type, id, setCircle);
                        break;
                    }
                    case Tool.Ellipse: {
                        deleteShape(type, id, setEllipse);
                        break;
                    }
                }

                setSelectedId(null);
                transformerRef.current.nodes([]);
            }
    }

    // Helper function for handleFill
    const colorShape = (id, setState, color) => {
        let lastModified = null;

        setState((prevShapes) =>
            prevShapes.map((shape) =>{
                if (shape.ID === id){
                    const updatedShape = { ...shape, fill_Colour: color }
                    lastModified = updatedShape;
                    return updatedShape;
                }

                return shape;
            })
        );
        saveToHistory();

        // Send the last modified shape to the backend
        if (lastModified) {
            sendShape(lastModified, EndPoints.Edit);
        }
    };
    
    const handleFill = (id,type) =>{
        
        if(tool === Tool.fillColor){
            switch (type) {
                case Tool.Circle: {
                    colorShape(id, setCircle, strokeColor);
                    break;
                }
                case Tool.Ellipse: {
                    colorShape(id, setEllipse, strokeColor);
                    break;
                }
                case Tool.Rectangle: {
                    colorShape(id, setRectangles, strokeColor);
                    break;
                }
                case Tool.Square: {
                    colorShape(id, setSquares, strokeColor);
                    break;
                }
                case Tool.Triangle: {
                    colorShape(id, setTriangles, strokeColor);
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

    // Helper function for handleDragEnd
    const updateShapePosition = (id, x, y, setState) => {
        let lastModified = null;
    
        setState((prevShapes) =>
            prevShapes.map((shape) => {
                if (shape.ID === id) {
                    const updatedShape = { ...shape, x, y };
                    lastModified = updatedShape;
                    return updatedShape;
                }
                return shape;
            })
        );
        saveToHistory();
    
        // Send the last modified shape to the backend
        if (lastModified) {
            sendShape(lastModified, EndPoints.Edit);
        }
    };
    
    const handleDragEnd = (e, id, type) => {
        const { x, y } = e.target.position();
    
        switch (type) {
            case Tool.Scribble: {
                updateShapePosition(id, x, y, setScribbles);
                break;
            }
            case Tool.Line: {
                updateShapePosition(id, x, y, setLines);
                break;
            }
            case Tool.Circle: {
                updateShapePosition(id, x, y, setCircle);
                break;
            }
            case Tool.Ellipse: {
                updateShapePosition(id, x, y, setEllipse);
                break;
            }
            case Tool.Rectangle: {
                updateShapePosition(id, x, y, setRectangles);
                break;
            }
            case Tool.Square: {
                updateShapePosition(id, x, y, setSquares);
                break;
            }
            case Tool.Triangle: {
                updateShapePosition(id, x, y, setTriangles);
                break;
            }
        }
    };
    

    function handleMouseMove() {
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
                        const updatedScribble = {
                            ...scribble,
                            points: [...scribble.points, x, y]
                        }

                        lastModifiedShapeRef.current = updatedScribble;
                        return updatedScribble;
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
                        const updatedLine = {
                            ...line,
                            points: [line.points[0], line.points[1], x, y]
                        }

                        lastModifiedShapeRef.current = updatedLine;
                        return updatedLine;
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
                        const updatedRectangle = {
                        ...rectangle,
                            width:x-rectangle.x,
                            height:y-rectangle.y
                        }

                        lastModifiedShapeRef.current = updatedRectangle;
                        return updatedRectangle;
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
                        const D = (y - square.y<0) ? -1 : 1
                        const updatedSquare = {
                        ...square,
                            width:x-square.x,
                            height:D*((x-square.x>0)*(x-square.x)+(x-square.x<0)*-1*(x-square.x)),
                        }

                        lastModifiedShapeRef.current = updatedSquare;
                        return updatedSquare;
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
                    const r = Math.sqrt(Math.pow(x-triangle.x,2)+Math.pow(y-triangle.y,2))
                    const d= Math.atan2((x-triangle.x),(triangle.y-y))*(180/Math.PI)
                    const updatedTriangle = {
                        ...triangle,
                        radius:r,
                        rotation:d,
                    }
                    lastModifiedShapeRef.current = updatedTriangle;
                    return updatedTriangle;
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
                                Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2)
                            ); 
                            const updatedCircle = {
                                ...circle,
                                radius: radius,
                            };

                            lastModifiedShapeRef.current = updatedCircle;
                            return updatedCircle;
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
                            const radiusX = Math.abs(x - ellipse.x);
                            const radiusY = Math.abs(y - ellipse.y); 
            
                            const updatedEllipse = {
                                ...ellipse,
                                radiusX: radiusX,
                                radiusY: radiusY,
                            };

                            lastModifiedShapeRef.current = updatedEllipse;
                            return updatedEllipse;
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

        // If mouseUp and we were drawing (using one of the 7 drawing tools), send the final shape to backend
        if (shapeTools.includes(tool) && lastModifiedShapeRef.current){
            sendShape(lastModifiedShapeRef.current, EndPoints.Draw);
        }
    }

    ///////////////
    //Transformer//

    // We can only drag shapes if we select them
    const isDraggable = (tool === Tool.Select);
    const transformerRef = useRef();
    const shapeRef = useRef();
    const [selectedId, setSelectedId] = useState(null); // State to track the selected shapeID
    const [xCopy, setxCopy] = useState(null); 
    const [yCopy, setyCopy] = useState(null);
    
    const handleSelect = (e) => {
        if (tool === Tool.Select) setSelectedId(e.target.id());
    };

    const handleDeselect = (e) => {
        console.log(squares[squares.length-1])
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

    
    // Helper function for handleTransformerEnd
    const updateShapeTransform = (id, x, y, rotation, scaleX, scaleY, setState) => {
        let lastModified = null;
    
        setState((prevShapes) =>
            prevShapes.map((shape) => {
                if (shape.ID === id) {
                    const updatedShape = { ...shape, x, y, rotation, scaleX, scaleY};
                    lastModified = updatedShape;
                    return updatedShape;
                }
                return shape;
            })
        );
    
        // Send the last modified shape to the backend
        if (lastModified) {
            sendShape(lastModified, EndPoints.Edit);
        }
    }

    const handleTransformerEnd = (e, id, type) => {
        console.log("Transform End", e.target);
        const node = e.target; // Get the transformed node (Shape)
    
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const rotation = node.rotation();

        console.log("ScaleX:", scaleX, "ScaleY:", scaleY, "Rotation:", rotation, node.type);

        // Reset scale to 1 after transformation, idk whether this is really correct
        node.scaleX(1);
        node.scaleY(1);

        saveToHistory();

        switch (type) {
            case Tool.Scribble: {
                updateShapeTransform(id, node.x(), node.y(), rotation, scaleX, scaleY, setScribbles);
                break;
            }
            case Tool.Line: {
                updateShapeTransform(id, node.x(), node.y(), rotation, scaleX, scaleY, setLines);
                break;
            }
            case Tool.Rectangle: {
                updateShapeTransform(id, node.x(), node.y(), rotation, scaleX, scaleY, setRectangles);
                break;
            }
            case Tool.Square: {
                updateShapeTransform(id, node.x(), node.y(), rotation, scaleX, scaleY, setSquares);
                break;
            }
            case Tool.Triangle: {
                updateShapeTransform(id, node.x(), node.y(), rotation, scaleX, scaleY, setTriangles);
                break;
            }
            case Tool.Circle: {
                updateShapeTransform(id, node.x(), node.y(), rotation, scaleX, scaleY, setCircle);
                break;
            }
            case Tool.Ellipse: {
                updateShapeTransform(id, node.x(), node.y(), rotation, scaleX, scaleY, setEllipse);
                break;
            }
        }
    }

    //////////////////
    //Copy and Paste//

    const [copiedShape, setCopiedShape] = useState()
    
    //Send to backend for prototype//
    const handleCopy = (e, shape) => {
        const {x, y} = stageRef.current.getPointerPosition();
        setxCopy(x);
        setyCopy(y);

        if (tool === Tool.Copy && shape){
            console.log(shape)

            setCopiedShape(shape);
        }
    }

    const handlePaste = (e) => {
        if (tool === Tool.Paste && copiedShape){
            //Get position of cursor from stageRef
            const stage = stageRef.current;
            const {x, y} = stage.getPointerPosition();
            //Generate unique id for the shape and stores the current shape id in ref for usage in handleMouseMove()
            const id = uuidv4();
            currentShapeId.current = id;

            setZIndexTracker(zIndexTracker + 1);
            
            //Final pastedShape to be displayed/sent
            let pastedShape
            pastedShape = {
                ...copiedShape,
                ID: id,
                x: x-xCopy+copiedShape.x,
                y: y-yCopy+copiedShape.y,
                zIndex: zIndexTracker,
            }
            //We calulate relative position and add it to the copiedShape x, y 

            console.log("Paste...,", pastedShape);
            saveToHistory();
            switch(copiedShape.type){

                case Tool.Scribble:{
                    setScribbles((prevScribbles) => [...prevScribbles, pastedShape]);
                    console.log(scribbles)
                    break;
                }
                case Tool.Line:{
                    setLines((prevLines) => [...prevLines, pastedShape]);
                    break;
                }
                case Tool.Square:{
                    setSquares((prevSquares) => [...prevSquares, pastedShape]);
                    break;
                }
                case Tool.Rectangle:{
                    setRectangles((prevRectangles) => [...prevRectangles, pastedShape]);
                    break;
                }
                case Tool.Circle:{
                    setCircle((prevCircles) => [...prevCircles, pastedShape]);
                    break;
                }
                case Tool.Ellipse:{
                    setEllipse((prevEllipses) => [...prevEllipses, pastedShape]);
                    break;
                }
                case Tool.Triangle:{
                    setTriangles((prevTriangles) => [...prevTriangles, pastedShape]);
                    break;
                }
    
            }

            if (copiedShape && shapeTools.includes(copiedShape.type)){
                
                sendShape(copiedShape, EndPoints.Copy);
                sendShape(pastedShape, EndPoints.Paste);
                
            }
        }
    }

    //Stage Size Handling//
    //Avoiding problems when resizing the page
    const canvasRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Update the canvas size when the component mounts
        const updateCanvasSize = () => {
        if (canvasRef.current) {
            setCanvasSize({
            width: canvasRef.current.offsetWidth,
            height: canvasRef.current.offsetHeight,
            });
        }
        };

        // Call the function once on mount
        updateCanvasSize();

        // Add event listener to update size on window resize
        window.addEventListener('resize', updateCanvasSize);

        // Cleanup the event listener on unmount
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    // Makes the render of shapes (layers of them / one shape being on top of another ) correct
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
                    <img src="../icons/arrow-rotate-left-undo.svg" alt="Undo" onClick={handleUndo}/>
                </button>

                <button className="toolbar-button" title="Redo">
                    <img src="../icons/arrow-rotate-right-redo.svg" alt="Redo" onClick={handleRedo}/>
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

            <div className="canvas" ref={canvasRef}>
                {/* <p>CANVAS</p> */}
                <Stage
                    width={canvasSize.width}
                    height={canvasSize.height}
                    onMouseDown={(e) => {
                        if (tool === Tool.Select){
                            console.log("handleDeselect")
                            handleDeselect(e);
                        }
                        else if (tool === Tool.Paste){
                            console.log("handlePaste")
                            handlePaste(e);
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
                            // console.log("Scribble",shape.x, shape.y,shape)
                            return (
                                <Line
                                    key = {shape.ID}
                                    id = {shape.ID}
                                    points = {shape.points}
                                    x={shape.x}
                                    y={shape.y}
                                    stroke = {shape.stroke_Colour}
                                    strokeWidth = {shape.strokeWidth}
                                    lineCap="round"
                                    lineJoin="round"

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleSelect(e); handleDelete(shape.ID,shape.type); handleCopy(e, shape); }}
                                    ref={shapeRef}
                                    scaleX = {shape.scaleX}
                                    scaleY = {shape.scaleY}
                                    rotation = {shape.rotation}    
                                    onTransformEnd={(e) => handleTransformerEnd(e, shape.ID, shape.type)}

                                >

                                </Line>
                            )
                        
                        
                        case Tool.Line :
                            // console.log("Line Coords", shape.x, shape.y, shape)
                            return (
                                <Line
                                    key = {shape.ID}
                                    id = {shape.ID}
                                    points = {shape.points}
                                    stroke = {shape.stroke_Colour}
                                    strokeWidth = {shape.strokeWidth}
                                    lineCap="round"
                                    lineJoin="round"
                                    x = {shape.x}
                                    y = {shape.y}

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleSelect(e); handleDelete(shape.ID,shape.type); handleCopy(e, shape); }}
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
                                    x={shape.x}
                                    y={shape.y}
                                    width={shape.width}
                                    height={shape.height}
                                    stroke = {shape.stroke_Colour}
                                    strokeWidth = {shape.strokeWidth}
                                    fill={shape.fill_Colour}

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleFill(shape.ID,shape.type); handleSelect(e); handleDelete(shape.ID,shape.type); handleCopy(e, shape); }}
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
                                    x={shape.x}
                                    y={shape.y}
                                    width={shape.width}
                                    height={shape.height}
                                    stroke = {shape.stroke_Colour}
                                    strokeWidth = {shape.strokeWidth}
                                    fill={shape.fill_Colour}

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleFill(shape.ID,shape.type); handleSelect(e); handleDelete(shape.ID,shape.type); handleCopy(e, shape); }}
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
                                    x={shape.x}
                                    y={shape.y} 
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
                                    onClick={(e) => {handleFill(shape.ID,shape.type); handleSelect(e); handleDelete(shape.ID,shape.type); handleCopy(e, shape); }}
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
                                    x={shape.x}
                                    y={shape.y}
                                    radius={shape.radius}
                                    stroke={shape.stroke_Colour}
                                    strokeWidth={shape.strokeWidth}
                                    fill={shape.fill_Colour}

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleFill(shape.ID,shape.type); handleSelect(e); handleDelete(shape.ID,shape.type); handleCopy(e, shape); }}
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
                                    x={shape.x}
                                    y={shape.y}
                                    radiusX={shape.radiusX}
                                    radiusY={shape.radiusY}
                                    stroke={shape.stroke_Colour}
                                    strokeWidth={shape.strokeWidth}
                                    fill={shape.fill_Colour}

                                    draggable = {isDraggable}
                                    onDragStart={() => handleDragStart(shape.Id,shape.type)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.ID,shape.type)}

                                    //For transformation
                                    onClick={(e) => {handleFill(shape.ID,shape.type); handleSelect(e); handleDelete(shape.ID,shape.type); handleCopy(e, shape); }}
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
            <button className="toolbar-button" title="Copy" onClick={() => setTool(Tool.Copy)}>
                <img src="../icons/copy.svg" alt="Copy" />
            </button>
            <button className="toolbar-button" title="Paste" onClick={() => setTool(Tool.Paste)}>
                <img src="../icons/paste.svg" alt="Paste" />
            </button>
            <button className="toolbar-button" title="Save XML" onClick={() => {setTool(Tool.SaveXML); handleSave()}}>
                <img src="../icons/save.svg" alt="Save" />
            </button>
            <button className="toolbar-button" title="Load XML" onClick={() => {setTool(Tool.LoadXML); handleLoad()}}>
                <img src="../icons/load.svg" alt="Load" />
            </button>
            <button className="toolbar-button" title="Save JSON" onClick={() => {setTool(Tool.SaveJSON); handleSave()}}>
                <img src="../icons/save.svg" alt="Save" />
            </button>
            <button className="toolbar-button" title="Load JSON" onClick={() => {setTool(Tool.LoadJSON); handleLoad()}}>
                <img src="../icons/load.svg" alt="Load" />
            </button>
        </div>

        {/*--------------------------------------------------------------------End Toolbar buttons for non-artistic tools-------------------------------------------------------------------------------*/}


        </div>

        
    );
};

export default Paint;