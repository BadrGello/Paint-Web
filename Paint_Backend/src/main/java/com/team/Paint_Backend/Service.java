package com.team.Paint_Backend;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Objects;import java.util.Stack;

import java.util.Vector;

import com.fasterxml.jackson.core.JsonProcessingException;






public class Service {
    Vector<Shape> shapes = new Vector<>();
    Stack<String> Undo=new Stack<String>();
    Stack<String> Redo=new Stack<String>();
    String currentState="";
    int zIndexTracker=0;
    SaveData intialSaveData = new SaveData(this.zIndexTracker,ShapesToDefault());
        @Override
        public String toString() {
            return "shape{ID='" + this.shapes.get(shapes.size()-1).getID() + "', zindex=" + this.shapes.get(shapes.size()-1).getZIndex() + "}";
    }

    public void addShape (Shape s){
        shapes.add(s);
        UndoRedoHandle();
    }
    public void edit (Shape s){       
            int index=-1;    
            for(int i=this.shapes.size()-1;i>=0;i--){
                if(s.getID().equals(this.shapes.elementAt(i).getID())){
                    index=i;
                    break;
                }
            }
            if(index>=0){
                this.shapes.setElementAt(s.clone(),index);

            }     
    }
    public void delete(String id){
        int indexDrawing=-1;
        for(int i=shapes.size()-1;i>=0;i--) {
            if (Objects.equals(shapes.elementAt(i).getID(), id)) {
                indexDrawing = i;
                break;
            }
        }
        System.out.println(indexDrawing);
        if(shapes.size()!=0)
            shapes.removeElementAt(indexDrawing);
        UndoRedoHandle();    
    }
    public void saveJson (String filename, String path, int zIndexTracker) throws IOException{
        if (Files.isDirectory(Path.of(path))) {
            if(currentState==""){
                ObjectMapper mapper = new ObjectMapper();
                this.currentState=mapper.writeValueAsString(this.intialSaveData);
            }
            String json = this.currentState;
            System.out.println(json);
     
            // Write JSON to file
            try (FileWriter file = new FileWriter(Path.of(path).resolve(filename + ".json").toFile(), false)) {
               
                file.write(json);
            }
    
            System.out.println("Saved successfully: " + filename + ".json"); ;
        } else {
            throw new IOException("Invalid path: " + path + " is not a directory.");
        }
            
    }
    public SaveData loadJson(String path) throws RuntimeException {
        File file = new File(path);
        ObjectMapper mapper = new ObjectMapper();
    
        try {
            // Read the JSON file into a SaveData object
            SaveData saveData = mapper.readValue(file, SaveData.class);
    
            // Debugging output
            System.out.println("Loaded SaveData:");
            System.out.println("zIndexTracker: " + saveData.getzIndexTracker());
            System.out.println("Shapes: " + saveData.getShapes());
    
            return saveData;
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
        Default.setStrokeWidth(s.getStrokeWidth());
        if ((s instanceof Circle)) {
            Default.setRadius(((Circle) s).getRadius());
        }else if((s instanceof Square)){
            Default.setWidth(((Square)s).getWidth());
            System.out.println(((Square)s).getWidth());
        } else if((s instanceof Rectangle)){
            Default.setWidth(((Rectangle)s).getWidth());
            Default.setHeight(((Rectangle)s).getHeight());
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

    public void UndoRedoHandle(){
            SaveData saveData = new SaveData(this.zIndexTracker,ShapesToDefault());
            ObjectMapper mapper = new ObjectMapper();
        try {
            this.currentState = mapper.writeValueAsString(saveData);
            this.zIndexTracker++;
            this.Redo=new Stack<>();
            this.Undo.push(currentState);
        } catch (JsonProcessingException ex) {
        }
    }
    public void Undo() throws JsonProcessingException{
        if(!this.Undo.isEmpty()){
            this.Redo.push(this.Undo.pop());
            if(!this.Undo.isEmpty()){
                this.currentState=this.Undo.peek();}
            else{
                ObjectMapper mapper = new ObjectMapper();
                this.currentState=mapper.writeValueAsString(this.intialSaveData);
            }    
        }
    }
    public void Redo() throws JsonProcessingException{
        System.out.print("thnx");
        if(!this.Redo.isEmpty()){
            this.Undo.push(this.Redo.pop());
            if(!this.Undo.isEmpty()){
                this.currentState=this.Undo.peek();
            }
            else{
                ObjectMapper mapper = new ObjectMapper();
                this.currentState=mapper.writeValueAsString(this.intialSaveData);
            }    
        }
    }

    public Vector<DefaultShape> ShapesToDefault() {
        Vector<DefaultShape> DefShapes = new Vector<DefaultShape>();
        for (int i = 0; i < this.shapes.size(); i++) {
            DefShapes.addElement(ShapeToDefault(this.shapes.elementAt(i)));
        }
        return DefShapes;
    }
}