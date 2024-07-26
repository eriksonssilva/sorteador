package com.jconf.sorteador.controllers;

import org.springframework.web.bind.annotation.*;
import com.jconf.sorteador.services.Drawer;

@RestController
@RequestMapping("/")
public class APICall {

    Drawer drawer = new Drawer();

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("drawer")
    public String drawer() {

        return "O sortudo foi: " + drawer.nameDrawer();
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("add")
    public void adicionarLista(@RequestParam("list") String list) {

        drawer.add(list);

    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("clear")
    public void clear() {

        drawer.clearList();

    }
}