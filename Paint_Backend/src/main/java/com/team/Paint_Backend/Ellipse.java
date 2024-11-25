package com.team.Paint_Backend;

public class Ellipse  extends Shape {
    private double radiusX;
    private double radiusY;

    public Ellipse(String ID, String type, double x, double y, String fill_Colour
                 , String stroke_Colour,double strokeWidth, double scaleX, double scaleY,double radiusX, double radiusY) {

        super( ID,  type,  x,  y,  fill_Colour,  stroke_Colour, strokeWidth,  scaleX,  scaleY);            
        this.radiusX = radiusX;
        this.radiusY = radiusY;
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
