package com.team.Paint_Backend;


public class Rectangle  extends Shape {
    private double width;
    private double height;


    public Rectangle(String ID, String type, double x, double y, String fill_Colour
                    ,String stroke_Colour,double strokeWidth, double scaleX, double scaleY,double width, double height) {
        
        super( ID,  type,  x,  y,  fill_Colour,  stroke_Colour,strokeWidth,  scaleX,  scaleY);
        this.width = width;
        this.height = height;
    }

    public double getWidth() {
        return this.width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return this.height;
    }

    public void setHeight(double height) {
        this.height = height;
    }
    
}
