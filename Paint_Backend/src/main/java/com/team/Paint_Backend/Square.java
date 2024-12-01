package com.team.Paint_Backend;

public class Square  extends Shape  {
     private double width;


    public Square(boolean deleted,int zIndex,String ID, String type, double x, double y, String fill_Colour
                ,String stroke_Colour,double strokeWidth, double scaleX, double scaleY, double rotation,double width) {

        super(deleted, zIndex, ID,  type,  x,  y,  fill_Colour,  stroke_Colour, strokeWidth,  scaleX,  scaleY, rotation);
        this.width = width;
    }
    @Override
    public Square clone(){
         Square copy = new Square(this.deleted, this.zIndex, this.ID, this.type, this.x, this.y, this.fill_Colour, this.stroke_Colour, this.strokeWidth,this.scaleX, this.scaleY, this.rotation,this.width);
         return copy;
    }

    public double getWidth() {
        return this.width;
    }

    public void setWidth(double width) {
        this.width = width;
    }
    public double getHeight() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getHeight'");
    }
    
}
