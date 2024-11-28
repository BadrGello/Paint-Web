package com.team.Paint_Backend;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

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
    public String saveJson (String filename, String path) throws IOException{
        if (Files.isDirectory(Path.of(path))) {
        
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(ShapesToDefault());
    
            
            try (FileWriter file = new FileWriter(Path.of(path).resolve(filename + ".json").toFile(), false)) {
                file.write(json);
            }
    
            return "Saved successfully: " + filename + ".json";
        } else {
            throw new IOException("Invalid path: " + path + " is not a directory.");
        }
            
    }
     public Vector<DefaultShape> loadJson(String path) throws RuntimeException {
        File file = new File(path);
        ObjectMapper mapper = new ObjectMapper();
      
        try {
            // Read JSON array into List of DefaultShape objects
            Vector<DefaultShape> shapes = mapper.readValue(file, mapper.getTypeFactory().constructCollectionType(Vector.class, DefaultShape.class));
            shapes.forEach(System.out::println);
            return shapes;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error reading JSON file", e); 
        }
       
    }
    public DefaultShape ShapeToDefault(Shape s) {
        DefaultShape Default = new DefaultShape();
        Default.setZIndex(s.getZIndex());
        Default.setType(s.getType());
        Default.setID(s.getID());
        Default.setX(s.getX());
        Default.setY(s.getY());
        Default.setFill_Colour(s.getFill_Colour());
        Default.setStroke_Colour(s.getStroke_Colour());
        Default.setRotation(s.getRotation());
        Default.setScaleX(s.getScaleX());
        Default.setScaleY(s.getScaleY());
        Default.setDeleted(s.isDeleted());
        if ((s instanceof Circle)) {
            Default.setRadius(((Circle) s).getRadius());
        }else if((s instanceof Square)){
            Default.setWidth(((Square)s).getWidth());
        } else if((s instanceof Rectangle)){
            Default.setWidth(((Rectangle)s).getWidth());
            Default.setHeight(((Rectangle)s).getWidth());
        }else if (s instanceof Triangle) {
            Default.setRadius(((Triangle) s).getRadius());
        } else if (s instanceof Ellipse) {
            Default.setRadiusX(((Ellipse) s).getRadiusX());
            Default.setRadiusY(((Ellipse) s).getRadiusY());
        } else if (s instanceof LineSegment) {
            Default.setPoints(((LineSegment) s).getPoints());
        } else if (s instanceof FreeDrawing) {
            Default.setPoints(((FreeDrawing) s).getPoints());
        }
        return Default;
    }

    public Vector<DefaultShape> ShapesToDefault() {
        Vector<DefaultShape> DefShapes = new Vector<DefaultShape>();
        for (int i = 0; i < this.shapes.size(); i++) {
            DefShapes.addElement(ShapeToDefault(this.shapes.elementAt(i)));
        }
        return DefShapes;
    }
}