package com.team.Paint_Backend;

import java.util.Vector;

public class ShapeFactory {
    public Shape createShape(boolean deleted,int zIndex,String ID, String type, double x, double y, String fill_Colour,
                             String stroke_Colour,double strokeWidth, double scaleX, double scaleY, double rotation,double width, 
                             double height,double radius,double radiusX, double radiusY, Vector<Double> points){
      switch (type) {
        case "Square":
            return new Square(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, width);
            
        case "Rectangle":
            return new Rectangle(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, width, height);
            
        case "Triangle":
            return new Triangle(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, radius);
            
        case "Circle":
            return new Circle(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, radius);
            
        case "Ellipse":
            return new Ellipse(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, radiusX, radiusY);
            
        case "LineSegment":
            return new LineSegment(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, points);
            
        case "FreeDrawing":
            return new FreeDrawing(deleted, zIndex,ID, type, x, y, fill_Colour, stroke_Colour,strokeWidth, scaleX, scaleY, rotation, points);
                    
        default:
            throw new Error("Unknown shape type");
            
      }
    }
}
