package com.team.Paint_Backend;

import java.util.Vector;

public class ShapeFactory {
    public Shape createShape(String ID, String type, double x, double y, String fill_Colour,
                             String stroke_Colour, double scaleX, double scaleY,double width, 
                             double height,double radius,double radiusX, double radiusY, Vector<Double> points){
      switch (type) {
        case "Square":
            return new Square(ID, type, x, y, fill_Colour, stroke_Colour, scaleX, scaleY, width);
            
        case "Rectangle":
            return new Rectangle(ID, type, x, y, fill_Colour, stroke_Colour, scaleX, scaleY, width, height);
            
        case "Triangle":
            return new Triangle(ID, type, x, y, fill_Colour, stroke_Colour, scaleX, scaleY, radius);
            
        case "Circle":
            return new Circle(ID, type, x, y, fill_Colour, stroke_Colour, scaleX, scaleY, radius);
            
        case "Ellipse":
            return new Ellipse(ID, type, x, y, fill_Colour, stroke_Colour, scaleX, scaleY, radiusX, radiusY);
            
        case "LineSegment":
            return new LineSegment(ID, type, x, y, fill_Colour, stroke_Colour, scaleX, scaleY, points);
            
        case "FreeDrawing":
            return new FreeDrawing(ID, type, x, y, fill_Colour, stroke_Colour, scaleX, scaleY, points);
                    
        default:
            throw new Error("Unknown shape type");
            
      }
    }
}
