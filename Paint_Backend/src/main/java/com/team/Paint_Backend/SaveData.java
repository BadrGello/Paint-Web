package com.team.Paint_Backend;

import java.util.Vector;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

public class SaveData {
    @JacksonXmlProperty(localName = "zIndexTracker")
    private int zIndexTracker;

    @JacksonXmlElementWrapper(localName = "Shapes") // Wrapper element for the collection
    @JacksonXmlProperty(localName = "Shape")       // Element name for each item in the collection

    private Vector<DefaultShape> shapes;


    public SaveData() {
    }

 
    public SaveData(int zIndexTracker, Vector<DefaultShape> shapes) {
        this.zIndexTracker = zIndexTracker;
        this.shapes = shapes;
    }

   
    public int getzIndexTracker() {
        return zIndexTracker;
    }

    public void setzIndexTracker(int zIndexTracker) {
        this.zIndexTracker = zIndexTracker;
    }

    public Vector<DefaultShape> getShapes() {
        return shapes;
    }

    public void setShapes(Vector<DefaultShape> shapes) {
        this.shapes = shapes;
    }
}
