package com.team.Paint_Backend;

public class Circle  extends Shape {
     protected double radius;


    public Circle(boolean deleted,int zIndex,String ID, String type, double x, double y, String fill_Colour
                 , String stroke_Colour,double strokeWidth, double scaleX, double scaleY, double rotation,double radius) {

        super(deleted, zIndex, ID,  type,  x,  y,  fill_Colour,  stroke_Colour,strokeWidth,  scaleX,  scaleY, rotation);            
        this.radius = radius;
    }
    @Override
    public Circle clone(){
        Circle copy = new Circle(this.deleted, this.zIndex, this.ID,  this.type, this. x, this. y,  this.fill_Colour,  this.stroke_Colour,this.strokeWidth,  this.scaleX, this. scaleY,this.rotation,this.radius);
        return copy;
    }

    public double getRadius() {
        return this.radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
    
}
