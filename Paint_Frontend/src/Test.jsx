import {Layer, Stage } from "react-konva"


function Test(){

    return(
        <>
            
            <div className="Toolbar">
                <label htmlFor="colorPicker">Stroke Color:</label>
                <input type="color" id="strokeColorPicker" name="strokeColorPicker" /> {/* onChange={(e) => onColorChange(e.target.value)} */}
                
                <label htmlFor="fillColorPicker">Fill Color:</label>
                <input type="color" id="fillColorPicker" name="fillColorPicker" />

                <label>Brush Thickness:</label>
                <input type="range" id="brushSize" name="brushSize" min="1" max="20" />

                <label>Opacity:</label>
                <input type="range" id="opacity" name="opacity" min="0" max="1" step="0.1" />

                <button>Fill Bucket</button>
                <button>Line</button>
                <button>Rectangle</button>
                <button>Sqaure</button>
                <button>Circle</button>
                <button>Elipse</button>
                <button>Select</button>
                <button>Freedraw</button>
                <button>Eraser</button>
                <button>Delete</button>
                <button>Clear</button>

                <button>Undo</button>
                <button>Redo</button>

                <button>Save</button>
                <button>Load</button>
                

            </div>

            <div className="Canva">
                <Stage>
                    <Layer>
                    </Layer>
                </Stage>

            </div>

        </>
    )


}

export default Test