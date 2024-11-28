package com.team.Paint_Backend;

import java.util.Vector;

public class SaveData {
    private int zIndexTracker;
    private Vector<DefaultShape> shapes;

 
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
