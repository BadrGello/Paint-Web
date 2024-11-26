package com.team.Paint_Backend;

import java.util.Vector;




public class Service {
    Vector<Shape> shapes = new Vector<>();
    
    public Service() {
            
    }

    public void addShape (Shape s){
        shapes.add(s);
    }
    public void edit (Shape s){
        shapes.add(s);
    }
}