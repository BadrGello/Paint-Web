package com.team.Paint_Backend;

public abstract class Shape {
     protected boolean deleted;
     protected int zIndex;
     protected String ID;
     protected String type;
     protected double x;
     protected double y;
     protected String fill_Colour;
     protected String stroke_Colour;
     protected double strokeWidth;
     protected double scaleX;
     protected double scaleY;
     protected double rotation;

    public Shape(boolean deleted,int zIndex,String ID, String type, double x, double y, String fill_Colour, String stroke_Colour,double strokeWidth, double scaleX, double scaleY, double rotation) {
        this.deleted = deleted;
        this.zIndex = zIndex;
        this.ID = ID;
        this.type = type;
        this.x = x;
        this.y = y;
        this.fill_Colour = fill_Colour;
        this.stroke_Colour = stroke_Colour;
        this.strokeWidth = strokeWidth;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.rotation = rotation;
    }


    public boolean isDeleted() {
        return this.deleted;
    }

    public boolean getDeleted() {
        return this.deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public int getZIndex() {
        return this.zIndex;
    }

    public void setZIndex(int zIndex) {
        this.zIndex = zIndex;
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
    

    public double getRotation() {
        return this.rotation;
    }

    public void setRotation(double rotation) {
        this.rotation = rotation;
    }
    public Shape clone(){
        return null;
    }
}
