package com.jconf.sorteador.controllers;

import org.springframework.web.bind.annotation.*;
import com.jconf.sorteador.services.Drawer;

import java.util.List;

@RestController
@RequestMapping("/")
public class APICall {

    Drawer drawer = new Drawer();

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("add")
    public void setNames(@RequestParam("list") String list) {

        drawer.setParticipants(list);

    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("drawer")
    public String drawer(@RequestParam("nameQnt") Integer nameQnt) {

        return drawer.nameDrawer(nameQnt);

    }


    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("clear")
    public void clear() {

        drawer.clearList();

    }

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("update")
    public List<String> update() {

        return drawer.updateList();

    }

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("notDrawn")
    public List<String> notDrawn() {

        return drawer.getNotDrawnYet();

    }
}