package com.team.Paint_Backend;

import java.util.Vector;

public class LineSegment  extends Shape {
      private Vector<Double> points = new Vector<>() ;

      public LineSegment(boolean deleted,int zIndex,String ID, String type, double x, double y, String fill_Colour
                ,String stroke_Colour,double strokeWidth, double scaleX, double scaleY, double rotation, Vector<Double> points) {

        super(deleted, zIndex, ID,  type,  x,  y,  fill_Colour,  stroke_Colour, strokeWidth,  scaleX,  scaleY, rotation);
        this.points = points;
    }


    public Vector<Double> getPoints() {
        return this.points;
    }

    public void setPoints(Vector<Double> points) {
        this.points = points;
    }
    
}
