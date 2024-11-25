//import React, { useState, useRef } from 'react';
//import { Stage, Layer, Rect, Circle, Line } from 'react-konva';

import React from 'react';
//import './Paint.css';

const Paint = () => {
    return (
        <div className="container">

            {/*-------------------------------------------------------------------------------Start Toolbar-------------------------------------------------------------------------------*/}

            <div className="toolbar">
                
                <button className="toolbar-button" title="Pen">
                    <img src="../icons/pen.svg" alt="Pen" />
                </button>

                <button className="toolbar-button" title="Fill Drip">
                    <img src="../icons/fill-drip.svg" alt="Fill Drip" />
                </button>

                <input type="color" title="Color Selector"/>
                
                <input type="range" class="slider" min="1" max="100"  title="Size Adjustor"/>

                <button className="toolbar-button" title="Line">
                    <img src="../icons/line.svg" alt="Line" />
                </button>

                <button className="toolbar-button" title="Square">
                    <img src="../icons/square.svg" alt="Square" />
                </button>

                <button className="toolbar-button" title="Rectangle">
                    <img src="../icons/rectangle.svg" alt="Rectangle" />  {/*cant find one so I put it as a placeholder for now*/}
                </button>

                <button className="toolbar-button" title="Circle">
                    <img src="../icons/circle.svg" alt="Circle" />
                </button>

                <button className="toolbar-button" title="Ellipse">
                    <img src="../icons/ellipse.svg" alt="Ellipse" />  {/*cant find one so I put it as a placeholder for now*/}
                </button>

                <button className="toolbar-button" title="Triangle">
                    <img src="../icons/triangle.svg" alt="Triangle" />  {/*cant find one so I put it as a placeholder for now*/}
                </button>

                <button className="toolbar-button" title="Undo">
                    <img src="../icons/arrow-rotate-left-undo.svg" alt="Undo" />
                </button>

                <button className="toolbar-button" title="Redo">
                    <img src="../icons/arrow-rotate-right-redo.svg" alt="Redo" />
                </button>

                <button className="toolbar-button" title="Select">
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
                <p>CANVAS</p>
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




