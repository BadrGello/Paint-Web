package com.team.Paint_Backend;

public class Triangle extends Shape {
    private double radius;


    public Triangle(boolean deleted,int zIndex,String ID, String type, double x, double y, String fill_Colour
                   ,String stroke_Colour,double strokeWidth, double scaleX, double scaleY,double radius, double rotation) {

        super(deleted, zIndex, ID,  type,  x,  y,  fill_Colour,  stroke_Colour,strokeWidth,  scaleX,  scaleY, rotation);            
        this.radius = radius;
    }
    @Override
    public Triangle clone(){
        Triangle copy = new Triangle(this.deleted, this.zIndex, this.ID,  this.type, this. x, this. y,  this.fill_Colour,  this.stroke_Colour,this.strokeWidth,  this.scaleX, this. scaleY,this.radius,this.rotation);
        return copy;
    }

    public double getRadius() {
        return this.radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
