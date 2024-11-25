package com.team.Paint_Backend;

import java.util.Vector;

public class FreeDrawing  extends Shape {
     private Vector<Double> points = new Vector<>() ;

      public FreeDrawing(String ID, String type, double x, double y, String fill_Colour
                ,String stroke_Colour, double scaleX, double scaleY, Vector<Double> points) {

        super( ID,  type,  x,  y,  fill_Colour,  stroke_Colour,  scaleX,  scaleY);
        this.points = points;
    }


    public Vector<Double> getPoints() {
        return this.points;
    }

    public void setPoints(Vector<Double> points) {
        this.points = points;
    }
}
