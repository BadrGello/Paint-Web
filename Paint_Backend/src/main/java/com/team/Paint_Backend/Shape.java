package com.team.Paint_Backend;

public abstract class Shape {
     private String ID;
     private String type;
     private double x;
     private double y;
     private String fill_Colour;
     private String stroke_Colour;
     private double strokeWidth;
     private double scaleX;
     private double scaleY;


    public Shape(String ID, String type, double x, double y, String fill_Colour, String stroke_Colour,double strokeWidth, double scaleX, double scaleY) {
        this.ID = ID;
        this.type = type;
        this.x = x;
        this.y = y;
        this.fill_Colour = fill_Colour;
        this.stroke_Colour = stroke_Colour;
        this.strokeWidth = strokeWidth;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }


    public String getID() {
        return this.ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getX() {
        return this.x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return this.y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public String getFill_Colour() {
        return this.fill_Colour;
    }

    public void setFill_Colour(String fill_Colour) {
        this.fill_Colour = fill_Colour;
    }

    public String getStroke_Colour() {
        return this.stroke_Colour;
    }

    public void setStroke_Colour(String stroke_Colour) {
        this.stroke_Colour = stroke_Colour;
    }

    public double getStrokeWidth() {
        return this.strokeWidth;
    }

    public void setStrokeWidth(double strokeWidth) {
        this.strokeWidth = strokeWidth;
    }

    public double getScaleX() {
        return this.scaleX;
    }

    public void setScaleX(double scaleX) {
        this.scaleX = scaleX;
    }

    public double getScaleY() {
        return this.scaleY;
    }

    public void setScaleY(double scaleY) {
        this.scaleY = scaleY;
    }
    

}
