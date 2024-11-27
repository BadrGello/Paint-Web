package com.team.Paint_Backend;

public class Triangle extends Shape {
    private double radius;


    public Triangle(boolean deleted,int zIndex,String ID, String type, double x, double y, String fill_Colour
                   ,String stroke_Colour,double strokeWidth, double scaleX, double scaleY,double radius, double rotation) {

        super(deleted, zIndex, ID,  type,  x,  y,  fill_Colour,  stroke_Colour,strokeWidth,  scaleX,  scaleY, rotation);            
        this.radius = radius;
    }

    public double getRadius() {
        return this.radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
