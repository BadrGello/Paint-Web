package com.team.Paint_Backend;

import java.util.Vector;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

public class DefaultShape {
    @JacksonXmlProperty(localName = "Deleted")
    private boolean deleted;

    @JacksonXmlProperty(localName = "ZIndex")
    private int zIndex;

    @JacksonXmlProperty(localName = "ID")
    private String ID;

    @JacksonXmlProperty(localName = "Type")
    private String type;

    @JacksonXmlProperty(localName = "X")
    private double x;

    @JacksonXmlProperty(localName = "Y")
    private double y;

    @JacksonXmlProperty(localName = "FillColour")
    private String fill_Colour;

    @JacksonXmlProperty(localName = "StrokeColour")
    private String stroke_Colour;

    @JacksonXmlProperty(localName = "StrokeWidth")
    private double strokeWidth;

    @JacksonXmlProperty(localName = "ScaleX")
    private double scaleX;

    @JacksonXmlProperty(localName = "ScaleY")
    private double scaleY;

    @JacksonXmlProperty(localName = "Rotation")
    private double rotation;

    @JacksonXmlProperty(localName = "Width")
    private double width;

    @JacksonXmlProperty(localName = "Height")
    private double height;

    @JacksonXmlProperty(localName = "Radius")
    private double radius;

    @JacksonXmlProperty(localName = "RadiusX")
    private double radiusX;

    @JacksonXmlProperty(localName = "RadiusY")
    private double radiusY;

    @JacksonXmlElementWrapper(localName = "Points") // Wrapper for the list of points
    @JacksonXmlProperty(localName = "Point")       // Element name for each point in the list
    private Vector<Double> points;

    public DefaultShape() {
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

    public double getRadius() {
        return this.radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
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

    public Vector<Double> getPoints() {
        return this.points;
    }

    public void setPoints(Vector<Double> points) {
        this.points = points;
    }

}
