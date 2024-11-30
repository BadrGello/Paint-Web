package com.team.Paint_Backend;


public class Rectangle  extends Shape {
    private double width;
    private double height;


    public Rectangle(boolean deleted,int zIndex,String ID, String type, double x, double y, String fill_Colour
                    ,String stroke_Colour,double strokeWidth, double scaleX, double scaleY, double rotation,double width, double height) {
        
        super(deleted, zIndex, ID,  type,  x,  y,  fill_Colour,  stroke_Colour,strokeWidth,  scaleX,  scaleY, rotation);
        this.width = width;
        this.height = height;
        System.out.println(strokeWidth);
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
