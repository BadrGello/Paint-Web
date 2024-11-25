package com.team.Paint_Backend;

public class Circle  extends Shape {
     private double radius;


    public Circle(String ID, String type, double x, double y, String fill_Colour
                 , String stroke_Colour,double strokeWidth, double scaleX, double scaleY,double radius) {

        super( ID,  type,  x,  y,  fill_Colour,  stroke_Colour,strokeWidth,  scaleX,  scaleY);            
        this.radius = radius;
    }

    public double getRadius() {
        return this.radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
    
}
