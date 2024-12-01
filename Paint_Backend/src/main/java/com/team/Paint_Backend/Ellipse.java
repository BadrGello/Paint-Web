package com.team.Paint_Backend;

public class Ellipse  extends Shape {
    private double radiusX;
    private double radiusY;

    public Ellipse(boolean deleted,int zIndex,String ID, String type, double x, double y, String fill_Colour
                 , String stroke_Colour,double strokeWidth, double scaleX, double scaleY, double rotation,double radiusX, double radiusY) {

        super(deleted, zIndex, ID,  type,  x,  y,  fill_Colour,  stroke_Colour, strokeWidth,  scaleX,  scaleY, rotation);            
        this.radiusX = radiusX;
        this.radiusY = radiusY;
    }
    @Override
    public Ellipse clone(){
        Ellipse copy = new Ellipse(this.deleted, this.zIndex, this.ID,  this.type, this. x, this. y,  this.fill_Colour,  this.stroke_Colour,this.strokeWidth,  this.scaleX, this. scaleY,this.rotation,this.radiusX,this.radiusY);
        return copy;
    }

    public double getRadiusX() {
        return this.radiusX;
    }

    public void setRadiusX(double radiusX) {
        this.radiusX = radiusX;
    }

    public double getRadiusY() {
        return this.radiusY;
    }

    public void setRadiusY(double radiusY) {
        this.radiusY = radiusY;
    }
}
