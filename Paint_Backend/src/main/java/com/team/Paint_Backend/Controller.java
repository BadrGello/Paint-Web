package com.team.Paint_Backend;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.common.lang.NonNull;

import java.io.IOException;
import java.util.Vector;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/api")

public class Controller {
    Service service = new Service();
    ShapeFactory factory = new ShapeFactory();

    @PostMapping("/draw") 
    @ResponseBody   
    public void drawShape ( @RequestBody @NonNull DefaultShape s){
         service.addShape(factory.createShape(s.getDeleted(),s.getZIndex(),s.getID(), s.getType(), s.getX(), s.getY(), s.getFill_Colour()
         , s.getStroke_Colour(), s.getStrokeWidth(), s.getScaleX(), s.getScaleY(),s.getRotation(), s.getWidth()
         , s.getHeight(), s.getRadius(), s.getRadiusX(), s.getRadiusY(), s.getPoints()));
    }
    @PostMapping("/edit")
    @ResponseBody
    public void editShape (@RequestBody  @NonNull DefaultShape s){
        service.edit(factory.createShape(s.getDeleted(),s.getZIndex(),s.getID(), s.getType(), s.getX(), s.getY(), s.getFill_Colour()
        , s.getStroke_Colour(), s.getStrokeWidth(), s.getScaleX(), s.getScaleY(),s.getRotation(), s.getWidth()
        , s.getHeight(), s.getRadius(), s.getRadiusX(), s.getRadiusY(), s.getPoints()));
   }
   @GetMapping("/save/json")
   @ResponseBody
   public String saveJson(@RequestParam String filename, @RequestParam String path) {   
      try{ return service.saveJson(filename, path);}
      catch (IOException e){
          return("Error while saving");
      }
   }
   
   @GetMapping("/load/json")
   @ResponseBody
   public Vector<DefaultShape> loadJson(@RequestParam String path) {
       return service.loadJson(path);
   }
   

}
