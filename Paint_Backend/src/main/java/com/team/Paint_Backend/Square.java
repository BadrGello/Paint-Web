package com.team.Paint_Backend;

public class Square  extends Shape  {
     private double width;


    public Square(String ID, String type, double x, double y, String fill_Colour
                ,String stroke_Colour,double strokeWidth, double scaleX, double scaleY,double width) {

        super( ID,  type,  x,  y,  fill_Colour,  stroke_Colour, strokeWidth,  scaleX,  scaleY);
        this.width = width;
    }

    public double getWidth() {
        return this.width;
    }

    public void setWidth(double width) {
        this.width = width;
    }
    
}
