package com.team.Paint_Backend;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("")

public class Controller {
    Service service = new Service();
    ShapeFactory factory = new ShapeFactory();

    @PostMapping("/draw")    
    public void drawShape ( @RequestBody DefaultShape s){
         service.addShape(factory.createShape(s.getID(), s.getType(), s.getX(), s.getY(), s.getFill_Colour()
         , s.getStroke_Colour(), s.getStrokeWidth(), s.getScaleX(), s.getScaleY(),s.getRotation(), s.getWidth()
         , s.getHeight(), s.getRadius(), s.getRadiusX(), s.getRadiusY(), s.getPoints()));
    }
    @PostMapping("/edit")
    public void editShape (@RequestBody DefaultShape s){
        service.addShape(factory.createShape(s.getID(), s.getType(), s.getX(), s.getY(), s.getFill_Colour()
        , s.getStroke_Colour(), s.getStrokeWidth(), s.getScaleX(), s.getScaleY(),s.getRotation(), s.getWidth()
        , s.getHeight(), s.getRadius(), s.getRadiusX(), s.getRadiusY(), s.getPoints()));
   }

}
