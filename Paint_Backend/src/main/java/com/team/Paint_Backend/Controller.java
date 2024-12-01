package com.team.Paint_Backend;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;

import io.micrometer.common.lang.NonNull;



@RestController
@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/api")

public class Controller {
    Service service = new Service();
    ShapeFactory factory = new ShapeFactory();

    @PostMapping("/draw") 
    @ResponseBody   
    public void drawShape ( @RequestBody @NonNull DefaultShape s){   
         System.out.println(1);
         System.out.println(s.getID());
         service.addShape(factory.createShape(s.getDeleted(),s.getZIndex(),s.getID(), s.getType(), s.getX(), s.getY(), s.getFill_Colour()
         , s.getStroke_Colour(), s.getStrokeWidth(), s.getScaleX(), s.getScaleY(),s.getRotation(), s.getWidth()
         , s.getHeight(), s.getRadius(), s.getRadiusX(), s.getRadiusY(), s.getPoints()));
         System.out.println(service.toString());
    }
    @PostMapping("/edit")
    @ResponseBody
    public void editShape (@RequestBody  @NonNull DefaultShape s){
        System.out.println(2);
        System.out.println(s.getID());
        service.edit(factory.createShape(s.getDeleted(),s.getZIndex(),s.getID(), s.getType(), s.getX(), s.getY(), s.getFill_Colour()
        , s.getStroke_Colour(), s.getStrokeWidth(), s.getScaleX(), s.getScaleY(),s.getRotation(), s.getWidth()
        , s.getHeight(), s.getRadius(), s.getRadiusX(), s.getRadiusY(), s.getPoints()));
        System.out.println(service.toString());
   }
   @PostMapping("/delete")
   @ResponseBody
   public void delete(@RequestParam String id){
       service.delete(id);
   }
   @PostMapping("/savejson")
   @ResponseBody
   public ResponseEntity<Map<String, String>>  saveJson(@RequestParam String fileName , @RequestParam String path , @RequestParam int zIndexTracker) {   
      try {
          System.out.println(fileName);
          System.out.println(path);
          System.out.println(zIndexTracker);
          service.saveJson(fileName, path, zIndexTracker);
          Map<String, String> response = Map.of(
            "status", "success",
            "message", "Data saved successfully"
        );
          return ResponseEntity.ok(response);
      } catch (IOException e) {
          System.out.println("Error while saving: " + e.getMessage());
          e.printStackTrace();
          Map<String, String> response = Map.of(
            "status", "failed",
            "message", e.getMessage()
        );
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
      }
   }
   
   @GetMapping("/loadjson")
   @ResponseBody
   public SaveData loadJson(@RequestParam String path) {
    System.out.println("Decoded Path: " + path);

    try {
        // Use the decoded path to load the JSON file
        return service.loadJson(path);
    } catch (RuntimeException e) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error loading JSON", e);
    }
    }
    
    @PostMapping("/savexml")
    @ResponseBody
    public  ResponseEntity saveXml(@RequestParam String fileName , @RequestParam String path , @RequestParam int zIndexTracker) {   
        try {
            System.out.println(fileName);
            System.out.println(path);
            System.out.println(zIndexTracker);
            service.saveXml(fileName, path, zIndexTracker);
            Map<String, String> response = Map.of(
                "status", "success",
                "message", "Data saved successfully"
            );
              return ResponseEntity.ok(response);
        } catch (IOException e) {
            System.out.println("Error while saving: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> response = Map.of(
                "status", "failed",
                "message", e.getMessage()
            );
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/loadxml")
    @ResponseBody
    public SaveData loadXml(@RequestParam String path) {
        System.out.println("Decoded Path: " + path);

        try {
            // Use the decoded path to load the JSON file
            return service.loadXml(path);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error loading XML", e);
        }
    }

    @GetMapping("/undo")
    @ResponseBody
    public SaveData  undo() throws JsonProcessingException{
        return service.Undo();
    }
    @GetMapping("/redo")
    @ResponseBody
    public SaveData  redo() throws JsonProcessingException{
        return service.Redo();
    }

}
