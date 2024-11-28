package com.team.Paint_Backend;

import java.util.Vector;

public class ShapeFactory {
    public Shape createShape(boolean deleted,int zIndex,String ID, String type, double x, double y, String fill_Colour,
                             String stroke_Colour,double strokeWidth, double scaleX, double scaleY, double rotation,double width, 
                             double height,double radius,double radiusX, double radiusY, Vector<Double> points){
      switch (type) {
        case "square":
           System.out.println("square drawing");
            return new Square(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, width);
            
        case "rectangle":
            return new Rectangle(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, width, height);
            
        case "triangle":
            return new Triangle(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, radius);
            
        case "circle":
            return new Circle(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, radius);
            
        case "ellipse":
            return new Ellipse(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, radiusX, radiusY);
            
        case "line":
            return new LineSegment(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, points);
            
        case "scribble":
            return new FreeDrawing(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, points);
                    
        default:
            throw new Error("Unknown shape type");
            
      }
    }
}
